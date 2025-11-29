import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { getDealerById, updateDealer } from "../services/dealer.service";
import { DealerSchema } from "../validation/dealer.schema";
import type { DealerFormValues } from "../interfaces/dealer.interface";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";

const EditDealer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dealer, setDealer] = useState<DealerFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔵 Load dealer from localStorage
  useEffect(() => {
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

  // 🔵 Formik — always render (no conditional hooks!)
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
      const finalHours = `${values.startTime} ${values.startPeriod} - ${values.endTime} ${values.endPeriod}`;

      const updated: DealerFormValues = {
        ...values,
        id: Number(id),
        hours: finalHours,
      };

      updateDealer(updated);

      alert("Dealer updated successfully!");
      navigate("/view-dealer");
    },
  });

  // 🟥 SAFE UI RETURNS AFTER hooks
  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!dealer) {
    return (
      <div className="p-6 text-center text-gray-600">Dealer Not Found</div>
    );
  }

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 sm:p-8 max-w-[1200px] mx-auto mt-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        Edit Dealer
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* TWO COLUMN GRID - responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dealer Name */}
          <div>
            <label className="text-sm text-gray-700 mb-1">Dealer Name</label>
            <input
              type="text"
              name="dealerName"
              value={formik.values.dealerName}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
            {formik.touched.dealerName && formik.errors.dealerName && (
              <p className="text-red-500 text-xs">{formik.errors.dealerName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs">{formik.errors.phone}</p>
            )}
          </div>

          {/* Operating Hours */}
          <div>
            <label className="text-sm text-gray-700 mb-1">
              Operating Hours
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Start Time */}
              <div className="flex gap-2">
                <input
                  type="time"
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  className="border rounded-md px-3 py-2 w-full"
                />
                <select
                  name="startPeriod"
                  value={formik.values.startPeriod}
                  onChange={formik.handleChange}
                  className="border rounded-md px-2 py-2"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>

              {/* End Time */}
              <div className="flex gap-2">
                <input
                  type="time"
                  name="endTime"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  className="border rounded-md px-3 py-2 w-full"
                />
                <select
                  name="endPeriod"
                  value={formik.values.endPeriod}
                  onChange={formik.handleChange}
                  className="border rounded-md px-2 py-2"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            rows={3}
            value={formik.values.address}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <Button
          label="Update Dealer"
          type="submit"
          variant="primary"
          className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700"
        />
      </form>
    </div>
  );
};

export default EditDealer;
