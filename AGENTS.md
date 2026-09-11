# Invitation change workflow

- Before each batch of design, content, or behavior edits, run `node scripts/snapshot.mjs <short-description>` to preserve the complete current source, including uncommitted files. Never overwrite or delete an older snapshot.
- Keep `public/versions/first/` and `public/versions/second/` unchanged once generated. They are the user's comparison copies, not alternate targets for future edits.
- Preserve the original Arabic names and event details. The current invitation is Arabic first and designed for touch screens.
- Keep the removed initials circle absent. Keep the return-to-intro controls, rounded location button, two visible event-time groups, and countdown between the welcome note and location unless the user changes those requirements.
- Save each completed revision as a Git commit and a Sites version. Keep publication private unless the user requests otherwise.
