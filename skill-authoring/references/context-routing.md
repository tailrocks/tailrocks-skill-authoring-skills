# Context routing

## The three-layer economy

A skill spends context at three prices. The **description** loads on every
request in clients that list skills — it competes for a truncating listing
budget and is the most expensive prose in the tree. The **router**
(`SKILL.md` body) loads whole on invocation and stays for the session;
every behavior in it competes with every other for the executing agent's
attention, so adding a section taxes the sections already there. Content
under **`references/`** costs nothing until read.

Consequences, each binding:

- Depth defaults to `references/`. The router carries *when to read* a
  reference and at most one rule worth holding at router level — never a
  summary of the reference's contents. A router section that reads like a
  table of contents is dilution with no benefit.
- Assume the executing agent is smart. Challenge every sentence: does it
  say something the agent would not already do? Background explanations,
  definitions of common terms, and restated defaults are cut.
- A load-bearing requirement gets a structural cue — a named bullet, a
  heading, a labeled sentence. Buried as the third idea in a four-idea
  paragraph, it surfaces only sometimes, and that intermittency looks like
  a flaky check instead of the prose defect it is.
- A router has at most 200 body lines. At the limit, an addition replaces or
  extracts existing material. Two sections gesturing at one obligation are
  weaker than one that states it.
- References hang one level deep off the router. A reference that
  points to another reference gets skimmed (`head -100`) instead of
  read; flatten the chain and route each file directly from the router
  with its when-to-read condition. Reference files over 100 lines open
  with a table of contents so a partial read still reveals full scope.
  All paths use forward slashes on every platform.
- Auto-compaction re-attaches only the most recent invocation of each
  skill, first 5,000 tokens each, 25,000 combined, most-recent-first —
  older skills drop entirely. Keep standing instructions inside the first
  5,000 tokens and never rely on a dropped skill's presence. Slash `/`
  suggestions match description words by prefix: front-loaded trigger
  words win twice.

## Match the form to the failure

Classify the baseline failure before writing a word; the form that fixes
one failure type measurably backfires on another.

| Baseline failure | Right form | Wrong form |
|---|---|---|
| Knows the rule, skips it under pressure | Prohibition + rationalization counters + red flags | Soft guidance ("prefer…", "consider…") |
| Complies, but the output has the wrong shape | Positive recipe: state what the output IS — parts, in order | Prohibition list ("don't restate", "never narrate") |
| Omits an element it already produces | Structural: a required slot in the template it fills | Prose reminders near the template |
| Behavior should depend on context | Conditional keyed to an observable predicate | Unconditional rule + exemption clauses |

Why prohibitions backfire on shaping problems: under a competing incentive
the agent negotiates with "don't X"; a recipe leaves nothing to negotiate
— the output matches the stated shape or it does not. Two wording rules
survive every test: **no nuance clauses** ("don't X unless it matters"
reopens the negotiation — express a real exception as its own conditional
on an observable predicate), and **exemption clauses don't scope** ("this
limit doesn't apply to code blocks" still suppresses code blocks —
restructure so the rule cannot reach the exempt part).

For discipline forms, close loopholes explicitly (forbid the specific
workarounds, not just the act), state that violating the letter is
violating the spirit, and keep a rationalization table built from real
baseline runs — every excuse an agent actually used, with its counter.

## Degrees of freedom

Match specificity to fragility. High freedom (goals and heuristics) when
multiple approaches are valid and context decides. Medium freedom (a
pattern with parameters) when a preferred shape exists but variation is
fine. Low freedom (exact commands, few or no parameters) when the
operation is fragile and consistency is the point. Over-specifying a
robust task wastes tokens and produces brittle compliance;
under-specifying a fragile one produces confident breakage.

## The description

The description is the trigger, nothing else. Only `name` +
`description` preload on every turn; the body loads only after
selection.

- **Capability-first, third person.** Open with what the skill does as
  a concrete third-person capability clause — never `I can…` / `You
  can…` (injected into the system prompt; POV inconsistency breaks
  discovery). Pattern: `<capability clause>. Use when <trigger
  contexts>.`
