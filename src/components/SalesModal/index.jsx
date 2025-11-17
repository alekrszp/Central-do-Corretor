import { createPortal } from "react-dom";

export function SalesModal({ children, open, onClose }) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-6">
      <div className="flex flex-col gap-2 bg-gradient-to-br from-[#262626] to-[#353535] p-4 rounded-xl shadow-xl w-full">
        <button onClick={onClose} className="text-white rounded self-end text-3xl">
          X
        </button>
        {children} 
      </div>
    </div>,
    document.body
  );
}