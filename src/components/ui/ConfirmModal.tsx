import { useEffect } from "react";
import Button from "./Button";

interface ConfirmModalProps {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string
    cancelText?: string
}

export default function ConfirmModal({
    title,
    onConfirm,
    onCancel,
    confirmText = "Так",
    cancelText = "Ні"
}: ConfirmModalProps) {

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onCancel])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/30"
            onClick={onCancel}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
                className="relative flex w-66 flex-col items-center gap-6 rounded-3xl bg-white px-8 pb-8 pt-10 shadow-[0_20px_60px_rgba(15,31,75,0.2)]"
            >
                <button
                    type="button"
                    aria-label="Закрити"
                    onClick={onCancel}
                    className="absolute right-4 top-3 text-xl leading-none text-gray-500 hover:text-black"
                >
                    ×
                </button>

                <p className="text-center text-xs font-medium text-[#52555F]">{title}</p>

                <div className="flex w-full gap-3">
                    <Button onClick={onConfirm} className="flex-1 bg-[#FF751D]">
                        {confirmText}
                    </Button>
                    <Button variant="secondary" onClick={onCancel} className="flex-1">
                        {cancelText}
                    </Button>
                </div>
            </div>
        </div>
    );

}
