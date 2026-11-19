# Skill authoring guides

This package holds four skills. The skills create, audit, update,
and refactor agent skills. Each skill keeps clear ownership, clear
contracts, and clear routing.

All four skills are manual-only and need an explicit human command:

- `tailrocks-skill-audit` audits one skill or the portfolio. It is
  read-only.
- `tailrocks-skill-create` makes a new skill for a new
  responsibility.
- `tailrocks-skill-update` fixes a skill in place. The public
  contract stays unchanged.
- `tailrocks-skill-refactor` splits, merges, or renames skills. The
  behavior stays preserved.

## Guides

- [Installation](installation.md) gives the native host routes.
- [Usage](usage.md) shows how to select a skill and use its arguments.
- [Runtime requirements](runtime.md) lists the tools and packaged resources.
- [Package structure](architecture.md) explains file ownership.
- [Model choices](models.md) explains role selection and effort.
- [Compatibility](compatibility.md) records host behavior and limits.
- [Verification](verification.md) lists package checks and observed evidence.
- [Maintenance](maintenance.md) gives generator and release procedures.
- [Troubleshooting](troubleshooting.md) helps diagnose installation or use.

## Skills

| Skill | Task |
| --- | --- |
| `tailrocks-skill-audit` | Audit one skill or the portfolio. Read-only. |
| `tailrocks-skill-create` | Make a new skill for a new responsibility. |
| `tailrocks-skill-update` | Fix a skill in place. Contract unchanged. |
| `tailrocks-skill-refactor` | Split, merge, rename. Behavior preserved. |

Each skill body lives in its own directory under `skills/`. Read
`skills/tailrocks-skill-audit/SKILL.md` for one complete example.

## Requirements

See [runtime requirements](runtime.md) for the tools and files the skills use.
