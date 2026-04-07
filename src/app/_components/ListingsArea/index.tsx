"use client";

import { useMemo, useState } from "react";
import { useListingsAreaViewModel } from "./useViewModel";
import GridProductCard from "@/components/common/GridProductCard";
import ListingDetailsModal, { ListingDetailsModalData } from "@/components/common/ListingDetailsModal";
import AuthGateModal from "@/components/common/AuthGateModal";
import ListingsAreaSkeleton from "./ListingsAreaSkeleton";
import { FormattedListing } from "@/lib/types/listing";

interface ListingsAreaProps {
  initialListings: FormattedListing[];
  isLoadingInitial?: boolean;
}

const TABS = [
  { key: "all", label: "All" },
  { key: "PROPERTY", label: "Real Estate" },
  { key: "VEHICLE", label: "Vehicles" },
] as const;

const ListingsArea = ({ initialListings, isLoadingInitial = false }: ListingsAreaProps) => {
  const { listings, mounted, isLoggedIn, activeTab, setActiveTab } = useListingsAreaViewModel(initialListings);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [authGateOpen, setAuthGateOpen] = useState(false);

  const selectedListing = useMemo<ListingDetailsModalData | null>(() => {
    if (!selectedListingId) return null;
    return listings.find((listing) => listing.id === selectedListingId) ?? null;
  }, [listings, selectedListingId]);

  const handleViewDetails = (listingId: string) => {
    if (mounted && !isLoggedIn) {
      setAuthGateOpen(true);
    } else {
      setSelectedListingId(listingId);
    }
  };

  if (isLoadingInitial) {
    return <ListingsAreaSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Section header + filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)]">Current Listings</h2>
          <p className="text-sm text-[var(--color-gray-500)] mt-0.5">Hand-picked assets available for you.</p>
        </div>
        <div className="flex items-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeTab === tab.key
                  ? "bg-[var(--color-brand-dark)] text-white border-[var(--color-brand-dark)]"
                  : "bg-white text-[var(--color-gray-500)] border-[var(--color-gray-300)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              }`}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Card grid */}
      {listings.length > 0 ? (
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
              onViewDetailsClick={() => handleViewDetails(listing.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-[var(--color-gray-500)]">
          <p className="text-sm">No listings found.</p>
        </div>
      )}

      <ListingDetailsModal
        isOpen={Boolean(selectedListing)}
        listing={selectedListing}
        onClose={() => setSelectedListingId(null)}
      />

      <AuthGateModal
        isOpen={authGateOpen}
        onClose={() => setAuthGateOpen(false)}
      />
    </div>
  );
};

export default ListingsArea;
