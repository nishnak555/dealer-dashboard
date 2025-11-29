import { useState, useEffect } from "react";
import CustomTable, { type Column } from "../components/CustomTable";

type DealerRow = {
  dealerName: string;
  address: string;
  email: string;
  phone: string;
  operatingHours: string;
};

// Dummy 50 rows
const dummy: DealerRow[] = Array.from({ length: 50 }, (_, i) => ({
  dealerName: `Dealer ${i + 1}`,
  address: `Street ${i + 5}, City ${i + 2}`,
  email: `dealer${i + 1}@example.com`,
  phone: `9876543${String(i + 100).slice(-3)}`,
  operatingHours: "9:00 AM – 6:00 PM",
}));

const DealerTable = () => {
  const [data, setData] = useState<DealerRow[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalCount = dummy.length;

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const sliced = dummy.slice(startIndex, startIndex + pageSize);

    setData(sliced);

    // Reset page if it exceeds total pages after changing pageSize
    const totalPages = Math.ceil(totalCount / pageSize);
    if (page > totalPages) setPage(1);
  }, [page, pageSize]);

  const columns: Column<DealerRow>[] = [
    { accessor: "dealerName", header: "Dealer Name" },
    { accessor: "address", header: "Address" },
    { accessor: "email", header: "Email" },
    { accessor: "phone", header: "Phone" },
    { accessor: "operatingHours", header: "Operating Hours" },
  ];

  return (
    <div className="p-6">
      <CustomTable
        columns={columns}
        data={data}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onView={(row) => console.log("VIEW:", row)}
        onEdit={(row) => console.log("EDIT:", row)}
        onDelete={(row) => console.log("DELETE:", row)}
      />
    </div>
  );
};

export default DealerTable;
