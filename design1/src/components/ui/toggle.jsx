"use client";

import *"react";
import *"@radix-ui/react-toggle@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover=on]=on]:not([class*='size-'])],box-shadow] aria-invalid,
  {
    variants
      variant
        default,
        outline,
      },
      size
        default,
        sm,
        lg,
      },
    },
    defaultVariants
      variant,
      size,
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}
  VariantProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
