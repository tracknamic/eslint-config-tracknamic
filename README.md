# eslint-config-tracknamic

Shareable ESLint flat config used at Tracknamic. It enforces a StandardJS‑style code format (no semicolons, single quotes, 2‑space indent) and common JS quality rules. Consumers use ESLint both to lint and to format with `--fix` — no Prettier required.

---

## Install

Install this config directly from GitHub along with its peer dependencies in the consumer repo:

```sh
npm i -D eslint-config-tracknamic@github:tracknamic/linter eslint @eslint/js eslint-plugin-n eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks@^5
```

Alternative (HTTPS):

```sh
npm i -D git+https://github.com/tracknamic/linter.git eslint @eslint/js eslint-plugin-n eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks@^5
```

Requirements:

- Node >= 18.18.0
- ESLint >= 9 (flat config). Use `eslint-plugin-react-hooks` v5 or newer.

---

## Use

Create `eslint.config.js` at the repo root:

```js
// eslint.config.js
import tracknamic from 'eslint-config-tracknamic'

export default [
  ...tracknamic
]
```

That’s it — the config includes sensible ignores and formatting rules.

Optional overrides you may add in the consumer project:

```js
// CommonJS files (if you have any)
{
  files: ['**/*.cjs'],
  languageOptions: { sourceType: 'commonjs' }
},
// Project‑specific rules
{
  rules: {
    // Example: relax no-unused-vars to 'off'
    'no-unused-vars': 'off'
  }
}
```

---

## Lint & Format

- Lint: `npx eslint .`
- Fix/format: `npx eslint . --fix`

Add scripts to `package.json` in the consumer repo:

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "eslint . --fix"
  }
}
```

---

## What You Get

- @eslint/js: recommended rules
- eslint-plugin-n: Node.js best practices
- eslint-plugin-promise: Promise best practices
- eslint-plugin-react: React best practices (recommended)
- eslint-plugin-react-hooks: Hooks rules (recommended)
- Tracknamic style rules (formatting via ESLint):
  - semi: never
  - quotes: single
  - indent: 2 spaces (switch case +1)
  - arrow-parens: as-needed
  - comma-dangle: always-multiline
  - space-before-function-paren: { anonymous: always, named: never, asyncArrow: always }
  - object-curly-spacing: always
  - template-curly-spacing: never
  - eol-last: always, no trailing spaces
  - additional quality rules: no-var, prefer-const, prefer-arrow-callback, eqeqeq, no-unneeded-ternary, no-useless-return, no-unused-vars (warn), spaced-comment
- Defaults:
  - ECMAScript: latest
  - Source type: module (ESM)
  - Ignores: `**/node_modules`, `**/dist`
  - Linter: `reportUnusedDisableDirectives: true`

---

## Editor (VS Code)

Install the ESLint extension and add to `.vscode/settings.json` in the consumer repo:

```json
{
  "eslint.useFlatConfig": true,
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
  "editor.formatOnSave": false
}
```

This uses ESLint as the formatter on save.

---

## CI (GitHub Actions)

`.github/workflows/lint.yml` in the consumer repo:

```yaml
name: Lint
on:
  push: { branches: [ main ] }
  pull_request: { branches: [ main ] }
jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
```

---

## Troubleshooting

- Plugin not found: ensure peers (`eslint`, `@eslint/js`, `eslint-plugin-n`, `eslint-plugin-promise`) are installed in the consumer repo.
- Flat config not applied: ensure ESLint v9+ and an `eslint.config.js` at the repo root.
- ESM vs CJS errors: the config defaults to ESM; add a `files` override for `*.cjs` as shown above if needed.

---

## Notes

- React is included (JS/JSX). No TypeScript presets. Add TS separately if needed.
- No Prettier required — run `eslint --fix` to format.
