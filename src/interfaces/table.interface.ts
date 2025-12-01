export interface Column<T> {
  accessor: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface ServerTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalCount: number; 
  loading?: boolean;

  page: number; 
  pageSize: number; 
  pageSizeOptions?: number[];

  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;

  className?: string;
  noDataNode?: React.ReactNode;
}
