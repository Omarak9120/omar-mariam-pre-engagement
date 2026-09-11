import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = fs.realpathSync(process.cwd());
const label = (process.argv[2] || 'before-change').replace(/[^a-zA-Z0-9-]/g, '-');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const directory = path.join(root, 'backups', `${stamp}-${label}`);
fs.mkdirSync(path.dirname(directory), { recursive: true });
fs.mkdirSync(directory);
const files = [...new Set(execFileSync('git', ['ls-files', '-c', '-o', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean))];
const manifest = [];
for (const name of files) {
  if (/^(backups|outputs|node_modules|dist|\.git)\//.test(name) || /(^|\/)\.env/.test(name)) continue;
  const source = path.join(root, name);
  if (!fs.existsSync(source) || !fs.lstatSync(source).isFile()) continue;
  const resolved = fs.realpathSync(source);
  if (!resolved.startsWith(root + path.sep)) throw new Error('Snapshot source escaped the project');
  const destination = path.join(directory, name);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
  manifest.push({ path: name, sha256: crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex') });
}
fs.writeFileSync(path.join(directory, 'snapshot.json'), JSON.stringify({
  savedAt: new Date().toISOString(), label,
  commit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), files: manifest,
}, null, 2));
console.log(`Saved ${manifest.length} files to ${directory}`);
