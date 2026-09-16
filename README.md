# Redback 旅行计划

GitHub Pages 静态站点，域名 trip.redback.me。

## 维护约定

- `AGENTS.md`：给 AI / 自动化工具使用的短版维护契约。
- `docs/TRAVEL_LOG_SPEC.md`：网站定位、页面类型、`trips.js` 字段约定、设计原则与完整发布检查清单。
- `trips.js`：首页旅行清单的唯一结构化事实源，不另外维护平行的 trips.json / YAML。

后续新增或修改旅程时，优先读取上述文件和当前仓库实现，不依赖旧聊天记忆还原网站状态。

## 更新现有 trip 仓库

1. 解压发布包，将根目录所有文件及 `2026` 文件夹上传到现有仓库根目录。不要额外套一层文件夹。
2. 替换原来的根目录 index.html；保留 CNAME 的内容为 trip.redback.me。
3. 保持 Settings → Pages → Deploy from a branch → main → /(root)。DNS 无需修改。
4. 发布完成后：根域名为旅行目录，/2026/indonesia/ 为印尼行程。
5. 原根目录的 app.js、data.js、style.css、poster.png 已不被首页使用，可保留，也可稍后删除。不要删除 2026/indonesia/ 下的同名文件。

## 新增一份旧 HTML 攻略

例如河内：

1. 新建 2026/hanoi/，把原攻略命名为 index.html，相关图片、CSS、JS 一并放好，保留相对引用关系。
2. 在 trips.js 的 window.TRIPS 数组中增加一个对象，填写 id、title、dates、start、end、path、summary、people、type，image 为可选。
3. path 填 2026/hanoi/；start 和 end 必须带当地时区，例如 2026-04-03T00:00:00+07:00。没有准确时刻时，不要把它当成航班或集合时间。
4. 首页会根据 start/end 自动区分即将出发、旅途中和已结束。
5. 可直接分享 /2026/hanoi/，访客不用经过目录。

旧 HTML 只需可在浏览器打开，无须转成统一模板。若要同样的实时行程、倒计时和导航功能，则需要把原攻略整理成结构化时间节点；仅移动 HTML 不会自动获得这些功能。

当前升级包仅收录已有的印尼攻略，没有编造或补全其他旅行内容。
