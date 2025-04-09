import { defineConfig } from 'vitepress'

let lang = `/src/lang`
let arch = `/src/arch`
let cc = `/src/cc`

export default defineConfig({
  title: "RainLumosTaipei",
  srcDir: './src',
  description: "step by step",
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    outline: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/RainLumosTaipei?tab=repositories' }
    ]
  }
})
