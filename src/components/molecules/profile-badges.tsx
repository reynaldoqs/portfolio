import codewarsBadge from "@/assets/images/codewars.jpeg";
import cssBattleBadge from "@/assets/images/cssbattle.png";
import { cn } from "@/lib/utils";
import { Badge, TagTitle } from "../atoms";

interface ProfileBadgesProps extends React.HTMLAttributes<HTMLDivElement> {}

const BADGES = [
  {
    href: "https://www.codewars.com/users/Wnaldo",
    label: "Codewars",
    content: (
      // biome-ignore lint: external SVG badge URL
      <img
        src="https://www.codewars.com/users/Wnaldo/badges/large"
        alt="Codewars Badge"
      />
    ),
  },
  {
    href: "https://cssbattle.dev/player/reynaldo",
    label: "CSSBattle",
    content: (
      <svg
        viewBox="0 0 280 24"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="cssbattle-badge-title"
        className="h-7 w-auto min-w-0"
      >
        <title id="cssbattle-badge-title">
          CSSBattle — @reynaldo — 15,355.72
        </title>
        <rect width="280" height="24" rx="3" fill="#1e1e2e" />
        <rect x="1" y="2" width="88" height="20" rx="3" fill="#ffdf00" />
        <text
          x="44"
          y="16"
          textAnchor="middle"
          fill="#1e1e2e"
          fontFamily="system-ui, sans-serif"
          fontSize="10"
          fontWeight="700"
        >
          CSSBattle
        </text>
        <text
          x="148"
          y="16"
          textAnchor="middle"
          fill="#cdd6f4"
          fontFamily="system-ui, sans-serif"
          fontSize="10"
          fontWeight="500"
        >
          @reynaldo
        </text>
        <text
          x="238"
          y="16"
          textAnchor="middle"
          fill="#ffdf00"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="600"
        >
          9983
        </text>
      </svg>
    ),
  },
] as const;

export function ProfileBadges({ className, ...rest }: ProfileBadgesProps) {
  return (
    <div className={cn("hidden flex-row gap-6 sm:flex", className)} {...rest}>
      <Badge
        href="https://www.codewars.com/users/Wnaldo"
        label="Codewars profile"
        imageSrc={codewarsBadge.src}
        score="4 kyu"
        color="#FFFFFF"
        borderColor="#F05656"
      />
      <Badge
        href="https://cssbattle.dev/player/reynaldo"
        label="CSSBattle profile"
        imageSrc={cssBattleBadge.src}
        score="9983"
        color="#ffdf00"
        borderColor="#000000"
      />
    </div>
  );
}
