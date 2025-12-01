import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { getDealerById, updateDealer } from "../services/dealer.service";
import { DealerSchema } from "../validation/dealer.schema";
import type { DealerFormValues } from "../interfaces/dealer.interface";
import Button from "../components/common/Button";
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

      if (isModal) {
        onUpdate?.();
      } else {
        navigate("/");
      }
    },
  });

  if (loading) return <div>Loading...</div>;
  if (!dealer) return <div>Dealer Not Found</div>;

  return (
    <div className={isModal ? "p-2" : "bg-white p-6 rounded-lg shadow-md"}>
      <h2 className="text-xl font-semibold mb-4">Edit Dealer</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Dealer Name */}
        <div>
          <label>Dealer Name</label>
          <input
            name="dealerName"
            value={formik.values.dealerName}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full"
          />
          {formik.errors.dealerName && (
            <p className="text-red-500">{formik.errors.dealerName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full"
          />
          {formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label>Phone</label>
          <input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full"
          />
          {formik.errors.phone && (
            <p className="text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        {/* Operating Hours */}
        <div>
          <label>Operating Hours</label>

          <div className="flex gap-4">
            <div className="flex gap-2">
              <input
                type="time"
                name="startTime"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                className="border rounded p-2 w-[120px]"
              />

              <select
                name="startPeriod"
                value={formik.values.startPeriod}
                onChange={formik.handleChange}
                className="border rounded p-2 w-[80px]"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>

            <div className="flex gap-2">
              <input
                type="time"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                className="border rounded p-2 w-[120px]"
              />

              <select
                name="endPeriod"
                value={formik.values.endPeriod}
                onChange={formik.handleChange}
                className="border rounded p-2 w-[80px]"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>

          {(formik.errors.startTime || formik.errors.endTime) && (
            <p className="text-red-500">Invalid hours</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label>Address</label>
          <textarea
            name="address"
            rows={3}
            value={formik.values.address}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full"
          ></textarea>
        </div>

        <Button
          label="Update Dealer"
          type="submit"
          variant="primary"
          className="w-full bg-blue-600 text-white py-3 rounded"
        />
      </form>
    </div>
  );
};

export default EditDealer;
