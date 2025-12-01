import React, { useState } from "react";
import { useFormik } from "formik";
import { DealerSchema } from "../validation/dealer.schema";
import type { DealerFormValues } from "../interfaces/dealer.interface";
import { createDealer } from "../services/dealer.service";
import Button from "../components/common/Button";
import Snackbar from "../components/Snackbar";
import { useNavigate } from "react-router";

const DealerForm: React.FC = () => {
  const navigate = useNavigate();

  const [submittedData, setSubmittedData] = useState<DealerFormValues | null>(
    null
  );

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

  const formik = useFormik<DealerFormValues>({
    initialValues: {
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

    validationSchema: DealerSchema,

    onSubmit: async (values) => {
      const finalHours = `${values.startTime} ${values.startPeriod} - ${values.endTime} ${values.endPeriod}`;

      const payload: DealerFormValues = {
        id: Date.now(),
        ...values,
        hours: finalHours,
      };

      setSubmittedData(payload);
    },
  });

  const handleConfirm = async () => {
    if (submittedData) {
      await createDealer(submittedData);
      showSnackbar("Dealer Created Successfully!", "success");

      setTimeout(() => {
        navigate("/");
      }, 700);
    }
  };

  const handleEdit = () => {
    setSubmittedData(null);
  };

  return (
    <div
      className="bg-white shadow-md border border-gray-200 rounded-lg 
      p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto mt-6 sm:mt-10"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Create Dealer
      </h2>

      {/* PREVIEW */}
      {submittedData && (
        <div className="p-4 sm:p-6 bg-gray-50 border rounded-lg shadow-md space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Review Dealer Information
          </h3>

          <div className="space-y-2 text-gray-700 text-sm sm:text-base">
            <p>
              <strong>Dealer Name:</strong> {submittedData.dealerName}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Phone:</strong> {submittedData.phone}
            </p>
            <p>
              <strong>Operating Hours:</strong> {submittedData.hours}
            </p>
            <p>
              <strong>Address:</strong> {submittedData.address}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              label="Confirm & Create"
              onClick={handleConfirm}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
            />
            <Button
              label="Edit"
              onClick={handleEdit}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 w-full sm:w-auto"
            />
          </div>
        </div>
      )}

      {/* FORM */}
      {!submittedData && (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Dealer Name */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Dealer Name</label>
              <input
                type="text"
                name="dealerName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dealerName}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              {formik.touched.dealerName && formik.errors.dealerName && (
                <p className="text-red-500 text-xs">
                  {formik.errors.dealerName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs">{formik.errors.phone}</p>
              )}
            </div>

            {/* Operating Hours */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">
                Operating Hours
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Start */}
                <div className="flex gap-2">
                  <input
                    type="time"
                    name="startTime"
                    onChange={formik.handleChange}
                    value={formik.values.startTime}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                  <select
                    name="startPeriod"
                    onChange={formik.handleChange}
                    value={formik.values.startPeriod}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>

                {/* End */}
                <div className="flex gap-2">
                  <input
                    type="time"
                    name="endTime"
                    onChange={formik.handleChange}
                    value={formik.values.endTime}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                  <select
                    name="endPeriod"
                    onChange={formik.handleChange}
                    value={formik.values.endPeriod}
                    className="border border-gray-300 rounded-md px-3 py-2"
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-xs">{formik.errors.address}</p>
            )}
          </div>

          <Button
            label="Preview Dealer"
            type="submit"
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700"
          />
        </form>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default DealerForm;
