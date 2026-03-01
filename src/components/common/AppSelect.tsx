"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

interface SelectGroupData {
  label?: any;
  value?: any;
}
interface AppSelectProps {
  value: any;
  hideNone?: any;
  ShowPages?: any;
  customClass?: string;
  placeholder?: string;
  Pages?: string;
  disabled?: boolean;
  groups: SelectGroupData[];
  onSelect: (value: any) => void;
  onOpenChange?: (open: boolean) => void;
}

export const AppSelect: React.FC<AppSelectProps> = ({
  placeholder = "Select item",
  value,
  groups,
  onSelect,
  customClass,
  hideNone,
  ShowPages,
  onOpenChange,
  disabled = false,
  Pages = "Pages",
}) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";

  const getSelectedLabel = (value: any) => {
    if (value == "none") return placeholder;
    const selectedOption = groups?.find(
      (item) => String(item.value) === String(value),
    ); // Convert both to strings
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <Select
      dir={dir}
      value={value}
      onValueChange={onSelect}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger
        className={`${disabled ? "" : "app-input text-title"}  ${customClass}`}
        disabled={disabled}
      >
        <SelectValue className="capitalize" placeholder={placeholder}>
          {ShowPages && Pages} {getSelectedLabel(value || "")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        {!hideNone && <SelectItem value="none">None</SelectItem>}

        {groups?.length > 0 ? (
          groups?.map((option, optionIndex) => (
            <SelectItem
              className="capitalize "
              key={optionIndex}
              value={String(option.value)}
            >
              {option.label}
            </SelectItem>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground text-center">
            No options available
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
