---
title: "VAE(2): Variational Autoencoder Concept"
categories:
  - Machine Learning
tags:
  - Autoencoder
  - VAE
  - Unsupervised Learning
  - Generative Model
  - Manifold Learning
mathjax: true
toc: true
toc_label: "Variational Autoencoder"
toc_sticky: true
---

# Autoencoder vs Variational Autoencoder

## AE와 VAE 공통점

둘 다 Encoder, Decoder 구조를 가지며 encoder의 결과가 전체 모델에서 가장 크기가 작은 bottleneck이 된다.  
또한 학습과정에서 reconstruction loss를 사용한다는 점에서도 비슷하다.

## AE와 VAE 차이점

Autoencoder의 목적은 "x가 주어질 때 x가 생성된 분포를 추정하기"라고 했다.  
식으로 표현하면 $p(x\|x_{input})$ 를 찾는 inference 문제라고 할 수 있다.  
실제 응용시에는 encoder만을 이용해 feature extractor로써 쓰는 경우가 많다고 했다.

Variational Autoencoder는 최종 모델의 구조가 AE와 같기때문에 autoencoder라는 말이 붙었지만 기본인 등장 배경이 다르다.

* ### 목표

    기존의 AE는 reconstruction이 잘 되도록 하는 parameter를 찾는 network로써 $p(x|x)$를 모델링 했다면  
    VAE는 전체 dataset $X$가 생성된 분포 $p(x)$를 찾고자 한다.

* ### bottleneck의 의미

    기존의 AE는 원본 데이터의 핵심 정보들이 누락되지 않고 잘 압축 돼있다는 점에서만 bottleneck을 이해했다.  
    VAE에서는 encoder를 거친 결과를 통해 latent variable에 대한 distribution을 정의하고 여기서 sampling한 결과를 decoder로 넣어준다.

* ### decoder의 의미

    기존의 AE에서 bottleneck이 단순한 압축 이상의 의미를 갖지 못했으므로 decoder는 압축된 정보를 다시 풀어내는 용도에 불과했다.  
    그러나 VAE에서는 latent distribution이 주어지므로 sampling 결과에 따라 reconstruction된 결과가 달라질 것이다.  
    따라서 **VAE의 decoder는 generator로써 사용할 수 있다.**

# VAE 통계적 이해

* $p(x)$: 전체 datasetd이 $p(x)$에서 i.i.d. 조건으로 생성되었다고 가정한다. **이 분포를 추정하는 것이 우리의 목표**이다.  
(dataset의 distribution을 찾는다는건 generator를 학습했다는 의미와 같다.)
* $z$: 전체 distribution은 사실 $x$ 뿐만 아니라 latent variable $z$에도 관계있다고 가정한다.  
    latent variable은 $p(x)=\int p(x\|z)p(z)$ 식을 통해 최종적으론 사라지게 된다.
* $z\sim p(z)$: prior $p(z)$에서 뽑은 latent variable $z$에 의해 데이터가 생성되었다고 가정한다.
* $g_\theta(\cdot)$: latent variable $z$를 입력받으면 deterministic function $g$에 의해서 data generating distribution이 결정된다.

지금까지 정리한 내용을 바탕으로 생각해보면  

1. 알 수 없는 prior $p(z)$가 있고
2. 여기서 sampling된 $z$가 주어지면 data generating distribution $p(x\|z)$가 결정된다.
3. 이때 distribution은 parametrized function $g$을 통해 정의되므로 $p(x\|z)$ 또한 parametrized distribution이 된다.
$$p_\theta(x|z) := p(x|g_\theta(z)) \approx p(x|z)$$

## 그냥 MLE 사용하는건 어떨까?

여기까지의 내용만 본다면 계산하기 좋은 prior $p(z)$를 정의하고 decoder $g$만을 정의한 상태로 Maximum likelihood estimation을 통해 바로 학습할 수 있을 것 같다.
    $$max\ p(x)\approx max\ \sum_i p(x\|g_\theta(z_i))p(z_i)$$
그런데 위의 maximization 과정에는 문제가 존재한다.

