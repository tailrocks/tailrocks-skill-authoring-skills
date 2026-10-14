---
name: <skill-name>
description: >-
  Use only when the user explicitly requests this skill. <Triggers only:
  the user's own verbs, symptoms, situations, and artifact names that
  should activate this skill, plus the do-not-use boundary naming the
  owning skill. Third person, at most 1,024 chars total, key triggers
  first. Never a workflow summary.>
# when_to_use: extra trigger phrases for MODEL_POLICY skills — 2-4
# example user requests in the user's own words plus sibling routing
# ("Not for <sibling trigger> — that belongs to <owning skill>").
# Appended to description in the listing; counts toward the same
# 1,536-char cap. Kimi: whenToUse. Grok: when-to-use + paths.
# Portable keys only: name, description, license, compatibility,
# metadata, allowed-tools. argument-hint, disable-model-invocation,
# user-invocable, and when_to_use are host extensions — strip them
# when packaging for claude.ai / Skills API. Kimi: use arguments:
# with $<name> expansion instead of argument-hint; never type: flow
# on an invokable skill.
argument-hint: "<arguments>"
disable-model-invocation: true
license: Apache-2.0
user-invocable: true
---

# <Title>

<One paragraph: what this skill changes in an agent's behavior, and the
observed failure it answers.>

The user's instructions take precedence over this skill's guidelines
where they conflict; refusal and stop boundaries below lift only
through the authorization they name, never a turn-level instruction.

## Steps

1. **<Step name>.** <Instruction — one obligation per step, reason
   stated.> **Complete when:** <testable condition.>

## Red flags — STOP

- "<The rationalization an agent will reach for>" — <the counter.>

## Final gate

<Refusals, each naming its reason. Depth belongs in references, routed
from the relevant step by when to read it, never summarized here.>
