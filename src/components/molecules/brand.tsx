import Image from "next/image";
import { type HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface BrandProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  experience?: number;
  contrast?: boolean;
}
export function Brand({
  name,
  experience = 1,
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

  return (
    <div
      className={cn(
        "py-4 md:py-5 px-2 w-[120px] md:w-[160px] flex flex-col items-center transition-all duration-300",
        className,
      )}
      {...rest}
    >
      {!showCustom ? (
        <Image
          src={`https://cdn.simpleicons.org/${normalizedName}${contrast ? "/FFFFFF" : ""}`}
          alt={name}
          width={50}
          height={50}
          unoptimized
          className="w-10 h-10 md:w-[50px] md:h-[50px] object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-10 h-10 md:w-[50px] md:h-[50px] bg-gray-300 rounded-lg p-1 flex items-center justify-center font-bold text-lg md:text-xl text-black">
          {nameInitials}
        </div>
      )}

      <h3 className="text-gray-300 font-mono mt-2 md:mt-3 text-center text-xs md:text-base leading-tight">
        {name}
      </h3>
      <p className="text-gray-400 text-[10px] md:text-xs text-center font-inter mt-1">
        {experience}+ year{experience > 1 ? "s" : ""}
      </p>
    </div>
  );
}
