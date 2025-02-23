import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('ts-node').register();
require('./src/lib/seed/index.ts');
