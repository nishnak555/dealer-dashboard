export interface DealerFormValues {
  id?: number;
  dealerName: string;
  address: string;
  email: string;
  phone: string;

  startTime: string;
  startPeriod: "AM" | "PM";
  endTime: string;
  endPeriod: "AM" | "PM";

  hours: string;
}
