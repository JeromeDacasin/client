import { useState, useCallback } from "react"

export const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const setLoadingStatus = useCallback((status) => {
        setLoading(status);
    }, []);

    return [loading, setLoadingStatus];
};