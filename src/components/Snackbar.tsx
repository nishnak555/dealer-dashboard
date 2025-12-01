import React, { useEffect } from "react";

interface SnackbarProps {
  open: boolean;
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  const colors: Record<string, string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-600",
  };

  return (
    <div
      className={`
        fixed left-1/2 -translate-x-1/2 bottom-6 z-[9999]
        text-white px-5 py-3 rounded-lg shadow-lg font-medium 
        transition-all duration-300 ease-out

        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }

        ${colors[type]}
      `}
    >
      {message}
    </div>
  );
};

export default Snackbar;
