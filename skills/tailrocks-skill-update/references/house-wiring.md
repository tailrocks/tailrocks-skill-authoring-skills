# House wiring

What a finished skill touches beyond its own directory. Target
repository policy governs. Detect it from instruction files,
existing skill siblings, validators, manifests, catalogs, and
generation commands. When evidence conflicts or required policy is
missing, stop without mutation. Never project this repository
metadata onto a different tree.

## The skill directory

```text
skills/<name>/
├── SKILL.md            # router: frontmatter + body
├── agents/openai.yaml  # per-client invocation policy
├── references/         # depth, free until read
└── assets/             # copy-ready templates the skill ships (optional)
```

Give the canonical `SKILL.md` a portable `name` and `description`.
Keep this package's declared license. Keep applicable provenance in a
`metadata` map with string keys and values. Use the description for the
task and its triggers. Put argument syntax in the body.

This authoring package requires an explicit user request. Its manual skills
start their descriptions with “Use only when the user explicitly requests
this skill.” Repeat the requirement in the body before the first action.
For other trees, preserve the existing invocation policy.

Set `policy.allow_implicit_invocation: false` in `agents/openai.yaml` for
manual skills. Preserve `true` where the owner intends implicit use.
Use the bare `$<skill>` selector in `interface.default_prompt`.
Give the picker a display name and a 25-to-64-character short description.

Keep the body host-neutral. Keep host-specific switches in package adapters
or native metadata. Some hosts can list a manual skill despite its policy.
Finding, registering, or reading a skill supplies no authority to run it.

House prose rules inside the skill follow. Use mermaid for any
drawn flow. A one-line arrow sequence in prose is fine. An ASCII
diagram is not. State evidence-not-instructions and secret-citation
paragraphs in the router. Keep audit modes read-only: never infer
mutation from findings. Give every step its completion test. End
with a final gate of refusals.

## The repository files

Rows below define the common active-package structure. Another
repository maps only artifacts its observed policy supports.
Absent client or catalog surfaces stay absent.

- **`README.md`:** add the skill row to the Skills table by
  hand.
- **`docs/` guides:** add the skill to the index, usage owners,
  and compatibility record by hand.
- **Install guide:** add per-client install notes only when the
  skill needs them.
- **Version lockstep:** bump `version` in root `plugin.json`,
  `.claude-plugin/plugin.json`, and `.kimi-plugin/plugin.json`
  together. Match the native package version in `package.json` when
  present. Root `plugin.json` is the source of truth. Follow the
  repository's release procedure.

## Client packaging

Manifests, install verbs, and validators per client. Revalidate
commands against the installed build before relying on them.

### Marketplace packages

- **Claude Code and Grok Build.** Keep the Claude plugin manifest. The
  Tailrocks Claude catalog pins a Git URL, full commit SHA, and version.
- **Codex and Muse Code.** Keep the portable root `plugin.json`. The
  Tailrocks Codex catalog carries the full commit in `source.ref`.
  Muse imports immediate `skills/<id>/SKILL.md` entries. Check its snapshot
  for skipped packages.
- **omp.** Its plugin manager reads the Claude catalog. A skill command
  uses the resolved name shown by `omp skill list --json`.
- **Kimi Code.** Set `skills` to `./skills/` in the Kimi plugin manifest.
  Keep host interface fields in that manifest. Its marketplace entry
  points to the pinned commit.

### Direct packages

- **OpenCode V2.** Export the server plugin from `package.json`. Register
  the Markdown body and installed path for each skill. Map manual entry
  to `autoinvoke: false`. Use the exact `@<skill-id>` selector.
- **Amp.** Install the complete directory plugin. Its root `index.js`
  registers each skill directory. Map manual entry to `listed: false`.
  Ask Amp to load `<plugin-id>:<skill-id>` explicitly.
- **Antigravity CLI.** Supply the pinned local checkout to
  `agy plugin install`. Keep the portable root manifest and skill tree.
- **pi.** Declare the skill directories under `pi.skills` in
  `package.json`. Install the complete Git package at its selected commit.

The [Tailrocks distribution guide][distribution] owns installation commands
and package checks. Use the target repository's documented routes.
Ship the references, scripts, and assets each installed workflow reads.

[distribution]: https://github.com/tailrocks/tailrocks-skills/blob/main/docs/standards/distribution.md

### Frontmatter contract

Match each ID to its directory. Use 1 to 64 lowercase letters, digits,
and internal hyphens. Keep the description within 1,024 characters.
Put the primary trigger early. Name the skill that owns a nearby request
when that distinction affects selection.

Keep triggers and required arguments readable in the canonical files.
A picker hint in a native adapter can repeat the syntax for that host.
Preserve the explicit intent guard in every manual workflow. A host policy
can restrict discovery or selection independently of that guard.

## Validation

```sh
alint check
# plus the strict-JSON check and the frontmatter/ID check
npx --yes markdownlint-cli2@0.23.3 "**/*.md"
claude plugin validate <dir>
# Reserve --strict for warning-free manifests only
grok plugin validate
agy plugin validate
muse skills validate <skill-dir>
muse plugins validate <dir>
# Kimi has no manifest CLI: use /plugins info plus /plugins reload
# Codex: codex plugin marketplace list shows the entry
# Check each native adapter's registered ids, paths, and invocation policy.
```

Each command covers one layer. `alint check` covers structure,
manifests, README, and skill IDs. The strict-JSON check parses
manifests and rejects duplicate keys. The frontmatter and ID check
matches names to directories and validates IDs. The markdownlint
check examines prose shape. `claude plugin validate`
exits 0 on pass, 1 on fail, and 2 on tool error. `grok plugin
validate` loads the manifest through `.claude-plugin/`. `agy plugin
validate` checks skill inventory plus manifest shape. `muse skills
validate` checks one skill and accepts extras. `muse plugins
validate` checks the portable or Claude manifest path.

Run each gate once. Repair only a matched, in-scope error. Stop
immediately for an unmatched error, an unavailable tool, or a
failed repair. Preserve the current state, report the exact failure
and prior mutations, and never claim completion.

## Update-mode obligations

Editing an existing skill adds constraints beyond the create path:

- **Check the cited evidence record before rewording** a gate,
  rejection rule, or completion clause. Load-bearing lines never
  change casually.
- **Strengthen over append.** Prefer making an existing section
  state the new obligation to adding a sibling section that gestures
  at it.
- **A router has at most 200 body lines.** At the limit, the next
  addition replaces or extracts existing material.
- **Rerun every affected static check** after a router change. A
  new section changes every behavior in the file, so the check
  nearest the edit is not the only one at risk.
- A check that misses one element while everything else is correct
  usually exposes a signposting defect. Before rewriting what it
  says, inspect where the requirement sits in the file.
- Refresh generated docs through their generator, never by hand.
