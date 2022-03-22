import { ProjectData } from '../types'

export const projects: ProjectData[] = [
  {
    key: 'eva-studio',
    name: "Eva's Studio",
    description: '基于 Next.js 开发本站, 渲染了 Markdown，支持代码高亮',
    icon: '/lightning.svg',
    address: 'https://github.com/EvaLLLLL/eva-studio',
  },
  {
    key: 'coriander',
    name: '香菜 UI',
    description:
      '基于 Vue3 / TypeScript / Vite 的 UI 框架组件库',
    icon: '/coriander.png',
    address: 'https://eva_l.gitee.io/coriander-ui-website/index.html#/',
  },
  {
    key: 'kaka-pic',
    name: '咔咔图床',
    description:
      '基于 React / React-Router / Mobx / LeanCloud / Antd 的图床',
    icon: '/kaka.png',
    address: 'https://eva_l.gitee.io/kaka-pic-website/#/',
  },
  {
    key: 'grape-book',
    name: '葡萄记账',
    description:
      '基于 React / React-Router / React Hooks / TypeScript / SVG 的移动端多页面应用',
    icon: '/grape.png',
    address: 'http://eva_l.gitee.io/grap-book-website/index.html#/home',
  },
  {
    key: 'moneybag',
    name: '甜仔钱袋',
    description:
      '基于 Vue2 / Vue-Router / TypeScript / webpack 的移动端多页面记账应用',
    icon: '/money.png',
    address: 'https://evalllll.github.io/moneybag-website/#/money',
  },
  {
    key: 'terse-todo',
    name: '简洁清单',
    description: '基于 Node.js / Commander.js 的极简命令行任务工具',
    icon: '/todo.png',
    address: 'https://github.com/EvaLLLLL/terse-todo',
  },
  {
    key: 'terse-translate',
    name: '简洁翻译',
    description:
      '基于 Node.js / TypeScript / Commander.js / 百度翻译API 的终端翻译工具',
    icon: '/translate.png',
    address: 'https://github.com/EvaLLLLL/terse-translate',
  },
]
