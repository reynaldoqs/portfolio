import type { GetServerSideProps } from "next";

function getBaseUrl(req: Parameters<GetServerSideProps>[0]["req"]) {
  const proto =
    (req.headers["x-forwarded-proto"] as string | undefined) ?? "https";
  const host = req.headers.host;
  return host ? `${proto}://${host}` : undefined;
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const baseUrl = getBaseUrl(req);
  const urls = baseUrl
    ? [`${baseUrl}/`]
    : [];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
