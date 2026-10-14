# Kimi packaging

Kimi Code plugin + skill contract (CLI 2.1.1, Oct 2026). This tree's
Kimi surface is `.kimi-plugin/plugin.json` plus
`.kimi-plugin/marketplace.json` below; skill dirs also load from
`.kimi-code/skills/` and `.agents/skills` (project),
`$KIMI_CODE_HOME/skills`, `~/.agents/skills` (user),
`extra_skill_dirs`, and built-ins.

## Manifest

`kimi.plugin.json` at the plugin root wins;
`.kimi-plugin/plugin.json` is the fallback. `name` is the only
required key: `[a-z0-9][a-z0-9_-]{0,63}`. Allowed: `version`,
`description`, `keywords`, `author`, `homepage`, `license`,
`interface` (exactly `displayName`, `shortDescription`,
`longDescription`, `developerName`, `websiteURL`), `skills`,
`agents`, `sessionStart.skill`, `skillInstructions`, `systemPrompt`,
`systemPromptPath`, `mcpServers`, `hooks`, `commands`. Never
`repository`, `tools`, `apps`, `inject`, `configFile`,
`interface.capabilities`, or `interface.defaultPrompt` (Codex-only —
Kimi emits diagnostics and ignores them). `skills` / `agents` /
`commands` paths are `./`-relative to the plugin root; `skills`
omitted means a root `SKILL.md` is the single root; `agents`
omitted means `agents/` auto-discovers — never ship a stray `.md`
under `agents/`.

## Marketplace

Marketplace JSON v2: `{"version": "2", "plugins": [{"id",
"source", …}]}` — each entry needs `id` + `source` (local path, zip
URL, or GitHub URL). Override the catalog with
`KIMI_CODE_PLUGIN_MARKETPLACE_URL`, or browse a file with `/plugins
marketplace <path|url>`. GitHub installs take 4 URL forms (repo,
`/tree/<ref>`, `/releases/tag/<tag>`, `/commit/<sha>`); release or
default branch wins, no api.github.com. This tree ships
`.kimi-plugin/marketplace.json` pointing at the GitHub repo.

## Agents

Plugin agents are `agents/*.md`:

| Key | Rule |
|---|---|
| `description` | required |
| `tools` / `disallowedTools` / `subagents` | allowlists |
| `override` | `true` replaces a built-in of the same name |

Plugin agents outrank built-ins only. Template vars
`${plugin_sections}` / `${base_prompt}` expand in agent bodies.

## Hooks

20 events (UserPromptSubmit, UserPromptQueued, PreToolUse, Stop,
TurnStarted, PostToolUse, PostToolUseFailure, PermissionRequest /
Result, SessionStart / End / Heartbeat, SubagentStart / Stop,
TaskStarted, StopFailure, Interrupt, PreCompact, PostCompact,
Notification); blockable are PreToolUse, Stop, UserPromptSubmit.
Hooks fail open; exit 2 blocks. Plugin hooks run with cwd = plugin
root and `KIMI_PLUGIN_ROOT` set.

## Budgets and scope

`systemPrompt` 32 KB + `systemPromptPath` file 32 KB each (over →
ignored + diagnostic); 64 KB total per prompt build. Skill nesting
cap 3. Flat-skill / command description fallback 240 chars.
Directory `SKILL.md` without `name` + `description` fails parsing.
Installs are per-user copies under
`$KIMI_CODE_HOME/plugins/managed/<id>/` — reinstall after edits;
`/reload` or `/new` to activate. No CLI validator: `kimi doctor`
checks config files only — read `/plugins info <id>` diagnostics,
then `/plugins reload`.
