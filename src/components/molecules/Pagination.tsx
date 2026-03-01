"use client";
import React from "react";
import "rc-pagination/assets/index.css";
import RcPagination, {
  PaginationProps as RcPaginationProps,
} from "rc-pagination";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const paginationStyles = {
  base: {
    item: `
      [&>.rc-pagination-item>a]:!no-underline
      [&>.rc-pagination-item>a]:font-medium
      [&>li.rc-pagination-item]:border-green-200
      [&>.rc-pagination-item:not(.rc-pagination-item-active)]:bg-transparent
      [&>.rc-pagination-item:not(.rc-pagination-item-active)>a]:text-green-700
      [&>.rc-pagination-item:not(.rc-pagination-item-active)]:hover:border-green-400
      [&>.rc-pagination-item:not(.rc-pagination-item-active)]:hover:bg-green-50
      dark:[&>.rc-pagination-item:not(.rc-pagination-item-active)>a]:text-green-300
    `,
    icon: `
      [&>.rc-pagination-prev]:align-baseline
      [&>.rc-pagination-next]:align-baseline
    `,
    outline: `
      [&>.rc-pagination-item]:leading-7
      [&>.rc-pagination-item]:border-0
    `,
    jumperDiv: `
      [&>.rc-pagination-options>.rc-pagination-options-quick-jumper]:text-sm
      [&>.rc-pagination-options>.rc-pagination-options-quick-jumper]:text-green-700
      dark:[&>.rc-pagination-options>.rc-pagination-options-quick-jumper]:text-green-300
    `,
    jumperInput: `
      [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:!py-[3px]
      [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:text-sm
      [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:border-green-300
      [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:ring-0
      [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:focus:border-green-500
      [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:focus:ring-green-200
    `,
  },
  rounded: {
    none: "[&>.rc-pagination-item]:rounded-none [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-none",
    sm: "[&>.rc-pagination-item]:rounded-sm [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-sm",
    md: "[&>.rc-pagination-item]:rounded-md [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-md",
    lg: "[&>.rc-pagination-item]:rounded-lg [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-lg",
    full: "[&>.rc-pagination-item]:rounded-full [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-full",
  },
  variant: {
    solid: {
      base: "",
      color: {
        primary: `
          [&>.rc-pagination-item-active]:bg-green-700
          [&>.rc-pagination-item-active]:dark:!bg-green-800
          [&>.rc-pagination-item-active>a]:!text-white
          [&>li.rc-pagination-item-active]:border-green-700
          [&>.rc-pagination-item-active]:hover:border-green-800
          [&>.rc-pagination-item-active]:focus:border-green-800
        `,
        secondary: `
          [&>.rc-pagination-item-active]:bg-green-500
          [&>.rc-pagination-item-active>a]:!text-white
          [&>li.rc-pagination-item-active]:border-green-500
          [&>.rc-pagination-item-active]:hover:border-green-600
          [&>.rc-pagination-item-active]:focus:border-green-600
        `,
        danger: `
          [&>.rc-pagination-item-active]:bg-red-500
          [&>.rc-pagination-item-active>a]:!text-white
          [&>li.rc-pagination-item-active]:border-red-500
          [&>.rc-pagination-item-active]:hover:border-red-600
          [&>.rc-pagination-item-active]:focus:border-red-600
        `,
      },
    },
    flat: {
      base: "",
      color: {
        primary: `
          [&>.rc-pagination-item-active]:bg-green-100
          [&>li.rc-pagination-item-active]:border-green-200
          [&>.rc-pagination-item-active>a]:text-green-800
          [&>.rc-pagination-item-active>a]:hover:text-green-800
          [&>.rc-pagination-item-active]:hover:border-green-200
          [&>.rc-pagination-item-active]:focus:border-green-200
        `,
        secondary: `
          [&>.rc-pagination-item-active]:bg-green-50
          [&>li.rc-pagination-item-active]:border-green-100
          [&>.rc-pagination-item-active>a]:text-green-700
          [&>.rc-pagination-item-active>a]:hover:text-green-700
          [&>.rc-pagination-item-active]:hover:border-green-100
          [&>.rc-pagination-item-active]:focus:border-green-100
        `,
        danger: `
          [&>.rc-pagination-item-active]:bg-red-50
          [&>li.rc-pagination-item-active]:border-red-100
          [&>.rc-pagination-item-active>a]:text-red-700
          [&>.rc-pagination-item-active>a]:hover:text-red-700
          [&>.rc-pagination-item-active]:hover:border-red-100
          [&>.rc-pagination-item-active]:focus:border-red-100
        `,
      },
    },
  },
};

const iconStyles = {
  base: "text-green-700 dark:text-green-300",
  outline: "border border-green-300 p-[5px]",
  center: "inline-block align-middle",
  rounded: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  },
};

