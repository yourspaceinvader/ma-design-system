// Token build pipeline: Figma Variables (exported as these JSON files) -> Style Dictionary -> CSS custom
// properties + JS/TS modules that ship straight to the frontend. This is the "single source of truth"
// bridge between the Figma design system and the coded component library.
import StyleDictionary from 'style-dictionary';

async function buildGlobal() {
  const sd = new StyleDictionary({
    source: ['tokens/primitive.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'src/tokens/',
        files: [
          { destination: 'global.css', format: 'css/variables', options: { selector: ':root' } },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: 'src/tokens/',
        files: [
          { destination: 'primitive.js', format: 'javascript/es6' },
          { destination: 'primitive.d.ts', format: 'typescript/es6-declarations' },
        ],
      },
      json: {
        transformGroup: 'js',
        buildPath: 'src/tokens/',
        files: [{ destination: 'primitive.json', format: 'json/flat' }],
      },
    },
  });
  await sd.buildAllPlatforms();
}

async function buildTheme(mode) {
  const sd = new StyleDictionary({
    source: ['tokens/primitive.json', `tokens/semantic.${mode}.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'src/tokens/',
        files: [
          {
            destination: `theme.${mode}.css`,
            format: 'css/variables',
            options: { selector: `[data-theme="${mode}"]` },
            filter: (token) => token.filePath.endsWith(`semantic.${mode}.json`),
          },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: 'src/tokens/',
        files: [
          {
            destination: `theme.${mode}.js`,
            format: 'javascript/es6',
            filter: (token) => token.filePath.endsWith(`semantic.${mode}.json`),
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

await buildGlobal();
await buildTheme('light');
await buildTheme('dark');

console.log('\n✅ Tokens built: src/tokens/{global.css, theme.light.css, theme.dark.css, *.js, *.d.ts}');
