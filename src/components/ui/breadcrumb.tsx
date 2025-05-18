
import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav">
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    className={cn(
      "inline-flex items-center space-x-2 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("inline-flex items-center space-x-2", className)}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement | HTMLSpanElement,
  Omit<React.ComponentPropsWithoutRef<"a">, "ref"> & {
    href?: string;
    asChild?: boolean;
  }
>(({ asChild, href, className, children, ...props }, ref) => {
  if (asChild) {
    return (
      <span ref={ref as React.ForwardedRef<HTMLSpanElement>} className={cn("inline-flex items-center", className)} {...props}>
        {children}
      </span>
    );
  }

  return (
    <>
      {href ? (
        <Link
          to={href}
          className={cn("hover:text-foreground transition-colors", className)}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <span className={cn(className)} {...props}>
          {children}
        </span>
      )}
      <ChevronRight className="h-4 w-4 mx-1" />
    </>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("mx-1 opacity-50", className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("flex h-4 w-4 items-center justify-center", className)}
    {...props}
  >
    <span>…</span>
  </li>
));
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
