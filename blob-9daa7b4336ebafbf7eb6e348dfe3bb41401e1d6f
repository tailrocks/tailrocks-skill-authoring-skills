# GLM model notes (ZCode host)

Model IDs and behavior notes for the ZCode (GLM) host, where skills
match on `name` + a 250-char `description` excerpt under a shared
budget (see the ZCode rows in `client-selectors.md` and the ZCode
packaging section in `house-wiring.md`).

- **GLM-5.3** — id `glm-5.3`. Text-only. 1M context / 128K output.
  `thinking.type: enabled` forced (disabled rejected);
  `reasoning_effort` low/high/max, default max (max for coding).
  Temperature 1.0 / top_p 0.95 — tune one, not both. Endpoints
  `api.z.ai/api/coding/paas/v4` (chat-completions), `/api/v1`
  (responses), `/api/anthropic`.
- **GLM-5.3-Flash / FlashX** — ids `glm-5.3-flash` /
  `glm-5.3-flashx`. 320B/18B sparse + linear attention. Native
  multimodal input (video/image/text/file). Same 1M/128K and
  thinking rules, plus `thinking.clear_thinking: false`; stream +
  tool_stream recommended. 3× Coding-Plan quota vs 5.3; FlashX
  200 tok/s.

Skill-authoring impact: long-horizon-tuned — skills may assume
multi-step follow-through. Keep triggers in the description head
(the 250-char window). Prefer Flash for visual or Office-deliverable
skills.
