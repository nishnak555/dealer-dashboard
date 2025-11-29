import {
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";

export interface Column<T> {
  accessor: keyof T | string;
  header: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

export interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;

  totalCount: number;
  page: number;
  pageSize: number;

  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;

  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (id: number) => void; // ⭐ FIXED
}

const CustomTable = <T extends { id?: number } & Record<string, any>>({
  columns,
  data,
  loading,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
}: CustomTableProps<T>) => {
  const navigate = useNavigate();

  // DELETE MODAL STATE
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId && onDelete) onDelete(selectedId);
    setDeleteOpen(false);
  };

  const handleView = (row: T) => {
    if (row.id) navigate(`/view/${row.id}`);
    if (onView) onView(row);
  };

  const handleEdit = (row: T) => {
    if (row.id) navigate(`/edit/${row.id}`);
    if (onEdit) onEdit(row);
  };

  // HEIGHT
  const MAX_VISIBLE_ROWS = 5;
  const ROW_HEIGHT = 48;
  const BODY_HEIGHT = MAX_VISIBLE_ROWS * ROW_HEIGHT;

  return (
    <>
      {/* TABLE */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[1100px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-200">
                <th className="px-4 py-3 w-4"></th>

                <th className="px-4 py-3 text-xs font-semibold uppercase text-gray-700">
                  S No
                </th>

                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-xs font-semibold uppercase text-gray-700 whitespace-nowrap"
                  >
                    {col.header}
                  </th>
                ))}

                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
          </table>

          <div
            className="overflow-y-auto"
            style={{ maxHeight: `${BODY_HEIGHT}px` }}
          >
            <table className="w-full min-w-[1100px] text-left border-collapse">
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={columns.length + 2}
                      className="py-10 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + 2}
                      className="py-10 text-center text-gray-400"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  data.map((row, rowIdx) => {
                    const serial = (page - 1) * pageSize + (rowIdx + 1);

                    return (
                      <tr
                        key={rowIdx}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                        style={{ height: ROW_HEIGHT }}
                      >
                        <td className="px-4 py-3 w-4"></td>

                        <td className="px-4 py-3 text-gray-700 font-medium">
                          {serial}
                        </td>

                        {columns.map((col, i) => (
                          <td
                            key={i}
                            className="px-4 py-3 text-gray-700 whitespace-nowrap"
                          >
                            {col.render ? col.render(row) : row[col.accessor]}
                          </td>
                        ))}

                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-4 items-center text-gray-600">
                            <VisibilityOutlined
                              fontSize="small"
                              className="cursor-pointer hover:text-blue-700"
                              onClick={() => handleView(row)}
                            />

                            <EditOutlined
                              fontSize="small"
                              className="cursor-pointer hover:text-orange-600"
                              onClick={() => handleEdit(row)}
                            />

                            <DeleteOutline
                              fontSize="small"
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => row.id && openDeleteModal(row.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-6 mt-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>

            <select
              className="border border-gray-300 rounded px-2 py-1 bg-white"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <span>
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalCount)}{" "}
            of {totalCount}
          </span>

          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className={`p-1 rounded hover:bg-gray-200 ${
              page === 1 ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <KeyboardArrowLeft fontSize="small" />
          </button>

          <button
            disabled={page * pageSize >= totalCount}
            onClick={() => onPageChange(page + 1)}
            className={`p-1 rounded hover:bg-gray-200 ${
              page * pageSize >= totalCount ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <KeyboardArrowRight fontSize="small" />
          </button>
        </div>
      </div>

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Dealer?"
        message="Are you sure you want to delete this dealer permanently?"
      />
    </>
  );
};

export default CustomTable;
