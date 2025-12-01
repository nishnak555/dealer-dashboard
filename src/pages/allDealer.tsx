import { useEffect, useState } from "react";
import { getDealers, deleteDealer } from "../services/dealer.service";
import CustomTable, { type Column } from "../components/CustomTable";
import type { DealerFormValues } from "../interfaces/dealer.interface";

const DealerListPage = () => {
  const [allData, setAllData] = useState<DealerFormValues[]>([]);
  const [filteredData, setFilteredData] = useState<DealerFormValues[]>([]);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Load dealers
  const loadDealers = () => {
    const dealers = getDealers();
    setAllData(dealers);
    setFilteredData(dealers);
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
    setPage(1);
  }, [search, allData]);

  // Pagination logic
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Delete Handler
  const handleDelete = (id: number) => {
    deleteDealer(id);
    loadDealers(); // refresh table
  };

  // Update Handler (called after edit)
  const handleUpdate = () => {
    loadDealers(); // refresh table after edit
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
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        onDelete={handleDelete}
        onUpdate={handleUpdate} // ⭐ Refresh after edit
      />
    </div>
  );
};

export default DealerListPage;
