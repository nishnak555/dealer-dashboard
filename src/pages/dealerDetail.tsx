import { useNavigate, useParams } from "react-router-dom";
import { getDealerById } from "../services/dealer.service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import type { DealerFormValues } from "../interfaces/dealer.interface";

const DealerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dealer, setDealer] = useState<DealerFormValues | null>(null);

  useEffect(() => {
    if (!id) return;

    const found = getDealerById(Number(id));
    setDealer(found || null);
  }, [id]);

  if (!dealer) {
    return (
      <div className="p-6 text-center text-gray-600 text-lg">
        Dealer Not Found
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowBackIcon fontSize="small" />
        Back
      </button>

      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl max-w-3xl mx-auto p-10 relative">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-white shadow-md -mt-20 overflow-hidden">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-900 text-center mt-6 mb-10">
          Dealer Details
        </h2>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Dealer Name
            </p>
            <p className="text-gray-900 font-medium">{dealer.dealerName}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Email
            </p>
            <p className="text-gray-900 font-medium">{dealer.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Phone
            </p>
            <p className="text-gray-900 font-medium">{dealer.phone}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Operating Hours
            </p>
            <p className="text-gray-900 font-medium">{dealer.hours}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Address
            </p>
            <p className="text-gray-900 font-medium">{dealer.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDetails;
