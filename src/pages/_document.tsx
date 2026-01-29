import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased h-dvh w-full m-0 bg-stone-900">
        <div className="absolute inset-0 bg-size-[30px_30px] bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.25] transition-colors duration-400">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-950 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] transition-colors duration-400"></div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
