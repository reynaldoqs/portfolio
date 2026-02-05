import Image from "next/image";
import { type HTMLAttributes, useState } from "react";
import { techs } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import type { Stack, Tech } from "@/types/profile";

interface StackGroupProps extends HTMLAttributes<HTMLDivElement> {
  stack: Stack;
  title: string;
}
export function StackGroup({ stack, className }: StackGroupProps) {
  return (
    <div className={cn("mt-12 flex flex-col", className)}>
      <div className="bg-stone-900/30 border border-stone-800/30 rounded-xl p-6">
        <h3 className="text-base font-semibold text-stone-300 mb-1">
          {stack.title}
        </h3>
        <p className="text-stone-500 text-xs mb-6">{stack.description}</p>
        <div className="flex flex-wrap gap-6 mt-8">
          {stack.techIds.map((techId) => {
            const tech = techs.find((t: Tech) => t.id === techId);
            return tech ? (
              <Brand
                key={techId}
                name={tech.name ?? techId}
                proficiency={tech.proficiency}
                contrast
              />
            ) : null;
          })}
        </div>
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

const SIMPLEICONS_BLOCKLIST = new Set([
  "zustand",
  "mobilefirst",
  "pixelperfect",
  "atomicdesign",
  "playwright",
  "restapi",
  "sse",
  "chatgptsdk",
  "embeddings",
  "reactnative",
  "ci/cd",
  "uxcam",
  "pendo",
]);

function Brand({
  name,
  proficiency = 1,
  contrast,
  className,
  ...rest
}: BrandProps) {
  const [imageError, setImageError] = useState(false);
  const nameInitials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const normalizedName = name.replaceAll(" ", "").toLocaleLowerCase();
  const showCustom = imageError || SIMPLEICONS_BLOCKLIST.has(normalizedName);
  const cells = 5;
  const filledCells = Math.max(
    0,
    Math.min(cells, Math.round((proficiency / 10) * cells)),
  );

  return (
    <div
      className={cn("flex flex-col items-center gap-2", className)}
      {...rest}
    >
      {!showCustom ? (
        <Image
          src={`https://cdn.simpleicons.org/${normalizedName}${contrast ? "/EEEEEE" : ""}`}
          alt={name}
          width={36}
          height={36}
          unoptimized
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain opacity-80"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-stone-700 rounded-md flex items-center justify-center font-medium text-sm text-stone-300">
          {nameInitials}
        </div>
      )}
      <div className="flex gap-[3px]">
        {Array.from({ length: cells }).map((_, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static cells
            key={i}
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              i < filledCells ? "bg-stone-400" : "bg-stone-700",
            )}
          />
        ))}
      </div>
      <span className="text-stone-500 text-[10px] sm:text-xs text-center leading-tight max-w-20">
        {name}
      </span>
    </div>
  );
}
