import *"react";

import { cn } from "./utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder,box-shadow] outline-none focus-visible,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
