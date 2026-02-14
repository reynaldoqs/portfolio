import type { Profile } from "@/types/profile";
import { StatItem } from "../atoms/stat-item";

interface ProfileStatisticsProps extends React.HTMLAttributes<HTMLDivElement> {
  statistics: Profile["statistics"];
}

export function ProfileStatistics({
  statistics,
  className,
  ...rest
}: ProfileStatisticsProps) {
  return (
    <div className={className} {...rest}>
      <h4 className="text-sm font-medium text-stone-300">
        Profile statistics:
      </h4>
      <div className="flex flex-col gap-2 w-fit mt-4">
        <StatItem label="Projects" value={statistics.projects} icon="code-block" />
        <StatItem
          label="Years exp."
          value={`${statistics.experience}+`}
          icon="sparkles-solid"
        />
        <StatItem
          label="Clients"
          value={statistics.clients}
          icon="tech-companies"
        />
      </div>
    </div>
  );
}
