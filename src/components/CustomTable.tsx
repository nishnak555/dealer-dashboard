import {
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useState } from "react";

import CustomModal from "../components/CustomModal";
import { modalMap } from "../components/modalMap";

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

  onDelete?: (id: number) => void;
  onUpdate?: () => void; // ⭐ added
}

const CustomTable = <T extends { id?: number } & Record<string, any>>({
  columns,
  data,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onDelete,
  onUpdate,
}: CustomTableProps<T>) => {
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | null>(
    null
  );
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const openModal = (type: "view" | "edit" | "delete", row: T) => {
    setModalType(type);
    setSelectedRow(row);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRow(null);
  };

  const CurrentModal = modalType ? modalMap[modalType] : null;



  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <div className="overflow-x-auto w-full">
          <div className="max-h-60 overflow-y-auto">
            <table className="w-full min-w-[1100px] text-left border-collapse">
              {/* HEADER */}
              <thead className="sticky top-0 bg-[#F8FAFC] z-20">
                <tr>
                  <th className="px-4 py-2 w-4"></th>
                  <th className="px-4 py-2 text-xs uppercase font-semibold">
                    S No
                  </th>

                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-2 text-xs uppercase font-semibold"
                    >
                      {col.header}
                    </th>
                  ))}

                  <th className="px-4 py-2 text-xs uppercase font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* BODY (normal table body, NOT block) */}
              <tbody>
                {data.map((row, rowIdx) => {
                  const serial = (page - 1) * pageSize + (rowIdx + 1);

                  return (
                    <tr
                      key={rowIdx}
                      className="border-b hover:bg-gray-50 transition"
                      style={{ height: 48 }}
                    >
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2">{serial}</td>

                      {columns.map((col, i) => (
                        <td key={i} className="px-4 py-2 whitespace-nowrap">
                          {col.render ? col.render(row) : row[col.accessor]}
                        </td>
                      ))}

                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end gap-3">
                          <VisibilityOutlined
                            className="cursor-pointer text-blue-600"
                            onClick={() => openModal("view", row)}
                          />
                          <EditOutlined
                            className="cursor-pointer text-orange-600"
                            onClick={() => openModal("edit", row)}
                          />
                          <DeleteOutline
                            className="cursor-pointer text-red-600"
                            onClick={() => openModal("delete", row)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination stays same */}
        <div className="flex justify-end gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>

            <select
              className="border rounded px-2 py-1"
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
            className="p-1 disabled:text-gray-400"
          >
            <KeyboardArrowLeft />
          </button>

          <button
            disabled={page * pageSize >= totalCount}
            onClick={() => onPageChange(page + 1)}
            className="p-1 disabled:text-gray-400"
          >
            <KeyboardArrowRight />
          </button>
        </div>
      </div>

      {/* UNIVERSAL MODAL */}
      <CustomModal
        open={!!modalType}
        onClose={closeModal}
        title={modalType?.toUpperCase() + " DEALER"}
      >
        {modalType && CurrentModal && (
          <CurrentModal
            dealer={selectedRow as any}
            onConfirm={(yes) => {
              if (modalType === "delete" && yes)
                selectedRow?.id && onDelete?.(selectedRow.id);

              onUpdate?.(); // ⭐ refresh
              closeModal();
            }}
            onUpdate={() => {
              onUpdate?.(); // ⭐ refresh after edit
              closeModal();
            }}
          />
        )}
      </CustomModal>
    </>
  );
};

export default CustomTable;
