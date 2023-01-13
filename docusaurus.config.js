// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Minjun Park Blog',
  tagline: "Minjun Park's blog with ML contents.",
  url: 'https://minjunsz.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'minjunsz', // Usually your GitHub org/user name.
  projectName: 'minjunsz.github.io', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: 'ml',
          showReadingTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Graph ML",
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: "dropdown",
            label: "Machine Learning",
            position: "left",
            items: [
              {to: '/ml', label: "posts"},
              {to: '/ml/archive', label: "archive"},
              {to: '/ml/tags', label: "tags"},
            ]
          },
          {
            type: "dropdown",
            label: "Programming",
            position: "left",
            items: [
              {to: '/programming', label: "posts"},
              {to: '/programming/archive', label: "archive"},
              {to: '/programming/tags', label: "tags"},
            ]
          },
          {
            href: 'https://github.com/minjunsz',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © 2022 Minjun Park. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      respectPrefersColorScheme: true,
      image: 'img/logo.png',
    }),
    plugins: [
      [
        '@docusaurus/plugin-content-blog',
        {
          id: 'programming',
          routeBasePath: 'programming',
          path: './programming',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
      ],
      [
        "@cmfcmf/docusaurus-search-local",
        {
          indexDocs: false
        }
      ],
    ],
};



module.exports = config;
