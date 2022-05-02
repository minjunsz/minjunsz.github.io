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

Pytorch lightning에서 핵심 개념은 LightningModule과 Trainer이다.   
LightningModule에서는 실제로 ML Model을 정의하는 것에 초점을 두는 반면   
Trainer는 model을 학습시키고 저장하는 등의 engineering에 초점을 둔다.


## 1. pl.LightningModule 정의

Pytorch lightning은 전체 코드를 작은 함수 단위로 쪼개 쓰도록 해준다.   
구조가 잘 잡힌 프로그램을 짜기 위해 pl.LightningModule 내에 정의돼있는   
함수들을 overriding해서 사용하므로 **꼭 함수 이름을 맞춰주도록** 한다.

code는 6개의 section이 있다.
* Computations (init).
* Train Loop (training_step)
* Validation Loop (validation_step)
* Test Loop (test_step)
* Prediction Loop (predict_step)
* Optimizers and LR Schedulers (configure_optimizers)

### 실제로 model을 구현 작업 순서

  1. 기존의 \_\_init__(), forward() 함수는 그대로 유지한다.
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

  epoch level의 logging이 필요하다면 self.log()를 이용한다. batch별 값을 종합한 결과를 log할 수 있다. log 외에 epoch별로 해야하는 작업이 있다면 `training_epoch_end()` 등의 함수를 사용한다.

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


## 2. Trainer 정의
Trainer는 실제로 학습 과정에 필요한 다양한 내용을 정의할 수 있다.
* argparser 사용
* cpu / gpu / tpu 선택
* precision 선택
* auto lr / batch_size 사용
* callback, 이를 이용한 checkpoint 저장
* fast_dev_run / overfit_batches
* gradient clipping
* logger 등록
* val_check_interval
* terminate_on_nan
```python
trainer = Trainer()
model = LitModel()
trainer.fit(model)
```