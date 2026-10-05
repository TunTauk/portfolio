# Project-local resume skills

The 22 skill directories in `skills/` are unmodified copies of the canonical
`skills/` directory from [Paramchoudhary/ResumeSkills](https://github.com/Paramchoudhary/ResumeSkills),
at commit `74ae19e7c62b0516d1c298328e5544976c12da5d`.

Upstream copyright and MIT terms are preserved in `ResumeSkills.LICENSE`.
No global skills, application dependencies, or OpenCode configuration were changed.

## Using the skills in OpenCode

OpenCode V2 automatically discovers `.opencode/skills/<skill-id>/SKILL.md`.
Each skill is loaded on demand rather than adding its full content to every prompt.

Example prompts:

- `@tech-resume-optimizer Review portfolio.md for Next.js full-stack roles.`
- `@resume-bullet-writer Improve the freelance project bullets in portfolio.md.`
- `@resume-tailor Tailor portfolio.md to this job description.`
- `@portfolio-case-study-writer Help refine my project descriptions.`
- `@interview-prep-generator Help me explain my Next.js project contributions.`

If the skills do not appear in an existing session, reload OpenCode configuration
or open a new session in this project.

## Portfolio guidance

When using these skills here, keep claims grounded in verified work:

- Use confirmed metrics only; do not invent or present estimates as measured results.
- Separate individual contributions from teammates' work and template features.
- Keep website project descriptions in first person.
- Keep archived demos clearly labeled and do not imply ongoing client affiliation.
- Do not change the CV or website unless the requested task includes those changes.

See the [OpenCode V2 skills documentation](https://opencode.ai/v2/docs/skills)
for discovery and invocation details.
