import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { getDealerById, updateDealer } from "../services/dealer.service";
import { DealerSchema } from "../validation/dealer.schema";
import type { DealerFormValues } from "../interfaces/dealer.interface";
import Button from "../components/common/Button";
import Snackbar from "../components/Snackbar";
import { useEffect, useState } from "react";
import type { ModalComponentProps } from "../components/ModalComponentProps";

const EditDealer = ({ dealer: modalDealer, onUpdate }: ModalComponentProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isModal = !!modalDealer;

  const [dealer, setDealer] = useState<DealerFormValues | null>(
    modalDealer || null
  );
  const [loading, setLoading] = useState(!modalDealer);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error" | "warning",
  });

  const showSnackbar = (
    message: string,
    type: "success" | "error" | "warning" = "success"
  ) => {
    setSnackbar({ open: true, message, type });
  };

  // Fetch dealer (when not modal)
  useEffect(() => {
    if (isModal) return;

    if (!id) return;

    const found = getDealerById(Number(id));
    if (found) {
      setDealer({
        ...found,
        startPeriod: found.startPeriod as "AM" | "PM",
        endPeriod: found.endPeriod as "AM" | "PM",
      });
    }

    setLoading(false);
  }, [id]);

  const formik = useFormik<DealerFormValues>({
    initialValues: dealer || {
      id: 0,
      dealerName: "",
      address: "",
      email: "",
      phone: "",
      startTime: "",
      startPeriod: "AM",
      endTime: "",
      endPeriod: "PM",
      hours: "",
    },

    enableReinitialize: true,
    validationSchema: DealerSchema,

    onSubmit: (values) => {
      const hours = `${values.startTime} ${values.startPeriod} - ${values.endTime} ${values.endPeriod}`;
      const updated = { ...values, id: dealer?.id || Number(id), hours };

      updateDealer(updated);

      // Show snackbar
      showSnackbar("Dealer updated successfully!", "success");

      if (isModal) {
        setTimeout(() => {
          onUpdate?.();
        }, 700);
      } else {
        setTimeout(() => navigate("/"), 700);
      }
    },
  });

  if (loading) return <div>Loading...</div>;
  if (!dealer) return <div>Dealer Not Found</div>;

  return (
    <div
      className={`
        ${isModal ? "p-3" : "bg-white p-6"}
        rounded-lg shadow-md w-full
      `}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Dealer Name */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Dealer Name</label>
          <input
            name="dealerName"
            value={formik.values.dealerName}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Phone</label>
          <input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* Operating Hours */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Operating Hours</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Start */}
            <div className="flex gap-2 w-full">
              <input
                type="time"
                name="startTime"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                className="border rounded p-2 w-full text-sm"
              />
              <select
                name="startPeriod"
                value={formik.values.startPeriod}
                onChange={formik.handleChange}
                className="border rounded p-2 w-[70px] text-sm"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>

            {/* End */}
            <div className="flex gap-2 w-full">
              <input
                type="time"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                className="border rounded p-2 w-full text-sm"
              />
              <select
                name="endPeriod"
                value={formik.values.endPeriod}
                onChange={formik.handleChange}
                className="border rounded p-2 w-[70px] text-sm"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            rows={3}
            value={formik.values.address}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* Submit */}
        <Button
          label="Update Dealer"
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded text-sm"
        />
      </form>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </div>
  );
};

export default EditDealer;
