# Install

One package with exactly four public skills:

- `tailrocks-skill-audit` checks or reviews one skill or the portfolio
  and reports defects. Read-only.
- `tailrocks-skill-create` makes a new agent skill from evidence.
- `tailrocks-skill-refactor` splits, merges, or restructures skills
  with behavior and public contracts frozen.
- `tailrocks-skill-update` fixes or improves a skill in place.

Their skill-local references ship with this package; no separate
source-collection checkout or installation is required. Install the
complete package or release archive. Do not copy an individual
`SKILL.md` out of its skill directory.

All four skills are manual-only: the user selects them explicitly on
every client. Selection never authorizes side effects beyond each
skill's stated authority.

Three rules apply to every client below:

- Discovery is separate from selection, and selection is separate from
  operation permission. Loading or selecting a skill never authorizes
  filesystem, network, or external-system side effects.
- Prefer the client's native marketplace or plugin path over hand-copying
  skill directories. The native path validates manifests and tracks
  versions for update and removal.
- Revalidate commands against the installed build before relying on them.
  A manifest file alone does not prove command support.

## Install from GitHub

1. **Vet first.** Read the manifests (root `plugin.json`,
   `.claude-plugin/`, `.codex-plugin/`, `.agents/plugins/`,
   `.muse-plugin/`, `.cursor-plugin/`, `.kimi-plugin/`), the four
   `skills/*/SKILL.md` files, and any hooks or MCP configuration.
   This package ships skills and references only; it adds no hooks
   and no MCP servers.
2. **Pin the source.** Prefer a tag or commit SHA over a floating branch
   when the client accepts a ref.
3. **Add the marketplace, then install:**

```sh
# Claude Code
claude plugin marketplace add tailrocks/tailrocks-skill-authoring-skills
claude plugin install tailrocks-skill-authoring-skills@tailrocks-skill-authoring-skills --scope user

# Codex CLI
codex plugin marketplace add tailrocks/tailrocks-skill-authoring-skills
codex plugin add tailrocks-skill-authoring-skills@tailrocks-skill-authoring-skills

# Antigravity CLI (new plugin directories need a restart after install)
agy plugin install https://github.com/tailrocks/tailrocks-skill-authoring-skills

# Grok Build (explicit trust required)
grok plugin install tailrocks/tailrocks-skill-authoring-skills --trust

# Cursor CLI (git URL only; re-index with update after upstream changes)
cursor-agent plugin marketplace add https://github.com/tailrocks/tailrocks-skill-authoring-skills
```

```text
# Kimi Code CLI: run in the TUI session, not the shell
/plugins install https://github.com/tailrocks/tailrocks-skill-authoring-skills
```

Pin a Kimi install with a ref URL:

```text
/plugins install https://github.com/tailrocks/tailrocks-skill-authoring-skills/tree/<tag-or-sha>
/plugins install https://github.com/tailrocks/tailrocks-skill-authoring-skills/releases/tag/<tag>
/plugins install https://github.com/tailrocks/tailrocks-skill-authoring-skills/commit/<sha>
```

```sh
# Amp (install the skills/ container — a lone skill dir imports SKILL.md only)
amp skill add tailrocks/tailrocks-skill-authoring-skills/skills --global
```

Muse and OpenCode have no remote-URL route for this package:
install from a local checkout or extracted release archive using
their sections below.

4. **Least scope.** User scope enables the plugin everywhere; project or
   local scope limits it to one repository. Trial in one repository first.
5. **Verify after install.** List what the client loaded and confirm the
   selector resolves before real work:

```sh
claude plugin list
codex plugin list
agy plugin list
grok plugin list
muse skills list
amp skill list
cursor-agent plugin marketplace list
```

6. **Maintain.** Update the marketplace and the plugin on a cadence;
   remove what you stop using:

