import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { TasksColumnHeader } from "@/components/tasks/tasks-column-header.tsx";
import { Badge } from "@/components/ui/badge"
import { taskTypes, taskPriorities, taskStatuses } from '@/data/tasks';
import { TasksRowActions } from "./tasks-row-actions";
import { Task } from "@/models/tasks.ts";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TasksColumnHeader column={column} title="Task"/>
    ),
    cell: ({ row }) => <div className="w-[80px] font-semibold uppercase">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TasksColumnHeader column={column} title="Title"/>
    ),
    cell: ({ row }) => {
      const label = taskTypes.find((label) => label.value === row.original.type)
      
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TasksColumnHeader column={column} title="Status"/>
    ),
    cell: ({ row }) => {
      const status = taskStatuses.find(
        (status) => status.value === row.getValue("status")
      )
      
      if (!status) {
        return null
      }
      
      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <TasksColumnHeader column={column} title="Priority"/>
    ),
    cell: ({ row }) => {
      const priority = taskPriorities.find(
        (priority) => priority.value === row.getValue("priority")
      )
      
      if (!priority) {
        return null
      }
      
      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TasksRowActions row={row}/>,
  },
]
