import { connectDb } from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function GET(request: NextRequest) {
try {
    const response = NextResponse.json({
        message: "Logout Successfull",
        success: "true",
      });
  
      response.cookies.set("token", '', {
        httpOnly: true,
        expires: new Date()
      });
  
      return response
} catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }


}