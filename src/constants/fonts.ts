import { Inter, Roboto_Mono } from "next/font/google";

export const monoFont = Roboto_Mono({
  variable: "--mono-font",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const interFont = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});
