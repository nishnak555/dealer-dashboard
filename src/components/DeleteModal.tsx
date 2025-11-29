import React from "react";
import Modal from "./Modal";
import Button from "./common/Button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Dealer?",
  message = "Are you sure you want to delete this record? This action cannot be undone.",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="max-w-md">
      <div className="space-y-6">
        <p className="text-gray-600 text-sm leading-relaxed">{message}</p>

        <div className="flex justify-end gap-4">
          <Button
            label="Cancel"
            variant="secondary"
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={onClose}
          />

          <Button
            label="Delete"
            variant="danger"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
