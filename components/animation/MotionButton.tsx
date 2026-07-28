"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/Button";

type ButtonProps = ComponentPropsWithoutRef<typeof Button>;

type MotionButtonProps = ButtonProps & {
  children: ReactNode;
};

/** CSS micro-interaction wrapper around the design-system Button. */
export function MotionButton({ children, className = "", ...props }: MotionButtonProps) {
  return (
    <span className="inline-flex transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97] motion-reduce:transform-none">
      <Button className={className} {...props}>
        {children}
      </Button>
    </span>
  );
}
