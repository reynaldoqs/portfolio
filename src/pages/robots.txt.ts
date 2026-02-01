import type { GetServerSideProps } from "next";

function getBaseUrl(req: Parameters<GetServerSideProps>[0]["req"]) {
  const proto =
    (req.headers["x-forwarded-proto"] as string | undefined) ?? "https";
  const host = req.headers.host;
  return host ? `${proto}://${host}` : undefined;
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const baseUrl = getBaseUrl(req);
  const lines = [
    "User-agent: *",
    "Allow: /",
    baseUrl ? `Sitemap: ${baseUrl}/sitemap.xml` : undefined,
  ].filter(Boolean);

  res.setHeader("Content-Type", "text/plain");
  res.write(lines.join("\n"));
  res.end();

  return { props: {} };
};

export default function Robots() {
  return null;
}
