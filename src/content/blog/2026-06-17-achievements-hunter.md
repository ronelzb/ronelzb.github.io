---
date: '2026-06-17'
title: Achievements Hunter
subtitle: A Steam achievement tracker and AI-powered platinum guide generator.
gh-repo: ronelzb/achievements-hunter
gh-badge: [watch, star, fork, follow]
tags: [achievements, ai, anthropic, automation, gaming, openai, python, steam]
---

A personal Steam toolkit built to solve a specific problem: tracking year-to-date
achievement progress against friends and generating AI-powered completion guides for
games I'm chasing. Five CLI commands, a dual LLM backend, and enough Steam API work
to access private libraries without touching privacy settings.

## What it does

**`steam-achievements`** — Fetches your full friend list, pulls every played game per
player, and ranks everyone by achievements unlocked in the current calendar year.

**`steam-platinum`** — The main feature. For any game, it fetches your remaining
achievements, optionally grabs a community guide from Steam as grounding context, then
sends everything to an LLM — Claude or OpenAI, your choice — which returns a structured
strategy: categories, ordering, estimated hours, and tips. Results are persisted to
SQLite so previously generated guides are retrieved without re-calling the API.

**`steam-game`**, **`steam-friends`**, and **`steam-login`** — Browse achievements per
game, inspect your friends list, and authenticate via Steam.

## The Steam auth problem

Steam's API returns 401 for private libraries even with a valid developer key. Rather
than requiring users to make their profiles public, `steam-login` performs a full Steam
login flow (RSA key exchange, Valve Data Format parsing) and stores the resulting session
in the OS native keychain — Windows Credential Manager, macOS Keychain, or Linux Secret
Service. The session unlocks `IPlayerService/GetOwnedGames` for private libraries.
Achievement data still requires a developer key because
`ISteamUserStats/GetPlayerAchievements` doesn't honor user access tokens.

## Dual LLM provider

`llm_provider.py` defines an `AsyncLLMProvider` protocol with a single
`complete(system, user) -> str` method. Both the Anthropic and OpenAI implementations
satisfy it; the factory function reads `LLM_PROVIDER` from the environment and fails fast
if misconfigured:

```bash
LLM_PROVIDER=anthropic LLM_MODEL=claude-opus-4-5 steam-platinum --game 480
LLM_PROVIDER=openai    LLM_MODEL=gpt-4o           steam-platinum --game 480
```

## Concurrency model

Achievement fetching is async with 4 parallel requests per player by default, with
automatic retry and exponential backoff on Steam's 429 rate-limit responses.

## Stack

Python 3.12+, `httpx` for async HTTP, SQLAlchemy + SQLite for persistence, Pydantic for
data contracts, `keyring` for cross-platform credential storage. Linted with `ruff`,
type-checked with `pyright`, tested with `pytest`.
