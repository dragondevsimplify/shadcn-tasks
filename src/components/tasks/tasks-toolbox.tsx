import { Input } from '@/components/ui/input'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useTasks } from "@/hooks/useTasks.ts";
import { Button } from '@/components/ui/button'
import { TasksFilterSelect, TasksFilterSelectRef } from "@/components/tasks/tasks-filter-select.tsx";
import { taskPriorities, taskStatuses } from "@/data/tasks.ts";

export function TasksToolbox() {
  const { searchInfoList, setSearchInfoList, setPagination } = useTasks();
  
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500)
  
  const statusFilter = useRef<TasksFilterSelectRef>(null);
  const priorityFilter = useRef<TasksFilterSelectRef>(null);
  
  useEffect(() => {
    searchTasksWithTitle();
  }, [debouncedValue])
  
  useEffect(() => {
    setSearchValue(searchInfoList.title)
  }, [searchInfoList]);
  
  function searchTasksWithTitle() {
    setSearchInfoList({
      ...searchInfoList,
      title: searchValue
    })
  }
  
  function handleSearchValueChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }
  
  function handleFilterSelect(filterName: string, selectedValues: string[]) {
    setSearchInfoList({
      ...searchInfoList,
      [filterName]: selectedValues.join(',')
    })
  }
  
  function handleClearFilter() {
    setSearchInfoList({
      ...searchInfoList,
      statuses: '',
      priorities: '',
    })
  }
  
  function handleReset() {
    setPagination({
      pageNumber: 1,
      pageSize: 5,
      pageSizeOptions: [3, 5, 10],
      totalItems: 0,
      totalPages: 0,
      listLength: 0,
    })
    setSearchInfoList({
      title: '',
      types: '',
      statuses: '',
      priorities: '',
      sortBy: '',
      sortOrder: '',
    })
    
    statusFilter.current?.clear();
    priorityFilter.current?.clear();
  }
  
  return (
    <div className='flex items-center gap-4'>
      <Input className='w-[300px]'
             placeholder='Search by task title...'
             value={searchValue}
             onChange={handleSearchValueChange} />
      <TasksFilterSelect
        ref={statusFilter}
        title="Status"
        defaultSelected={searchInfoList.statuses.split(',')}
        options={taskStatuses}
        onSelect={(v) => handleFilterSelect('statuses', v)}
        onClear={handleClearFilter}
      />
      <TasksFilterSelect
        ref={priorityFilter}
        title="Priority"
        defaultSelected={searchInfoList.priorities.split(',')}
        options={taskPriorities}
        onSelect={(v) => handleFilterSelect('priorities', v)}
        onClear={handleClearFilter}
      />
      <Button
        variant="ghost"
        className="h-8 px-2 lg:px-3"
        onClick={handleReset}
      >
        Reset
      </Button>
    </div>
  )
}