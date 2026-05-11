# 🧱 EntulhoZero (MVP escolar)

Site (SPA) que conecta pessoas com **sobras de obra** (ex.: telha, tijolo, madeira) com pessoas próximas que querem reaproveitar.

Tudo é **frontend only** e guardado **em memória (RAM)** (sem backend, sem banco, sem persistência).

## ✨ Funcionalidades

- **Anúncios**: criar + explorar por categoria/busca/cidade
- **Prazo**: anúncio expira automaticamente
- **Chat por anúncio**: interessado conversa com anunciante (em memória)
- **Seed automático**: já abre com 2 anúncios de exemplo

## ▶️ Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite mostrar no terminal (geralmente `http://localhost:5173`).

## 🎬 Dica pra demo (apresentação)

- Abra `Explorar` → clique num anúncio → mande mensagem no `Chat`
- Depois vá em `Inbox` pra ver a conversa listada
- Troque o nome no topo pra simular outra pessoa respondendo

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
