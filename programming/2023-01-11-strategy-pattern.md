---
title: "[Design Pattern] Strategy"
description: "Strategy pattern is a behavioral pattern that enables selecting an algorithm at runtime."
slug: strategy-pattern
authors: [minjun]
tags: [python, design-pattern, behavioral-pattern]
hide_table_of_contents: false
---

The strategy pattern is a **behavioral pattern** that enables selecting an algorithm at runtime.
This post will demonstrate a classical OOP pattern and a more pythonic/functional strategy pattern.

<!--truncate-->

## What is Strategy Pattern?

The strategy pattern is a behavioral design pattern that defines a family of algorithms and lets a program select one of them at runtime.
Following is a high-level overview of the patterns:

1. Declare an interface which defines a group of algorithms. This family is called *Strategy*.
2. Implement concrete strategies following the interface above.

## Why do we Need Strategy Pattern?

The strategy pattern is devised to handle a few problems sharing same context by differing algorithms.

Let's assume you are trying to develop a navigation program. You already implemented most features such as retrieving current location, display the map, etc. Now, you need to implement the routing algorithm for the navigation. However, user can drive, take a bus, or walk. Therefore, you have to prepare a few routing algorithms and apply one of them at runtime.

In this case, you might want to declare a strategy *"Routing"* and implement concrete strategies such as *"CarRouting", "BusRouting", "WalkRouting."* Then, your navigation application works with whichever routing algorithm you choose.

## Python Examples

In this section, I will implement a few sorting algorithms.

### Strategy Pattern using Abstract Base Class

This is the basic implementation of the strategy pattern. I declared a abstract interface `SortStrategy` and implemented it using bubble sort and heap sort. Thanks to the strategy interface, the `main()` function does not depend on the concrete algorithm implementation. I can easily swap the sort algorithm by simply modifying the code for instantiating the strategy. Determining the strategy at runtime is straightforward.

```python
from abc import ABC, abstractmethod

class SortStrategy(ABC):
	@abstractmethod
	def sort_list(data: list[float]) -> list[float]:
		"""Return a sorted list of the given data."""

class BubbleSort(SortStrategy):
	def sort_list(data: list[float]) -> list[float]:
		...

class HeapSort(SortStrategy):
	def sort_list(data: list[float]) -> list[float]:
		...

def main() -> None:
	# processing data
	data = ...

	# Instantiate a strategy
	sort_strategy: SortStrategy
	sort_strategy = BubbleSort()
    # sort_strategy = HeapSort()

	sorted = sort_strategy.sort_list(data)
```

### Strategy Pattern using Protocol

If the strategies do not utilize any benefits from the inheritance, using `typing.Protocol` can be a better choice. By doing so, we can implement less coupled strategies. Most codes stay the same.

```python
from typing import Protocol

class SortStrategy(Protocol):
	def sort_list(data: list[float]) -> list[float]:
		"""Return a sorted list of the given data."""

class BubbleSort:
	def sort_list(data: list[float]) -> list[float]:
		...

class HeapSort:
	def sort_list(data: list[float]) -> list[float]:
		...

def main() -> None:
	# processing data
	data = ...

	# Instantiate a strategy
	sort_strategy: SortStrategy
	sort_strategy = BubbleSort()

	sorted = sort_strategy.sort_list(data)
```

### Functional Programming

Python provides a high level type `Callable`. This includes not only functions but also any objects with `__call__()` method. By declaring the strategy interface as a `Callable`, you can utilize python's flexible type system. It is important to note that using `Protocol` is still a valid approach if the strategy interface requires multiple functions.

```python
from dataclasses import dataclass
from typing import Callable

# define a type for strategies
SortStategy = Callable[[list[float]], list[float]]

def bubble_sort(data: list[float]) -> list[float]:
	"""implement bubble sort"""

@dataclass
class SpecialSortAlgo:
	algo_param1: int = 10
	algo_param2: float = 0.5

	def __call__(data: list[float]) -> list[float]:
		"""implement sort algorithm with given parameters"""

def main() -> None:
	# processing data
	data = ...

	# Instantiate a strategy
	sort_strategy: SortStrategy
	# sort_strategy = bubble_sort
	sort_strategy = SpecialSortAlgo(algo_param1=15, algo_param2=0.3)

	sorted = sort_strategy(data)
```

Since any `Callable` with appropriate types can be a strategy, I can use both function and class. Functions are preferred when the implementation does not requires hyper-parameters. On the other hand, callable classes can provide more flexible algorithms because it can store hyper-parameters as its member variable. As you can see in the code above, it is more convenient to use `dataclasses.dataclass` for implementing the callable class.
