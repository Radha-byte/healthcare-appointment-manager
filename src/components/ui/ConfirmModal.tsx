"use client";

import { AlertTriangle, X } from "lucide-react";

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={18} />
        </button>
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
            danger ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
          }`}
        >
          <AlertTriangle size={20} />
        </div>
        <h3 className="font-semibold text-slate-900 mb-1.5">{title}</h3>
        <p className="text-sm text-slate-600 mb-6">{description}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 border border-slate-200 text-slate-700 font-medium text-sm py-2.5 rounded-xl hover:bg-slate-50"
          >
            Go back
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-white font-medium text-sm py-2.5 rounded-xl disabled:opacity-50 ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}