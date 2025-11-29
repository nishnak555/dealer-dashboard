import * as Yup from "yup";

export const DealerSchema = Yup.object({
  dealerName: Yup.string().required("Dealer name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),

  startTime: Yup.string().required("Start time required"),
  startPeriod: Yup.string().required(),
  endTime: Yup.string().required("End time required"),
  endPeriod: Yup.string().required(),

  hours: Yup.string().optional(),
});
