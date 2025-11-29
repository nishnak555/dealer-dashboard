import { useEffect, useState } from "react";
import { getDealers, deleteDealer } from "../services/dealer.service";
import CustomTable, { type Column } from "../components/CustomTable";
import DeleteModal from "../components/DeleteModal";
import type { DealerFormValues } from "../interfaces/dealer.interface";

const DealerListPage = () => {
  const [allData, setAllData] = useState<DealerFormValues[]>([]);
  const [filteredData, setFilteredData] = useState<DealerFormValues[]>([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Load dealers from storage
  const loadDealers = () => {
    const dealers = getDealers();
    setAllData(dealers);
    setFilteredData(dealers); // initial show all
  };

  useEffect(() => {
    loadDealers();
  }, []);

  // Search filter
  useEffect(() => {
    const lower = search.toLowerCase();

    const result = allData.filter(
      (dealer) =>
        dealer.dealerName.toLowerCase().includes(lower) ||
        dealer.address.toLowerCase().includes(lower)
    );

    setFilteredData(result);
    setPage(1); // reset to first page on search
  }, [search, allData]);

  // Paginated data
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Delete click handler
  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedId !== null) {
      const updated = deleteDealer(selectedId);

      setAllData(updated); // sync all data

      // apply filter again after delete
      const filtered = updated.filter(
        (dealer) =>
          dealer.dealerName.toLowerCase().includes(search.toLowerCase()) ||
          dealer.address.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredData(filtered);

      // adjust pagination if page becomes empty
      if ((page - 1) * pageSize >= filtered.length && page > 1) {
        setPage(page - 1);
      }
    }

    setDeleteOpen(false);
  };

  const columns: Column<DealerFormValues>[] = [
    { accessor: "dealerName", header: "Dealer Name" },
    { accessor: "address", header: "Address" },
    { accessor: "email", header: "Email" },
    { accessor: "phone", header: "Phone" },
    { accessor: "hours", header: "Operating Hours" },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* SEARCH BAR */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by dealer name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* TABLE */}
      <CustomTable
        columns={columns}
        data={paginatedData}
        totalCount={filteredData.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onDelete={handleDelete}
      />

      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Dealer?"
        message="Are you sure you want to delete this dealer permanently?"
      />
    </div>
  );
};

export default DealerListPage;
