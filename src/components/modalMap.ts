import DealerDetails from "../pages/dealerDetail";
import EditDealer from "../pages/editDealer";
import DeleteDealerConfirm from "../components/DeleteDealerConfirm";

export const modalMap = {
  view: DealerDetails,
  edit: EditDealer,
  delete: DeleteDealerConfirm,
} as const;