보통 prior는 고정된 간단한 분포를 가정하므로 실제 optimization은 likelihood $p(x\|g_\theta(z_i))$에 대해서만 진행한다. 이때 likelihood의 꼴은 보통 Gaussian이나 Bernoulli로 정의하게 된다. 문제는 이 경우 pixel별 MSE, CrossEntropy를 사용하게 된다는 점이다. pixel-wise error를 사용할 시 실제 사람이 인식하는 결과와는 전혀 다른 loss를 낼 수 있다.

### MNIST 예시

실제 MNIST 데이터를 학습하는 경우를 예로 들어보자.

* $z\sim Uniform[0,1]$ : latent variable은 Uniform distribution에서 sampling한다.  
(사실 sampling 하기 좋은 간단한 분포면 다 상관은 없음)
* $p(x\|g_\theta(z_{bad})) > p(x\|g_\theta(z_{good}))$: 숫자의 일부가 지워진 결과가 나오는 $z_{bad}$와 숫자가 옆으로 1 pixel 이동한 결과를 만들어내는 $z_{good}$가 있다고 해보자. pixel-wise error의 결과는 $z_{bad}$의 확률이 더 높게 나올 수 있다.

$$p(z_{bad})\approx p(z_{good})\\
p(x|g_\theta(z_{bad})) > p(x|g_\theta(z_{good}))\\
\therefore p(x_{bad}) > p(x_{good})$$

위의 결과대로 sampling하기 좋은 prior를 적당히 잡고 MLE를 하면 pixel-wise error가 작을수록 더 좋은 결과라고 학습 될 것이고 우리가 원하는 결과를 얻기 힘들다. 이를 해결하기 위한 방법을 생각해보면

solution 1. pixel-wise error를 사용하지 않는다.  
    이 경우가 가장 좋기는 하지만 "의미적으로 유사한 이미지들"을 정의하는 방법 자체가 어렵다.  
solution2. 그냥 sampling 한 뒤 실제로 숫자가 제대로 출력된 결과만을 학습에 사용한다.  
    이 경우 $z_{good}$만을 통해 학습하므로 괜찮은 결과를 얻을 수 있다. 그러나 random sampling의 결과로 충분한 수의 $z_{good}$을 확보하려면 엄청나게 많은 수의 데이터를 생성하고 이를 분류해야한다는 문제가 생긴다.

## VAE의 Idea

위의 각 solution에 대한 연구도 존재하긴 하지만 VAE에서는 **$z_{good}$만을 최대한 뽑아서 학습하는 방법**을 사용한다. 그렇다면 $z_{good}$만 나올 확률이 높은 prior는 어떻게 정하면 좋을까?

* $p(z\|x)$를 알 수만 있으면 $x$가 나올 확률이 높은 $z$를 정확하게 알 수 있다.
* 그런데 $p(z\|x)$가 뭔지를 모르니까 이를 추정한다.  
(모르는 distribution을 추정하는 과정을 확률론에서 inference라고 한다.)
* $q_\phi(z\|x) \approx p(z\|x)$ 우리가 원하는 형태를 가진 parametrized distribution $q$를 정의하고 parameter $\phi$를 조절해가며 $p(z\|x)$와 최대한 비슷해지도록 학습한다.  
(이렇게 함수를 찾는 optimization을 variational inference라 한다.)
* $q, p$ 사이의 차이는 KL-divergence $KL[q(z\|x)\  \|\|\  p(z\|x)]$ 로 정의한다.
* Encoder $h(x)$의 output을 $q(z\|x)$의 parameter로 생각한다.  
    $q_\phi(z\|x) = q(z\|h_\phi(x))$

결론적으로 VAE의 구성을 살펴보면 아래와 같게 된다.

1. $p(z\|x) \approx q(z\|h_\phi(x))$ 가 되는 encoder $h_\phi(\cdot)$ 찾기
2. $z\sim q(z\|h_\phi(x))$ latent variable sample하기
3. $p(x) \approx \sum_i p(x\|g_\theta(z_i))p(z_i)$를 최대화 하는 decoder $g_\theta(\cdot)$ 찾기
