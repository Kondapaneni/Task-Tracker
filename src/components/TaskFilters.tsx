import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FilterIcon, SortAscIcon, SortDescIcon } from 'lucide-react';

interface TaskFiltersProps {
  statusFilter: string;
  sortOrder: 'asc' | 'desc';
  onStatusFilterChange: (status: string) => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export function TaskFilters({
  statusFilter,
  sortOrder,
  onStatusFilterChange,
  onSortOrderChange,
}: TaskFiltersProps) {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={statusFilter === 'ALL' ? 'bg-accent' : ''}
            onClick={() => onStatusFilterChange('ALL')}
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            className={statusFilter === 'PENDING' ? 'bg-accent' : ''}
            onClick={() => onStatusFilterChange('PENDING')}
          >
            Pending
          </DropdownMenuItem>
          <DropdownMenuItem
            className={statusFilter === 'IN_PROGRESS' ? 'bg-accent' : ''}
            onClick={() => onStatusFilterChange('IN_PROGRESS')}
          >
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem
            className={statusFilter === 'COMPLETED' ? 'bg-accent' : ''}
            onClick={() => onStatusFilterChange('COMPLETED')}
          >
            Completed
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        {sortOrder === 'asc' ? (
          <SortAscIcon className="mr-2 h-4 w-4" />
        ) : (
          <SortDescIcon className="mr-2 h-4 w-4" />
        )}
        Sort
      </Button>
    </div>
  );
}