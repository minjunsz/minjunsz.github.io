"use strict";(self.webpackChunkminjunsz_github_io=self.webpackChunkminjunsz_github_io||[]).push([[592],{3905:(t,e,a)=>{a.d(e,{Zo:()=>g,kt:()=>d});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function s(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},o=Object.keys(t);for(n=0;n<o.length;n++)a=o[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)a=o[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var l=n.createContext({}),p=function(t){var e=n.useContext(l),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},g=function(t){var e=p(t.components);return n.createElement(l.Provider,{value:e},t.children)},c="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},u=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,o=t.originalType,l=t.parentName,g=s(t,["components","mdxType","originalType","parentName"]),c=p(a),u=r,d=c["".concat(l,".").concat(u)]||c[u]||m[u]||o;return a?n.createElement(d,i(i({ref:e},g),{},{components:a})):n.createElement(d,i({ref:e},g))}));function d(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=a.length,i=new Array(o);i[0]=u;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=t,s[c]="string"==typeof t?t:r,i[1]=s;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},8597:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const o={title:"[Design Pattern] Strategy",description:"Strategy pattern is a behavioral pattern that enables selecting an algorithm at runtime.",slug:"strategy-pattern",authors:["minjun"],tags:["python","design-pattern","behavioral-pattern"],hide_table_of_contents:!1},i=void 0,s={permalink:"/programming/strategy-pattern",source:"@site/programming/2023-01-11-strategy-pattern.md",title:"[Design Pattern] Strategy",description:"Strategy pattern is a behavioral pattern that enables selecting an algorithm at runtime.",date:"2023-01-11T00:00:00.000Z",formattedDate:"January 11, 2023",tags:[{label:"python",permalink:"/programming/tags/python"},{label:"design-pattern",permalink:"/programming/tags/design-pattern"},{label:"behavioral-pattern",permalink:"/programming/tags/behavioral-pattern"}],readingTime:3.24,hasTruncateMarker:!0,authors:[{name:"Minjun Park",url:"https://github.com/minjunsz",imageURL:"https://github.com/minjunsz.png",key:"minjun"}],frontMatter:{title:"[Design Pattern] Strategy",description:"Strategy pattern is a behavioral pattern that enables selecting an algorithm at runtime.",slug:"strategy-pattern",authors:["minjun"],tags:["python","design-pattern","behavioral-pattern"],hide_table_of_contents:!1},nextItem:{title:"[Design Pattern] Factory Method",permalink:"/programming/factory-method-pattern"}},l={authorsImageUrls:[void 0]},p=[{value:"What is Strategy Pattern?",id:"what-is-strategy-pattern",level:2},{value:"Why do we Need Strategy Pattern?",id:"why-do-we-need-strategy-pattern",level:2},{value:"Python Examples",id:"python-examples",level:2},{value:"Strategy Pattern using Abstract Base Class",id:"strategy-pattern-using-abstract-base-class",level:3},{value:"Strategy Pattern using Protocol",id:"strategy-pattern-using-protocol",level:3},{value:"Functional Programming",id:"functional-programming",level:3}],g={toc:p};function c(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},g,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The strategy pattern is a ",(0,r.kt)("strong",{parentName:"p"},"behavioral pattern")," that enables selecting an algorithm at runtime.\nThis post will demonstrate a classical OOP pattern and a more pythonic/functional strategy pattern."),(0,r.kt)("h2",{id:"what-is-strategy-pattern"},"What is Strategy Pattern?"),(0,r.kt)("p",null,"The strategy pattern is a behavioral design pattern that defines a family of algorithms and lets a program select one of them at runtime.\nFollowing is a high-level overview of the patterns:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Declare an interface which defines a group of algorithms. This family is called ",(0,r.kt)("em",{parentName:"li"},"Strategy"),"."),(0,r.kt)("li",{parentName:"ol"},"Implement concrete strategies following the interface above.")),(0,r.kt)("h2",{id:"why-do-we-need-strategy-pattern"},"Why do we Need Strategy Pattern?"),(0,r.kt)("p",null,"The strategy pattern is devised to handle a few problems sharing same context by differing algorithms."),(0,r.kt)("p",null,"Let's assume you are trying to develop a navigation program. You already implemented most features such as retrieving current location, display the map, etc. Now, you need to implement the routing algorithm for the navigation. However, user can drive, take a bus, or walk. Therefore, you have to prepare a few routing algorithms and apply one of them at runtime."),(0,r.kt)("p",null,"In this case, you might want to declare a strategy ",(0,r.kt)("em",{parentName:"p"},'"Routing"')," and implement concrete strategies such as ",(0,r.kt)("em",{parentName:"p"},'"CarRouting", "BusRouting", "WalkRouting."')," Then, your navigation application works with whichever routing algorithm you choose."),(0,r.kt)("h2",{id:"python-examples"},"Python Examples"),(0,r.kt)("p",null,"In this section, I will implement a few sorting algorithms."),(0,r.kt)("h3",{id:"strategy-pattern-using-abstract-base-class"},"Strategy Pattern using Abstract Base Class"),(0,r.kt)("p",null,"This is the basic implementation of the strategy pattern. I declared a abstract interface ",(0,r.kt)("inlineCode",{parentName:"p"},"SortStrategy")," and implemented it using bubble sort and heap sort. Thanks to the strategy interface, the ",(0,r.kt)("inlineCode",{parentName:"p"},"main()")," function does not depend on the concrete algorithm implementation. I can easily swap the sort algorithm by simply modifying the code for instantiating the strategy. Determining the strategy at runtime is straightforward."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'from abc import ABC, abstractmethod\n\nclass SortStrategy(ABC):\n    @abstractmethod\n    def sort_list(data: list[float]) -> list[float]:\n        """Return a sorted list of the given data."""\n\nclass BubbleSort(SortStrategy):\n    def sort_list(data: list[float]) -> list[float]:\n        ...\n\nclass HeapSort(SortStrategy):\n    def sort_list(data: list[float]) -> list[float]:\n        ...\n\ndef main() -> None:\n    # processing data\n    data = ...\n\n    # Instantiate a strategy\n    sort_strategy: SortStrategy\n    sort_strategy = BubbleSort()\n    # sort_strategy = HeapSort()\n\n    sorted = sort_strategy.sort_list(data)\n')),(0,r.kt)("h3",{id:"strategy-pattern-using-protocol"},"Strategy Pattern using Protocol"),(0,r.kt)("p",null,"If the strategies do not utilize any benefits from the inheritance, using ",(0,r.kt)("inlineCode",{parentName:"p"},"typing.Protocol")," can be a better choice. By doing so, we can implement less coupled strategies. Most codes stay the same."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'from typing import Protocol\n\nclass SortStrategy(Protocol):\n    def sort_list(data: list[float]) -> list[float]:\n        """Return a sorted list of the given data."""\n\nclass BubbleSort:\n    def sort_list(data: list[float]) -> list[float]:\n        ...\n\nclass HeapSort:\n    def sort_list(data: list[float]) -> list[float]:\n        ...\n\ndef main() -> None:\n    # processing data\n    data = ...\n\n    # Instantiate a strategy\n    sort_strategy: SortStrategy\n    sort_strategy = BubbleSort()\n\n    sorted = sort_strategy.sort_list(data)\n')),(0,r.kt)("h3",{id:"functional-programming"},"Functional Programming"),(0,r.kt)("p",null,"Python provides a high level type ",(0,r.kt)("inlineCode",{parentName:"p"},"Callable"),". This includes not only functions but also any objects with ",(0,r.kt)("inlineCode",{parentName:"p"},"__call__()")," method. By declaring the strategy interface as a ",(0,r.kt)("inlineCode",{parentName:"p"},"Callable"),", you can utilize python's flexible type system. It is important to note that using ",(0,r.kt)("inlineCode",{parentName:"p"},"Protocol")," is still a valid approach if the strategy interface requires multiple functions."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'from dataclasses import dataclass\nfrom typing import Callable\n\n# define a type for strategies\nSortStategy = Callable[[list[float]], list[float]]\n\ndef bubble_sort(data: list[float]) -> list[float]:\n    """implement bubble sort"""\n\n@dataclass\nclass SpecialSortAlgo:\n    algo_param1: int = 10\n    algo_param2: float = 0.5\n\n    def __call__(data: list[float]) -> list[float]:\n        """implement sort algorithm with given parameters"""\n\ndef main() -> None:\n    # processing data\n    data = ...\n\n    # Instantiate a strategy\n    sort_strategy: SortStrategy\n    # sort_strategy = bubble_sort\n    sort_strategy = SpecialSortAlgo(algo_param1=15, algo_param2=0.3)\n\n    sorted = sort_strategy(data)\n')),(0,r.kt)("p",null,"Since any ",(0,r.kt)("inlineCode",{parentName:"p"},"Callable")," with appropriate types can be a strategy, I can use both function and class. Functions are preferred when the implementation does not requires hyper-parameters. On the other hand, callable classes can provide more flexible algorithms because it can store hyper-parameters as its member variable. As you can see in the code above, it is more convenient to use ",(0,r.kt)("inlineCode",{parentName:"p"},"dataclasses.dataclass")," for implementing the callable class."))}c.isMDXComponent=!0}}]);