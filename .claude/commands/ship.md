Inspect the current git state, stage all changes, write a proper conventional commit message, then push to GitHub. Follow these steps exactly:

## Step 1 — Inspect changes

Run these in parallel:
- `git status` to see staged, unstaged, and untracked files
- `git diff` to read every line that changed (unstaged)
- `git diff --cached` to read anything already staged
- `git log --oneline -5` to learn this repo's commit message style

## Step 2 — Classify the change type

Choose **one** type based on the dominant change:
- `feat` — new capability visible to a user or API consumer
- `fix` — corrects a bug or broken behavior
- `chore` — tooling, config, deps, refactor, or non-functional cleanup

If multiple types are present, use the one that describes the **most important** change; mention the rest in the body.

## Step 3 — Write 3 commit message options

For each option write a subject line + body following this format:

```
<type>(<optional scope>): <short imperative summary under 72 chars>

<body: what changed and why, 2–4 sentences, wrap at 72 chars>
```

Rules:
- Subject line: imperative mood ("add", "fix", "remove"), no period at the end
- Body: explain *why*, not just *what*; call out any non-obvious side-effects or trade-offs
- Do **not** reference issue numbers or PR links unless they are already in the diff

Present all 3 options clearly and **ask the user to pick one (or say "none")** before proceeding.

## Step 4 — Stage and commit

After the user picks an option:
1. Stage all relevant files with `git add` — add each file by name (avoid `git add .` or `git add -A` to prevent accidentally committing secrets or build artifacts). Include untracked files that belong to the feature.
2. Commit using the chosen message via a HEREDOC so formatting is preserved.
3. If a pre-commit hook fails, fix the underlying issue and retry — never use `--no-verify`.

## Step 5 — Push

Run `git push` to push the current branch to its upstream remote. Report the final output (branch name, remote URL, commit SHA) so the user can confirm it landed.