```sh
claude plugin marketplace update tailrocks-skill-authoring-skills
claude plugin update tailrocks-skill-authoring-skills@tailrocks-skill-authoring-skills
claude plugin uninstall tailrocks-skill-authoring-skills@tailrocks-skill-authoring-skills
codex plugin marketplace upgrade tailrocks-skill-authoring-skills
codex plugin remove tailrocks-skill-authoring-skills@tailrocks-skill-authoring-skills
agy plugin uninstall tailrocks-skill-authoring-skills
grok plugin update tailrocks-skill-authoring-skills
grok plugin uninstall tailrocks-skill-authoring-skills
amp skill remove tailrocks-skill-audit
cursor-agent plugin marketplace remove tailrocks-skill-authoring-skills
cursor-agent plugin marketplace update tailrocks-skill-authoring-skills
```

```text
# Kimi Code CLI: run in the TUI session, not the shell
/plugins remove tailrocks-skill-authoring-skills
/plugins reload
```

## Codex CLI

Install via the marketplace route above, or point the marketplace source
at a local checkout or extracted package. The standalone fallback is
`.agents/skills/<name>/SKILL.md` in the project or
`~/.agents/skills/<name>/SKILL.md` for the user.

Invoke with the bare `$<skill-name>` mention or the `/skills` picker:

```text
$tailrocks-skill-audit my-skill
$tailrocks-skill-create checkout flow
$tailrocks-skill-update my-skill
$tailrocks-skill-refactor my-skill split
```

Codex documents no `$plugin:skill` colon form; same-named skills from
different sources both appear in the selectors for the user to pick.

Every `agents/openai.yaml` in this package sets
`policy.allow_implicit_invocation: false`, which permits explicit
selection only.

## Claude Code

Install via the marketplace route above in the desired scope
(`--scope user`, `project`, or `local`). For a local marketplace, pass
its path instead of `tailrocks/tailrocks-skill-authoring-skills`. The
standalone fallback is `.claude/skills/<name>/SKILL.md` in the project or
`~/.claude/skills/<name>/SKILL.md` for the user.

Invoke with the plugin namespace:

```text
/tailrocks-skill-authoring-skills:tailrocks-skill-audit my-skill
/tailrocks-skill-authoring-skills:tailrocks-skill-create checkout flow
/tailrocks-skill-authoring-skills:tailrocks-skill-update my-skill
/tailrocks-skill-authoring-skills:tailrocks-skill-refactor my-skill split
```

An explicit slash-skill mention later in a message grants message-scoped
selection permission. It is not a plain-text mention. This package sets
`disable-model-invocation: true` with `user-invocable: true`: explicit
slash selection only, never model-initiated.

## Kimi Code CLI

Install via the TUI plugin manager route above, using the bundled
`.kimi-plugin/plugin.json` manifest (`/plugins` opens the manager).
The CLI copies the install to
`$KIMI_CODE_HOME/plugins/managed/tailrocks-skill-authoring-skills/` and
always runs from that copy; reinstall after upstream changes. Run
`/reload` or start a new session after install, enable, disable, or
remove. Plugins are per-user only; project scope is unsupported.
Removal deletes the installation record but leaves the managed copy on
disk.

A custom catalog ships as `.kimi-plugin/marketplace.json`
(marketplace JSON v2): browse it with `/plugins marketplace
<path|url>` or set `KIMI_CODE_PLUGIN_MARKETPLACE_URL`.

The fallback is discovered skill directories: `.kimi-code/skills` and
`.agents/skills` in the project, `$KIMI_CODE_HOME/skills` (normally
`~/.kimi-code/skills`) and `~/.agents/skills` for the user, plus
`extra_skill_dirs` in `config.toml`.

Invoke with the direct selector (`/skill:<name>` is the only form):

```text
/skill:tailrocks-skill-audit my-skill
/skill:tailrocks-skill-create checkout flow
/skill:tailrocks-skill-update my-skill
/skill:tailrocks-skill-refactor my-skill split
```

Skill nesting is limited to three levels. `kimi -p` sends a plain
prompt and is not deterministic skill selection.

