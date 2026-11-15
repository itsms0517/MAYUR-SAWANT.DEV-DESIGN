"use client";

import { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  size?: number;
  className?: string;
}

export function Avatar({ size = 44, className = "" }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full border-2 border-accent/40 bg-surface-card p-0.5 flex items-center justify-center shrink-0 shadow-md shadow-accent/15 overflow-hidden ${className}`}
    >
      {!imageError ? (
        <Image
          src="/avatar.jpg"
          alt="Mayur Sawant"
          width={size}
          height={size}
          className="rounded-full object-cover w-full h-full"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-display font-bold text-xs text-accent tracking-wider">
          MS
        </span>
      )}
      <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-background" />
    </div>
  );
}
