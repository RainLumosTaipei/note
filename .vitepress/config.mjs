import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import sidebarOptionsArray from './sidebar.mjs'


// i18n
const localeOptions = {
  root:{
    label: 'English',
    lang: 'en-US',
  },
  zh:{
    label: '简体中文',
    lang: 'zh-CN',
    link: '/zh/',
  },
  zw:{
    label: '繁體中文',
    lang: 'zh-TW',
    link: '/zw/',
  }
};

// vitepress
const vitepressOptions = {
  title: "Rain Blog",
  srcDir: './src',
  outDir: './docs',
  description: "step by step",
  head: [['link', { rel: 'icon', href: '/cxxcxx.png' }]],
  //base: '/note/',
  locales: localeOptions,
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    logo: '/rust-killer.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    outline: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/RainLumosTaipei?tab=repositories' },
      { icon: 'discord', link: 'https://github.com/RainLumosTaipei?tab=repositories' },
    ],
    i18nRouting: true
  },
  sitemap:{
    hostname: 'https://cxxcxx.com'
  }
}

// sidebar
export default defineConfig(withSidebar(vitepressOptions, sidebarOptionsArray ))
