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
  data: T[]; // API rows
  totalCount: number; // API total rows count
  loading?: boolean;

  page: number; // current page
  pageSize: number; // current page size
  pageSizeOptions?: number[];

  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;

  className?: string;
  noDataNode?: React.ReactNode;
}
