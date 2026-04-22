# /commit

Generate commit message suggestions from staged changes and commit with your selection.

## How it works

1. Check `git diff --cached` for staged changes
2. Stop and ask to stage files if nothing is staged
3. Analyze the diff and generate exactly 3 commit message suggestions
4. Show options as a numbered list
5. Ask: "Choose a number (1, 2, or 3) to commit."
6. When you select a number, run `git commit -m "<selected message>"`

## Commit types

- `feat` → new features
- `fix` → bug fixes
- `chore` → anything else

## Scope inference

Infer scope from changed files when possible:
- `frontend/src/api/` → `api`
- `frontend/src/components/` → `ui`
- `backend/routes/` → `routes`
- `frontend/src/pages/Dashboard` → `dashboard`
- `frontend/src/pages/Posts` → `posts`

## Message format

```
type(scope): short description
```

or if scope is unclear:

```
type: short description
```

Keep descriptions:
- Concise (50 chars or less)
- Lowercase
- Action-oriented

## Example output

```
Suggested commit messages:

1. fix(api): remove empty title override in createPost
2. fix(api): fix createPost data serialization
3. fix(posts): correct createPost request body

Choose a number (1, 2, or 3) to commit.
```

## Implementation notes

- Analyze only staged changes (`git diff --cached`)
- If no staged changes exist, stop and ask to run `git add` first
- Generate 3 options: best match first, then 2 reasonable alternatives
- Do NOT explain or justify the changes — just suggest messages
- Do NOT ask the user to describe changes unless the diff is unclear or ambiguous
- After the user selects, immediately commit with no additional prompts
