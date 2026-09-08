import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      propertiesCount,
      usersCount,
      agenciesCount,
      escrows,
      pendingApprovalsCount,
      recentAuditLogs,
      propertiesSum,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.user.count(),
      prisma.agency.count(),
      prisma.escrowTransaction.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { property: true },
      }),
      prisma.property.count({
        where: { status: "DRAFT" },
      }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
      prisma.property.aggregate({
        _sum: { price: true },
      }),
    ]);

    const totalGMV = propertiesSum._sum.price || 0;

    return NextResponse.json({
      success: true,
      telemetry: {
        totalGMV,
        propertiesCount,
        usersCount,
        agenciesCount,
        pendingApprovalsCount,
        activeEscrowsCount: escrows.length,
        escrows,
        recentAuditLogs,
        clusterStatus: "HEALTHY",
        activeNodes: 4,
        mysqlPort: 3305,
      },
    });
  } catch (error: any) {
    console.error("GET /api/admin/telemetry error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
