# Context routing

## The three-layer economy

A skill spends context at three prices. The **description** loads
on every request in clients that list skills. It competes for a
truncating listing budget and is the most expensive prose in the
tree. The **router** (`SKILL.md` body) loads whole on invocation
and stays for the session. Every behavior in it competes with every
other for the executing agent attention, so adding a section taxes
the sections already there. Content under **`references/`** costs
nothing until read.

Consequences, each binding:

- Depth defaults to `references/`. The router carries *when to
  read* a reference and at most one rule worth holding at router
  level, never a summary of the reference contents. A router section
  that reads like a table of contents is dilution with no benefit.
- Assume the executing agent is smart. Challenge every sentence:
  does it say something the agent does not already do? Cut
  background explanations, definitions of common terms, and restated
  defaults.
- A load-bearing requirement gets a structural cue: a named bullet,
  a heading, or a labeled sentence. Buried as the third idea in a
  four-idea paragraph, it surfaces only sometimes. That
  intermittency looks like a flaky check instead of the prose defect
  it is.
- Use at most 500 total lines in `SKILL.md`, including frontmatter.
  At the limit, replace or extract material before adding an instruction.
  State each obligation once.
- References hang one level deep off the router. A reference that
  points to another reference gets skimmed instead of read. Flatten
  the chain. Route each file directly from the router with its
  when-to-read condition. Reference files over 100 lines open with
  a table of contents, so a partial read still reveals full scope.
  All paths use forward slashes on every platform.
- Slash `/` suggestions match description words by prefix.
  Front-loaded trigger words win twice.

## Match the form to the defect

Before writing a word, classify the defect. The form that fixes one
defect type backfires on another.

- **Knows the rule, skips it under pressure.** Right form:
  prohibition plus rationalization counters plus red flags. Wrong
  form: soft guidance ("prefer…", "consider…").
- **Complies, but the output has the wrong shape.** Right form:
  positive recipe. State what the output IS, parts in order. Wrong
  form: prohibition list ("don't restate", "never narrate").
- **Omits an element it already produces.** Right form:
  structural. A required slot in the template it fills. Wrong form:
  prose reminders near the template.
- **Behavior must depend on context.** Right form: conditional
  keyed to an observable predicate. Wrong form: unconditional rule
  plus exemption clauses.

Prohibitions backfire on shaping problems. Under a competing
incentive the agent negotiates with "don't X". A recipe leaves
nothing to negotiate: the output matches the stated shape or it
does not. Two wording rules always hold. Never write nuance
clauses. "Don't X unless it matters" reopens the negotiation.
Express a real exception as its own conditional on an observable
predicate.
Exemption clauses never scope. "This limit does not apply to code
blocks" still suppresses code blocks. Restructure the rule until
it cannot reach the exempt part.

For discipline forms, close loopholes explicitly. Forbid the
specific workarounds, not just the act. State that violating the
letter violates the spirit. Keep a rationalization table built from
observed agent mistakes: every excuse an agent used, with its
counter.

## Degrees of freedom

Match specificity to fragility. High freedom (goals and heuristics)
fits tasks where multiple approaches are valid and context decides.
Medium freedom (a pattern with parameters) fits tasks with a
preferred shape where variation stays fine. Low freedom (exact
commands, few or no parameters) fits fragile operations where
consistency is the point. Over-specifying a robust task wastes
tokens and produces brittle compliance. Under-specifying a fragile
one produces confident breakage.

## The description

Write the task and the situations that select it in `description`.
Use the requester's verbs, artifact names, file types, and symptoms.
Keep the primary trigger early because hosts can shorten discovery text.
Name a sibling skill when it owns a likely alternative request.
Keep procedures in the body.

For manual skills, state the explicit request requirement in the
description. Repeat it before the first action. Preserve the owner's
decision about implicit use when changing an existing skill.

### Triggers and arguments

Put trigger phrases in the canonical description. For example, a release
audit can mention “check the release tag” and “verify the published version.”
Name the target and optional flags under the body's input section. State
when a value is required, repeatable, or optional.

Keep host-specific display hints and selection keys in their native
configuration or adapter. The portable validator rejects extra frontmatter
keys. A picker prompt helps a person select the skill. Only the user's
request can satisfy an explicit-entry guard.

### Host invocation policy

- Codex reads `policy.allow_implicit_invocation` from `agents/openai.yaml`.
  Use `false` for a manual skill. Its picker prompt uses bare `$<skill>`.
- The Tailrocks OpenCode V2 adapter maps manual entry to
  `autoinvoke: false`. Users can select the exact `@<skill-id>`.
- The Tailrocks Amp directory plugin maps manual entry to `listed: false`.
  Ask Amp to load the qualified `<plugin-id>:<skill-id>` name.
- Other hosts expose different selectors and permissions. Keep the intent
  guard in the skill even when a host has a native selection switch.

### YAML hygiene

- Put the opening `---` on the first line and close the frontmatter.
- Match `name` to the directory. Use 1 to 64 lowercase letters, digits,
  and internal hyphens. Do not use consecutive hyphens.
- Give `description` 1 to 1,024 characters. Exclude angle brackets.
- Keep the declared license and valid string-valued provenance metadata.
- Parse and validate the complete skill. Check the installed host entry
  and its policy independently. Follow the target's validation commands.

## Naming and examples

Name by the action or the owned artifact. Stay distinctive enough
to pick out of a listing. Never use a generic category label. One
excellent, runnable, real example beats several mediocre ones: the
executing agent ports well. Never use narrative war stories as
examples. Never repeat the same example in three languages. Never
ship fill-in-the-blank templates that teach nothing. Never use
generic labels (`step1`, `helper2`).

## Anti-pattern checklist

Before validation, run every draft against these:

- Description summarizes workflow, or lacks trigger words, or
  exceeds the tree budget.
- Router summarizes a reference, or reference content restates the
  router.
- Capitalized MUST and NEVER stack where an explained *why* binds
  better. All-caps without a reason is a yellow flag for a rule the
  author never justified.
- A nuance clause or exemption clause stands where a predicate
  conditional belongs.
- A rule enforceable by a validator or gate lives in prose instead.
- Two skills share one responsibility, or one skill carries two.
- Force-loading references (inline includes) stand where routing by
  when-to-read belongs.
- A substantial deliverable sits in the conversation, or a file
  exists for output with no reader beyond the current session. The
  output-contract section owns the choice.
- Changelog prose or a reference to the skill own previous version
  exists ("this replaces the earlier…", "formerly…", "we now…"). A
  skill states current doctrine only. History lives in git.
- Any reference to an external project exists: a repository URL, a
  named skill collection, an author credited as the source. Needing
  the reference means the information belongs here: extract it,
  rephrase it, make it part of this project. Provenance lives in
  git and pull-request history, never in shipped content. Official
  documentation of house-adopted tools, and placeholder URLs in
  templates, are the only URL classes a skill carries.
