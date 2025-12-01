import type { DealerFormValues } from "../interfaces/dealer.interface";

export interface ModalComponentProps {
  dealer?: DealerFormValues | null; 
  onConfirm?: (yes: boolean) => void; 
  onUpdate?: () => void; 
}
