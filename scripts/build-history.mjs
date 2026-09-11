import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

const root = process.cwd();
const versions = [
  { folder: 'first', commit: '4374814fef9722d40fdd77f1766f88db46b1a8b1', title: 'النسخة الأولى — خطبة عمر ومريم', images: ['floral-background.webp'] },
  { folder: 'second', commit: '311793a2caf01c508f667f2b0c5e7b0be77d7460', title: 'النسخة الثانية — خطبة عمر ومريم', images: ['floral-background.webp', 'envelope.webp'] },
];
for (const version of versions) {
  const output = path.join(root, 'public', 'versions', version.folder);
  if (fs.existsSync(output)) { console.log(`Preserving existing ${version.folder} comparison copy`); continue; }
  const source = path.join(root, 'outputs', 'history-source', version.folder);
  fs.mkdirSync(source, { recursive: true });
  const readAtVersion = (name) => execFileSync('git', ['show', `${version.commit}:${name}`]);
  const component = readAtVersion('app/page.tsx').toString('utf8').replaceAll('/images/', './images/');
  fs.writeFileSync(path.join(source, 'App.tsx'), component);
  fs.writeFileSync(path.join(source, 'style.css'), readAtVersion('app/globals.css'));
  fs.writeFileSync(path.join(source, 'main.tsx'), "import React from 'react'; import {createRoot} from 'react-dom/client'; import App from './App'; import './style.css'; createRoot(document.getElementById('root')!).render(<App/>);");
  fs.writeFileSync(path.join(source, 'index.html'), `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${version.title}</title><link rel="icon" href="./favicon.svg"></head><body><div id="root"></div><script type="module" src="./main.tsx"></script></body></html>`);
  await build({
    configFile: false, root: source, base: './', publicDir: false,
    plugins: [react()], resolve: { alias: { '@': root } },
    css: { postcss: { plugins: [tailwindcss()] } },
    build: { outDir: output, emptyOutDir: false },
  });
  fs.mkdirSync(path.join(output, 'images'));
  for (const name of version.images) fs.writeFileSync(path.join(output, 'images', name), readAtVersion(`public/images/${name}`));
  fs.writeFileSync(path.join(output, 'favicon.svg'), readAtVersion('public/favicon.svg'));
  fs.writeFileSync(path.join(output, 'version.json'), JSON.stringify({ commit: version.commit, title: version.title }, null, 2));
  console.log(`Saved immutable comparison copy: /versions/${version.folder}/index.html`);
}
