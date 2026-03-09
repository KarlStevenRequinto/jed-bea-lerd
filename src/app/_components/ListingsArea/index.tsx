"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useListingsAreaViewModel } from "./useViewModel";
import ProductCard from "@/components/common/ProductCard";
import GridProductCard from "@/components/common/GridProductCard";
import ListingDetailsModal, { ListingDetailsModalData } from "@/components/common/ListingDetailsModal";
import ListingsAreaSkeleton from "./ListingsAreaSkeleton";
import BaseButton from "@/components/common/BaseButton";
import BulletedListIconSvg from "@/components/svg-icons/bulleted-list";
import GridIconSvg from "@/components/svg-icons/grid";
import { FormattedListing } from "@/lib/types/listing";

interface ListingsAreaProps {
  initialListings: FormattedListing[];
  isLoadingInitial?: boolean;
}

const ListingsArea = ({ initialListings, isLoadingInitial = false }: ListingsAreaProps) => {
  const router = useRouter();
  const { listings, isLoggedIn, viewMode, handleViewModeChange } = useListingsAreaViewModel(initialListings);
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
      <div className="hidden lg:flex items-center gap-3">
        {!isLoggedIn && (
          <div className="flex-1 bg-blue-50 rounded-lg px-4 h-[43px] flex items-center justify-between border border-[var(--color-blue-border)]">
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
        )}

        <div className="flex overflow-hidden w-[100px] h-[43px] rounded-[10px] border border-[var(--color-blue-border)] flex-shrink-0">
          <button
            onClick={() => handleViewModeChange("grid")}
            className={`flex-1 flex items-center justify-center transition-colors cursor-pointer ${
              viewMode === "grid" ? "bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-darker)]" : "bg-white hover:bg-gray-50"
            }`}
          >
            <GridIconSvg color={viewMode === "grid" ? "white" : "black"} />
          </button>
          <button
            onClick={() => handleViewModeChange("list")}
            className={`flex-1 flex items-center justify-center transition-colors cursor-pointer ${
              viewMode === "list" ? "bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-darker)]" : "bg-white hover:bg-gray-50"
            }`}
          >
            <BulletedListIconSvg color={viewMode === "list" ? "white" : "black"} />
          </button>
        </div>
      </div>

      <div className="flex lg:hidden items-center justify-between gap-3">
        <div className="flex overflow-hidden w-[100px] h-[43px] rounded-[10px] border border-[var(--color-blue-border)] flex-shrink-0">
          <button
            onClick={() => handleViewModeChange("grid")}
            className={`flex-1 flex items-center justify-center transition-colors cursor-pointer ${
              viewMode === "grid" ? "bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-darker)]" : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              <GridIconSvg color={viewMode === "grid" ? "white" : "black"} />
            </div>
          </button>
          <button
            onClick={() => handleViewModeChange("list")}
            className={`flex-1 flex items-center justify-center transition-colors cursor-pointer ${
              viewMode === "list" ? "bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-darker)]" : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              <BulletedListIconSvg color={viewMode === "list" ? "white" : "black"} />
            </div>
          </button>
        </div>

        {!isLoggedIn && (
          <div className="flex bg-blue-50 rounded-lg px-3 h-[43px] items-center justify-between border border-[var(--color-blue-border)] gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-blue-600 text-base flex-shrink-0">&#9432;</span>
              <p className="hidden text-xs text-[var(--color-blue-border)] leading-tight">
                Browse listings for free. Sign up to save favorites, contact sellers, and get personalized recommendations.
              </p>
            </div>
            <BaseButton
              onClick={() => router.push("/login?tab=register")}
              className="h-[32px] text-white px-3 text-xs font-semibold rounded-md whitespace-nowrap bg-[var(--color-brand-dark)] flex-shrink-0"
            >
              Register Here
            </BaseButton>
          </div>
        )}
      </div>

      {viewMode === "list" ? (
        <div className="flex flex-col gap-6">
          {listings.map((listing) => (
            <ProductCard
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
              onContactClick={() => {}}
              onViewDetailsClick={() => setSelectedListingId(listing.id)}
            />
          ))}
        </div>
      ) : (
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
      )}

      <ListingDetailsModal isOpen={Boolean(selectedListing)} listing={selectedListing} onClose={() => setSelectedListingId(null)} />
    </div>
  );
};

export default ListingsArea;