- **Trigger verbs are the user's words, front-loaded.** Include the
  literal nouns/verbs users will say: task verbs, artifact names, file
  types, cross-platform aliases (`PR/MR/change/CL`). Troubleshooting
  step #1 for "skill not triggering" on every client is "description
  lacks the keywords users naturally say." Key use case + trigger
  words FIRST — truncation cuts the tail first.
- **Sibling routing, not just behavior guards.** Each description
  names its own trigger AND disambiguates its nearest siblings by
  object cardinality (`a PR / PR #N` vs `branches/PRs/selected work`)
  and file-vs-instance (`template file / default for future PRs` vs
  `this PR's title/body`). A `Do not X` clause that does not name the
  owning skill routes nowhere — name it: `Do not refresh metadata
  (tailrocks-refresh-pr owns that).`
- **Procedures and workflow summaries are banned.** Middle sentences
  that describe behavior (`Verify target, checks, reviews…`) are dead
  weight for matching and become a shortcut the agent follows instead
  of the body. Also banned: XML tags (spec rejection), vague scope
  (`Helps with documents`), instructions.
- **Caps.** `description` hard cap 1,024 chars (Agent Skills spec).
  Keep key triggers inside the first ~250 chars (Claude
  Code truncates `description` + `when_to_use` at 1,536 per entry;
  Codex lists name+description+path under min(2% context, 8,000
  chars): descriptions shorten first, skills may drop with a
  warning). `allow_implicit_invocation: false` stops implicit match
  but the entry still occupies Codex's list budget — front-load
  trigger words regardless.
- Manual-only trees add their guard sentence verbatim and budget the
  rest (250 characters after the guard, here).
