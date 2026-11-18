---
name: problem-checker
description: Review problem.txt and the available project context for clarity, completeness, feasibility, and alignment with the task's authoritative Guidelines 1–4.
---

# Problem Checker

When the user asks to run the problem checker:

1. Read `problem.txt` in full and inspect the relevant repository context.
2. Locate and apply the authoritative Guidelines 1–4 supplied with the task. Do not invent, paraphrase from memory, or assume the contents of those guidelines. If they are unavailable, state that limitation and ask for them.
3. Identify concrete, actionable issues in the problem statement or missing codebase context. For each finding, quote or point to the relevant text, explain why it matters under a specific guideline, and propose a focused correction.
4. Distinguish blocking issues from optional improvements. Do not flag stylistic preferences as violations unless a guideline supports the finding.
5. Consider whether each finding is genuinely valid; explain uncertainty where appropriate.
6. Write the complete findings to `problem_checker_results.md`, including:
   - date/time of the review
   - files inspected
   - guidelines available and applied
   - findings with guideline references and suggested changes
   - unresolved questions or limitations
   - final status: `issues found`, `no valid issues found`, or `unable to complete`
7. Report that the skill ran only if this skill was actually invoked. Never claim a clean result if the guidelines were unavailable or the review was incomplete.
