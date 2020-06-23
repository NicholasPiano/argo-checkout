import * as path from 'path';

import type {ImportedReference} from './types';
import {createDependencyGraph, Module} from './utilities/dependency-graph';

run();

async function run() {
  const componentIndex = path.resolve(
    'packages/argo-checkout/src/components/index.ts',
  );

  const graph = await createDependencyGraph(componentIndex);

  console.log(
    JSON.stringify(
      resolveImport(
        graph.get(componentIndex)!.exports.get('TextFieldProps') as any,
        graph,
      ),
      null,
      2,
    ),
  );
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
