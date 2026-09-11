import { spawnSync } from 'node:child_process';
import { accessSync, constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = fileURLToPath(new URL('./cli.js', import.meta.resolve('vinext')));
const result = spawnSync(process.execPath, [cli, 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, INVITATION_STATIC_EXPORT: '1' },
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

accessSync(path.join(root, 'dist/client/index.html'), constants.R_OK);
console.log('Static invitation ready in dist/client/');
