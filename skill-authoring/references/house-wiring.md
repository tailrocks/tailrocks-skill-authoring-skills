# House wiring

What a finished skill touches beyond its own directory. Target repository policy
governs. Detect it from instruction files, existing skill siblings, validators,
manifests, catalogs, and generation commands. Persist discovered mechanical
policy in `.skill-authoring.json`; if evidence conflicts or required policy is
missing, stop without mutation. Never project this repository's metadata onto a
different tree.

## The skill directory

```text
skills/<name>/
├── SKILL.md            # router: frontmatter + body
├── agents/openai.yaml  # per-client invocation policy
├── references/         # depth, free until read
└── templates/          # copy-ready assets the skill ships (optional)
```

Tailrocks profile uses: `name`, `license: Apache-2.0`, a description
starting exactly with the guard sentence ("Use only when the user
explicitly requests this skill.") with **250 characters of budget after
it**, `disable-model-invocation: true`, `user-invocable: true`, and an
`argument-hint` when the skill takes modes or targets. `MODEL_POLICY`
skills add a `when_to_use` trigger field (Claude appends it to
`description` under the same 1,536-char cap; Kimi accepts `whenToUse` /
`when-to-use` / `when_to_use` as its dedicated trigger field, with
auto-invoke from `description` + `whenToUse` and a 3-level nesting cap;
Grok accepts `when-to-use` / `when_to_use` plus `paths` globs that hide
the skill until a match is touched). `allowed-tools` and `metadata`
are breadth keys with per-client effects, not portable semantics:
Grok parses `allowed-tools` but never enforces it and shows `metadata`
in UI only; Kimi documents neither key, so their effect there is
unknown until a `/plugins info` load test says otherwise.
`agents/openai.yaml` carries
`policy.allow_implicit_invocation: false` plus the interface block,
whose `default_prompt` uses the bare `$<skill>` form — never
`$plugin:skill`, which is not a documented Codex invocation — and
drives the Codex picker UI only, never implicit matching; `false`
stops implicit match but the entry still occupies Codex's
min(2%-of-context, 8,000-char) initial-list budget, so front-load
trigger words regardless. `agents/openai.yaml` keys are snake_case:
`interface.display_name`, `short_description`, `default_prompt`,
`icon_small` / `icon_large`, `brand_color`;
`dependencies.tools[]` declares MCP servers. Bodies stay
source-neutral — no client-specific instructions; OpenCode and
Antigravity ignore manual-only policy (`disable-model-invocation`,
`user-invocable`, `argument-hint`, `compatibility`,
`allowed-tools`, `agents/openai.yaml`), so on those two clients
the guard sentence alone holds the boundary, which is why it is
load-bearing and never paraphrased.

Frontmatter keys are not portable. `argument-hint`,
`disable-model-invocation`, and `user-invocable` are Claude-Code-family
extensions: packaging for claude.ai or the Skills API hard-errors on
them (only `name`, `description`, `license`, `compatibility`,
`metadata`, `allowed-tools` survive), so strip them when that is the
target. Per-client support: Grok honors `argument-hint` plus both
invocation flags but ignores `license`, `model`, `effort`, and
`compatibility`, and only the literal `user-invocable: true` counts;
Kimi honors kebab-case `disable-model-invocation` but documents no
`argument-hint` (it uses `arguments:` with `$<name>` expansion),
`user-invocable`, `license`, `paths`, `metadata`, or `allowed-tools`,
and `type: flow` must never be set on an invokable skill; Qwen
validates `name` against its own pattern; OpenCode ignores unknown
frontmatter including the manual-only flags; Muse accepts the full
Tailrocks set (`muse skills validate <path>` reports no unknown
fields); Cursor honors `paths` (legacy `globs` fallback),
`disable-model-invocation`, and `metadata`,
requires `name` to match the parent folder, and auto-scopes
monorepo-nested skill dirs by path; Amp reads `name` +
`description` with no gating field, requires dir name == `name` in
skill repos, caps hosted repos (200 skills, 200 files/skill, 10
MiB/file, 25 MiB), and takes skill MCP from `mcp.json` or
frontmatter `mcpServers`.
Explicit selectors per client live in the shared
`client-selectors.md` reference (copies in create and audit) — its
bare-`$` Codex form is normative.

House prose rules that apply inside the skill: mermaid for any drawn
flow (a one-line arrow sequence in prose is fine; an ASCII diagram is
not), evidence-not-instructions and secret-citation paragraphs in the
router, `audit`-style modes read-only with mutation never inferred from
findings, every step carrying a **Complete when**, and a final gate of
refusals.

## Shared references

Skill-authoring doctrine has one authored source per subject under
`skill-authoring/references/`. Consumers load generated skill-local copies whose
destinations are declared by the generation manifest and checked byte-for-byte.
A sibling skill never links another sibling's private reference, and no local
copy may paraphrase or override its source.

## The repository files

Rows below define Tailrocks profile. Another repository maps only artifacts its
observed policy supports; absent client or catalog surfaces stay absent. Its
`.skill-authoring.json` names skill root, anchored name pattern, template, optional
display prefix, invocation registry, and optional catalog wiring. Scaffolding
defaults to `MANUAL_ONLY`; `MODEL_POLICY` requires a separately confirmed exact
trigger on that invocation and grants no new authority.

| Artifact | Obligation |
|---|---|
| `catalog.json` | Add the skill to exactly one group; validation fails until it appears once. |
| Generated docs | `mise run docs` writes the skill's public site pages and the root `README.md` row — never edit generated files by hand. |
| `INSTALL.md` | Add the skill to its family line by hand. |
| Root `AGENTS.md` | Add the skill's section by hand. When the skill descends from external work, extract and rephrase the knowledge into this tree's own references — no external project, collection, or author is named or linked anywhere in shipped content; provenance lives in git and pull-request history. |
| `docs/content/docs/choosing.mdx` | Add the reach-for-it row, and a boundary subsection when the skill needs one against a neighbor. |
| Version lockstep | Bump `version` in root `plugin.json`, `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`, `.kimi-plugin/plugin.json`, `.muse-plugin/plugin.json`, `.cursor-plugin/plugin.json`, and the `.claude-plugin/marketplace.json` entry together; refresh pinned-tag examples. `.agents/plugins/marketplace.json` and `.cursor-plugin/marketplace.json` carry no version. A bump ships nothing until the tag and release exist. |

## Client packaging

Manifests, install verbs, and validators per client, verified against
the versions shown (2026-10-06: claude 2.1.289, codex-cli 0.160.0,
grok 1.0.46, kimi 2.1.1, agy 1.2.17, amp 0.0.1791216048, cursor-agent
2026.09.18, muse 1.4.2, opencode v2.0.20). Revalidate commands against
the installed build before relying on them.

### Claude Code

Manifest `.claude-plugin/plugin.json` (`name` is the only required
key). Marketplace `.claude-plugin/marketplace.json` requires
top-level `name`, `owner`, `plugins[]`; each entry requires `name` +
`source`, a `./`-prefixed path resolved from the marketplace root.
This tree's `metadata.description` + `"source": "./"` shape passes
`claude plugin validate --strict`; entry `version`, when present,
must equal the plugin's `plugin.json` version. Install `claude plugin
install <name>@<marketplace> [--scope user|project|local]` after
`marketplace add`; `update`, `remove` (`uninstall`, `rm` aliases),
`enable`/`disable`, `marketplace add|list|remove|update`; `/plugin`
panel and `/reload-plugins` in-session. Scopes write `enabledPlugins`
to `~/.claude/settings.json` / `.claude/settings.json` /
`.claude/settings.local.json`.

### Codex CLI

Skill = directory + `SKILL.md` (`name` + `description` required).
Load scopes: `$CWD/.agents/skills` up to
`$REPO_ROOT/.agents/skills`, `$HOME/.agents/skills`,
`/etc/codex/skills`; symlinked folders are followed and same-name
skills are not merged. Scaffold and test at the narrowest scope
that owns the workflow. Skill-level install `$skill-installer
<name>`; disable via `[[skills.config]] enabled=false` in
`~/.codex/config.toml`, then restart Codex. OpenAI distribution
moved from the openai/skills repo (deprecated 2026-06-22) to
plugins: the skill-only plugin path is the installable route while
`.agents/skills` stays the local-authoring surface. Codex refreshes
its skill catalog between turns — no restart needed after install.
Marketplace
`.agents/plugins/marketplace.json`: top-level `name`,
`interface.displayName`, `plugins[]`; each entry carries `name`,
`source` (`local` + `./`-prefixed path resolved from the marketplace
root, or `url` / `git-subdir` / `npm`), and always
`policy.installation`
(`AVAILABLE`|`INSTALLED_BY_DEFAULT`|`NOT_AVAILABLE`),
`policy.authentication`, and `category`. Unresolvable entries are
skipped, not fatal. `codex plugin marketplace add
<owner/repo|url|path>` then `codex plugin add
<plugin>@<marketplace>`; `marketplace list|upgrade|remove`,
`remove`. Per-repo enable: `[plugins."<plugin>@<marketplace>"]
enabled=true` in `.codex/config.toml`. This tree ships the
`.codex-plugin/plugin.json` compatibility fallback and deliberately
no root Agent Plugins manifest: adding `extensions.com.openai` later
replaces the overlay entirely (no merge), so never split OpenAI
settings across both.

### Grok Build

No native manifest: Grok reads `.claude-plugin/` marketplaces,
plugins, skills, hooks, and MCPs as-is, and `grok plugin validate`
passes on this tree through that path. Skill paths
`./.grok/skills/` (up to repo root), `~/.grok/skills/`, plugin
`skills/`, plus Claude-compat and `~/.agents/` dirs. `grok plugin
install <git|user/repo|path>[@ref][#subdir]`, `update`, `uninstall`,
`enable|disable`, `validate`, `tag [--push]` (version to release
tag), `marketplace add|remove|update`. Discovery check `grok inspect`
(collisions rename to `/user:`).

### Kimi Code

Manifest `kimi.plugin.json` (wins) or `.kimi-plugin/plugin.json`;
required: `name` only (`[a-z0-9][a-z0-9_-]{0,63}`). `interface`
allows only `displayName`, `shortDescription`, `longDescription`,
`developerName`, `websiteURL` — never `capabilities` or
`defaultPrompt` (Codex-only; Kimi ignores them). `skills` takes `./`
paths (omitted = root `SKILL.md` is the single root); `agents`
omitted means `agents/` auto-discovers, so never ship a stray `.md`
under `agents/`. Budgets: `systemPrompt`/`systemPromptPath` 32 KB
each, 64 KB total. TUI-only management: `/plugins install
<path|zip|github-url>` (repo, `/tree/<ref>`,
`/releases/tag/<tag>`, `/commit/<sha>`), `list|info|enable|disable|
remove|reload`; `/reload` or `/new` after any change; installs copy
to `$KIMI_CODE_HOME/plugins/managed/<id>/` (per-user only, source
edits need reinstall). No manifest CLI: `kimi doctor` checks
`config.toml`/`tui.toml` only — diagnostics live in `/plugins info`.
Custom catalogs use marketplace JSON v2 (`{"version": "2",
"plugins": [{"id", "source", …}]}` — this tree ships
`.kimi-plugin/marketplace.json`; browse via `/plugins marketplace
<path|url>` or `KIMI_CODE_PLUGIN_MARKETPLACE_URL`). Plugin agents
live in `agents/*.md` (`description` required;
`tools`/`disallowedTools`/`subagents` allowlists; `override: true`
replaces built-ins). Full field tables:
`skill-authoring/references/kimi-packaging.md`.

### Muse Code

Project skill `<repo>/.agents/skills/<id>/SKILL.md`; personal
installs stage in the workspace and hand the user `muse skills
install <dir>` (never write `$CONFIG_DIR/skills`,
`~/.claude/skills`, `~/.codex/skills`, or `$HOME/.agents/skills`
directly). Native plugin manifest `.muse-plugin/plugin.json`
(`schemaVersion: 1`, `name`, `displayName`, `version`,
`description`, `compat:{source:"native",
manifestDir:".muse-plugin"}`,
`capabilities:{skills,commands,hooks,mcpServers,reminders}`); IDs
`^[a-z0-9][a-z0-9._-]{0,79}$`, reserved `loop`, `muse-core`; never
emit `tools|agents|outputStyles|settings|apps`. Lifecycle: `muse
skills validate <dir>` then `muse plugins validate <dir>` (clean =
`valid:true`, zero diagnostics), then `muse plugins install <path>`
/ `muse skills install <dir>`; manage with
`list|inspect|enable|disable|update|uninstall|remove`, `import
--from claude|codex`. Hooks live in `.muse/hooks.json`, no CLI to
manage.

### Antigravity (`agy`)

Root `plugin.json` is this tree's agy manifest: closed field set
`name`, `description`, `logo` (relative path only),
`suggestedPrompts` (at most 3, exactly 3 recommended), `displayName`,
`version` (semver), `disabled`. Never emit `author`, `homepage`,
`keywords`, or `repository` — the loader silently discards them.
Identity is the install directory name, never manifest `name`; `agy
plugin validate <path>` before install, `install
<local-dir|git-url|plugin@marketplace>`, `list|enable|disable|
uninstall`. A new plugin directory needs a restart (`agy install`
is shell-PATH setup, not plugin install). Skill frontmatter: `name`
+ `description` (WHAT+WHEN, third person), both required.

### Amp

No manifest. Skills are directories; dedupe by frontmatter `name`,
first wins across 11 precedence levels (`~/.config/agents/skills/`
first, workspace repo last). Install the `skills/` container, never
a single skill directory: `amp skill add
<owner/repo[/path]|git-URL|local-path>` (`--global` targets
`~/.config/agents/skills/`) copies whole skill directories from a
container but SKILL.md only from a lone skill dir, dropping
`references/`. Inspect with `amp skill info|list`; remove with `amp
skill remove`. No `validate` subcommand. Caps: 200 skills/repo,
200 files/skill, 10 MiB/file, 25 MiB/skill and repo. Skill MCP
comes from a sibling `mcp.json` or frontmatter `mcpServers`
(frontmatter wins); tools stay hidden until the skill loads. Amp
plugins are TypeScript modules
(`registerSkill`), not manifests — a directory plugin never
auto-scans `skills/`.

### Cursor

Single-plugin layout: root `.cursor-plugin/plugin.json` (only `name`
required, `^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$`; recommended
`displayName description version author publisher homepage repository
license logo keywords category tags`) + root `skills/`, indexed by
repo-root `.cursor-plugin/marketplace.json` (required `name`,
`plugins[]`; entries `{name, source, description?}` — no `version`,
no `category`). Both files follow the official Cursor schemas
(author/owner take `name` + `email` only, never `url`).
`cursor-agent plugin marketplace add <gitUrl> | list | remove |
update <nameOrUrl>`; no local-path install, no validator (`update`
re-indexes). Skill dirs: `.cursor/skills/<name>/` or
`~/.cursor/skills/<name>/` — never `~/.cursor/skills-cursor/`
(system-owned).

### OpenCode

No manifest. Skill paths: `.opencode/skills/`,
`~/.config/opencode/skills/`, `.claude/skills/`,
`~/.claude/skills/`, `.agents/skills/`, `~/.agents/skills/`
(project paths walk to the worktree). Frontmatter allowlist is
`name`, `description`, `license`, `compatibility`, `metadata` ONLY
— everything else is silently ignored, so manual-only flags and
`argument-hint` vanish here. `name`:
`^[a-z0-9]+(-[a-z0-9]+)*$`, 1–64 chars, equals the directory;
`description` 1–1,024 chars. Gate with `opencode.json`
`{"permission":{"skill":{"<pattern>":"allow|ask|deny"}}}` (deny
hides the skill; patterns evaluate `findLast`, so order catch-all
first) or per-agent `tools.skill=false`. No install CLI, no
validator — checklist only (caps `SKILL.md`, name+description,
unique names, no deny).

### Frontmatter contract

Behavior that must survive all targets lives in `description` +
body, never in extra frontmatter. (Grok defaults `name` to the
directory and `description` to the first body paragraph when absent.)

| Field | Claude | Codex | Grok | Kimi | Muse | agy | Amp | Cursor | OpenCode |
|---|---|---|---|---|---|---|---|---|---|
| `name`, `description` | required | required | required | required | required | required | required | required | required |
| `license` | honored | — | ignored | unknown | accepted | — | — | — | honored |
| `argument-hint` | display | — | display | unknown (`arguments:` instead) | accepted | — | — | — | ignored |
| `disable-model-invocation` | honored | n/a (yaml flag) | honored | honored (kebab) | accepted | none observed | none observed | honored (default) | ignored |
| `user-invocable` | honored | — | literal `true` only | unknown | accepted | — | — | — | ignored |
| `when_to_use` (+aliases) | appended trigger | ignored | `when-to-use` trigger | `whenToUse` trigger | — | — | — | — | ignored |
| `paths` | file gate | — | hide-until-touched | — | — | — | — | — | ignored |
| `allowed-tools` | honored | — | parsed, inert | unknown | unconfirmed | — | — | — | ignored |
| `metadata` | honored | — | UI-only | unknown | unconfirmed | — | — | — | honored (string map) |
| `compatibility` | honored | — | ignored | unknown | unconfirmed | — | — | — | honored |

"Unknown" means Kimi documents neither the key nor its unknown-key
handling — load-test via `/plugins info` before relying on it.
"Unconfirmed" means `muse skills validate` accepts the shipped keys
(no unknown fields) but these three were not in the validated files.

## Validation

```sh
mise run docs           # regenerate derived pages
mise run lint           # skill + manifest validator (description budget, catalog, lockstep)
mise run docs:check     # generated files not stale
claude plugin validate <dir> --strict  # exits 0 pass / 1 fail / 2 tool error; --json for CI (needs CC ≥2.1.259)
# A directory auto-selects marketplace.json, else plugin.json, else skills/agents/commands components.
# A marketplace run does not open plugin files and a plugin run does not check a root SKILL.md — validate ./skills too.
# /doctor prompt-audit (in-session, needs CC ≥2.1.283): flags CLAUDE.md/skills/agents prompts written for older models. Run after any model-family migration before re-baselining.
grok plugin validate    # Grok manifest loads (native or .claude-plugin/)
agy plugin validate     # agy skill inventory + manifest shape
muse skills validate <skill-dir>     # per skill, extras accepted
muse plugins validate <symlink-free-tree>  # .muse-plugin manifest; fails closed on the pre-existing .github/CLAUDE.md symlink, so validate a copy without it
skills-ref validate     # Agent Skills spec shape (name, 1024-char description, no XML)
amp skill list          # Amp discovery check (no validator; list/info only)
# Kimi: no manifest CLI — /plugins info <id> diagnostics + /plugins reload in TUI (`kimi doctor` is config-only)
# Codex: codex plugin marketplace list  # entry resolves after marketplace add
# OpenCode/Cursor: no skill validator — OpenCode troubleshooting checklist (caps SKILL.md, name+description, unique names, permission.skill); Cursor surfaces via Customize → Skills
```

Description and trigger-field changes also run the checklist in
`skills/tailrocks-skill-audit/references/testing-doctrine.md`.

Run each once. Validator repair permits at most two matched, in-scope passes.
Stop immediately for an unmatched error, unavailable tool, or exhausted bound;
preserve current state, report exact failure and prior mutations, and never
claim completion.

Per-skill eval trees are forbidden. Behavioral claims use durable evidence
records and deterministic acceptance checks.

## Update-mode obligations

Editing an existing skill adds constraints beyond the create path:

- **Check the cited evidence record before rewording** a gate, rejection rule,
  or "complete when" clause — load-bearing lines are not edited casually.
- **Strengthen over append.** Prefer making an existing section state
  the new obligation to adding a sibling section that gestures at it.
- **A router has at most 200 body lines.** At the limit, the next addition
  replaces or extracts existing material.
- **Rerun every affected deterministic acceptance check** after a router
  change — a new section changes every behavior in the file, so the check
  nearest the edit is not the only one at risk.
- A check that misses one element while everything else is correct usually
  exposes a signposting defect — look at where the
  requirement sits in the file before rewriting what it says.
- Generated public docs are refreshed by `mise run docs`, never edited.
