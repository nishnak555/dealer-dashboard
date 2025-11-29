import React from "react";
import { useFormik } from "formik";
import { DealerSchema } from "../validation/dealer.schema";
import type { DealerFormValues } from "../interfaces/dealer.interface";
import { createDealer } from "../services/dealer.service";
import Button from "../components/common/Button";

const DealerForm: React.FC = () => {
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
      const generatedId = Date.now();

      const finalHours = `${values.startTime} ${values.startPeriod} - ${values.endTime} ${values.endPeriod}`;

      const payload = {
        id: generatedId,
        ...values,
        hours: finalHours,
      };

      await createDealer(payload);
      alert("Dealer Created Successfully!");
      formik.resetForm();
    },
  });

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 sm:p-8 max-w-[1200px] mx-auto mt-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        Create Dealer
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* GRID - Fully Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dealer Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Dealer Name</label>
            <input
              type="text"
              name="dealerName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dealerName}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:outline-none w-full"
              placeholder="Enter dealer name"
            />
            {formik.touched.dealerName && formik.errors.dealerName && (
              <p className="text-red-500 text-xs">{formik.errors.dealerName}</p>
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
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:outline-none w-full"
              placeholder="Enter email"
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
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:outline-none w-full"
              placeholder="Enter phone number"
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
              {/* Start Time */}
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <input
                    type="time"
                    name="startTime"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                  <select
                    name="startPeriod"
                    value={formik.values.startPeriod}
                    onChange={formik.handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* End Time */}
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <input
                    type="time"
                    name="endTime"
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                  <select
                    name="endPeriod"
                    value={formik.values.endPeriod}
                    onChange={formik.handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
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
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter address"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-xs">{formik.errors.address}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <Button
            label="Create Dealer"
            type="submit"
            variant="primary"
            className="w-full py-3 text-center text-white bg-blue-600 hover:bg-blue-700"
          />
        </div>
      </form>
    </div>
  );
};

export default DealerForm;
