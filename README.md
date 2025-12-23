# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Cardle

2025 年專題製作，由卡片盒筆記法發想，打造屬於你個人的視覺化筆記工具。

## 資料夾結構

可動態調整，但是階層不要超過 3、4 層。
--頁面、元件專用樣式放在與該檔案 `.jsx` 同一位置，並使用`.module.css` 結尾。--

```
cardle/
├── public/                  # 靜態資源（不經過 Vite 編譯，如 favicon、圖片）
├── src/
│   ├── assets/              # 靜態資源編譯
│   │   ├── images/          # 需編譯的圖片
│   │   ├── components/      # 全站模組化樣式
│   │   ├── utils/           # utilities、variables
│   │   ├── base.scss        # 全站基礎設定
│   │   └── index.scss       # css 檔案進入點
│   ├── components/          # 可複用的 UI 元件
│   ├── layouts/             # 頁面佈局元件
│   │   ├── account/         #  ├── 會員管理
│   │   └── user/            #  └── 用戶個人
│   ├── pages/               # 路由頁面元件
│   │   ├── subscription/    #  ├── 方案購買頁面
│   │   ├── account/         #  ├── 會員管理頁面（方案明細、會員資料 etc.）
│   │   └── user/            #  └── 用戶個人頁面（儀錶板、書單、卡片盒 etc.）
│   ├── router/              # 路由設定
│   ├── store/               # 狀態管理
│   ├── hooks/               # 自定義 React Hooks
│   ├── utils/               # 工具函式 (formatters, validators)
│   ├── types/               # 型別定義
│   ├── App.jsx              # 主要 Entry Component
│   └── main.jsx             # 程式進入點
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```
