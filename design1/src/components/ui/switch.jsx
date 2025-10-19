"use client";

import *"react";
import *"@radix-ui/react-switch@1.1.3";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]=unchecked]=unchecked],
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-card dark=unchecked]=checked]=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked],
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
