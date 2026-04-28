Implement a task from the Notion board by its name.

The Notion board URL is: https://www.notion.so/35053313d7b180bda565e5c61d87aeb0?v=35053313d7b1801a9958000c9e5a189a
The Notion data source ID is: 35053313-d7b1-8035-a745-000b74790511

**Task name to implement:** $ARGUMENTS

Follow these steps in order:

## Step 1 — Find the task
Search the Notion board for a page whose title matches (or closely matches) the task name above. Use the `mcp__notion__notion-search` tool with the task name as the query, scoped to the data source URL `collection://35053313-d7b1-8035-a745-000b74790511`. If no match is found, tell the user and stop.

## Step 2 — Mark In Progress
Immediately set the task's Status to "In progress" using `mcp__notion__notion-update-page` so no one else picks it up while work is underway.

## Step 3 — Read the task details
Fetch the full page content using `mcp__notion__notion-fetch` to get:
- The **user story** (the "As an admin..." sentence — treat this as the goal)
- The **Description** (what needs to be built and where)
- The **Acceptance Criteria** checkboxes (the definition of done)

## Step 4 — Implement
Read the relevant source files, then implement the feature end-to-end based on the description and user story. Follow the project conventions from CLAUDE.md:
- Backend changes go in `backend/routes/posts.js`, `backend/database.js`, or new route files
- Frontend API calls go in `frontend/src/api/posts.js`
- New pages go in `frontend/src/pages/` and use CSS Modules
- New routes are registered in `frontend/src/App.jsx`
- No test suites exist — focus on correct implementation

Work through each acceptance criterion one by one. After completing each one, update its checkbox in the Notion page from `- [ ]` to `- [x]` using `mcp__notion__notion-update-page` with the `update_content` command.

## Step 5 — Mark Done
Once all acceptance criteria are checked, set the task's Status to "Done" using `mcp__notion__notion-update-page`.

## Step 6 — Report
Give a brief summary of what was changed: files modified/created, and any decisions made that weren't obvious from the task description.
