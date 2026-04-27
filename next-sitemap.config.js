/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nexorai.io",
  generateRobotsTxt: true,
  sitemapSize: 5000,
};
