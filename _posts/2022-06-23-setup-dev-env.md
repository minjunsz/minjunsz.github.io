---
title: "개발환경 설정 (WSL, docker, VSCode, Anaconda)"
categories:
  - Machine Learning
tags:
  - Setup
  - WSLg
  - docker
toc: true
toc_label: "ML Dev Env"
toc_sticky: true
---

# 개발환경 설정

새로운 개발환경 설정시 필요할법한 내용들을 위주로 정리해두고자 한다.  

## 기본 설치 링크

1. [WSLg 설치](https://github.com/microsoft/wslg)
2. [VSCode 설치](https://code.visualstudio.com/download)
3. [D2Coding font](https://github.com/naver/d2codingfont)  
  ligature 버전을 선택해 설치
4. [Docker desktop](https://www.docker.com/products/docker-desktop/)
5. [git](https://git-scm.com/)

## Devcontainer 환경 설정

기본적인 구조는 `Windows > WSL > Docker` 의 형태로 설치되어 있다. 기본적인 환경 설정은 WSL 내에서 이루어지며, 대부분의 개발환경은 docker container상에서 진행된다.

실제로는 `windows용 VSCode`, `WSL용 VSCode`, `Container용 VSCode`가 모두 별도로 설치된 형태이며  우리는 `Windows에 설치한 VSCode`를 통해 `WSL VSCode`나 `Container VSCode`에 원격으로 접속하게 된다. 이를 위해서 `Windows VSCode`에는 아래의 두 extension을 설치해야한다.

- Remote - Containers
- Remote - WSL

WSL상의 한 폴더를(*/path/to/dir/\<directory name\>*) container상의 폴더(*/workspaces/\<directory name\>*)와 마운트시켜 사용한다.

나같은 경우 *~/codes/python* 폴더를 만들어 사용한다. python 외에 독립된 개발환경이 필요한 경우 마찬가지로 *~/codes/webdev*, *~/codes/golang* 등의 위치에 새로운 devcontainer를 만들어 사용한다.

### devcontainer 생성

1. WSL VSCode에 접속한 후, devcontainer와 마운트 할 폴더에 들어간다. (*~/codes/python*)
2. 해당 폴더내에 '.devcontainer'라는 이름의 디렉토리를 만든다. (*~/codes/python/.devcontainer*)
3. F1을 누른뒤 `Remote-Containers: Add Development Container Configuration Files...` 선택
4. 원하는 container를 선택한다.

위의 단계까지 완료하면 '.devcontainer' 내에 Dockerfile과 devcontainer.json 파일 등이 생긴다. 일반적으론 이 상태에서 `Remote-Containers: Open Folder in Container` 를 하면 devcontainer 설정이 시작되고 완성된 개발 환경이 시작된다.

### GUI 활성화

최신버전 WSL을 설치했다면 자연스럽게 GUI가 활성화 돼있는 WSLg를 설치하게 된다. WSLg는 Wayland 기반 GUI를 제공하는데, 관련 소켓을 container 내에서도 동일하게 접근할 수 있게 해주어야한다.

- GUI 관련 소켓을 container 내에서도 접근할 수 있도록 mount하기
- display 관련 환경변수 동일하게 구성하기

**이 과정을 해주지 않으면 대표적으로 plt.show()와 같은 명령어에서 오류가 난다.**

위의 설정을 하기 위해서 devcontainer.json 파일 내에 아래와같은 설정을 추가해주면 된다.  
`"containerEnv"` 부분은 wsl 상에서 `echo $환경변수` 해보며 값이 맞는지 비교해보는 것이 좋다.

<script src="https://gist.github.com/minjunsz/31c9f77a406820cef44aef292e618703.js"></script>

## Anaconda 환경 준비

가장 기본적인 conda 환경 설정 명령어를 첨부한다.

```bash
conda update -n base -c defaults conda # upgrade anaconda

conda create --name ENV_NAME python=3.6 #create virtual env
conda info --envs # list envs
conda activate ENV_NAME # activate env

# install packages & show installed packages
conda install PACKAGE_NAME
conda list
```

## 기타 작업

- .pylintrc 수정
  vscode 상에서 pylint를 사용하게 되면 torch 내의 모듈을 제대로 인식하지 못한다.  
  이를 해결하기 위해 .pylintrc 파일 내에 `generated-members=numpy.*,torch.*`를 추가해준다.
- Windows terminal setting.json 수정
  [이전 설정](https://gist.github.com/minjunsz/676673c1e6d5de6e7303ec3d90495ef9) 참고  
  - default profile 설정
  - font 설정
  - color scheme 및 starting directory 설정
- zsh, oh-my-zsh 설치
