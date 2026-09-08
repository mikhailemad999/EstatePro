import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const where: any = {};
    if (type) where.type = type;

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { date: "asc" },
      include: {
        property: true,
        agent: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, count: appointments.length, data: appointments });
  } catch (error: any) {
    console.error("GET /api/appointments error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let agentId = body.agentId;
    if (!agentId) {
      const defaultAgent = await prisma.agentProfile.findFirst();
      if (defaultAgent) agentId = defaultAgent.id;
    }

    const appointment = await prisma.appointment.create({
      data: {
        propertyId: body.propertyId || null,
        agentId,
        clientName: body.clientName || "Private Principal",
        clientEmail: body.clientEmail || "vip@investor.com",
        clientPhone: body.clientPhone || null,
        type: body.type || "PROPERTY_VIEWING",
        transferType: body.transferType || "LUXURY_CHAUFFEUR",
        date: body.date ? new Date(body.date) : new Date(Date.now() + 86400000 * 3),
        timeSlot: body.timeSlot || "14:00 - 16:00",
        notes: body.notes || null,
        status: "CONFIRMED",
      },
    });

    // Also register an audit event
    await prisma.auditLog.create({
      data: {
        action: "APPOINTMENT_SCHEDULED",
        entityType: "APPOINTMENT",
        entityId: appointment.id,
        details: `VIP Viewing / Aviation charter booked for client ${appointment.clientName} (${appointment.transferType}).`,
        ipAddress: "127.0.0.1",
      },
    });

    return NextResponse.json({ success: true, data: appointment }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/appointments error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
