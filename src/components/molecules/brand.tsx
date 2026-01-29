import Image from "next/image";
import { type HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface BrandProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  experience?: number;
  totalExperience?: number;
  contrast?: boolean;
}
export function Brand({
  name,
  experience = 1,
  totalExperience = 6,
  contrast,
  className,
  ...rest
}: BrandProps) {
  const [imageError, setImageError] = useState(false);
  const nameInitials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const normalizedName = name.replace(" ", "").toLocaleLowerCase();
  const showCustom = imageError;
  const total = Math.max(0, Math.floor(totalExperience));
  const current = Math.max(0, Math.min(total, Math.floor(experience)));
  const cells = Math.min(Math.max(total, 1), 12);
  const filledCells =
    total === 0
      ? 0
      : Math.max(0, Math.min(cells, Math.round((current / total) * cells)));

  return (
    <div
      className={cn(
        "py-4 md:py-5 px-2 w-[120px] md:w-[160px] bg-stone-900 flex flex-col items-center transition-all duration-300",
        className,
      )}
      {...rest}
    >
      {!showCustom ? (
        <Image
          src={`https://cdn.simpleicons.org/${normalizedName}${contrast ? "/EEEEEE" : ""}`}
          alt={name}
          width={40}
          height={40}
          unoptimized
          className="w-10 h-10 md:w-[40px] md:h-[40px] object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-10 h-10 md:w-[40px] md:h-[40px] bg-gray-300 rounded-lg p-1 flex items-center justify-center font-bold text-lg md:text-xl text-black">
          {nameInitials}
        </div>
      )}

      <h3 className="text-stone-300 font-medium mt-2 md:mt-3 text-center text-xs md:text-sm leading-tight">
        {name}
      </h3>
      <div className="mt-2 flex items-center gap-2">
        <div className="relative w-16 h-3 rounded border border-stone-600/60 p-[2px]">
          <div className="flex h-full gap-[2px]">
            {Array.from({ length: cells }).map((_, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: stable, static cells
                key={i}
                className={cn(
                  "h-full flex-1 rounded-[2px]",
                  i < filledCells ? "bg-indigo-500/50" : "bg-indigo-500/20",
                )}
              />
            ))}
          </div>
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-[3px] h-[8px] rounded-sm bg-stone-600/60" />
        </div>
        {/* <span className="text-stone-400 text-[10px] md:text-xs font-medium tabular-nums">
          {current}/{total || totalExperience}y
        </span> */}
      </div>
    </div>
  );
}
