# Testing doctrine

Writing skills is test-driven development applied to process
documentation: the pressure scenario is the test, the skill is the
production code, the baseline run is the red bar, compliance is green,
and closing loopholes is the refactor.

## The iron law

**No new skill and no behavioral edit without discriminating evidence first.**
For a claimed agent-behavior correction, the baseline run — the agent attempting
the task *without* the skill or with the pre-edit version — must fail for the
claimed reason. For an external-contract change or preventive security rule,
the red bar is a failing executable contract or security check plus an
irrelevant control; never fabricate an agent failure merely to satisfy form.
These are the evidence that the skill changes an outcome rather than adding prose.
For behavior evidence, document the baseline verbatim: exact wrong choice and
rationalization. A skill written before its evidence is deleted and
restarted, not retrofitted — "keeping it as reference" while writing the
test is the violation with extra steps. If the baseline does **not**
fail, stop: there is nothing to fix, and the skill would be dead weight.

Standard rationalizations, all invalid: "it's obviously clear" (clear to
the author is not clear to a fresh agent), "it's just a reference"
(references have gaps — test retrieval), "I'll test if problems emerge"
(problems are agents failing in production), "no time" (a bad skill
costs more than its test).

## Evidence and excluded infrastructure

Watching a fresh agent attempt a behavior task, or running an executable
contract/security check for a preventive task, establishes the evidence law's
red bar. Record the input, environment, observable result, and irrelevant
control in a durable evidence artifact. Per-skill eval trees are forbidden.

## Test to the skill's type

- **Discipline skills** (rules an agent is tempted to skip): pressure
  scenarios combining time pressure, sunk cost, authority, and
  exhaustion. Pass = the agent complies under maximum combined pressure.
  Every rationalization the baseline produced becomes an explicit
  counter in the skill; re-test until no new rationalization survives.
- **Technique skills** (how-to): application to a fresh scenario,
  variation cases, and gap-hunting — do the instructions assume context
  the agent will not have?
- **Pattern skills** (mental models): recognition (does the agent see
  when it applies), application, and counter-examples (does it know when
  *not* to apply).
- **Reference skills**: retrieval (can the agent find the fact) and
  application (use it correctly), across the common cases.

## Micro-test wording before full scenarios

Full scenario runs are the gate but are slow per iteration; verify
contested wording first. One fresh-context sample per call, the guidance
embedded in its realistic surroundings (the full router, not the sentence
in isolation), a task that tempts the failure. **Always include a
no-guidance control** — if the control does not fail, do not author the
guidance. Five or more repetitions per variant; single samples lie. Read
every flagged output manually — template echoes and quoted
counter-examples masquerade as hits. Treat variance as a metric: when
wording binds, repetitions converge on one shape; five interpretations
across five runs means the form is wrong, not the word count.

## Trigger validation checklist

Run per skill on every description/trigger-field change:

1. **YAML parses.** Malformed frontmatter loads with empty metadata:
   manual `/name` still works while auto-trigger silently dies (debug:
   `claude --debug`, `claude plugin validate`).
2. **Line-1 frontmatter.** Opening `---` must be the file's first line.
3. **Spec shape.** `name` 1–64 chars, lowercase alnum + hyphens, no
   leading/trailing/consecutive hyphens, matches directory name, no
   reserved words (`anthropic`, `claude`). `description` non-empty,
   ≤1,024 chars, no XML tags.
4. **Length caps.** Key trigger inside first ~250 chars (ZCode excerpt);
   `description` + `when_to_use` ≤1,536 (Claude Code listing); whole set
   survives Codex's 2%-of-context / 8k-char initial list (shorten
   descriptions first on overflow).
