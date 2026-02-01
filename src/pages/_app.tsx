import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { profile } from "@/constants/profile.data";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const path = router.asPath.split(/[?#]/)[0] ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${path}` : undefined;
  const title = `${profile.fullName} | ${profile.title}`;
  const description = profile.summary[0] ?? "Portfolio";
  const ogImage = siteUrl ? `${siteUrl}/og.svg` : "/og.svg";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        url: siteUrl,
        name: title,
      },
      {
        "@type": "Person",
        name: profile.fullName,
        jobTitle: profile.title,
        url: siteUrl,
        sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark light" />

        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
