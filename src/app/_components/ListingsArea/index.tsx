"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useListingsAreaViewModel } from "./useViewModel";
import GridProductCard from "@/components/common/GridProductCard";
import ListingDetailsModal, { ListingDetailsModalData } from "@/components/common/ListingDetailsModal";
import ListingsAreaSkeleton from "./ListingsAreaSkeleton";
import BaseButton from "@/components/common/BaseButton";
import { FormattedListing } from "@/lib/types/listing";

interface ListingsAreaProps {
  initialListings: FormattedListing[];
  isLoadingInitial?: boolean;
}

const ListingsArea = ({ initialListings, isLoadingInitial = false }: ListingsAreaProps) => {
  const router = useRouter();
  const { listings, mounted, isLoggedIn } = useListingsAreaViewModel(initialListings);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const selectedListing = useMemo<ListingDetailsModalData | null>(() => {
    if (!selectedListingId) return null;
    return listings.find((listing) => listing.id === selectedListingId) ?? null;
  }, [listings, selectedListingId]);

  if (isLoadingInitial) {
    return <ListingsAreaSkeleton />;
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Register banner — logged-out users only */}
      {mounted && !isLoggedIn && (
        <>
          {/* Desktop */}
          <div className="hidden lg:flex items-center bg-blue-50 rounded-lg px-4 h-[43px] justify-between border border-[var(--color-blue-border)]">
            <div className="flex items-center gap-3">
              <span className="text-blue-600 text-xl">ℹ️</span>
              <p className="text-sm text-[var(--color-blue-border)] lg:hidden xl:block">
                Browse listings for free. Sign up to save favorites, contact sellers, and get personalized recommendations.
              </p>
              <p className="text-sm text-[var(--color-blue-border)] hidden lg:block xl:hidden">Browse listings for free...</p>
            </div>
            <BaseButton
              onClick={() => router.push("/login?tab=register")}
              className="h-[32px] text-white px-4 text-xs font-semibold rounded-md whitespace-nowrap bg-[var(--color-brand-dark)]"
            >
              Register Here
            </BaseButton>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center bg-blue-50 rounded-lg px-3 h-[43px] justify-between border border-[var(--color-blue-border)] gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-blue-600 text-base flex-shrink-0">&#9432;</span>
            </div>
            <BaseButton
              onClick={() => router.push("/login?tab=register")}
              className="h-[32px] text-white px-3 text-xs font-semibold rounded-md whitespace-nowrap bg-[var(--color-brand-dark)] flex-shrink-0"
            >
              Register Here
            </BaseButton>
          </div>
        </>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <GridProductCard
            key={listing.id}
            category={listing.category}
            price={listing.price}
            title={listing.title}
            location={listing.location}
            year={listing.year}
            color={listing.color}
            mileage={listing.mileage}
            fuelType={listing.fuelType}
            bodyType={listing.bodyType}
            description={listing.description}
            image={listing.image}
            onViewDetailsClick={() => setSelectedListingId(listing.id)}
          />
        ))}
      </div>

      <ListingDetailsModal isOpen={Boolean(selectedListing)} listing={selectedListing} onClose={() => setSelectedListingId(null)} />
    </div>
  );
};

export default ListingsArea;
