# Changelog

## 0.29.4 - 2026-11-20

- Complete the shared model API controls and reasoning-state guidance.
- State the native discovery limits for user-invoked workflows.
- Preserve the portable author in the Claude manifest and validate that match.
- Use the shared release procedure with full commit pins and optional tags.

## 0.29.3 - 2026-11-20

- Refresh the shared validator for user-invoked policy packages and the
  retirement of the standalone Vitalik Mode package.

## 0.29.2 - 2026-11-20

- Enforce portable description characters and the shared 500-line skill limit.
- Clarify native Grok confirmation and record Antigravity installation evidence.
- Align authoring references with generated native manifests and the shared contract.

## 0.29.1 - 2026-11-20

- Replace backtracking in package validation with bounded parsing.
- Commit and ship the resolved dependency graph with pinned Bun 1.4.4.

## 0.29.0 - 2026-11-20

- Documented pinned native installs across the Tailrocks hosts, including
  OpenCode V2, Amp, Antigravity, omp, and pi.
- Added shared model guidance, portable skill metadata, and native package
  validation.
- Aligned generated CI on Velnor Actions 0.1.80 with offline link and anchor
  checks.

## 0.28.1 - 2026-10-08

Applied the common active-package structure on branch
`standardize/package-rewrite`. Rewrote all four skills:

- Rewrote `plugin.json` as the portable Agent Plugins 1.0.0 manifest.
  It is now the source of truth for name, version, and description.
- Trimmed `.claude-plugin/plugin.json` to name, version, and
  description.
- Rewrote `.kimi-plugin/plugin.json` with `skills` set to `./skills/`
  and a four-field interface block.
- Removed the component marketplace files
  `.claude-plugin/marketplace.json` and
  `.kimi-plugin/marketplace.json`. The central `tailrocks`
  marketplace is now the only catalog.
- Removed the legacy host manifests `.codex-plugin/`,
  `.muse-plugin/`, and `.cursor-plugin/`, plus the `.agents/`
  directory. Codex uses the portable manifest. Muse and Grok read
  the Claude manifest through their adapter paths.
- Removed the dead root files `catalog.json` and `INSTALL.md`, the
  generated docs/skills copies, and docs/index.json. Nothing
  references them.
- Removed the root `scripts/` tree and the `skill-authoring/`
  doctrine source. Each skill now keeps its own references.
- Removed the audit report program and the create scaffold program.
  The audit skill assigns finding IDs directly. The create skill
  copies the stored template with shell commands.
- Moved the authoring template to
  `skills/tailrocks-skill-create/assets/skill-template/SKILL.md.template`.
  It is no longer a discoverable `SKILL.md`.
- Removed the evaluation doctrine
  (`testing-doctrine.md`), the evidence-contract template, and all
  model-trial, baseline, and repair-attempt-limit requirements.
- Rewrote all four `SKILL.md` files in the common body order and in
  ASD-STE100 Simplified Technical English, Issue 9 rules.
- Resolved the merger conflict: an authorized refactor may now
  change names and structure after it records every consumer.
- Added `.alint.yml`, pinned to the shared active profile.
- Restructured `README.md` into the eight required sections.
- Replaced `INSTALL.md` with the six standard guides under `docs/`.
- Added `AGENTS.md` and `.github/PULL_REQUEST_TEMPLATE.md`.
- Regenerated CI with Velnor Actions 0.1.4.
- Replaced the `.github/CLAUDE.md` symlink with a regular pointer
  file. Installers that reject symlinks now accept the package.

## 0.28.0 - 2026-10-06

Four-skill package at commit `95348b233ae53b4ea1f805b5e03843cbebcdbacd`
("CLI-only scope, drop desktop-app doctrine"). All four skills are
manual-only and need an explicit human command.
