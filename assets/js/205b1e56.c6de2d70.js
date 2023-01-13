"use strict";(self.webpackChunkminjunsz_github_io=self.webpackChunkminjunsz_github_io||[]).push([[270],{3905:(e,t,n)=>{n.d(t,{Zo:()=>g,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),i=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},g=function(e){var t=i(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,g=c(e,["components","mdxType","originalType","parentName"]),p=i(n),u=a,m=p["".concat(l,".").concat(u)]||p[u]||d[u]||o;return n?r.createElement(m,s(s({ref:t},g),{},{components:n})):r.createElement(m,s({ref:t},g))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[p]="string"==typeof e?e:a,s[1]=c;for(var i=2;i<o;i++)s[i]=n[i];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2526:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>i});var r=n(7462),a=(n(7294),n(3905));const o={title:"[Design Pattern] Factory Method",description:"Factory method is a creational pattern which gives an interface for creating subclasses.",slug:"factory-method-pattern",authors:["minjun"],tags:["python","design-pattern","creational-pattern"],hide_table_of_contents:!1},s=void 0,c={permalink:"/programming/factory-method-pattern",source:"@site/programming/2023-01-09-factory-pattern.mdx",title:"[Design Pattern] Factory Method",description:"Factory method is a creational pattern which gives an interface for creating subclasses.",date:"2023-01-09T00:00:00.000Z",formattedDate:"January 9, 2023",tags:[{label:"python",permalink:"/programming/tags/python"},{label:"design-pattern",permalink:"/programming/tags/design-pattern"},{label:"creational-pattern",permalink:"/programming/tags/creational-pattern"}],readingTime:3.29,hasTruncateMarker:!0,authors:[{name:"Minjun Park",url:"https://github.com/minjunsz",imageURL:"https://github.com/minjunsz.png",key:"minjun"}],frontMatter:{title:"[Design Pattern] Factory Method",description:"Factory method is a creational pattern which gives an interface for creating subclasses.",slug:"factory-method-pattern",authors:["minjun"],tags:["python","design-pattern","creational-pattern"],hide_table_of_contents:!1},prevItem:{title:"[Design Pattern] Strategy",permalink:"/programming/strategy-pattern"}},l={authorsImageUrls:[void 0]},i=[{value:"What is Factory Method Pattern?",id:"what-is-factory-method-pattern",level:2},{value:"Why do we Need Factory Pattern?",id:"why-do-we-need-factory-pattern",level:2},{value:"Python Examples",id:"python-examples",level:2},{value:"Original Code",id:"original-code",level:3},{value:"Factory Pattern using Superclass",id:"factory-pattern-using-superclass",level:3},{value:"Factory Pattern using Protocol",id:"factory-pattern-using-protocol",level:3},{value:"Class Diagram",id:"class-diagram",level:2}],g={toc:i};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The factory method is a ",(0,a.kt)("strong",{parentName:"p"},"creational pattern")," which gives an interface for creating subclasses.\nThis post will demonstrate a classical OOP pattern and a more pythonic factory pattern."),(0,a.kt)("h2",{id:"what-is-factory-method-pattern"},"What is Factory Method Pattern?"),(0,a.kt)("p",null,"Factory method pattern is a creational design pattern that provides a high-level interface for creating a superclass object\nbut allows subclasses to alter the type of objects created. Following is a high-level overview of the patterns:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Define a superclass/interface of the subclasses."),(0,a.kt)("li",{parentName:"ol"},"Define an abstract method for creating a superclass object."),(0,a.kt)("li",{parentName:"ol"},"Each subclass implements the creation method above."),(0,a.kt)("li",{parentName:"ol"},"Program can alter the subclass object by altering the factory method.")),(0,a.kt)("h2",{id:"why-do-we-need-factory-pattern"},"Why do we Need Factory Pattern?"),(0,a.kt)("p",null,"Suppose we want to change the structure of a class. If we add a member variable, we will likely add an additional argument for the ",(0,a.kt)("inlineCode",{parentName:"p"},"__init__()")," function.\nIn most cases, ",(0,a.kt)("strong",{parentName:"p"},"the creation process of an object is tightly coupled with the structure of the class"),".\nThis means that your program should depend on the concrete implementation, although you programmed based on an abstract interface.\nTherefore, you want to separate the use from the creation."),(0,a.kt)("h2",{id:"python-examples"},"Python Examples"),(0,a.kt)("h3",{id:"original-code"},"Original Code"),(0,a.kt)("p",null,"The example is code for logging a scalar value.\nUsers can select which logger to use between 'tensorboard' and 'wandb'.\nIn the original code, I introduced an abstract superclass ",(0,a.kt)("inlineCode",{parentName:"p"},"Logger."),"\nHowever, the ",(0,a.kt)("inlineCode",{parentName:"p"},"main()")," function is still coupled with two concrete classes, ",(0,a.kt)("inlineCode",{parentName:"p"},"TensorboardLogger")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"WandbLogger"),", in the conditional branches."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from abc import ABC, abstractmethod\n\nclass Logger(ABC):\n    @abstractmethod\n    def log_scalar(self, value: float) -> None:\n        ...\n\nclass TensorboardLogger(Logger):\n    ...\n\nclass WandbLogger(Logger):\n    ...\n\ndef main() -> None:\n    # select logger type\n    logger_name = input("Enter logger type (tensorboard, wandb)")\n\n    # initialize logger\n    logger: Logger\n    if logger_name == "tensorboard":\n        logger = TensorboardLogger()\n    elif logger_name == "wandb":\n        logger = WandbLogger()\n    else\n        raise ValueError\n\n    # log experiments\n    logger.log_scalar(0.5)\n')),(0,a.kt)("h3",{id:"factory-pattern-using-superclass"},"Factory Pattern using Superclass"),(0,a.kt)("p",null,"Let's define a corresponding factory interface and implement concrete factory classes for each logger.\nIn this implementation, ",(0,a.kt)("inlineCode",{parentName:"p"},"main()")," function is unaware of how to create concrete classes.\nIt relies on abstract interfaces for both use and creation."),(0,a.kt)("p",null,"If you want to change the structure of a logger, it is enough to change the creation logic in its factory without modifying the ",(0,a.kt)("inlineCode",{parentName:"p"},"main()")," function."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'class LoggerFactory(ABC):\n    @abstractmethod\n    def get_logger(self) -> Logger:\n        ...\n\nclass TensorboardLoggerFactory(ABC)\n    def get_logger(self) -> Logger:\n        return TensorboardLogger()\n\nclass WandbLoggerFactory(ABC):\n    def get_logger(self) -> Logger:\n        return WandbLogger()\n\ndef read_logger() -> LoggerFactory\n    factories = {\n        "tensorboard": TensorboardLoggerFactory(),\n        "wandb": WandbLoggerFactory()\n    }\n\n    # select logger type\n    logger_name = input("Enter logger type (tensorboard, wandb)")\n\n    if logger_name in factories:\n        return factories[logger_name]\n    raise Exception("Unknown logger type")\n\ndef main() -> None:\n    fac = read_logger()\n    logger = fac.get_logger()\n    logger.log_scalar(0.5)\n')),(0,a.kt)("h3",{id:"factory-pattern-using-protocol"},"Factory Pattern using Protocol"),(0,a.kt)("p",null,"Inheriting abstract classes introduces additional complexity, which comes from the class hierarchy.\nIf the subclass does not reuse the parent's code and does not require a strict class hierarchy, it is preferable to use 'duck typing' rather than an abstract base class.\nHowever, the factory pattern relies on abstract base classes because classical programming languages do not support 'duck typing.'\nPython provides the ",(0,a.kt)("inlineCode",{parentName:"p"},"typing.Protocol")," class for duck typing, so we can rewrite the code as follows."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from typing import Protocol\n\nclass Logger(Protocol):\n    def log_scalar(self, value: float) -> None:\n        ...\n\nclass TensorboardLogger:\n    def log_scalar(self, value: float) -> None:\n        ...\n\nclass WandbLogger:\n    def log_scalar(self, value: float) -> None:\n        ...\n\nFACTORIES: dict[str, type[Logger]] = {\n    "tensorboard": TensorboardLogger,\n    "wandb": WandbLogger\n}\n\ndef read_logger() -> Logger\n    while True:\n        # select logger type\n        logger_name = input("Enter logger type (tensorboard, wandb)")\n        try:\n            logger_class = factories[logger_name]\n            return logger_class()\n        except KeyError:\n            print("Unknown logger type.")\n\ndef main() -> None:\n    logger = read_logger()\n\n    # log experiments\n    logger.log_scalar(0.5)\n')),(0,a.kt)("h2",{id:"class-diagram"},"Class Diagram"),(0,a.kt)("mermaid",{value:"classDiagram\n    class Product\n    <<interface>> Product\n    Product : +doStuff()\n    \n    class ProductFactory\n    <<interface>> ProductFactory\n    ProductFactory : +createProduct() Product\n    Product <.. ProductFactory\n\n    Product <|.. Product_A\n    Product_A : +doStuff()\n    Product <|.. Product_B\n    Product_B : +doStuff()\n\n    ProductFactory <|.. ProductFactory_A\n    ProductFactory_A : +createProduct() Product\n    ProductFactory <|.. ProductFactory_B\n    ProductFactory_B : +createProduct() Product"}))}p.isMDXComponent=!0}}]);