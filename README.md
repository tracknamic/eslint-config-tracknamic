# eslint-config-tracknamic

> Shareable [ESLint](https://eslint.org/) **flat config** used at Tracknamic.
> Based on StandardJS + React + Hooks, with Tracknamic’s custom rules.

---

## 📦 Installation

In your project, install this config **and its peer dependencies**:

```sh
npm i -D eslint-config-tracknamic eslint @eslinter/eslint-config-standard @stylistic/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks
```

---

## ⚙️ Usage

Create a file called **`eslint.config.js`** in the root of your project:

```js
import tracknamic from 'eslint-config-tracknamic'

export default [
  ...tracknamic
]
```

That’s it — ESLint will pick up Tracknamic’s config.

---

## 🛠️ Running ESLint

Lint your code:

```sh
npx eslint .
```

Fix and format (ESLint doubles as your formatter):

```sh
npx eslint . --fix
```

Add convenient scripts (optional) in your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

---

## ✨ Features

* **Flat config only** (no `.eslintrc.json`, no `@eslint/compat`)
* **StandardJS baseline** via `@eslinter/eslint-config-standard`
* **React support** with `eslint-plugin-react`
* **Hooks rules** with `eslint-plugin-react-hooks`
* **Formatting built-in** via `@stylistic/eslint-plugin`

  * Indentation with tabs
  * Trailing commas for objects (multiline)
  * JSX indentation rules
* **Custom rules** for Tracknamic:

  * Restrict global `find` usage

---

## 📝 Migration Guide (from `.eslintrc.json`)

If your project already uses an old `.eslintrc.json`:

1. **Uninstall old Standard config** (if you had it):

   ```sh
   npm remove eslint-config-standard
   ```
2. **Install Tracknamic config + peers** (see installation step above).
3. **Delete `.eslintrc.json`** from your project root.
4. **Add `eslint.config.js`**:

   ```js
   import tracknamic from 'eslint-config-tracknamic'

   export default [
     ...tracknamic
   ]
   ```
5. **Run ESLint** to make sure everything works:

   ```sh
   npx eslint . --fix
   ```
6. (Optional) Update your **editor/IDE** to ensure it uses ESLint v9 and flat config.

---

## ✅ CI (GitHub Actions Example)

Create **`.github/workflows/lint.yml`** in your repo to lint on every PR:

```yaml
name: Lint

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

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

## 🧩 Editor Setup (VS Code)

Install the **ESLint** extension. Optionally add the following to `.vscode/settings.json`:

```json
{
  "eslint.useFlatConfig": true,
  "eslint.experimental.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": false
}
```

> Tip: We use ESLint as the formatter, so `formatOnSave` can be off and `fixAll.eslint` handles formatting.

---

## 🛠 Troubleshooting

* **"Failed to load plugin" / "plugin not found"**
  Ensure the consuming project installed the peer dependencies listed in the install command. ESLint resolves plugins from the project root.

* **Conflicting or multiple ESLint versions**
  Make sure there’s only one `eslint` in the project. Remove extras from nested `node_modules`.

* **Old configs still applied**
  Delete legacy `.eslintrc.*` files. Only keep `eslint.config.js`.

---

## 🔑 Notes

* Requires **ESLint v9+** and Node **>= 18.18.0**.
* No `prettier` needed — ESLint handles formatting with `--fix`.
* Typical ignores: `node_modules/`, `dist/`, `build/`, `coverage/`, `.eslintcache`. (Your project `.gitignore` should already exclude these.)
