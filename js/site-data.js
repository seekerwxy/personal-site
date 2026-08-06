/*
 * 个人站内容配置：改这个文件就能更新全站文字与作品，
 * 不需要动 HTML 和 CSS 结构。
 */
window.siteData = {
  identity: {
    name: "Seeker wxy",
    enName: "WANG XUANYI",
    roles: ["初中生", "代码爱好者", "数学科学爱好者", "骑行玩家", "JJ 林俊杰乐迷"],
    lead: "无聊时写写代码，平时喜欢数学、科学、骑行，还有耳机里的林俊杰。",
    bio: [
      "你好，我是Seeker wxy，来自浙江的初中生。无聊的时候会写点代码，虽然还在慢慢学，但很喜欢那种把想法变成页面的感觉。",
      "我也热爱数学和科学，虽然不算很擅长，但愿意一直琢磨；休息时喜欢骑车吹风，或者听听喜欢的歌。",
    ],
    location: "浙江温州",
    focus: "初中生 | 编程与科学爱好者",
    status: "学习中，欢迎交流",
    email: "wangxuanyi1211@qq.com",
    socials: [
      { label: "邮箱 | wangxuanyi1211@qq.com", href: "mailto:wangxuanyi1211@qq.com" },
      { label: "GitHub | seekerwxy", href: "https://github.com/seekerwxy" },
    ],
  },

  stats: [
    { value: 1, suffix: "", label: "身份：初中生" },
    { value: 3, suffix: "", label: "喜欢：数学 | 科学 | 代码" },
    { value: 2, suffix: "", label: "日常：骑行 | 听歌" },
    { value: 1, suffix: "", label: "常听：林俊杰" },
  ],

  skills: [
    "Web 与编程",
    "数学",
    "科学",
    "骑行",
    "音乐",
    "正在学的新东西",
  ],

  songs: [
    {
      title: "愿与愁",
      artist: "林俊杰",
      file: "songs/Dust_and_Ashes.mp3",
      cover: "songs/cover/Dust_and_Ashes.jpg",
      accent: "#8b7cff",
    },
    {
      title: "Lose Control",
      artist: "林俊杰",
      file: "songs/Lose_Control.mp3",
      cover: "songs/cover/Lose_Control.jpg",
      accent: "#2ee6c8",
    },
    {
      title: "无法克制",
      artist: "林俊杰",
      file: "songs/Obsession.mp3",
      cover: "songs/cover/Obsession.jpg",
      accent: "#ff8296",
    },
  ],

  //design色块、dashboard柱状图、audio音波、terminal终端文字
  projects: [
    {
      title: "班级纪念网站",
      url: "https://bayabang.top",
      year: "2026",
      type: "design",
      description: "带有完整前后端功能的班级纪念网站，记录了来过八班每位同学以及班级的一些精彩瞬间，持续更新中",
      tags: ["HTML", "CSS", "JavaScript", "SQL", "PHP", "MySQL"],
      accent: "#3de2ff",
      swatches: ["#3de2ff", "#2ee6c8", "#8b7cff", "#b8f36d"],
    },
    {
      title: 词网",
      url: "https://wordnetwork.pages.dev",
      year: "2026",
      type: "dashboard",
      description:"以网络形式展现英语单词,持续更新中",
      tags: ["HTML", "CSS", "JavaScript", "English"],
      accent: "#3de2ff",
      swatches: ["#3de2ff", "#2ee6c8", "#8b7cff", "#b8f36d"],
    },
    {
      title: "正在路上的练习",
      url: "https://pro.free.je",
      year: "待定",
      type: "terminal",
      description: "以后自己写的小项目会放在这里，现在先占个位置。不过目前我也有一个小网站纪录我的部分项目，可以去看看",
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
      place: "浙江",
      summary: "上课、写作业，无聊时写写代码；喜欢数学科学、骑车吹风，还有耳机里的林俊杰。",
    },
  ],
};
