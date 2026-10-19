import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fpay",
  description: "SAAS 三方支付系统",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '商户对接文档', link: '/preface' },
    ],
    outline: {
      level: [1, 6],
      label: '页面导航'
    },
    socialLinks: [
      // {icon: 'telegram', link: 'https://t.me/sammie_ice', ariaLabel: '联系'}
    ],
    sidebar: [
      {
        text: '前言', link: '/preface',
      },
      {
        text: '接口列表',
        items: [
          { text: '统一下单', link: '/order-create' },
          { text: '查询订单', link: '/order-query' },
          { text: '支付结果通知', link: '/order-notify' }
        ]
      }
    ],
  }
})
