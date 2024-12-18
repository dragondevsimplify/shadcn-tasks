import * as React from "react"
import { Check, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from "react";

interface OptionItem {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface Props {
  title?: string;
  defaultSelected?: string[];
  options: OptionItem[];
  onSelect: (selectedItems: string[]) => void;
  onClear: () => void;
}

export interface TasksFilterSelectRef {
  clear: () => void;
}

const TasksFilterSelect = forwardRef(({
  title,
  defaultSelected,
  options,
  onSelect,
  onClear,
}: Props, ref: Ref<TasksFilterSelectRef>) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  
  function handleItemCheck(isSelected: boolean, option: OptionItem) {
    let rs
    
    if (isSelected) {
      rs = selectedValues.filter(i => i !== option.value)
    } else {
      rs = [...selectedValues, option.value]
    }
    
    setSelectedValues(rs)
    onSelect(rs);
  }
  
  function handleClearSelectedItem() {
    setSelectedValues([])
    onClear()
  }
  
  useEffect(() => {
    setSelectedValues(defaultSelected)
  }, [defaultSelected])
  
  useImperativeHandle(ref, () => {
    return {
      clear: () => {
        setSelectedValues([])
      }
    }
  }, [])
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle />
          {title}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.includes(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleItemCheck(isSelected, option)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearSelectedItem}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})

export { TasksFilterSelect }