import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { FormattedListing } from "@/lib/types/listing";

export const useHomeRightSidebarViewModel = () => {
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    const [listings, setListings] = useState<FormattedListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loggedIn) {
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch("/api/profile/me/listings")
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (data?.listings) setListings(data.listings);
            })
            .catch(() => {/* silently ignore — listings stay empty */})
            .finally(() => setLoading(false));
    }, [loggedIn]);

    return { listings, loading };
};
