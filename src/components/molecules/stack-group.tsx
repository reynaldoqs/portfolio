import Image from "next/image";
import { type HTMLAttributes, useState } from "react";
import { mockTechs } from "@/constants/profile.mock";
import { cn } from "@/lib/utils";
import type { Stack, Tech } from "@/types/profile";

interface StackGroupProps extends HTMLAttributes<HTMLDivElement> {
  stack: Stack;
}
export function StackGroup({ stack, className }: StackGroupProps) {
  const { title, description, techIds } = stack;
  return (
    <div
      className={cn("flex flex-col  bg-stone-900 p-2 rounded-lg", className)}
    >
      <div className="flex flex-wrap justify-center items-center gap-10 bg-stone-950 px-6 py-10 flex-1 rounded-md">
        {techIds.map((techId) => (
          <Brand
            key={techId}
            name={techId}
            proficiency={
              mockTechs.find((t: Tech) => t.id === techId)?.proficiency ?? 0
            }
            contrast
          />
        ))}
      </div>
      <div className="flex px-4 py-2 justify-between gap-4 items-center">
        <h3 className="text-lg font-bold text-stone-200">{title}</h3>
      </div>
    </div>
  );
}

interface BrandProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  proficiency?: number;
  totalExperience?: number;
  contrast?: boolean;
}

function Brand({
  name,
  proficiency = 1, // from 0 to 10 (0 = 0% - 10 = 100%)
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
  const cells = 12;
  const filledCells = Math.max(
    0,
    Math.min(cells, Math.round((proficiency / 10) * cells)),
  );

  return (
    <div className={cn("flex flex-col items-center", className)} {...rest}>
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
      <div className="mt-2 flex items-center gap-2">
        <div className="relative w-12 h-3 rounded border border-stone-600/60 p-[2px]">
          <div className="flex h-full gap-[2px]">
            {Array.from({ length: cells }).map((_, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: stable, static cells
                key={i}
                className={cn(
                  "h-full flex-1 rounded-[2px]",
                  i < filledCells ? "bg-stone-300/50" : "bg-stone-500/20",
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <h3 className="text-stone-400 font-medium mt-2 text-center text-xs md:text-sm leading-tight">
        {name}
      </h3>
    </div>
  );
}
