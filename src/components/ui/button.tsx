import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.65rem] text-sm font-semibold ring-offset-background transition-[background-color,border-color,color,box-shadow] duration-150 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.9]",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-primary-foreground shadow-[0_1px_2px_hsl(var(--primary)/0.18)] hover:bg-primary/92 hover:shadow-[0_4px_14px_-8px_hsl(var(--primary)/0.45)]",
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground shadow-[0_1px_2px_hsl(var(--destructive)/0.16)] hover:bg-destructive/92",
        outline:
          "border border-border/80 bg-background text-foreground shadow-[0_1px_2px_hsl(218_28%_18%/0.04)] hover:border-primary/35 hover:bg-primary/[0.035] hover:text-primary",
        secondary:
          "border border-border/65 bg-secondary/75 text-secondary-foreground hover:border-primary/20 hover:bg-secondary",
        ghost:
          "border border-transparent text-foreground/78 hover:bg-secondary/70 hover:text-foreground",
        link: "rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3.5",
        lg: "h-11 px-5",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
