import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, Eraser } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button.tsx";
import { useTasks } from "@/hooks/useTasks.ts";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function TasksColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  
  const { searchInfoList, setSearchInfoList } = useTasks();
  
  function handleSort(order: 'asc' | 'desc' | null) {
    if (order) {
      setSearchInfoList({
        ...searchInfoList,
        sortBy: column.id as string,
        sortOrder: order,
      })
    } else {
      setSearchInfoList({
        ...searchInfoList,
        sortBy: '',
        sortOrder: '',
      })
    }
  }
  
  function renderSortIcon() {
    if (searchInfoList.sortBy !== column.id) {
      return <ChevronsUpDown/>
    }
    
    return searchInfoList.sortOrder === "desc" ? <ArrowDown/> : <ArrowUp/>
  }

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {renderSortIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleSort('asc')}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70"/>
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort('desc')}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70"/>
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={() => handleSort(null)}>
            <Eraser className="h-3.5 w-3.5 text-muted-foreground/70" />
            Default
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}