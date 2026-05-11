import * as React from "react";

import { Input } from "@/components/shared/ui/input";
import { cn } from "@/lib/utils";

type AuthInputWithIconProps = React.ComponentProps<typeof Input> & {
  icon: React.ReactNode;
};

export function AuthInputWithIcon({ icon, className, id, ...props }: AuthInputWithIconProps) {
  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-muted-foreground [&_svg]:size-4"
        aria-hidden
      >
        {icon}
      </span>
      <Input id={id} className={cn("h-11 pl-10", className)} {...props} />
    </div>
  );
}
