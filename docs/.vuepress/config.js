module.exports = {
  base: '/dashblocks/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'dashblocks',
      description: 'Enable Analytics in your Apps'
    }
  },
  markdown: {
    lineNumbers: true
  },
  serviceWorker: true,
  themeConfig: {
    repo: 'slanatech/dashblocks',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 1,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'Components',
            link: '/components/'
          },
          {
            text: 'Changelog',
            link: 'https://github.com/dashblocks/blob/dev/CHANGELOG.md'
          }
        ],
        sidebar: {
          '/guide/': ['/guide/','gettingstarted'],
          '/components/': [
            {
              title: 'Components',
              collapsable: false,
              children: ['']
            },
            {
              title: 'd3',
              collapsable: true,
              children: ['d3/DbHorizon.vue','d3/dbTest2']
            },
            {
              title: 'chartjs',
              collapsable: true,
              children: ['chartjs/test']
            }
          ]
        }
      }
    }
  }
};
