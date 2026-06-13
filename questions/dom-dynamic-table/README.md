# DOM Manipulation: Dynamic Table From JSON

## Problem Statement

Create a dynamic HTML table from a JSON array and apply styles using CSS.

You are given a list of users as JSON. Render the data into a table using JavaScript DOM manipulation. The table should be created dynamically without hardcoding table rows in HTML.

## Requirements

- Create table headers from the JSON object keys.
- Create one table row for each object in the JSON array.
- Apply readable styling to the table.
- Add alternating row colors.
- Highlight users whose status is `Active`.
- Keep the implementation in plain HTML, CSS, and JavaScript.

## Bonus

- Add a search input to filter table rows by name, role, email, or status.
- Show a friendly empty state when no rows match the search.

## Run

Build the TypeScript from the repository root:

```powershell
npm.cmd run build
```

Then open `index.html` in any modern browser.
