---
title: "ML Model의 통계적 이해"
categories:
  - Machine Learning
tags:
  - Statistical interpretation
  - Loss function
mathjax: true
toc: true
toc_label: "ML Model의 통계적 이해"
toc_sticky: true
---
# Classic Machine Learning
ML model을 deterministic한 프로그램의 관점에서 단순하게 생각한다.   

| Component    | 해석                                                                      |
|:-------------|:-------------------------------------------------------------------------:|
| Model        | input x가 주어질때 deterministic하게 값을 만환하는 함수 $f_\theta(\cdot)$ |
| Loss         | 정답 y와 우리 함수의 리턴값 $f_\theta(x)$ 의 차이                         |
| 목표         | 주어진 dataset $D={(x_1, y_1),...,(x_N, y_N)}$ 을 잘 설명하는 model 찾기  |
| Optimization | output $f_\theta(x)$가 label y와 같아지도록 학습한다.                     | 

# Statistical Interpretation

## 용어 정리
Bayes' Theorem에서 prior / posterior / likelihood 라는 용어를 사용하고 이것이 ML의 기초가 된다.   
Bayes' Theorem을 수식으로 표현하면 $P(A|B)\propto P(B|A) \cdot P(A)$ 라고 쓰는데 여기서 각 용어를 정리해보면

| 용어 | 개념 | Machine Learning 관점 |
|-|-|-|
| A | 알고싶은 변수 | model parameter $w$ |
| B | 실제로 관측할 수 있는 변수 | 데이터 $D$ |
| prior | 관측하기 전 A에 대해 추측하는 분포 $P(A)$| $P(w)$ |
| posterior | B라는 관측을 한 후 A를 추측하는 분포 $P(A\|B)$ | $P(w\|D)$ |
| likelihood | 구하고자 하는 대상 A가 정해졌을때 우리의 관측값을 얻을 확률 $P(B\|A)$ | $P(D\|w)$ |

<span />



## Likelihood Maximize 관점에서 Loss 정의

0. 우리의 목표는 **input X에 대해 결과 Y가 뭐가 될 것인가?** 라는 질문에 답하는 것이므로 conditional probability $P(Y\|X)$를 찾고자 한다.
1. Conditional probability를 근사하기 위해 parametrized distribution $P(Y\|paramter\ w)$를 우리가 원하는 함수 형태로 정의한다.
2. ML model의 output은 확률 분포에 사용될 parameter라고 생각한다.   
   그 결과 생성된 분포는 $P(Y\|w=f_\theta(X))$ 이 되고, 이것을 0번에서 언급한 conditional probability라고 생각한다.
3. $sample_i=(x_i, y_i)$에 대해서 생각해보면   
   input이 $x_i$일 때 y값에 대한 확률 분포는 $P(Y\|f_\theta(x_i))$가 되고   
   실제로 sample i와 같은 결과를 얻을 확률은 $P(Y=y_i\|f_\theta(x_i))$ 가 된다.   
   Notation의 편의를 위해 $P(Y=y_i\|f_\theta(x_i)) = p(y_i\|f_\theta(x_i))$ 라고 쓴다.   
   알고싶은 변수 $\theta$가 주어졌을 때 관측값 $y_i$에 대한 확률이므로 likelihood라고 볼 수 있다.
4. 개별 sample에 대한 likelihood가 결정됐다면 전체 sample에 대한 확률도 생각해볼 수 있다.   
   i.i.d. 조건 하에서 전체 likelihood는 개별 likelihood의 곱으로 표현된다.   
   $$p(Y|\theta, X) = \prod_i p(y_i|f_\theta(x_i))$$
5. 우리의 목표는 이 likelihood를 maximize하는 건데 loss function은 곱이 아니라 합으로 표현돼야 하고 minimize하는 형태로 정의되야하므로 negative log likelihood(NLL)를 minimize한다.
$$
\begin{align*}
\max_\theta \prod_i p(y_i|f_\theta(x_i))
&\iff \max_\theta \sum_i \log p(y_i|f_\theta(x_i)) \\
&\iff \min_\theta \sum_i -\log p(y_i|f_\theta(x_i))
\end{align*}
$$

그럼 1번에서 정의한 Noise distribution이 어떤 형태인지에 따라서 loss function이 다르게 된다.
- Gaussian Distribution을 선택한 경우 -> Mean Squared Error가 된다. [Link 참조](https://towardsdatascience.com/where-does-mean-squared-error-mse-come-from-2002bbbd7806)
- Multinomial Distribution을 선택한 경우 -> Cross Entropy가 된다. [Link 참조](https://towardsdatascience.com/a-quick-guide-to-cross-entropy-loss-function-8f3410ec6ab1)


---
### Backpropagation 가정
1. $total\ loss = \sum_i (sample_i\ loss)$   
2. Loss function을 정의할 때 model의 output값만을 사용한다.   
  (model의 중간에 등장하는 값을 loss function에 사용할 수 없다.)

이런 가정을 만족하는 loss function중 위에서 설명한 Statistical interpretation을 적용할 수 있는 loss를 만드는 것이 매우 어려우므로 대부분 MSE, CrossEntropy 만을 loss로 사용한다.
