# Client selectors (explicit invocation)

## Honored forms

| Client | Honored form | Notes |
|---|---|---|
| Codex CLI | `$<skill>` bare, `/skills` picker | Only documented explicit forms. |
| Claude Code | `/<skill>`, `/<plugin>:<skill>` | Leading `/name` runs directly; after prose it only permits that turn. |
| Kimi | `/skill:<name>` | Slash-colon. `/<name>` shorthand unverified. |
| Cursor | `/<skill>` in chat, `/` menu in CLI | — |
| Muse | `/` picker + `/<skill>` | Bare slash verified; `/<plugin>:<skill>` unverified (picker-observed only). |
| Grok Build | `/<skill>`, `/<plugin>:<skill>` | Plus `/local:`, `/user:` scope qualifiers; `/skills`, `grok inspect`. |
| Amp | prose naming `plugin:skill` | No user-invokable skills exist (model-invoked only). |
| OpenCode v1 | prose `Use the X skill…` via `skill` tool | No slash for skills; ignores `disable-model-invocation`/`user-invocable`; gate is `permission.skill: ask`. |
| Gemini CLI / Antigravity | `/<skill>`, `/skills list` | Contract is `name`+`description` only. |
| Qwen Code | `/<skill>`, `/skills` panel | Extension skills namespaced `<ext>:<name>`. |
| ZCode (GLM host) | `$skill-name` tag, `/` menu | Names+250-char excerpts injected per turn under a shared budget. |
| ChatGPT | `@` mention of plugin/skill | — |

## Wrong folklore — never author these

- **`$plugin:skill` in Codex is wrong.** Zero occurrences in official
  docs; namespacing is internal-only. Same-name collisions resolve via
  the picker ("both can appear in skill selectors"). `default_prompt`
  and all docs must use bare `$<skill>`.
- **`$...` in Claude Code is NOT invocation.** `$ARGUMENTS`/`$0`/`$N`
  are argument-substitution placeholders inside skill content only.
- **Muse `/<plugin>:<skill>` shadow rule is unverified.** Absent from
  official docs; mark verify-before-rely anywhere it is written.
- **No "default prompt" concept exists** in Claude Code, Muse, Gemini,
  Grok, Qwen, Kimi, or ZCode. Only Codex defines
  `interface.default_prompt` ("optional surrounding prompt to use the
  skill with") — and it does NOT participate in implicit matching.
- **`argument-hint` drives no client's triggering** — display hint only.
