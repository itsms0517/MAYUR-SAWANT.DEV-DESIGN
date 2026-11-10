"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      theme="dark"
      toastOptions={{
        style: {
          background: "#121212",
          border: "1px solid #262626",
          color: "#F5F5F5",
        },
      }}
    />
  );
}
