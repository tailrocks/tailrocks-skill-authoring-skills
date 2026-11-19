# Client selectors for explicit invocation

Use the form for the installed package. Inspect the host's own listing
when names collide. Preserve the user's requested scope and arguments.

- **Claude Code.** Use `/<plugin-id>:<skill-id>` for a bundled skill.
  Standalone skills use `/<skill-id>`.
- **Codex CLI.** Use `$<skill-id>` or select the skill from `/skills`.
  Use the same bare dollar selector in the picker prompt.
- **Grok Build.** Use `/<skill-id>` or the qualified shortcut shown by
  `grok inspect --json` under `invocableAs`.
- **Muse Code.** Use `/<skill-id>` or select the entry shown by the
  slash picker.
- **omp.** With skill commands enabled, use `/skill:<skill-id>`. If
  names collide, check `omp skill list --json` for the resolved name.
  The qualified form is `/skill:<plugin-id>/<skill-id>`.
- **OpenCode V2.** Select the installed registry entry with `@<skill-id>`.
  The Tailrocks server plugin supplies its ID and resource path.
- **Amp.** Ask Amp to load `<plugin-id>:<skill-id>`. The directory plugin
  registers that qualified name even for skills hidden from the model list.
- **Antigravity CLI.** Use `/<skill-id>` in the session.
- **pi.** Use `/skill:<skill-id>` with skill commands enabled.
- **Kimi Code.** For a bundled skill use `/skill:<plugin-id>:<skill-id>`.

## Authoring checks

Keep the canonical description and input syntax readable on every host.
Claude's argument placeholders belong to that host. Codex's picker prompt
belongs in `agents/openai.yaml`. Neither field controls cross-host routing.
Use a host's own selector only when its package or picker exposes it.

For a manual skill, check the explicit user request before starting work.
A qualified name in model text supplies no user authorization.
