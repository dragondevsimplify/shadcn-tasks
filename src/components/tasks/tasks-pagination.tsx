import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTasks } from "@/hooks/useTasks.ts";

export function TasksPagination() {
  const { pagination, setPagination } = useTasks();
  
  function canPreviousPage() {
    return pagination.pageNumber - 1 >= 1;
  }
  
  function canNextPage() {
    return pagination.pageNumber + 1 <= pagination.totalPages;
  }
  
  function handleSetPageSize(v: string) {
    setPagination({
      ...pagination,
      pageSize: +v,
      pageNumber: 1,
    })
  }
  
  function handleGoToFirstPage() {
    setPagination({
      ...pagination,
      pageNumber: 1,
    })
  }
  
  function handleGoToLastPage() {
    setPagination({
      ...pagination,
      pageNumber: pagination.totalPages,
    })
  }
  
  function handleGoToPreviousPage() {
    setPagination({
      ...pagination,
      pageNumber: pagination.pageNumber - 1,
    })
  }
  
  function handleGoToNextPage() {
    setPagination({
      ...pagination,
      pageNumber: pagination.pageNumber + 1,
    })
  }
  
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {pagination.listLength} of{" "}
        {pagination.totalItems} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={handleSetPageSize}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pagination.pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.pageNumber} of{" "}
          {pagination.totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleGoToFirstPage}
            disabled={!canPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleGoToPreviousPage}
            disabled={!canPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleGoToNextPage}
            disabled={!canNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleGoToLastPage}
            disabled={!canNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}