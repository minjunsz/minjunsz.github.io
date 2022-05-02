---
title: "Pytorch Lightning"
categories:
  - Machine Learning
tags:
  - Pytorch Lightning
  - Framework
toc: true
toc_label: "Pytorch Lightning"
toc_sticky: true
---

# Pytorch Lightning 사용법

Pytorch lightning에서 핵심 개념은 **LightningModule**과 **Trainer**이다.  
`LightningModule`에서는 실제로 ML Model을 정의하는 것에 초점을 두는 반면  
`Trainer`는 model을 학습시키고 저장하는 등의 engineering에 초점을 둔다.

추가적으로 핵심 module은 아니지만 **Callback**, **LightningDataModule**을 정의해 사용할 수 있다.

- Model 구조 (research 관련) -> `LightningModule`
- Engineering 관련 -> `Trainer`
- 데이터 처리 -> `LightningDataModule`
- 기타 재사용 가능 코드 -> `Callback`

## 1. pl.LightningModule 정의

Pytorch lightning은 전체 코드를 작은 함수 단위로 쪼개 쓰도록 해준다.  
구조가 잘 잡힌 프로그램을 짜기 위해 pl.LightningModule 내에 정의돼있는  
함수들을 overriding해서 사용하므로 **꼭 함수 이름을 맞춰주도록** 한다.

`pl.LightningModule`의 경우 `nn.Module`을 상속받는 Wrapper class이긴 하지만 기존의 `nn.Module`이 단순히 ML model만을 정의했다면 `pl.LightningModule`은 loss, optimizer, 원한다면 data까지를 모두 포함하는 system을 정의한다.

code는 6개의 section이 있다.

- Computations (init).
- Train Loop (training_step)
- Validation Loop (validation_step)
- Test Loop (test_step)
- Prediction Loop (predict_step)
- Optimizers and LR Schedulers (configure_optimizers)

### 실제 model 구현 작업 순서

1. 기존의 \_\_init\_\_(), forward() 함수는 그대로 유지한다.  
   pytorch lightning에서 forward 함수는 'inference / prediction'등의 작업을 정의하는 곳이다. train 과정에 필요한 내용은 `training_step()`함수에 포함시키고 `forward()`함수에는 들어가지 않도록 한다.
2. **training_step()** 함수 구현  
   기존의 train loop 내에서 loss를 구하는 것 까지만 진행한 뒤 "loss"를 포함하는 dictionary return  
   parameter로 batch, batch_idx를 받는다

   ```python
   def training_step(self, batch, batch_idx)
     x, y = batch
     output = self(x)
     loss = F.cross_entropy(output, y)
     # logging statement
     return {"loss": loss, "additional info": ...}
   ```

   <span>
   epoch level의 logging이 필요하다면 self.log()를 이용한다. batch별 값을 종합한 결과를 log할 수 있다. log 외에 epoch별로 해야하는 작업이 있다면 `training_epoch_end()` 등의 함수를 사용한다.<br>

   ```python
   def training_step(self, batch, batch_idx):
     ...
     # logs metrics for each training_step,
     # and the average across the epoch, to the progress bar and logger
     self.log("train_loss", loss, on_step=True, on_epoch=True, prog_bar=True, logger=True)
     return loss
     # ========================= or =========================
     def training_step(self, batch, batch_idx):
       ...
       return {"loss": loss, "other_stuff": preds}

     def training_epoch_end(self, training_step_outputs):
       all_preds = torch.stack(training_step_outputs)
       ...
   ```

3. **configure_optimizer()** 함수 구현

   ```python
   def configure_optimizer():
     return torch.optim.Adam(self.parameters(), lr=0.001)
   ```

4. hook 사용
   train / validation / test / predict 각 단계별로 3종류의 hook을 사용할 수 있다.
   - x_step
   - x_step_end (optional)
   - x_epoch_end (optional)
     위의 `training_step`을 정의하던 것과 같이 각 step은 필수적으로 구현되어야하며 각 batch별로, epoch별로 추가적인 기능을 구현할 수 있다.  
     hook별 interface는 필요할 때 공식 document를 참고해서 작성하자.

## 2. Trainer 정의

기본적인 사용 방법은 Trainer를 정의하고 `trainer.fit()`함수에 model, dataloader를 넣어주면 학습이 진행된다.

```python
trainer = Trainer()
model = LitModel()
trainer.fit(model=model, train_dataloaders=train_loader)
```

<span>
Trainer를 통해 계산에 사용될 device를 결정할 수 있다.   
이렇게 device를 선택할 경우 기존의 model.to(device), tensor.to(device) 작업을 pytorch lightning이 알아서 작업해준다.

```python

# train on CPU
trainer = Trainer()
trainer = Trainer(accelerator="cpu", devices=8)

# train on 1 GPU
trainer = pl.Trainer(accelerator="gpu", devices=1)

# Train on 8 TPU cores
trainer = pl.Trainer(accelerator="tpu", devices=8)

```

### debugging

