// Native Amp directory plugin for tailrocks-skill-authoring-skills.
const skillEntries = [
  {
    "id": "tailrocks-skill-audit",
    "explicitOnly": true
  },
  {
    "id": "tailrocks-skill-create",
    "explicitOnly": true
  },
  {
    "id": "tailrocks-skill-refactor",
    "explicitOnly": true
  },
  {
    "id": "tailrocks-skill-update",
    "explicitOnly": true
  }
]

export default async function (amp) {
  for (const { id, explicitOnly } of skillEntries) {
    await amp.registerSkill({ path: `skills/${id}`, listed: !explicitOnly })
  }
}
