---
title: "Design Patterns | Composition Vs Dependency Injection"
date: 2023-11-30T14:02:00+0000
tags: ["design-patterns", "composition", "dependency injection"]
---

# Design Patterns | Composition Vs Dependency Injection

## Context

## Question

What is a difference between Composition and Dependency Injection?

## Answer

> Composition and dependency injection (DI) are related concepts, but they address different aspects of software design. Let's clarify the distinctions between composition and dependency injection:
> 
> ### Composition:
> 
> **Definition:** Composition is a design principle that involves constructing complex objects by combining simpler ones. In object-oriented programming, this often means creating instances of other classes within a class to build more complex behaviors.
> 
> **Key Points:**
> 1. **Relationships:** Composition describes how objects are related and how they collaborate to achieve a specific behavior.
>   
> 2. **Code Organization:** It's about organizing and structuring classes based on the inclusion of other classes.
> 
> 3. **Flexibility:** Composition provides flexibility by allowing objects to be combined in different ways to create new functionalities.
> 
> 4. **Implementation:** Composition is typically implemented by creating instances of other classes as attributes within a class.
> 
> **Example:**
> ```python
> class Engine:
>     def start(self):
>         print("Engine started")
> 
> class Car:
>     def __init__(self):
>         self.engine = Engine()
> 
>     def start(self):
>         print("Car starting...")
>         self.engine.start()
> 
> # Usage
> my_car = Car()
> my_car.start()
> ```
> 
> ### Dependency Injection:
> 
> **Definition:** Dependency injection is a design pattern that focuses on providing the dependencies (external objects or services) that a class needs from the outside rather than letting the class create them internally.
> 
> **Key Points:**
> 1. **Dependencies:** Dependency injection is about providing the necessary dependencies to a class through constructor injection, setter injection, or method injection.
> 
> 2. **Inversion of Control (IoC):** It's a form of IoC, where the control of creating and managing dependencies is inverted to an external entity (usually a container or the calling code).
> 
> 3. **Flexibility:** Dependency injection allows for flexibility in changing or substituting dependencies without modifying the dependent class.
> 
> 4. **Implementation:** Dependency injection is implemented by passing dependencies to a class rather than creating them within the class.
> 
> **Example:**
> ```python
> class Engine:
>     def start(self):
>         print("Engine started")
> 
> class Car:
>     def __init__(self, engine):
>         self.engine = engine
> 
>     def start(self):
>         print("Car starting...")
>         self.engine.start()
> 
> # Usage
> my_engine = Engine()
> my_car = Car(my_engine)
> my_car.start()
> ```
> 
> ### Relationship:
> 
> - **Composition is a way of organizing and building classes by combining simpler ones.** It's about creating a relationship between classes based on their structure.
> 
> - **Dependency injection is a way of providing the necessary dependencies to a class from the outside.** It's about creating a relationship between a class and its dependencies based on their interactions.
> 
> In practice, these concepts can often be used together. You might use composition to build a class and then use dependency injection to provide external dependencies to that class. However, they address different concerns and are not mutually exclusive.

## What I Learned

## Resources
