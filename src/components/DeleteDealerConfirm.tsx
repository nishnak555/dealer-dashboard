import type { ModalComponentProps } from "./ModalComponentProps";

const DeleteDealerConfirm = ({ dealer, onConfirm }: ModalComponentProps) => {
  if (!dealer || !onConfirm) return null;

  return (
    <div>
      <p className="mb-4">
        Are you sure you want to delete <strong>{dealer.dealerName}</strong>?
      </p>

      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => onConfirm(false)}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => onConfirm(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteDealerConfirm;