## Antigravity CLI (`agy`)

Install via the remote URL route above, or pass a local checkout path.
The root `plugin.json` is this package's agy manifest. The skill-dir
fallback is `<workspace>/.agents/skills/<name>/SKILL.md`.

Invoke with `/<skill-name>`:

```text
/tailrocks-skill-audit my-skill
```

Use `/skills` to inspect collisions. Antigravity observes no
invocation-gating field: on this client the guard sentence in each
description ("Use only when the user explicitly requests this
skill.") alone holds the manual-only boundary. A new plugin directory
needs a restart; enable, disable, and uninstall apply live.

## Grok Build

Install via the plugin route above. Grok reads this package's
`.claude-plugin/` marketplace as-is (no native `.grok-plugin/`
manifest needed). Grok requires explicit plugin trust before loading
plugin skills. If policy leaves the plugin disabled, enable it:

```sh
grok plugin enable tailrocks-skill-authoring-skills
```

The fallback is `.grok/skills` in the project or `~/.grok/skills` for
the user. Invoke from the slash menu; the qualified form is stable when
a name collides:

```text
/tailrocks-skill-authoring-skills:tailrocks-skill-audit my-skill
/tailrocks-skill-authoring-skills:tailrocks-skill-create checkout flow
```

This package keeps `user-invocable: true` (literal `true` is required)
and `disable-model-invocation: true`. Do not treat `allowed-tools`
metadata as an enforced tool-permission boundary; Grok parses it but
never enforces it.

## Muse Code

Install from a local checkout or extracted package using the bundled
`.muse-plugin/plugin.json`:

```sh
muse plugins validate /path/to/tailrocks-skill-authoring-skills --json
muse plugins install /path/to/tailrocks-skill-authoring-skills --scope user --json
```

The fallback is `.agents/skills/<name>/SKILL.md` in the project,
`$XDG_CONFIG_HOME/muse/skills`, or `~/.agents/skills` for the user.
Check discovery natively:

```sh
muse skills list
muse skills inspect tailrocks-skill-audit
muse skills validate ./skills/tailrocks-skill-audit
```

In the TUI, type `/` to open the skill picker and invoke the installed
skill with its shown slash shortcut:

```text
/tailrocks-skill-audit my-skill
```

A qualified `/<plugin>:<skill>` form has been observed in third-party
pickers but is not in the official docs; verify before relying on it.
A plain `muse exec` prompt is not deterministic skill selection.

## Cursor CLI

Install via the marketplace route above (git URL; the repo-root
`.cursor-plugin/marketplace.json` indexes the single plugin), or copy
each complete skill directory, including its references, into
`.cursor/skills` or `.agents/skills` in the project, or
`~/.cursor/skills` or `~/.agents/skills` for the user. Never write to
`~/.cursor/skills-cursor/` (system-owned).

Invoke with `/<skill-name>` from the `/` menu:

```text
/tailrocks-skill-audit my-skill
```

This package's `disable-model-invocation: true` matches Cursor's
explicit-only default. Option+Enter pins a skill as a session Custom
Mode. Skill selection from the `/` menu is a CLI feature, not
editor-only; verify the actual executable and version with local help.

## Amp Code

Install the `skills/` container from the repo (remote or local path).
Do not install a lone skill directory: `amp skill add <skill-dir>`
imports `SKILL.md` only and drops `references/`, while the container
import copies each skill whole.

```sh
amp skill add tailrocks/tailrocks-skill-authoring-skills/skills --global
amp skill add /path/to/tailrocks-skill-authoring-skills/skills --target /tmp/probe
amp skill info tailrocks-skill-audit
amp skill list
```

Request the skill by name in the prompt; Amp selects by
name+description with first-`name`-wins precedence across its 11
source levels:

```text
Use the tailrocks-skill-audit skill on my-skill. Report only.
```

Amp observes no invocation-gating field: on this client the guard
sentence in each description alone holds the manual-only boundary.
Caps: 200 files per skill, 10 MiB per file, 25 MiB per skill and
repo.

## OpenCode

Copy all four skill directories with their bundled references into the
project `.opencode/skills/` directory:

```sh
mkdir -p .opencode/skills
cp -R /path/to/tailrocks-skill-authoring-skills/skills/. .opencode/skills/
```

Request the skill by name in the prompt; do not use an undocumented slash
command:

```sh
opencode run "Use the tailrocks-skill-audit skill on my-skill. Report only."
```

OpenCode ignores `disable-model-invocation` and `user-invocable`
frontmatter; use `permission.skill` and the skill body as the safety
boundary. Configure skill approval separately:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "skill": {
      "tailrocks-skill-audit": "ask",
      "tailrocks-skill-create": "ask",
      "tailrocks-skill-refactor": "ask",
      "tailrocks-skill-update": "ask"
    }
  }
}
```

## Compatibility record

Record one row per client and route. The default outcome is unverified.
Record the reason for every unverified result. Do not call a route
unsupported merely because its binary is absent. Do not call a route
verified because a different client accepted the same files.

| Client | Version | Installation route | Loaded skill path | Direct selector | Named prose | Resources | Outcome |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | 0.160.0 | plugin marketplace | sandbox install, enabled, 0.28.0 | not run | not run | not run | verified: `marketplace add` + `add` resolve the `.agents` entry (CODEX_HOME sandbox); invocation not run |
| Codex CLI | 0.160.0 | standalone `.agents/skills` | not run | not run | not run | not run | unverified: not run in this environment |
| Claude Code | 2.1.289 | plugin marketplace | not run | not run | not run | not run | unverified: install not run; `plugin validate --strict` passes |
| Claude Code | 2.1.289 | standalone `.claude/skills` | not run | not run | not run | not run | unverified: not run in this environment |
| Muse Code | 1.4.2 | `.muse-plugin` route | 4 skills resolve, `valid:true` | not run | not run | not run | verified: `skills validate` green per skill; `plugins validate` green on a symlink-free copy (repo root fails closed on the pre-existing `.github/CLAUDE.md` symlink); install not run |
| Muse Code | 1.4.2 | standalone `.agents/skills` | not run | not run | not run | not run | unverified: not run in this environment |
| Antigravity CLI | 1.2.17 | root `plugin.json` route | 4 skills processed by `plugin validate` | not run | not run | not run | unverified: install not run (needs restart); `plugin validate` passes |
| Antigravity CLI | 1.2.17 | CLI skill paths | not run | not run | not run | not run | unverified: not run in this environment |
| Cursor CLI | 2026.09.18 | `.cursor-plugin` marketplace | not run | not run | not run | not run | unverified: import not run (git-remote round-trip); both files match the official Cursor schemas |
| Cursor CLI | 2026.09.18 | project and user skill dirs | not run | not run | not run | not run | unverified: not run in this environment |
| Grok Build | 1.0.46 | plugin source (Claude-compat) | manifest valid via `.claude-plugin/` | not run | not run | not run | unverified: install not run; `plugin validate` passes |
| Grok Build | 1.0.46 | native `.grok/skills` | not run | not run | not run | not run | unverified: not run in this environment |
| Kimi Code CLI | 2.1.1 | plugin manager remote URL | not run | not run | not run | not run | unverified: TUI-only, not run headless; `interface` holds Kimi-only fields |
| Kimi Code CLI | 2.1.1 | current discovered dirs | not run | not run | not run | not run | unverified: not run in this environment |
| OpenCode | v2.0.20 | `.opencode/skills` copy | not run | not run | not run | not run | unverified: not run in this environment; no validator exists |
| Amp Code | 0.0.1791216048 | `skill add` on `skills/` container | 4 skills, full contents (`--target` probe) | n/a (model-selected) | not run | full copy observed | verified: container import copies each skill whole; lone-dir import ships SKILL.md only |
