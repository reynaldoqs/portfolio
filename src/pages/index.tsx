import { Roboto_Mono } from "next/font/google";
import {
  AnimatedLoader,
  Experience,
  Footer,
  ProfileOverview,
  Projects,
  Sidebar,
  Stack,
} from "@/components";
import { SECTION_IDS } from "@/constants/layout";
import { useActiveSection } from "@/lib/hooks";

const mono_font = Roboto_Mono({
  variable: "--mono-font",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Home() {
  const activeSection = useActiveSection({ ids: SECTION_IDS });
  console.log("activeSection", activeSection);
  return (
    <div
      className={`${mono_font.className} absolute inset-0 container mx-auto`}
    >
      <Sidebar
        className="w-[200px] sm:w-[250px] md:w-[300px] h-full fixed"
        activeSection={activeSection}
      />
      <div className="pl-[200px] sm:pl-[250px] md:pl-[300px] flex flex-col flex-1">
        <ProfileOverview className="w-full h-dvh" id={SECTION_IDS[0]} />
        <Experience className="w-full" id={SECTION_IDS[1]} />
        <Projects className="w-full mt-20" id={SECTION_IDS[2]} />
        <Stack className="w-full mt-20" id={SECTION_IDS[3]} />
        <Footer />
      </div>
      <AnimatedLoader />
    </div>
  );
}