- **Pushy beats polite.** Agents undertrigger: they skip skills that
  would help. Name trigger contexts explicitly, including cases where
  the user never says the domain word ("even if they don't mention
  'dashboard'"). Open with the imperative pattern `<capability>. Use
  when <trigger contexts>.`
### The `when_to_use` trigger field

`when_to_use` (Claude Code extension, snake_case — the only
non-hyphenated field) holds extra trigger phrases and example
requests. It is appended to `description` in the listing and counts
toward the same 1,536-char cap. Codex ignores unknown frontmatter:
keep portable triggers in `description` itself; use this field only
for overflow and negatives.

Template:

```yaml
when_to_use: >-
  <2-4 example user requests in the user's own words>.
  Not for <nearest sibling trigger> — that belongs to <owning skill>.
  Not for <second overlap> — that belongs to <owning skill>.
```

Rules: example requests must read like typed prompts, not paraphrased
capabilities. Sibling routing lives here when `description` is full.
Kimi accepts `whenToUse` (aliases `when-to-use`, `when_to_use`) as
its dedicated trigger field; its documented contract keys are only
`name`, `description`, `type`, `whenToUse` (+aliases),
`disableModelInvocation` (+aliases), `arguments` — other keys have
no documented effect there. Grok accepts `when-to-use` /
`when_to_use` plus `paths` globs. Strip this key when packaging
for claude.ai / Skills
API (spec allows only `name, description, license, compatibility,
metadata, allowed-tools` — unexpected keys hard-error packaging).

### Trigger fields by client

Match text and gates differ per host; triggers portable everywhere
live in `description` itself.

| Client | Match text | Gate / switch |
|---|---|---|
| Claude Code | `description` + `when_to_use` (appended; 1,536 chars combined) | `paths` globs gate by file; `disable-model-invocation: true` removes from context; `user-invocable: false` hides `/` entry only |
| Codex | `description` only (`name` aids) | `agents/openai.yaml → allow_implicit_invocation`; `default_prompt` / `short_description` are picker UI, never matching |
| Muse | `name` + `description` | `disable-model-invocation`, `user-invocable` honored |
| Kimi | `description` + `whenToUse` (`when-to-use`, `when_to_use` aliases) | `disableModelInvocation`; `type: flow` is manual-only, never on an invokable skill; nesting cap 3; directory `SKILL.md` without `name`+`description` fails parsing; declare `arguments:` for every `$<name>` the body reads |
| Gemini CLI / Antigravity | `name` + `description` only (agy 1.2.17: both required) | No other trigger keys exist on either host |
| Grok Build | `description` + `when-to-use` + `paths` | `user-invocable` hides from the model too unless literally `true`; `allowed-tools` accepted, not enforced |
| Qwen Code | `description` (what + when + user keywords) | Both invocation flags honored; `priority` sorts the `/skills` list only |
| OpenCode | `name` + prose match via the `skill` tool | Ignores `disable-model-invocation` / `user-invocable`; gate is `permission.skill: ask` |
| Amp | `name` + `description` listing; model decides loads; first-`name` wins across 11 roots | No user-invokable skills (model-invoked only); repo skills require dir name == frontmatter `name`; hosted repos cap 200 skills / 200 files / 10 MiB per file / 25 MiB; skill MCP via `mcp.json` or `mcpServers` (frontmatter wins) |
| Cursor | `description` (+`name`); `paths` globs scope by file; nested monorepo skill dirs auto-scope | `disable-model-invocation: true` makes `/`-only (precedent: `/migrate-to-skills` output); `name` must match parent folder; skills ship only inside a plugin via a marketplace |

### YAML hygiene

Triggering dies silently on malformed metadata:

- Opening `---` is the file's first line.
- Malformed frontmatter loads with empty metadata: manual `/name`
  still works while auto-trigger silently dies. Debug with
  `claude --debug` and `claude plugin validate`.
- `name`: 1–64 chars, lowercase alphanumerics plus hyphens, no
  leading/trailing/consecutive hyphens, matches the directory name,
  no reserved words (`anthropic`, `claude`).
- `description`: non-empty, at most 1,024 chars, no XML tags.
- Gate every description change with `skills-ref validate` (spec),
  `muse skills validate <path>` (Muse), `claude plugin validate --strict`
  (Claude Code), `grok plugin validate`, and `agy plugin validate`;
  test on each model family shipped to.
- Host-only execution fields (never portable; strip for claude.ai/Skills
  API with the other extensions): `model` (skill-level override,
  `inherit` keeps session model; allowlisted/auto-mode exclusions fall
  back silently), `context: fork` + `agent` (+`background`, default true:
  forked skills run detached and never stack — their instructions must
  stand alone with zero conversation history), skill `hooks` (persist for
  the session; incompatible with manual-only policy — the scaffold
  rejects them), `disallowed-tools` (removes tools while active; cannot
  remove `EndConversation`), `arguments:` (named `$name` placeholders
  mapping to argument positions; `\$1` escapes).

## Naming and examples

Name by the action or the owned artifact, distinctively enough to pick
out of a listing — not a generic category label. One excellent,
runnable, real example beats several mediocre ones; the executing agent
ports well. Never: narrative war stories as examples ("in session X we
found…"), the same example in three languages, fill-in-the-blank
templates that teach nothing, or generic labels (`step1`, `helper2`).

## Anti-pattern checklist

Run every draft against these before validation:

- Description summarizes workflow, or lacks trigger words, or exceeds the
  tree's budget.
- Router summarizes a reference; reference content restates the router.
- Capitalized MUST/NEVER stacked where an explained *why* would bind
  better — all-caps without a reason is a yellow flag for a rule the
  author could not justify.
- A nuance clause or exemption clause instead of a predicate conditional.
- A rule enforceable by a validator or gate living in prose instead.
- Two skills sharing one responsibility, or one skill carrying two.
- Force-loading references (inline includes) instead of routing by
  when-to-read.
- A substantial deliverable dumped into the conversation, or a file
  written for output with no reader beyond the current session — the
  output-contract section owns the choice.
- Changelog prose or a reference to the skill's own previous version —
  "this replaces the earlier…", "formerly…", "we now…". A skill states
  current doctrine only; an agent loading it has no earlier version to
  compare against, so the contrast is pure noise. History lives in git.
- Any reference to an external project — a repository or gist URL, a
  named skill or plugin collection, an author credited as the source.
  Needing the reference means the information belongs here: extract it,
  rephrase it, make it part of this project. Provenance lives in git and
  pull-request history, never in shipped content. Official documentation
  and release pages of house-adopted tools, and placeholder URLs in
  templates, are the only URL classes a skill carries.
