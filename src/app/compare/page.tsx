import React from "react";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ComparisonMatrixClient from "@/components/compare/ComparisonMatrixClient";

export const revalidate = 0;

export default async function ComparePage() {
  const allProperties = await prisma.property.findMany({
    where: { status: "PUBLISHED" },
    include: {
      images: { orderBy: { order: "asc" } },
    },
  });

  const formatted = allProperties.map((p) => ({
    ...p,
    listingType: p.listingType as any,
    status: p.status as any,
  }));

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <ComparisonMatrixClient allProperties={formatted} />
      </main>
      <Footer />
    </div>
  );
}
