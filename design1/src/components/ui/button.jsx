import *"react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:not([class*='size-'])],
  {
    variants
      variant
        default,
        destructive,
        outline,
        secondary,
        ghost,
        link,
      },
      size
        default,
        sm,
        lg,
        icon,
      },
    },
    defaultVariants
      variant,
      size,
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}
  VariantProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