Trainer가 제공하는 다양한 기능 중 실제로 model 구현하며 debugging에 도움되는 기능들이 존재한다. 나는 실제 프로그래밍 중에는 `fast_dev_run` -> `overfit_batches` -> `val_check_interval` 의 순서로 사용한다.

- 일부 batch만 학습

  ```python
    Trainer(limit_train_batches=10, limit_val_batches=3)
  ```

- 일부 batch에대해 overfit 하여 모델이 정상적으로 학습되는지 sanity check
  ```python
    Trainer(overfit_batches=10)
  ```
- 코드상의 모든 지점을 통과하도록 최소한의 batch, epoch으로 진행
  ```python
    # 모든 코드를 1번씩 통과시키는 unit test
    Trainer(fast_dev_run=True)
    # 모든 코드를 4번씩 통과시키는 unit test
    Trainer(fast_Dev_run=4)
  ```
- 구간별로 validation 진행
  일반적으로는 _train loop에 N번째 epoch마다 validation을 해라._ 라는 형태로 코드를 작성하며 train / validate 코드가 합쳐졌었는데 이 logic을 분리할 수 있다. validation step은 model에 작성하고 언제 validation을 실행할지는 trainer에 명시해주면 된다.

  ```python
    # epoch 25% 했을때마다 validation 진행
    Trainer(val_check_interval=0.25)
  ```

### 기타 기능들

- argparser 사용
- precision 선택
- callback, 이를 이용한 checkpoint 저장
- gradient clipping
- logger 등록
- terminate_on_nan
- profiler 등록

## 3. pl.LightningDataModule 정의

data loading은 `LightningModule` 내에 함께 정의할 수 있지만 `LightningDataModule`을 별도로 정의함으로써 더 모듈화되고 재사용가능한 코드를 작성할 수 있다.  
`LightningDataModule`은 train / val / test / prediction dataloader의 collection이며 각 단계에 해당하는 download, preprocessing, transform을 함께 정의한다.

1. `prepare_data()`: single process에서 진행돼야하는 작업을 정의한다. (data download, tokenize)
2. `setup`: 각 GPU에서 개별적으로 실시돼야하는 operation을 정의한다. (data split, create dataset, apply transform)
3. `x_dataloader`: 각 stage별로 dataset -> dataloader를 반환하는 코드를 작성한다.

```python
import pytorch_lightning as pl
from torch.utils.data import random_split, DataLoader

# Note - you must have torchvision installed for this example
from torchvision.datasets import MNIST
from torchvision import transforms


class MNISTDataModule(pl.LightningDataModule):
    def __init__(self, data_dir: str = "./"):
        super().__init__()
        self.data_dir = data_dir
        self.transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))])

    def prepare_data(self):
        # download
        MNIST(self.data_dir, train=True, download=True)
        MNIST(self.data_dir, train=False, download=True)

    def setup(self, stage: Optional[str] = None):

        # Assign train/val datasets for use in dataloaders
        if stage in ("fit", "validate", None):
            mnist_full = MNIST(self.data_dir, train=True, transform=self.transform)
            self.mnist_train, self.mnist_val = random_split(mnist_full, [55000, 5000])

        # Assign test dataset for use in dataloader(s)
        if stage in ("test", None):
            self.mnist_test = MNIST(self.data_dir, train=False, transform=self.transform)

        if stage in ("predict", None):
            self.mnist_predict = MNIST(self.data_dir, train=False, transform=self.transform)

    def train_dataloader(self):
        return DataLoader(self.mnist_train, batch_size=32)

    def val_dataloader(self):
        return DataLoader(self.mnist_val, batch_size=32)

    def test_dataloader(self):
        return DataLoader(self.mnist_test, batch_size=32)

    def predict_dataloader(self):
        return DataLoader(self.mnist_predict, batch_size=32)
```

## 4. Weights & Biases 연동하기

pytorch lightning은 자체적으로 `WandbLogger`를 지원하므로 간단하게 logging, model 저장을 할 수 있다.  
[W&B 공식 post](https://wandb.ai/wandb_fc/korean/reports/Weights-Biases-Pytorch-Lightning---VmlldzozNzAxOTg)에 필요한 내용과 code들이 수록돼있으니 참고해서 작성하자.

## 5. 도움될 document 모음

[prototyping에 사용하기 좋은 template colab notebook](https://colab.research.google.com/drive/1rHBxrtopwtF8iLpmC_e7yl3TeDGrseJL?usp=sharing%3E)  
[early stopping을 사용하는 경우 callback 등록](https://pytorch-lightning.readthedocs.io/en/stable/common/early_stopping.html)  
[GAN에서 여러 optimizer를 순서대로 실행시키는 경우](https://pytorch-lightning.readthedocs.io/en/stable/common/optimization.html#id4)  
[자동으로 최대 batch size 찾기](https://pytorch-lightning.readthedocs.io/en/stable/advanced/training_tricks.html#batch-size-finder)  
[자동으로 learning rate 찾기](https://pytorch-lightning.readthedocs.io/en/stable/advanced/training_tricks.html#learning-rate-finder)
