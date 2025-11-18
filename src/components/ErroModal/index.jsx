import { createPortal } from "react-dom";

export function ErroModal({ children, open, onClose }) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg flex flex-col gap-2 bg-gradient-to-br from-[#262626] to-[#353535] p-4 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="text-white rounded self-end text-3xl"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}