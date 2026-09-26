import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** next/image wrapper that fills its (relative) parent. */
export default function Photo({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  className,
}: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className ?? "object-cover"}
    />
  );
}
