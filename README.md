# tailrocks-skill-authoring-skills

One portable package with four skills. The skills create, audit,
update, and refactor agent skills. Each skill keeps clear ownership,
clear contracts, and clear routing. All four skills are manual-only
and need an explicit human command.

## Skills

| Skill | Task |
| --- | --- |
| [`tailrocks-skill-audit`](skills/tailrocks-skill-audit/SKILL.md) | Audit one skill or the portfolio. Read-only. |
| [`tailrocks-skill-create`](skills/tailrocks-skill-create/SKILL.md) | Make a new skill for a new responsibility. |
| [`tailrocks-skill-update`](skills/tailrocks-skill-update/SKILL.md) | Fix a skill in place. Contract unchanged. |
| [`tailrocks-skill-refactor`](skills/tailrocks-skill-refactor/SKILL.md) | Split, merge, rename. Behavior preserved. |

Each skill body lives in its own directory. Read
[`skills/tailrocks-skill-audit/SKILL.md`](skills/tailrocks-skill-audit/SKILL.md)
for one complete example.

## Install

Install one complete package in your host's chosen scope. The [Tailrocks
catalog](https://github.com/tailrocks/tailrocks-skills) selects the source commit.
Use the route for your host.

| Host | Native install route |
| --- | --- |
| Claude Code | [Marketplace plugin](docs/installation.md#claude-code) |
| Codex | [Marketplace plugin](docs/installation.md#codex) |
| Grok Build | [Marketplace plugin](docs/installation.md#grok-build) |
| Muse Code | [Marketplace snapshot](docs/installation.md#muse-code) |
| omp | [Marketplace plugin](docs/installation.md#omp) |
| OpenCode V2 | [Git package](docs/installation.md#opencode) |
| Amp | [Directory plugin](docs/installation.md#amp) |
| Antigravity | [Local plugin installer](docs/installation.md#antigravity) |
| pi | [Git package](docs/installation.md#pi) |
| Kimi Code | [Marketplace manager](docs/installation.md#kimi-code) |

Run these commands to install from the Claude Code marketplace.

```sh
claude plugin marketplace add tailrocks/tailrocks-skills
claude plugin install tailrocks-skill-authoring-skills@tailrocks --scope user
```

See [runtime requirements](docs/runtime.md) for tools and files the skills use.

## Use

Select the owner for the requested work. To audit one skill on
Claude Code (session):

```text
/tailrocks-skill-authoring-skills:tailrocks-skill-audit tailrocks-review-pr
```

The skill returns a report with findings, evidence, and named fixes.
The skill is read-only. It never edits the audited skill. See
`docs/usage.md` for every owner, more examples, and the lifecycle
boundary.

## Documentation

- [Package guide](docs/README.md)
- [Installation](docs/installation.md)
- [Usage](docs/usage.md)
- [Runtime requirements](docs/runtime.md)
- [Model settings](docs/models.md)
- [Compatibility and verification](docs/compatibility.md)
- [Maintenance](docs/maintenance.md)

## Update and remove

Use [the host's update and removal steps](docs/installation.md).
For a pinned Git package, install the new catalog revision and use one copy in
the chosen scope.

## Contribute

Open an issue or a pull request on GitHub. Write all new and changed
prose in ASD-STE100 Simplified Technical English, Issue 9 rules. Before
the pull request, run `alint check`, the strict-JSON check, and the
frontmatter check. See `docs/maintenance.md` for the full
list. Never add evaluation content.

## License

Apache License, Version 2.0. See `LICENSE` for the full text.
