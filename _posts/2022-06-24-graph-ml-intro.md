---
title: "Graph 특징과 Message Passing"
categories:
  - Machine Learning
tags:
  - Geometric Deep Learning
  - Graph ML
  - Representation Learning
mathjax: true
toc: true
toc_label: "Graph Neural Network"
toc_sticky: true
---
# Basics of Graph Neural Network

## Graph data의 특징

1. 정해진 size, shape이 없다.  
    이미지의 경우 128\*128\*3 과 같이 정해진 형태가 존재했다면 그래프는 같은 domain에서 나온 데이터여도 Node개수, Edge개수, 연결 관계등이 모두 다르므로 다루기 힘들다.
2. Graph Isomorphism  
    일반적인 feed forward network 같은 경우 input vector의 값 순서를 바꾸는 permutation을 할 경우 결과가 바뀐다. 그러나 그래프의 경우 Node 순서를 바꾸면 동일한 그래프여도 adjacency matrix가 바뀌게 된다. 이런 permutation invariant한 성질 때문에 일반적은 neural net으로 다룰 수 없다.
3. No strict structure  
    이미지의 경우 pixel과 pixel 사이에 Euclidean distance가 정의되는 명확한 grid structure를 갖고 있다. 그러나 그래프의 경우 **연결 관계**가 중요한 것이지 절대적 거리는 명확하게 정의되지 않는다.

    이렇게 거리 대신 연결 관계를 중심으로 정의되는 것들을 Geometric Object라 부르므로 graph machine learning을 geometric deep learning이라고 부르기도 한다.

## Graph Neural Network(GNN)의 핵심 idea

위에서 말한바와 같이 Node, Edge feature만으로는 기존의 neural net을 잘 활용할 수 없다. 이를 해결하기 위해 GNN은 그래프의 성질을 잘 반영하는 적당한 중간결과를 만들어내서 다음단계의 neural net에 적용시킬 수 있도록 한다.

따라서 Graph Nuerl Net은 기본적으로 graph data에 대한 **Representation Learning**이다.  
이렇게 학습된 representation을 embedding이라 부르며 크게 `"Node Level Embedding"`, `"Edge Level Embedding"`, `"Graph Level Embedding"` 등이 있다.

## Message Passing Layer (Graph Convolution Layer)

그래프 연결 관계에 대한 정보를 반영하기 위한 다양한 접근 방법이 있지만 가장 대표적인 방식은 Spatial-based approach인 Message Passing Neural Net을 사용한다. Image 상에서 convolution이 인접 픽셀들의 정보를 하나로 모으는 과정이었듯이 인접 Node들의 정보를 모아 하나의 정보로 만드는 과정이다.

좀 더 엄밀하게는 아래의 세 과정을 거친다.

- Transform  
    각 Node별 input embedding을 latent vector로 변환한다.  
    가장 간단한 방법으로는 `nn.Linear`를 이용하는 방법이 있다.
- Aggregate  
    인접한 Node들의 transformed embedding을 모아온다. 이 과정 때문에 messasge passing이란 이름이 붙게 됐다.  
    이때, graph의 permutation invariant한 성질을 반영할 수 있는 aggregate fuction을 사용해야한다. 대표적으로는 Mean, Max aggregator가 있다.
- Update  
    원래 자신의 값과, neighbor에게서 전달받은 message를 합쳐서 output embedding을 만든다.

    output embedding에 포함돼있는 정보는 **자기 자신 + 1 hop neighbor**  라고 볼 수 있다. Message passing을 많이 할수록 더 멀리있는 node의 정보까지 포함하게 된다고 볼 수 있다. 그러나 MP layer를 너무 많이 하면 모든 node들의 embedding이 다 비슷해지는 **Over smoothing**이 발생할 수 있다.

Message Passing을 수식으로 적으면
$$
h^{(k+1)}_u = UPDATE^{(k)} \Big(h^{(k)}_u,AGGREGATE^{(K)}(\{ h^{(k)}_v, \forall v \in \mathcal N(u) \})\Big)
$$

이때 우리가 사용하는 gradient based optimizer를 사용하려면 UPDATE, AGGREGATE 함수가 모두 differentiable해야한다. 이 함수들을 변형시키는게 가장 대표적인 GNN variant들을 만드는 방법이다.

- Update
  - Mean
  - Max
  - Neural Network
  - Recurrent NN
- Aggregate
  - Mean
  - Max
  - Normalized Sum
  - Neural Network
