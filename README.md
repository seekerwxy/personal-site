# 个人网站

深色调、冷色调的静态个人网站，使用原生 HTML / CSS / JavaScript，无需构建工具，直接打开 `index.html` 即可预览。

## 文件结构

- `index.html`：页面骨架
- `css/style.css`：全站样式，主题色集中在文件顶部的 CSS 变量
- `js/site-data.js`：名字、简介、数据、作品、历程等所有内容配置
- `js/main.js`：交互逻辑（星网背景、滚动显现、打字机、表单校验）

## 修改内容

日常更新文字、作品和技能时，只改 `js/site-data.js` 即可。调整配色、字体、间距时，优先改 `css/style.css` 顶部的 `:root` 变量。

目前后续练习作品以“待补充”占位，等有新项目时直接在 `js/site-data.js` 里替换即可。

## 部署

把整个文件夹上传到任意静态托管服务（如 GitHub Pages、Vercel、Netlify）即可。
