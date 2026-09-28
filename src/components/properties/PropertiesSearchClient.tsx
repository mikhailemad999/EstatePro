"use client";

import React, { useState, useMemo } from "react";
import { PropertyCardData } from "@/types";
import PropertyCard from "@/components/common/PropertyCard";
import InteractiveMap from "@/components/common/InteractiveMap";
import { useSearchParams } from "next/navigation";

interface PropertiesSearchClientProps {
  initialProperties: PropertyCardData[];
}

export default function PropertiesSearchClient({
  initialProperties,
}: PropertiesSearchClientProps) {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [selectedTypology, setSelectedTypology] = useState(
    searchParams.get("propertyType") || searchParams.get("typology") || "All Typologies"
  );
  const [selectedListingType, setSelectedListingType] = useState(
    searchParams.get("listingType") || "ALL"
  );
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "All Markets");
  const [sortBy, setSortBy] = useState("price_desc");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "grid" | "map">("split");
  const [minBeds, setMinBeds] = useState(0);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let list = [...initialProperties];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.refNumber.toLowerCase().includes(q)
      );
    }

    if (selectedTypology !== "All Typologies") {
      const typLower = selectedTypology.toLowerCase();
      list = list.filter(
        (p) =>
          p.propertyType.toLowerCase().includes(typLower) ||
          typLower.includes(p.propertyType.toLowerCase())
      );
    }

    if (selectedListingType !== "ALL") {
      const ltLower = selectedListingType.toLowerCase();
      list = list.filter((p) => {
        if (ltLower.includes("commercial")) {
          return p.listingType === "COMMERCIAL_SALE" || p.listingType === "COMMERCIAL_RENT" || p.propertyType.toLowerCase().includes("commercial");
        }
        return p.listingType.toLowerCase().includes(ltLower) || ltLower.includes(p.listingType.toLowerCase());
      });
    }

    if (selectedLocation !== "All Markets") {
      list = list.filter((p) => p.city.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    if (minBeds > 0) {
      list = list.filter((p) => p.bedrooms >= minBeds);
    }

    if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "area_desc") {
      list.sort((a, b) => b.areaSqm - a.areaSqm);
    }

    return list;
  }, [initialProperties, searchQuery, selectedTypology, selectedListingType, selectedLocation, minBeds, sortBy]);

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Search Header / Control Filter Bar */}
      <div className="w-full bg-surface-container-lowest border-b border-border-subtle py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search estates, cities, reference..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-container text-xs text-primary placeholder-outline focus:outline-none focus:ring-1 focus:ring-primary border border-white/5"
              />
            </div>

            {/* Typology Filter */}
            <select
              value={selectedTypology}
              onChange={(e) => setSelectedTypology(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-container text-xs text-primary focus:outline-none cursor-pointer border border-white/5"
            >
              <option value="All Typologies">All Typologies</option>
              <option value="Brutalist Villa">Brutalist Villa</option>
              <option value="Penthouse & Duplex">Penthouse &amp; Duplex</option>
              <option value="Waterfront Compound">Waterfront Compound</option>
              <option value="Historic Palazzo">Historic Palazzo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Alpine Chalets">Alpine Chalets</option>
            </select>

            {/* Listing Type Filter */}
            <select
              value={selectedListingType}
              onChange={(e) => setSelectedListingType(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-container text-xs text-primary focus:outline-none cursor-pointer border border-white/5"
            >
              <option value="ALL">Buy &amp; Rent</option>
              <option value="FOR_SALE">For Sale</option>
              <option value="FOR_RENT">For Rent</option>
              <option value="COMMERCIAL_SALE">Commercial</option>
            </select>

            {/* Bedrooms Filter */}
            <select
              value={minBeds}
              onChange={(e) => setMinBeds(Number(e.target.value))}
              className="px-3 py-2 rounded-lg bg-surface-container text-xs text-primary focus:outline-none cursor-pointer border border-white/5"
            >
              <option value={0}>Any Beds</option>
              <option value={4}>4+ Bedrooms</option>
              <option value={6}>6+ Bedrooms</option>
              <option value={8}>8+ Bedrooms</option>
            </select>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-container text-xs text-primary focus:outline-none cursor-pointer border border-white/5"
            >
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="area_desc">Area: Largest First</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="bg-surface-container rounded-lg p-1 flex items-center border border-white/5">
              <button
                onClick={() => setViewMode("split")}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  viewMode === "split" ? "bg-primary text-on-primary shadow" : "text-secondary hover:text-primary"
                }`}
                title="Split Map & Grid View"
              >
                <span className="material-symbols-outlined text-[16px]">vertical_split</span>
                <span className="hidden sm:inline">Split</span>
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  viewMode === "grid" ? "bg-primary text-on-primary shadow" : "text-secondary hover:text-primary"
                }`}
                title="Grid Only"
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  viewMode === "map" ? "bg-primary text-on-primary shadow" : "text-secondary hover:text-primary"
                }`}
                title="Map Only"
              >
                <span className="material-symbols-outlined text-[16px]">map</span>
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
        {viewMode === "split" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[700px]">
            {/* Left Column: Properties List */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="flex items-center justify-between text-xs text-secondary px-1">
                <span>Showing <strong className="text-primary">{filteredProperties.length}</strong> Sovereign Assets</span>
                <span className="font-mono text-[10px] text-outline">Updated: Real-time</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[800px] pr-2">
                {filteredProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onMouseEnter={() => setSelectedPropertyId(prop.id)}
                    className={`transition-all rounded-xl ${
                      selectedPropertyId === prop.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <PropertyCard property={prop} />
                  </div>
                ))}

                {filteredProperties.length === 0 && (
                  <div className="col-span-2 py-20 text-center text-secondary">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">travel_explore</span>
                    <p className="text-sm font-medium">No sovereign estates match your query filters.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedTypology("All Typologies");
                        setSelectedListingType("ALL");
                      }}
                      className="mt-4 px-4 py-2 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Interactive Map */}
            <div className="lg:col-span-5 h-[380px] sm:h-[480px] lg:h-[800px] rounded-xl overflow-hidden sticky top-24">
              <InteractiveMap
                properties={filteredProperties}
                selectedPropertyId={selectedPropertyId}
                onSelectProperty={(id) => setSelectedPropertyId(id)}
              />
            </div>
          </div>
        )}

        {viewMode === "grid" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-secondary px-1">
              <span>Showing <strong className="text-primary">{filteredProperties.length}</strong> Sovereign Assets</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}

        {viewMode === "map" && (
          <div className="w-full h-[780px]">
            <InteractiveMap
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={(id) => setSelectedPropertyId(id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
