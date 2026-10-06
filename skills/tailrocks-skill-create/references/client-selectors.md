# Client selectors (explicit invocation)

## Honored forms

| Client | Honored form | Notes |
|---|---|---|
| Codex CLI | `$<skill>` bare, `/skills` picker | Only documented explicit forms. |
| Claude Code | `/<skill>`, `/<plugin>:<skill>` | Leading `/name` runs directly; after prose it only permits that turn. |
| Kimi | `/skill:<name>` | ONLY form; `/<name>` confirmed absent. |
| Cursor | `/<skill>` (one message); `/` menu in CLI | `disable-model-invocation: true` = `/`-only; `paths` scopes by file; nested dirs auto-scope. |
| Muse | `/` picker + `/<skill>` | Bare slash verified; `/<plugin>:<skill>` unverified (absent from official docs). Manage: `muse skills list\|inspect\|enable\|disable\|validate <path>\|install\|import\|update\|uninstall`. |
| Grok Build | `/<skill>`, `/<plugin>:<skill>` | Plus `/local:`, `/user:` scope qualifiers (verified: collisions remap to `/user:`); `/skills`, `/marketplace`, `grok inspect`, `grok plugin …`. |
| Amp | model-invoked from name+description listing (no slash) | Plugin-bundled skills address as `<plugin>:<skill>` (no competition with bare names). Manage: `amp skill add\|list\|remove\|info\|repositories`. |
| OpenCode v2 | prose `Use the X skill…` via `skill` tool | No slash for skills; ignores `disable-model-invocation`/`user-invocable` and all unknown frontmatter; gate is `permission.skill: ask`; `tools.skill: false` hides the listing. |
| Gemini CLI / Antigravity | `/<skill>` (CLI auto-converts), `/skills list`; plugin skills `/<plugin>:<skill>` | Contract is `name`+`description` only. Manage: `agy plugin list\|install\|uninstall\|enable\|disable\|validate`. |
| Qwen Code | `/<skill>`, `/skills` panel | Extension skills namespaced `<ext>:<name>`. |
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
  Grok, Qwen, or Kimi. Only Codex defines
  `interface.default_prompt` ("optional surrounding prompt to use the
  skill with") — and it does NOT participate in implicit matching.
- **`argument-hint` drives no client's triggering** — display hint only.
- **Amp `plugin:skill` applies to plugin-bundled skills only.**
  Bundled skills address as `<plugin>:<skill>` with no competition
  against bare names; bare skills load by model decision from the
  name+description listing, never via a qualifier.