5. **Trigger-matrix test (5 cases).** Direct request fires; indirect
   paraphrase fires; incomplete input asks instead of firing; negative
   case (sibling's trigger) does NOT fire; edge/unsupported action does
   NOT fire. Record hit/miss per case in the evidence record.
6. **Trigger-rate measurement (nondeterminism).** Single hit/miss lies:
   run each matrix case 3 times fresh-context and record the trigger
   rate (fires/runs). A should-fire case passes at rate > 0.5; a
   should-not-fire case passes at rate < 0.5. On any description change,
   split cases into a train set (~60%) and a held-out validation set
   (~40%, fixed across iterations, mixed polarity); tune wording against
   train failures only and select the winning description by validation
   pass rate, never by train. After selection, run 5 fresh queries never
   used in tuning as the honesty check. Keep eval queries substantive:
   agents skip skills for one-step tasks they can do unaided, so a
   trivial query tests nothing no matter how perfect the description.
7. **Gates.** `skills-ref validate` (spec), `muse skills validate
   <path>` per skill + `muse plugins validate` (Muse), `claude plugin
   validate --strict` (Claude Code), `grok plugin validate` (Grok),
   `agy plugin validate` (Antigravity). Kimi has no manifest CLI:
   read `/plugins info` diagnostics and `/plugins reload` in the TUI
   (`kimi doctor` checks config files only — never a manifest gate).
   ZCode has no CLI validator: Settings → Skills → Refresh, read
   diagnostics (`description exceeds 1024 chars`). Test on every
   model family shipped to (see Models under test; record model ID +
   client version in the evidence record).
8. **Flag coherence.** Side-effect workflows (merge/deploy/land) default
   to explicit-only (`disable-model-invocation: true` /
   `allow_implicit_invocation: false`); OpenCode, Antigravity, and
   ZCode ignore those flags, and Amp observes no gating field, so the
   description must carry the full boundary there.

## Models under test

Name the exact models shipped to; effectiveness is model-relative, so
"tested on Claude/Codex" is not evidence. Current IDs (Oct 2026):
Claude `claude-opus-5-5`, `claude-sonnet-5-5`, `claude-fable-5-1`
(hardest/long-horizon tier), `claude-haiku-4-5`; OpenAI `gpt-6-astra`,
`gpt-6.1-sol`, `gpt-6-luna`. Claude Code gates: Sonnet 5.5 needs
≥2.1.284, Opus 5.5 needs ≥2.1.280. Other families: Grok default
`grok-4.7`; Antigravity Gemini 3.8 Flash / 3.1 Pro; Muse `muse-spark`
with efforts none–ultra; Amp modes low–ultra; Cursor auto/Codex/
Claude/GPT/Grok/Gemini incl. parameterized brackets. Per-model test
questions: Haiku — enough guidance? Sonnet — clear and efficient?
Opus — nothing over-explained? At least three evaluations, each run
on every shipped model family; record model ID + client version in
the evidence record.

## Acceptance cases that earn their place

- **Realistic prompts.** The kind a user actually types — concrete
  files, half-remembered names, casual phrasing — not schematic
  category labels. A prompt too trivial to need the skill tests nothing.
- **Three case classes:** normal operation, a boundary (the mode gate,
  the scope edge), and a safety/refusal case proving the skill declines
  what it must. Audit- and review-shaped cases carry fixtures — a seeded
  artifact with known defects, including at least one deliberate
  non-finding trap.
- **Near-miss negatives for triggering.** Should-not-trigger prompts
  that share keywords with the skill but belong to a neighbor are the
  valuable ones; obviously irrelevant negatives test nothing.
- **Assertions are observable.** Each expected output names checkable
  behavior — what is produced, what is refused, what is routed — not a
  mood. An assertion that passes with and without the skill is
  non-discriminating; fix it or drop it.

## The improvement loop

Author acceptance cases so checks generalize from failures rather than
patching examples: a handful of observations stands in for thousands of future
invocations, so a fix that only fits one prompt is overfitting, and stacking
rigid MUSTs to pass one case is the documentation version of hard-coding the
answer. Read transcripts, not only outcomes: if the skill makes the agent do
unproductive work, cut the section causing it. Read them for navigation
too — missed references, overreliance on one file, ignored files are
routing defects, not reading failures. When every test run independently
rebuilds the same helper, ship the helper with the skill instead of the
instructions to rebuild it. The behavior the baseline documented should
no longer occur and re-runs should converge — that is when to stop
adding.

## Comparing versions

Compare versions blind: present both outputs to a judge that does not
know which version produced which, and never use the tested model as
its own judge. Blind comparison catches holistic quality gaps that
pass/fail assertions miss — two outputs can both pass every assertion
and still differ in organization, usability, and polish. Capture
tokens and duration per run; report the delta (what the new version
costs vs what it buys). A version that doubles token spend for a
2-point gain is a regression wearing a green check.

One skill at a time: written, proven, wired, before the next begins.
Batching skills defers every test to a future that will not run them.
