---
date: '2026-04-13'
title: C# Exercises
subtitle: C# coding exercises covering language fundamentals, DDD, and EF Core internals.
gh-repo: ronelzb/exercises-csharp
gh-badge: [watch, star, fork, follow]
tags:
  [
    algorithms,
    csharp,
    data structures,
    design patterns,
    ddd,
    dotnet,
    entity-framework,
    exercises,
    linq,
  ]
---

A multi-module .NET 10 solution for drilling C# concepts that come up in senior
engineering interviews and production codebases — not just syntax, but the behavior
that trips people up. Four independent projects, each focused on a distinct area.

## Module 1: LeetCode Problems

Five algorithmic problems in C# 12, emphasizing patterns idiomatic to the language:

- **LRU Cache (#146)** — `LinkedList<(int key, int value)>` + `Dictionary` for O(1)
  get/put/evict using C# primary constructors and tuple syntax.
- **Print FooBar Alternately (#1115) / Building H2O (#1117)** — `SemaphoreSlim`-based
  thread synchronization and `Interlocked.Increment` for lock-free counters.
- **Meeting Rooms (#252)** — Sorted interval scan using C# 12 collection expressions.

## Module 2: DI Lifetimes

An ASP.NET Core Minimal API that makes DI lifetime behavior _observable_ rather than
theoretical. A single `Marker` class registered three times, singleton, scoped,
transient, exposes six GUIDs via `GET /data`. You can watch in real time that singleton
IDs are stable, scoped IDs match within a request but differ across requests, and
transient IDs are always unique.

The module also reproduces the **captive dependency bug**: a singleton injecting a scoped
dependency. `ValidateScopes = true` and `ValidateOnBuild = true` are force-enabled,
surfacing the startup exception immediately rather than silently corrupting state in
production.

## Module 3: EF Core Internals

A console app running against a 500-row SQLite database with SQL logging enabled, making
invisible EF Core behavior visible:

- **Tracking vs. `AsNoTracking`** — Mutate a tracked entity, observe `EntityEntry.State`
  shift to `Modified`, call `SaveChangesAsync`, watch it return to `Unchanged`. Mutating
  a no-tracking entity: `SaveChanges` silently does nothing.
- **N+1 problem** — Load 50 orders without `Include`, access `order.OrderLines` in a
  loop: 51 queries. Reload with `.Include(o => o.OrderLines)`: 1 query with `LEFT JOIN`.
- **`AsSplitQuery`** — Two `Include` chains cause cartesian explosion. `.AsSplitQuery()`
  splits into separate SELECTs. `ToQueryString()` prints the actual SQL.

## Module 4: Domain-Driven Design

A pure domain model with EF Core persistence implementing DDD patterns in
production-quality C#:

- **Aggregate root (`Order`)** — Private constructor + static `Create()` factory.
  `AddLine`/`RemoveLine` only allowed in `Draft` state. `Confirm()` / `Ship()` /
  `Cancel()` enforce a state machine with `InvalidOperationException` on invalid
  transitions. Collections exposed as `IReadOnlyCollection<>`.
- **Value objects (`Money`, `ProductSnapshot`)** — Inherit from abstract `ValueObject`
  with component-based equality. `Money` supports arithmetic operators with
  currency-matching guards. `ProductSnapshot` is a frozen copy at purchase time, acting
  as an anti-corruption layer across bounded contexts.
- **Domain events** — `IDomainEvent` interface wired to the aggregate root.

## Tooling

CI runs `dotnet build -warnaserror`, `dotnet format --verify-no-changes`, and
`dotnet test` on every push. Husky pre-commit hooks enforce formatting and zero compiler
warnings before any commit reaches the remote.
