---
title: "VAE(1): Autoencoder"
categories:
  - Machine Learning
tags:
  - Autoencoder
  - Unsupervised Learning
  - Generative Model
  - Manifold Learning
mathjax: true
toc: true
toc_label: "Autoencoder"
toc_sticky: true
---
# Autoencoder란?
정의: input data(x)를 latent vector(z)로 변환했다가 다시 input data로 복원하도록 하는 neural net을 말한다.   
- **Dimensionality Reduction:**   
    일반적으로 latent vector는 input data에 비해서 크기가 작으므로 정보를 압축했다는 관점에서 **dimensionality reduction**을 수행한다.
- **Representation Learning:**   
    input data를 표현하기 위해 필요한 적은 양의 정보를 뽑아냈다는 점에서 **representation learning**, **feature extraction** 이라고 볼 수 있다.   
- **Unsupervised Learning:**   
    학습을 할 때는 별도의 label 없이 input x가 다시 잘 복원되는지를 loss로 생각하므로 **unsupervised learning**의 일종이다.   
- **Maximum Likelihood:**   
    Autoencoder를 확률 모델로써 해석해보면 dataset X가 나올 확률 $\prod p(x_i\|x_i)$를 최대화 하는 결과가 되므로 **Maximum Likelihood**를 계산하는 model이라고 볼 수 있다.

## Manifold Learning

autoencoder를 이해할 때 자주 등장하는 Manifold라는 개념에 대해 먼저 이해하고 들어가자.
### Manifold의 정의
- $d \leq m$
- $d$ dimension manifold M을 더 큰 $m$ dimensional space에 대응시킨다.
- 이때 대응시키는 mapping $f:R^d \rightarrow R^m$ 을 embedding function이라 한다.
- $d$는 원래 manifold가 있던 공간이므로 intrinsic dimension이라 하고, $m$은 embedding하며 도입된 새로운 공간이므로 extrinsic dimension이라 한다.
- embedding 결과는 embedding function에 noise를 더한 형태가 된다. $x_i = f(\tau_i) + \epsilon_i$
- 이때 Embedding 결과를 보고 embedding function을 찾거나, intrinsic space에서의 원본 데이터를 추정하는 것을 manifold learning이라고 한다.
- **Manifold는 저차원 공간이 아니라 저차원 공간상에 존재하는 일부 region이다.**

### Manifold Hypothesis
- 고차원 데이터는 sparse하지만 저차원 공간상에서 대부분의 데이터가 밀집돼있는 작은 공간 manifold가 존재한다.
- 저차원 공간에서 manifold를 벗어나면 데이터 밀도는 급격히 낮아진다.
- (일반적으로) intrinsic space에서의 manifold는 smooth, uniformly distributed, small noise 라고 가정한다.

**Manifold가 잘 학습됐다면 작은 region상에서 랜덤하게 샘플링 했을 때 유의미한 데이터가 뽑혀야한다.**

### Manifold Learning in Autoencoder
Machine learning의 관점에서 보면
- **extrinsic dimension**: 프로그램상의 데이터 차원
- **intrinsic dimension**: 여기서 추출한 latent space

Autoencoder는 latent space의 벡터가 extrinsic space의 원본 데이터를 잘 복원하도록 학습하므로 manifold 상의 error가 작도록 학습한다는 의미가 된다.   

조금 더 나아가면 Autoencoder와 같이 unsupervised 방식으로 manifold learning을 하면 데이터가 잘 모여있긴 하지만 여러 카테고리의 데이터들이 마구 뒤섞여 있는 entangled manifold가 학습된다. 좀 더 학습을 잘 하면 카테고리별로 잘 정렬돼있는 manifold를 학습할 수 있는데 이 경우는 disentangled manifold를 학습했다고 말한다.

## 실제 autoencoder
### 설계 idea
- input x를 latent vector z로 바꾸는 encoder $h(\cdot)$ 를 찾고자 한다.
- 그런데 학습에 사용할 마땅한 label이 없으니 z에서 다시 원본 데이터를 복원하는 decoder $g(\cdot)$ 도 함께 정의하자.   
별도의 label이 필요없는 unsupervised learning이라고 볼 수 있지만 정확한 명칭은 자기자신이 알아서 label을 만드는 **self-supervised learning**이다.
- Loss는 reconstruction 된 결과와 원래 자기자신을 비교한 loss라는 의미에서 reconstruction loss라고 부른다.   
  Loss 정의에 사용되는 함수는 최종 확률 분포의 가정에 따라 MSE 또는 CrossEntropy를 사용한다. [[이전 post 참고]({% link _posts/2022-05-02-ml-interpretation.md %})]
$$\text{Reconstruction Loss: } L_{AE} = \sum_{x\in D} L(x, g(h(x)))$$

### 실제 응용
AE는 학습 과정에서 reconstruction이 잘 되도록 한다. 이 의미를 생각해보면
  - input data의 핵심적인 정보를 잘 포함하는 distribution을 찾았다
  - 그 distribution을 정의하던 parameter는 데이터의 핵심 정보를 빼먹지않고 담고있다
  - Encoder -> Decoder 를 거쳐서 나온 최종 parameter까지 정보가 전달되므로 중간 결과에도 정보는 잘 전달되고 있다.
  - 중간 결과들 중 크기가 제일 작은 부분에서는 핵심 정보들이 가장 잘 요약될 것이다.
  - 그럼 이 중간결과를 데이터의 feature로 쓰면 좋을 것이라는 결론에 도달

결론적으로 Autoencoder는 데이터 크기가 가장 작아진 지점의(bottleneck) 값을 사용하는 것이 가장 효과적이게 된다.   
따라서 학습을 완료한 이후에는 bottleneck 이전의 encoder 부분만을 feature extractor로 사용하는 것이 보편적이다.

<details>
<summary>과거 AE 기반 model들</summary>
<pre>
Stacking AE: Layer들을 초기화 할 때 연속한 2개의 layer를 통과하면 AE가 되도록 반복 초기화.
Denoising AE: input 값에 noise q(x`|x)를 추가한 뒤 원래 이미지가 reconstruct 되도록 학습
Stochastic Contractive AE: 원래 reconstruction loss + stochastic regularizer를 더한 loss 사용
    stochastic regularizer는 h(x)와 noise 추가된 h(x`)의 차이의 l2 norm으로 정의

</pre>
</details>