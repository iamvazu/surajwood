"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

const Accordion = AccordionPrimitive.Root;

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-cream-dark last:border-b-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 px-0 text-left text-base font-medium",
        "text-navy transition-colors duration-200",
        "hover:text-copper",
        "data-[state=open]:text-copper",
        "[&[data-state=open]>svg]:rotate-180",
        "group",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-navy transition-transform duration-300",
          "group-data-[state=open]:text-copper"
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-navy/80 leading-relaxed",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
