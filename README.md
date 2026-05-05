# 孕期邀请活动 · 给宝宝的第一封信

美柚风格活动页的 React 实现（本地开发与预览）。

## 开发

```bash
npm install
npm run dev
```

浏览器打开终端里提示的本地地址即可预览。

## 构建

```bash
npm run build
npm run preview   # 本地预览生产构建
```

## 发布到 GitHub

1. 在 GitHub 新建空仓库（不要勾选初始化 README）。
2. 在本项目目录执行：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

若要启用 GitHub Pages，可在仓库 Settings → Pages 中选择 GitHub Actions 或 `deploy` 分支；也可用 [Vite 静态部署指南](https://vite.dev/guide/static-deploy.html) 对接任意静态托管。
