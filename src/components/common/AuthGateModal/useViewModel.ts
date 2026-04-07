import { useEffect } from "react";

interface UseAuthGateModalViewModelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const useAuthGateModalViewModel = ({ isOpen, onClose }: UseAuthGateModalViewModelProps) => {
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        const hadLenisStopped = document.documentElement.classList.contains("lenis-stopped");

        document.body.style.overflow = "hidden";
        document.documentElement.classList.add("lenis-stopped");

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = previousOverflow;
            if (!hadLenisStopped) {
                document.documentElement.classList.remove("lenis-stopped");
            }
        };
    }, [isOpen, onClose]);
};
