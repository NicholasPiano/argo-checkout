import * as path from 'path';
import * as fs from 'fs';

import type {ImportedReference} from './types';
import {createDependencyGraph, Module} from './utilities/dependency-graph';

run();

async function run() {
  const componentIndex = path.resolve(
    'packages/argo-checkout/src/components/index.ts',
  );

  const graph = await createDependencyGraph(componentIndex);

  const resolvedComponentDirs = [
    ...new Set(
      [...graph.get(componentIndex)!.exports.values()].map(({path}: any) =>
        path.substring(0, path.length - 9),
      ),
    ),
  ];

  resolvedComponentDirs.forEach((directory) => {
    const exports = [] as any;
    graph.get(`${directory}/index.ts`)!.exports.forEach((value) => {
      exports.push(resolveImport(value as any, graph));
    });

    const components = exports.filter(
      ({value}: any) => value.kind === 'Component',
    );

    let markdown = '';

    components.forEach(({value: {name, docs}}: any) => {
      markdown += `# ${name}\n${docs ? strip(docs.content) : ''}`;
    });

    fs.writeFile(`${directory}/README.md`, markdown, function (err) {
      if (err) throw err;
    });
  });
}

function resolveImport(
  {name, path}: Pick<ImportedReference, 'name' | 'path'>,
  modules: Map<string, Module>,
) {
  let resolvePath = path;
  let resolveName = name;

  while (true) {
    const module = modules.get(resolvePath);
    const resolved = module?.exports.get(resolveName);

    if (resolved == null) {
      throw new Error(
        `Can’t resolve export ${resolveName} in ${JSON.stringify(resolvePath)}`,
      );
    } else if (resolved.kind === 'Imported') {
      resolvePath = resolved.path;
      resolveName = resolved.name;
    } else {
      return {value: resolved, module};
    }
  }
}

function strip(content: string) {
  return content
    .replace('/**', '')
    .replace('*/', '')
    .replace('\n * ', '\n')
    .replace('\n *', '\n')
    .replace('\n\n * ', '\n\n');
}
