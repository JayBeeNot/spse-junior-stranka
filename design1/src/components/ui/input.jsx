import *"react";

import { cn } from "./utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file,box-shadow] outline-none file,
        "focus-visible,
        "aria-invalid,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
