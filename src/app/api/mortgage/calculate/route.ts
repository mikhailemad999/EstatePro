import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateMortgage } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const price = Number(body.price) || 20000000;
    const downPaymentPercent = Number(body.downPaymentPercent) || 25;
    const interestRate = Number(body.interestRate) || 4.25;
    const durationYears = Number(body.durationYears) || 25;

    const calculation = calculateMortgage(price, downPaymentPercent, interestRate, durationYears);

    let application = null;
    if (body.applicantName && body.applicantEmail) {
      application = await prisma.mortgageApplication.create({
        data: {
          propertyId: body.propertyId || null,
          applicantName: body.applicantName,
          applicantEmail: body.applicantEmail,
          applicantPhone: body.applicantPhone || null,
          loanAmount: body.loanAmount || calculation.loanAmount,
          downPayment: body.downPayment || calculation.downPayment,
          durationYears,
          interestRate,
          monthlyPayment: body.monthlyPayment || calculation.monthlyPayment,
          status: "PRE_APPROVED",
        },
      });

      // Also create an audit entry
      await prisma.auditLog.create({
        data: {
          action: "MORTGAGE_PRE_APPROVAL_FILED",
          entityType: "MORTGAGE",
          entityId: application.id,
          details: `Private mortgage pre-approval filed for ${application.applicantName}: Loan ${application.loanAmount}`,
          ipAddress: "127.0.0.1",
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        calculation,
        application,
      },
    });
  } catch (error: any) {
    console.error("POST /api/mortgage/calculate error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const price = Number(searchParams.get("price")) || 20000000;
    const downPaymentPercent = Number(searchParams.get("downPaymentPercent")) || 25;
    const interestRate = Number(searchParams.get("interestRate")) || 4.25;
    const durationYears = Number(searchParams.get("durationYears") || searchParams.get("loanTermYears")) || 25;

    const calculation = calculateMortgage(price, downPaymentPercent, interestRate, durationYears);

    return NextResponse.json({
      success: true,
      data: {
        calculation,
      },
    });
  } catch (error: any) {
    console.error("GET /api/mortgage/calculate error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
