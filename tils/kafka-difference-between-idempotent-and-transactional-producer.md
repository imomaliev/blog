---
title: "Kafka | Difference Between Idempotent And Transactional Producer"
date: 2023-11-13T17:33:22+0000
tags: ["kafka", "producer"]
---

# Kafka | Difference Between Idempotent And Transactional Producer

## Context

During my deep dive into how we could use Kafka in ETG I started researching [Exactly Once Semantics](Exactly%20Once%20Semantics.md) and Transactional API in Kafka. But while watching [Video - Apache Kafka Transactions- Message Delivery and Exactly-Once Semantics](2-personal/3-resources/Kafka/Video%20-%20Apache%20Kafka%20Transactions-%20Message%20Delivery%20and%20Exactly-Once%20Semantics/_index.md) I found out that I do not understand the difference between `idempotancy` and `transactional` semantics in kafka

## Question

What is difference between idempotent and transactional producer in Kafka?

## Answer

[Source](https://stackoverflow.com/a/60289031/3627387)
> By enabling idempotence, the producer automatically sets `acks` to `all` and guarantees message delivery for the lifetime of the Producer instance.
> 
> By enabling transactions, the producer automatically enables idempotence (and `acks=all`). Transactions allow to group produce requests and offset commits and ensure all or nothing gets committed to Kafka.

Quote from Bing Chat

> `enable.idempotence=true` ensures that each message is delivered exactly once, preventing duplicates due to producer retries. The transactional API, on the other hand, ensures that a group of messages across multiple partitions are all committed, or none of them are, providing atomicity.

## What I Learned

## Resources

- [Difference between kafka idempotent and transactional producer setup?](https://stackoverflow.com/questions/60283718/difference-between-kafka-idempotent-and-transactional-producer-setup)
