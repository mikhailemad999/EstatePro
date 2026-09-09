"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyCardData } from "@/types";
import { formatCurrency, formatArea } from "@/lib/utils";
import { useEstateStore } from "@/store/useEstateStore";

interface PropertyCardProps {
  property: PropertyCardData;
  layout?: "grid" | "compact" | "horizontal";
}

export default function PropertyCard({ property, layout = "grid" }: PropertyCardProps) {
  const { isFavorite, toggleFavorite, addToCompare, removeFromCompare, compareList, currency } = useEstateStore();
  const favorited = isFavorite(property.id);
  const inCompare = compareList.includes(property.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property.id);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const [imgSrc, setImgSrc] = useState(
    property.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  );

  return (
    <div className="group rounded-xl bg-surface-card border border-border-subtle hover:border-outline-variant overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between relative">
      <Link href={`/property/${property.slug}`} className="block">
        {/* Media Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
          <img
            src={imgSrc}
            alt={property.title}
            onError={() => {
              setImgSrc("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80");
            }}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/80 via-transparent to-black/30"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-highest/90 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase text-primary border border-white/10">
              {property.listingType.replace("_", " ")}
            </span>
            {property.verified && (
              <span className="px-2 py-0.5 rounded-full bg-status-verified/20 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase text-status-verified flex items-center gap-1 border border-status-verified/30">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                Verified
              </span>
            )}
          </div>

          {/* Quick Action Buttons (Favorite & Compare) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={handleCompareClick}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors border ${
                inCompare
                  ? "bg-chart-accent text-on-primary border-chart-accent"
                  : "bg-surface-lowest/70 text-secondary hover:text-primary border-white/10 hover:bg-surface-container"
              }`}
              title={inCompare ? "Remove from comparison" : "Add to comparison matrix"}
            >
              <span className="material-symbols-outlined text-[16px]">balance</span>
            </button>

            <button
              onClick={handleFavoriteClick}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors border ${
                favorited
                  ? "bg-error-container text-error border-error/40"
                  : "bg-surface-lowest/70 text-secondary hover:text-error border-white/10 hover:bg-surface-container"
              }`}
              title={favorited ? "Saved in private collection" : "Save property"}
            >
              <span className="material-symbols-outlined text-[16px]">{favorited ? "favorite" : "favorite_border"}</span>
            </button>
          </div>

          {/* Bottom Floating Price */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-secondary block">
                {property.refNumber}
              </span>
              <div className="text-xl sm:text-2xl font-serif text-primary font-medium tracking-tight">
                {formatCurrency(property.price, currency)}
              </div>
            </div>
            <span className="text-[11px] text-on-surface-variant font-light bg-surface-lowest/60 px-2 py-0.5 rounded backdrop-blur-sm">
              {property.propertyType}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          <div>
            <h3 className="font-serif text-lg text-primary tracking-tight line-clamp-1 group-hover:text-secondary-fixed transition-colors">
              {property.title}
            </h3>
            <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px] text-outline">location_on</span>
              <span>{property.address}</span>
            </p>
          </div>

          {/* Architectural Specs Pills */}
          <div className="pt-3 border-t border-border-subtle grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-surface-container/60 rounded p-1.5">
              <span className="block text-[10px] text-outline uppercase tracking-wider">Bedrooms</span>
              <span className="font-semibold text-primary">{property.bedrooms} Beds</span>
            </div>
            <div className="bg-surface-container/60 rounded p-1.5">
              <span className="block text-[10px] text-outline uppercase tracking-wider">Bathrooms</span>
              <span className="font-semibold text-primary">{property.bathrooms} Baths</span>
            </div>
            <div className="bg-surface-container/60 rounded p-1.5">
              <span className="block text-[10px] text-outline uppercase tracking-wider">Interior</span>
              <span className="font-semibold text-primary">{formatArea(property.areaSqm)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
