import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    // Check if any conversations exist, if not create default sample conversation
    let conversations = await prisma.conversation.findMany({
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    if (conversations.length === 0) {
      const defaultProperty = await prisma.property.findFirst();
      const sampleConv = await prisma.conversation.create({
        data: {
          propertyId: defaultProperty?.id || null,
          title: defaultProperty ? `Acquisition Mandate: ${defaultProperty.title}` : "Private Sovereign Inquiries",
          messages: {
            create: [
              {
                senderName: "Lord Sterling Sterling",
                senderRole: "Principal / Buyer",
                content: "Good afternoon. Our family office has reviewed the title deed search and cantonal land registry files. Can you confirm the availability of the private deep-water dock during winter months?",
              },
              {
                senderName: "Kenjiro Takahashi",
                senderRole: "Senior Private Advisor",
                content: "Good afternoon Lord Sterling. Yes, the private harbor is fully dredged to 4.2m draft and maintains year-round deep-water accessibility with automated de-icing aeration piles. We can arrange a private helicopter inspection this Thursday.",
              },
              {
                senderName: "Lord Sterling Sterling",
                senderRole: "Principal / Buyer",
                content: "Excellent. Please reserve a slot with our aviation flight coordinator via the VIP concierge portal.",
              },
            ],
          },
        },
        include: {
          messages: true,
        },
      });
      conversations = [sampleConv];
    }

    if (conversationId) {
      const conv = conversations.find((c) => c.id === conversationId);
      return NextResponse.json({ success: true, data: conv || null });
    }

    return NextResponse.json({ success: true, data: conversations });
  } catch (error: any) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversationId, senderName, senderRole, content, propertyId } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: "Content is required" }, { status: 400 });
    }

    let targetConvId = conversationId;

    if (!targetConvId) {
      const newConv = await prisma.conversation.create({
        data: {
          propertyId: propertyId || null,
          title: `Confidential Mandate #${Math.floor(1000 + Math.random() * 9000)}`,
        },
      });
      targetConvId = newConv.id;
    }

    const message = await prisma.message.create({
      data: {
        conversationId: targetConvId,
        senderName: senderName || "Private Principal",
        senderRole: senderRole || "Client",
        content,
      },
    });

    await prisma.conversation.update({
      where: { id: targetConvId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
