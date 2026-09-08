import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertyId, status } = body;

    if (!propertyId || !status) {
      return NextResponse.json(
        { success: false, error: "propertyId and status are required" },
        { status: 400 }
      );
    }

    const mappedStatus = status === "APPROVED" ? "PUBLISHED" : "ARCHIVED";

    const updated = await prisma.property.update({
      where: { id: propertyId },
      data: {
        status: mappedStatus as any,
        verified: status === "APPROVED",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: `PROPERTY_COMPLIANCE_${status}`,
        entityType: "PROPERTY",
        entityId: propertyId,
        details: `Overseer determination executed: ${status} for estate [${updated.title}].`,
        ipAddress: "127.0.0.1",
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("POST /api/admin/approvals error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
