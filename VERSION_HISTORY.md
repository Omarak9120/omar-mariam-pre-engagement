# Invitation versions

The first two designs are preserved as independently runnable comparison pages. They keep their original layouts, controls, artwork, and wording.

| Version | Comparison page | Original source commit |
| --- | --- | --- |
| First design | `/versions/first/index.html` | `4374814fef9722d40fdd77f1766f88db46b1a8b1` |
| Second design, before the phone animation changes | `/versions/second/index.html` | `311793a2caf01c508f667f2b0c5e7b0be77d7460` |
| Current invitation | `/` | See the latest Git commit and saved Sites version |

Original source ZIPs are retained locally in `backups/`. A source snapshot containing file hashes was also saved before the current animation redesign.

Before every subsequent batch of invitation changes, run `node scripts/snapshot.mjs <description>`. The script creates a new timestamped source copy and hash manifest, including uncommitted files, without overwriting an older copy. Keep these backups private and never add them to the public site.

The comparison pages are frozen. `scripts/build-history.mjs` skips any comparison copy that already exists; it is not part of the regular site build. Future source changes must not modify the existing comparison files.
