import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDealerById } from "../services/dealer.service";
import type { DealerFormValues } from "../interfaces/dealer.interface";
import type { ModalComponentProps } from "../components/ModalComponentProps";

const DealerDetails = ({ dealer: modalDealer }: ModalComponentProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dealer, setDealer] = useState<DealerFormValues | null>(
    modalDealer || null
  );

  const isModal = !!modalDealer;

  useEffect(() => {
    if (isModal) return;
    if (!id) return;

    const found = getDealerById(Number(id));
    setDealer(found || null);
  }, [id]);

  if (!dealer) return <div className="p-6 text-center">Dealer Not Found</div>;

  return (
    <div className={isModal ? "p-2" : "p-8"}>
      {!isModal && (
        <button onClick={() => navigate(-1)} className="text-blue-600 mb-4">
          ← Back
        </button>
      )}

      <h2 className="text-2xl font-semibold mb-4">Dealer Details</h2>

      <div className="space-y-3">
        <p>
          <strong>Name:</strong> {dealer.dealerName}
        </p>
        <p>
          <strong>Email:</strong> {dealer.email}
        </p>
        <p>
          <strong>Phone:</strong> {dealer.phone}
        </p>
        <p>
          <strong>Hours:</strong> {dealer.hours}
        </p>
        <p>
          <strong>Address:</strong> {dealer.address}
        </p>
      </div>
    </div>
  );
};

export default DealerDetails;
