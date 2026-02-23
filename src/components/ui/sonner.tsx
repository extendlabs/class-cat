"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        className:
          "!bg-white !border-gray-200/80 !shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08),0_2px_4px_-2px_rgba(0,0,0,0.04)] !rounded-xl !font-[family-name:var(--font-plus-jakarta)] !text-sm !text-gray-800",
        classNames: {
          success: "!border-[rgba(255,138,101,0.25)] [&>svg]:!text-[#FF8A65]",
        },
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#1F2937",
          "--normal-border": "rgba(229, 231, 235, 0.8)",
          "--border-radius": "0.75rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