type IconProps = {
  icon: React.ReactNode;
  rounded: keyof typeof iconStyles.rounded;
  outline: boolean;
  className: string;
  lang?: string;
};

const PrevIcon = ({ lang, icon, rounded, outline, className }: IconProps) => (
  <div
    className={cn(
      iconStyles.base,
      outline ? iconStyles.outline : iconStyles.center,
      iconStyles.rounded[rounded],
      "text-xs font-bold text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-100 transition-colors",
      className,
    )}
  >
    {icon || (
      <div className="flex items-center">
        {lang === "ar" ? (
          <ChevronRightIcon className="h-4 w-4" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4" />
        )}
      </div>
    )}
  </div>
);

const NextIcon = ({ lang, icon, rounded, outline, className }: IconProps) => (
  <div
    className={cn(
      iconStyles.base,
      outline ? iconStyles.outline : iconStyles.center,
      iconStyles.rounded[rounded],
      "text-xs font-bold text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-100 transition-colors",
      className,
    )}
  >
    {icon || (
      <div className="flex items-center">
        {lang === "ar" ? (
          <ChevronLeftIcon className="h-4 w-4" />
        ) : (
          <ChevronRightIcon className="h-4 w-4" />
        )}
      </div>
    )}
  </div>
);

const JumpPrevIcon = ({ icon, rounded, outline, className }: IconProps) => (
  <div
    className={cn(
      iconStyles.base,
      outline ? iconStyles.outline : iconStyles.center,
      iconStyles.rounded[rounded],
      !icon && outline && "py-0 leading-6.5",
      "text-green-500 hover:text-green-700 dark:text-green-400",
      className,
    )}
  >
    {icon || "•••"}
  </div>
);

const JumpNextIcon = ({ icon, rounded, outline, className }: IconProps) => (
  <div
    className={cn(
      iconStyles.base,
      outline ? iconStyles.outline : iconStyles.center,
      iconStyles.rounded[rounded],
      !icon && outline && "py-0 leading-6.5",
      "text-green-500 hover:text-green-700 dark:text-green-400",
      className,
    )}
  >
    {icon || "•••"}
  </div>
);

export const localeDefault = {
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "Page",
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages",
  page_size: "Page Size",
};

export interface PaginationProps extends RcPaginationProps {
  outline?: boolean;
  rounded?: keyof typeof paginationStyles.rounded;
  variant?: keyof typeof paginationStyles.variant;
  color?: keyof typeof paginationStyles.variant.flat.color;
  prevIconClassName?: string;
  nextIconClassName?: string;
  jumpPrevIconClassName?: string;
  jumpNextIconClassName?: string;
}

export default function Pagination({
  outline = false,
  rounded = "md",
  variant = "solid",
  color = "primary",
  locale,
  nextIcon,
  prevIcon,
  prevIconClassName,
  nextIconClassName,
  jumpPrevIcon,
  jumpNextIcon,
  jumpPrevIconClassName,
  jumpNextIconClassName,
  className,
  ...props
}: PaginationProps) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];

  return (
    <RcPagination
      locale={localeDefault}
      nextIcon={
        <NextIcon
          lang={lang}
          icon={nextIcon as React.ReactNode}
          rounded={rounded}
          outline={outline}
          className={nextIconClassName as string}
        />
      }
      prevIcon={
        <PrevIcon
          lang={lang}
          icon={prevIcon as React.ReactNode}
          rounded={rounded}
          outline={outline}
          className={prevIconClassName as string}
        />
      }
      jumpPrevIcon={
        lang === "ar" ? (
          <JumpNextIcon
            icon={jumpNextIcon as React.ReactNode}
            rounded={rounded}
            outline={outline}
            className={jumpNextIconClassName as string}
          />
        ) : (
          <JumpPrevIcon
            icon={jumpPrevIcon as React.ReactNode}
            rounded={rounded}
            outline={outline}
            className={jumpPrevIconClassName as string}
          />
        )
      }
      jumpNextIcon={
        lang === "ar" ? (
          <JumpPrevIcon
            icon={jumpPrevIcon as React.ReactNode}
            rounded={rounded}
            outline={outline}
            className={jumpPrevIconClassName as string}
          />
        ) : (
          <JumpNextIcon
            icon={jumpNextIcon as React.ReactNode}
            rounded={rounded}
            outline={outline}
            className={jumpNextIconClassName as string}
          />
        )
      }
      className={cn(
        paginationStyles.base.item,
        paginationStyles.base.jumperDiv,
        paginationStyles.base.jumperInput,
        !outline && paginationStyles.base.outline,
        !outline && paginationStyles.base.icon,
        paginationStyles.rounded[rounded],
        paginationStyles.variant[variant].base,
        paginationStyles.variant[variant].color[color],
        className,
      )}
      {...props}
    />
  );
}

Pagination.displayName = "Pagination";
