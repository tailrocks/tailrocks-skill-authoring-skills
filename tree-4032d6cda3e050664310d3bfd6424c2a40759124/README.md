# tailrocks-skill-authoring-skills

Skill creation, updating, auditing, and structural refactoring skills for Tailrocks.

Skill source is under `skills/`. The umbrella registry is [tailrocks-skills](https://github.com/tailrocks/tailrocks-skills).

## Install

Four manual-only skills (`tailrocks-skill-audit`,
`tailrocks-skill-create`, `tailrocks-skill-refactor`,
`tailrocks-skill-update`), one package. Per-client install, update,
remove, and verify commands live in [INSTALL.md](INSTALL.md).

```sh
# Claude Code
claude plugin marketplace add tailrocks/tailrocks-skill-authoring-skills
claude plugin install tailrocks-skill-authoring-skills@tailrocks-skill-authoring-skills

# Codex CLI
codex plugin marketplace add tailrocks/tailrocks-skill-authoring-skills
codex plugin add tailrocks-skill-authoring-skills@tailrocks-skill-authoring-skills
```

```text
# Kimi Code CLI: run in the TUI session, not the shell
/plugins install https://github.com/tailrocks/tailrocks-skill-authoring-skills
```

```sh
# Verify before release (all must pass)
claude plugin validate --strict ./
grok plugin validate
agy plugin validate
muse skills validate ./skills/tailrocks-skill-audit   # + create, refactor, update
```
