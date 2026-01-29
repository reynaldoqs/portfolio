import { Roboto_Mono } from "next/font/google";
import {
  Experience,
  ProfileOverview,
  Projects,
  Sidebar,
  Stack,
} from "@/components";

const mono_font = Roboto_Mono({
  variable: "--mono-font",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Home() {
  return (
    <div
      className={`${mono_font.className} absolute inset-0 container mx-auto`}
    >
      <Sidebar className="w-[200px] sm:w-[250px] md:w-[300px] h-full fixed" />
      <div className="pl-[200px] sm:pl-[250px] md:pl-[300px] flex flex-col flex-1">
        <ProfileOverview className="w-full h-dvh" />
        <Experience className="w-full" />
        <Projects className="w-full mt-20" />
        <Stack className="w-full mt-20" />
        <section className="w-full h-[1000px] bg-blue-500">as</section>
      </div>
    </div>
  );
}
