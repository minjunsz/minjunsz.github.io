"use strict";(self.webpackChunkminjunsz_github_io=self.webpackChunkminjunsz_github_io||[]).push([[613],{1670:t=>{t.exports=JSON.parse('{"blogPosts":[{"id":"strategy-pattern","metadata":{"permalink":"/programming/strategy-pattern","source":"@site/programming/2023-01-11-strategy-pattern.mdx","title":"[Design Pattern] Strategy","description":"Strategy pattern is a behavioral pattern that enables selecting an algorithm at runtime.","date":"2023-01-11T00:00:00.000Z","formattedDate":"January 11, 2023","tags":[{"label":"python","permalink":"/programming/tags/python"},{"label":"design-pattern","permalink":"/programming/tags/design-pattern"},{"label":"behavioral-pattern","permalink":"/programming/tags/behavioral-pattern"}],"readingTime":3.26,"hasTruncateMarker":true,"authors":[{"name":"Minjun Park","url":"https://github.com/minjunsz","imageURL":"https://github.com/minjunsz.png","key":"minjun"}],"frontMatter":{"title":"[Design Pattern] Strategy","description":"Strategy pattern is a behavioral pattern that enables selecting an algorithm at runtime.","slug":"strategy-pattern","authors":["minjun"],"tags":["python","design-pattern","behavioral-pattern"],"hide_table_of_contents":false},"nextItem":{"title":"[Design Pattern] Factory Method","permalink":"/programming/factory-method-pattern"}},"content":"import Highlighter from \'@site/src/components/Highlighter\';\\r\\n\\r\\n\\r\\nThe strategy pattern is a **behavioral pattern** that enables selecting an algorithm at runtime.\\r\\nThis post will demonstrate a classical OOP pattern and a more pythonic/functional strategy pattern.\\r\\n\\r\\n\x3c!--truncate--\x3e\\r\\n\\r\\n## What is Strategy Pattern?\\r\\n\\r\\nThe strategy pattern is a behavioral design pattern that defines a family of algorithms and lets a program select one of them at runtime.\\r\\nFollowing is a high-level overview of the patterns:\\r\\n\\r\\n1. Declare an interface which defines a group of algorithms. This family is called *Strategy*.\\r\\n2. Implement concrete strategies following the interface above.\\r\\n\\r\\n## Why do we Need Strategy Pattern?\\r\\n\\r\\nThe strategy pattern is devised to handle a few problems sharing same context by differing algorithms.\\r\\n\\r\\nLet\'s assume you are trying to develop a navigation program. You already implemented most features such as retrieving current location, display the map, etc. Now, you need to implement the routing algorithm for the navigation. However, user can drive, take a bus, or walk. Therefore, you have to prepare a few routing algorithms and apply one of them at runtime.\\r\\n\\r\\nIn this case, you might want to declare a strategy *\\"Routing\\"* and implement concrete strategies such as *\\"CarRouting\\", \\"BusRouting\\", \\"WalkRouting.\\"* Then, your navigation application works with whichever routing algorithm you choose.\\r\\n\\r\\n## Python Examples\\r\\n\\r\\nIn this section, I will implement a few sorting algorithms.\\r\\n\\r\\n### Strategy Pattern using Abstract Base Class\\r\\n\\r\\nThis is the basic implementation of the strategy pattern. I declared a abstract interface `SortStrategy` and implemented it using bubble sort and heap sort. Thanks to the strategy interface, the `main()` function does not depend on the concrete algorithm implementation. I can easily swap the sort algorithm by simply modifying the code for instantiating the strategy. Determining the strategy at runtime is straightforward.\\r\\n\\r\\n```python\\r\\nfrom abc import ABC, abstractmethod\\r\\n\\r\\nclass SortStrategy(ABC):\\r\\n\\t@abstractmethod\\r\\n\\tdef sort_list(data: list[float]) -> list[float]:\\r\\n\\t\\t\\"\\"\\"Return a sorted list of the given data.\\"\\"\\"\\r\\n\\r\\nclass BubbleSort(SortStrategy):\\r\\n\\tdef sort_list(data: list[float]) -> list[float]:\\r\\n\\t\\t...\\r\\n\\r\\nclass HeapSort(SortStrategy):\\r\\n\\tdef sort_list(data: list[float]) -> list[float]:\\r\\n\\t\\t...\\r\\n\\r\\ndef main() -> None:\\r\\n\\t# processing data\\r\\n\\tdata = ...\\r\\n\\r\\n\\t# Instantiate a strategy\\r\\n\\tsort_strategy: SortStrategy\\r\\n\\tsort_strategy = BubbleSort()\\r\\n    # sort_strategy = HeapSort()\\r\\n\\r\\n\\tsorted = sort_strategy.sort_list(data)\\r\\n```\\r\\n\\r\\n### Strategy Pattern using Protocol\\r\\n\\r\\nIf the strategies do not utilize any benefits from the inheritance, using `typing.Protocol` can be a better choice. By doing so, we can implement less coupled strategies. Most codes stay the same.\\r\\n\\r\\n```python\\r\\nfrom typing import Protocol\\r\\n\\r\\nclass SortStrategy(Protocol):\\r\\n\\tdef sort_list(data: list[float]) -> list[float]:\\r\\n\\t\\t\\"\\"\\"Return a sorted list of the given data.\\"\\"\\"\\r\\n\\r\\nclass BubbleSort:\\r\\n\\tdef sort_list(data: list[float]) -> list[float]:\\r\\n\\t\\t...\\r\\n\\r\\nclass HeapSort:\\r\\n\\tdef sort_list(data: list[float]) -> list[float]:\\r\\n\\t\\t...\\r\\n\\r\\ndef main() -> None:\\r\\n\\t# processing data\\r\\n\\tdata = ...\\r\\n\\r\\n\\t# Instantiate a strategy\\r\\n\\tsort_strategy: SortStrategy\\r\\n\\tsort_strategy = BubbleSort()\\r\\n\\r\\n\\tsorted = sort_strategy.sort_list(data)\\r\\n```\\r\\n\\r\\n### Functional Programming\\r\\n\\r\\nPython provides a high level type `Callable`. This includes not only functions but also any objects with `__call__()` method. By declaring the strategy interface as a `Callable`, you can utilize python\'s flexible type system. It is important to note that using `Protocol` is still a valid approach if the strategy interface requires multiple functions.\\r\\n\\r\\n```python\\r\\nfrom dataclasses import dataclass\\r\\nfrom typing import Callable\\r\\n\\r\\n# define a type for strategies\\r\\nSortStategy = Callable[[list[float]], list[float]]\\r\\n\\r\\ndef bubble_sort(data: list[float]) -> list[float]:\\r\\n\\t\\"\\"\\"implement bubble sort\\"\\"\\"\\r\\n\\r\\n@dataclass\\r\\nclass SpecialSortAlgo:\\r\\n\\talgo_param1: int = 10\\r\\n\\talgo_param2: float = 0.5\\r\\n\\r\\n\\tdef __call__(data: list[float]) -> list[float]:\\r\\n\\t\\t\\"\\"\\"implement sort algorithm with given parameters\\"\\"\\"\\r\\n\\r\\ndef main() -> None:\\r\\n\\t# processing data\\r\\n\\tdata = ...\\r\\n\\r\\n\\t# Instantiate a strategy\\r\\n\\tsort_strategy: SortStrategy\\r\\n\\t# sort_strategy = bubble_sort\\r\\n\\tsort_strategy = SpecialSortAlgo(algo_param1=15, algo_param2=0.3)\\r\\n\\r\\n\\tsorted = sort_strategy(data)\\r\\n```\\r\\n\\r\\nSince any `Callable` with appropriate types can be a strategy, I can use both function and class. Functions are preferred when the implementation does not requires hyper-parameters. On the other hand, callable classes can provide more flexible algorithms because it can store hyper-parameters as its member variable. As you can see in the code above, it is more convenient to use `dataclasses.dataclass` for implementing the callable class."},{"id":"factory-method-pattern","metadata":{"permalink":"/programming/factory-method-pattern","source":"@site/programming/2023-01-09-factory-pattern.mdx","title":"[Design Pattern] Factory Method","description":"Factory method is a creational pattern which gives an interface for creating subclasses.","date":"2023-01-09T00:00:00.000Z","formattedDate":"January 9, 2023","tags":[{"label":"python","permalink":"/programming/tags/python"},{"label":"design-pattern","permalink":"/programming/tags/design-pattern"},{"label":"creational-pattern","permalink":"/programming/tags/creational-pattern"}],"readingTime":3.29,"hasTruncateMarker":true,"authors":[{"name":"Minjun Park","url":"https://github.com/minjunsz","imageURL":"https://github.com/minjunsz.png","key":"minjun"}],"frontMatter":{"title":"[Design Pattern] Factory Method","description":"Factory method is a creational pattern which gives an interface for creating subclasses.","slug":"factory-method-pattern","authors":["minjun"],"tags":["python","design-pattern","creational-pattern"],"hide_table_of_contents":false},"prevItem":{"title":"[Design Pattern] Strategy","permalink":"/programming/strategy-pattern"}},"content":"The factory method is a **creational pattern** which gives an interface for creating subclasses.\\nThis post will demonstrate a classical OOP pattern and a more pythonic factory pattern.\\n\\n\x3c!--truncate--\x3e\\n\\n## What is Factory Method Pattern?\\n\\nFactory method pattern is a creational design pattern that provides a high-level interface for creating a superclass object\\nbut allows subclasses to alter the type of objects created. Following is a high-level overview of the patterns:\\n\\n1. Define a superclass/interface of the subclasses.\\n2. Define an abstract method for creating a superclass object.\\n3. Each subclass implements the creation method above.\\n4. Program can alter the subclass object by altering the factory method.\\n\\n## Why do we Need Factory Pattern?\\n\\nSuppose we want to change the structure of a class. If we add a member variable, we will likely add an additional argument for the `__init__()` function.\\nIn most cases, **the creation process of an object is tightly coupled with the structure of the class**.\\nThis means that your program should depend on the concrete implementation, although you programmed based on an abstract interface.\\nTherefore, you want to separate the use from the creation.\\n\\n## Python Examples\\n\\n### Original Code\\n\\nThe example is code for logging a scalar value.\\nUsers can select which logger to use between \'tensorboard\' and \'wandb\'.\\nIn the original code, I introduced an abstract superclass `Logger.`\\nHowever, the `main()` function is still coupled with two concrete classes, `TensorboardLogger` and `WandbLogger`, in the conditional branches.\\n\\n\\n```python\\nfrom abc import ABC, abstractmethod\\n\\nclass Logger(ABC):\\n\\t@abstractmethod\\n\\tdef log_scalar(self, value: float) -> None:\\n\\t\\t...\\n\\nclass TensorboardLogger(Logger):\\n\\t...\\n\\nclass WandbLogger(Logger):\\n\\t...\\n\\ndef main() -> None:\\n\\t# select logger type\\n\\tlogger_name = input(\\"Enter logger type (tensorboard, wandb)\\")\\n\\n\\t# initialize logger\\n\\tlogger: Logger\\n\\tif logger_name == \\"tensorboard\\":\\n\\t\\tlogger = TensorboardLogger()\\n\\telif logger_name == \\"wandb\\":\\n\\t\\tlogger = WandbLogger()\\n\\telse\\n\\t\\traise ValueError\\n\\n\\t# log experiments\\n\\tlogger.log_scalar(0.5)\\n```\\n\\n### Factory Pattern using Superclass\\n\\nLet\'s define a corresponding factory interface and implement concrete factory classes for each logger.\\nIn this implementation, `main()` function is unaware of how to create concrete classes.\\nIt relies on abstract interfaces for both use and creation.\\n\\nIf you want to change the structure of a logger, it is enough to change the creation logic in its factory without modifying the `main()` function.\\n\\n```python\\nclass LoggerFactory(ABC):\\n\\t@abstractmethod\\n\\tdef get_logger(self) -> Logger:\\n\\t\\t...\\n\\nclass TensorboardLoggerFactory(ABC)\\n\\tdef get_logger(self) -> Logger:\\n\\t\\treturn TensorboardLogger()\\n\\nclass WandbLoggerFactory(ABC):\\n\\tdef get_logger(self) -> Logger:\\n\\t\\treturn WandbLogger()\\n\\ndef read_logger() -> LoggerFactory\\n\\tfactories = {\\n\\t\\t\\"tensorboard\\": TensorboardLoggerFactory(),\\n\\t\\t\\"wandb\\": WandbLoggerFactory()\\n\\t}\\n\\n\\t# select logger type\\n\\tlogger_name = input(\\"Enter logger type (tensorboard, wandb)\\")\\n\\n\\tif logger_name in factories:\\n\\t\\treturn factories[logger_name]\\n\\traise Exception(\\"Unknown logger type\\")\\n\\ndef main() -> None:\\n\\tfac = read_logger()\\n\\tlogger = fac.get_logger()\\n\\tlogger.log_scalar(0.5)\\n```\\n\\n### Factory Pattern using Protocol\\n\\nInheriting abstract classes introduces additional complexity, which comes from the class hierarchy. \\nIf the subclass does not reuse the parent\'s code and does not require a strict class hierarchy, it is preferable to use \'duck typing\' rather than an abstract base class.\\nHowever, the factory pattern relies on abstract base classes because classical programming languages do not support \'duck typing.\'\\nPython provides the `typing.Protocol` class for duck typing, so we can rewrite the code as follows.\\n\\n```python\\nfrom typing import Protocol\\n\\nclass Logger(Protocol):\\n\\tdef log_scalar(self, value: float) -> None:\\n\\t\\t...\\n\\nclass TensorboardLogger:\\n\\tdef log_scalar(self, value: float) -> None:\\n\\t\\t...\\n\\nclass WandbLogger:\\n\\tdef log_scalar(self, value: float) -> None:\\n\\t\\t...\\n\\nFACTORIES: dict[str, type[Logger]] = {\\n\\t\\"tensorboard\\": TensorboardLogger,\\n\\t\\"wandb\\": WandbLogger\\n}\\n\\ndef read_logger() -> Logger\\n\\twhile True:\\n\\t\\t# select logger type\\n\\t\\tlogger_name = input(\\"Enter logger type (tensorboard, wandb)\\")\\n\\t\\ttry:\\n\\t\\t\\tlogger_class = factories[logger_name]\\n\\t\\t\\treturn logger_class()\\n\\t\\texcept KeyError:\\n\\t\\t\\tprint(\\"Unknown logger type.\\")\\n\\ndef main() -> None:\\n\\tlogger = read_logger()\\n\\n\\t# log experiments\\n\\tlogger.log_scalar(0.5)\\n```\\n\\n## Class Diagram\\n\\n```mermaid\\nclassDiagram\\n    class Product\\n    <<interface>> Product\\n    Product : +doStuff()\\n    \\n    class ProductFactory\\n    <<interface>> ProductFactory\\n    ProductFactory : +createProduct() Product\\n    Product <.. ProductFactory\\n\\n    Product <|.. Product_A\\n    Product_A : +doStuff()\\n    Product <|.. Product_B\\n    Product_B : +doStuff()\\n\\n    ProductFactory <|.. ProductFactory_A\\n    ProductFactory_A : +createProduct() Product\\n    ProductFactory <|.. ProductFactory_B\\n    ProductFactory_B : +createProduct() Product\\n```"}]}')}}]);