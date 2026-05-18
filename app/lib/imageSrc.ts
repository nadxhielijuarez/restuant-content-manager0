import type { StaticImageData } from "next/image";

export type ImageImport = string | StaticImageData;

/** Next.js image imports are objects with `.src`; CRA used plain URL strings. */
export function imageSrc(source: ImageImport): string {
  return typeof source === "string" ? source : source.src;
}
