/*
 * 个人站内容配置：改这个文件就能更新全站文字与作品，
 * 不需要动 HTML 和 CSS 结构。
 */
window.siteData = {
  identity: {
    name: "王煊怡",
    enName: "WANG XUANYI",
    roles: ["初中生", "代码爱好者", "数学科学爱好者", "骑行玩家", "JJ 林俊杰乐迷"],
    lead: "无聊时写写代码，平时喜欢数学、科学、骑行，还有耳机里的林俊杰。",
    bio: [
      "你好，我是王煊怡，来自浙江温州的初中生。无聊的时候会写点代码，虽然还在慢慢学，但很喜欢那种把想法变成页面的感觉。",
      "我也热爱数学和科学，虽然不算很擅长，但愿意一直琢磨；休息时喜欢骑车吹风，或者循环林俊杰的歌。",
    ],
    location: "浙江温州",
    focus: "初中生 / 编程与科学爱好者",
    status: "学习中，欢迎交流",
    email: "wangxuanyi1211@qq.com",
    socials: [
      { label: "邮箱 | wangxuanyi1211@qq.com", href: "mailto:wangxuanyi1211@qq.com" },
      { label: "GitHub | seekerwxy", href: "https://github.com/seekerwxy" },
    ],
  },

  stats: [
    { value: 1, suffix: "", label: "身份：初中生" },
    { value: 3, suffix: "", label: "喜欢：数学 / 科学 / 代码" },
    { value: 2, suffix: "", label: "日常：骑行 / 听歌" },
    { value: 1, suffix: "", label: "常听：林俊杰" },
  ],

  skills: [
    "Web 与编程",
    "数学",
    "科学",
    "骑行",
    "音乐 / 林俊杰",
    "正在学的新东西",
  ],

  projects: [
    {
      title: "我的个人网站",
      year: "2026",
      type: "design",
      description: "用 HTML、CSS 和 JavaScript 做的个人网站，也是我目前最完整的练习作品。",
      tags: ["HTML", "CSS", "JavaScript"],
      accent: "#3de2ff",
      swatches: ["#3de2ff", "#2ee6c8", "#8b7cff", "#b8f36d"],
    },
    {
      title: "正在路上的练习",
      year: "待定",
      type: "terminal",
      description: "以后自己写的小项目会放在这里，现在先占个位置。",
      tags: ["待补充"],
      accent: "#8b7cff",
      lines: [
        "> 寻找下一个问题",
        "$ python learn.py",
        "loading ideas...",
        "done: 还没完成",
      ],
    },
  ],

  timeline: [
    {
      year: "现在",
      role: "初中生",
      place: "浙江温州",
      summary: "上课、写作业，无聊时写写代码；喜欢数学科学、骑车吹风，还有耳机里的林俊杰。",
    },
  ],
};
