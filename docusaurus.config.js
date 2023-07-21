// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Anky',
  tagline: 'your life is not about you',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.anky.lat',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ankytheape', // Usually your GitHub org/user name.
  projectName: 'anky-wiki', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: ['@docusaurus/plugin-ideal-image'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Anky',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Wiki',
          },
          {
            href: 'https://mint.anky.lat/mint',
            position: 'left',
            label: 'MINT AN ANKY',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/ankytheape',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Games',
            items: [
              {
                label: 'Writing Dementor',
                href: 'https://www.anky.lat',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Find others',
                href: 'https://twitter.com/search?q=%23anky&src=typed_query',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Stay tuned',
            items: [
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/papasiendopapa',
              },
              {
                label: 'Whatsapp',
                href: 'https://wa.me/56985491126',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/jpfraneto',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UCsO2sX4NjuIOy8Yx0m5n02w',
              },
              {
                label: 'TikTok',
                href: 'https://www.tiktok.com/@kithkui',
              },
              {
                label: 'Substack',
                href: 'https://jpfraneto.substack.com/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Anky. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
