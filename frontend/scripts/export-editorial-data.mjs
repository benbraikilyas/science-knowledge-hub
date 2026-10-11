import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const moduleApi = require('node:module');

moduleApi.Module._extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  module._compile(compiled, filename);
};

const frontendRoot = path.resolve(import.meta.dirname, '..');
const projectRoot = path.resolve(frontendRoot, '..');
const outputRoot = path.join(projectRoot, 'backend', 'data');
fs.mkdirSync(outputRoot, { recursive: true });

const constants = require(path.join(frontendRoot, 'src', 'lib', 'constants.ts'));
const scientists = require(path.join(frontendRoot, 'src', 'lib', 'scientists.ts'));
const editorial = require(path.join(frontendRoot, 'src', 'lib', 'editorial-articles.ts'));

const outputs = {
  'categories.json': constants.DEMO_CATEGORIES,
  'editorial_articles.json': editorial.EDITORIAL_ARTICLES,
  'scientists.json': scientists.DEMO_SCIENTISTS,
};

for (const [filename, payload] of Object.entries(outputs)) {
  const outputPath = path.join(outputRoot, filename);
  fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Exported ${payload.length} records to ${outputPath}`);
}
