import { useEffect, useRef } from "react";

const useOnClickOutside = (handler) => {
    const ref = useRef(null);
    const handleCloseDropdown = (event) => {
        if (!ref.current || ref.current?.contains(event.target)) {
            return;
        }
        handler(event);
    };

    useEffect(() => {
        window.addEventListener("click", handleCloseDropdown);
        return () => window.removeEventListener("click", handleCloseDropdown);
    }, [handleCloseDropdown]);
    return ref;
};

export default useOnClickOutside;
