import type { DealerFormValues } from "../interfaces/dealer.interface";

export interface ModalComponentProps {
  dealer?: DealerFormValues | null; // dealer or null
  onConfirm?: (yes: boolean) => void; // for delete modal
  onUpdate?: () => void; // for edit modal
}
