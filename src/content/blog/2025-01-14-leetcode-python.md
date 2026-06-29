---
date: '2025-01-14'
title: LeetCode Python
subtitle: Python solutions to data structures and algorithms problems in LeetCode.
gh-repo: ronelzb/leetcode-python
gh-badge: [watch, star, fork, follow]
tags:
  [
    algorithms,
    arrays,
    binary search,
    binary trees,
    bit manipulation,
    data structures,
    dynamic programming,
    graphs,
    hashtable,
    python,
    queues,
    stacks,
    string,
    trees,
  ]
---

A structured practice repository for data structures and algorithms in Python, picking up
where the original [leetcode repo](/2021/03/12/leetcode) left off. The goal wasn't just
to collect solutions, it was to build a codebase I'd be comfortable showing in an
interview: tested, documented, and idiomatic.

32 problems solved, at the time of this writing, across 7 Easy, 23 Medium, and 2 Hard.

## What makes this different from a solution dump

Every solution file includes the full problem statement, examples, constraints, and
explicit time/space complexity analysis in the docstring. And every solution has a paired
test file, not as an afterthought, but as a design constraint from the start.

A shared `utils/` library abstracts the boilerplate of building tree and list structures
for tests:

```python
root = TreeNode.from_list([3, 9, 20, None, None, 15, 7])
assert Solution().maxDepth(root) == 3
```

`TreeNode`, `ListNode`, and graph node classes include structural `__eq__` so assertions
read naturally without manual traversal.

## Idiomatic Python patterns

Solutions lean on the standard library rather than reinventing primitives:

- `collections.deque` for O(1) `popleft` in BFS
- `heapq` for priority queues
- `bisect` for binary search on sorted data
- `collections.Counter` and `defaultdict` for frequency maps
- Comprehensions and slicing over manual index arithmetic

## Notable implementations

**Median of Two Sorted Arrays (#4)** — O(log(min(m, n))) binary search on partitions
rather than the naive O(m+n) merge.

**LRU Cache (#146)** — `dict` + doubly linked list for O(1) get, put, and evict.

**Course Schedule I & II (#207, #210)** — Topological sort via DFS cycle detection.

**Word Ladder (#127)** — BFS shortest path across a word graph.

## Topics covered

Arrays, binary search, binary trees, bit manipulation, dynamic programming, graph search
(BFS/DFS), linked lists, matrices, stacks, strings, and tries.

## Tooling

CI runs `ruff` (lint + format), `pyright`, and `pytest` on every push. On `main` merges,
the workflow auto-commits an updated progress table to the README. Built on Python 3.12+
with `uv` for dependency management.
