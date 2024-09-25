import { connectDb } from "@/dbConnection/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDb();

export async function POST(request: NextRequest) {
try {
    const userId = await getDataFromToken(request);
    console.log('userId',userId);
    const user = await User.findOne({ _id: userId }).select("-password");
    console.log('user',user);

    if (!user) {
      return NextResponse.json({ error: "token not found" },{ status: 404 });
    }
    return NextResponse.json({
      message: "User found",
      data: user,
    });
} catch (error: any) {
    console.error('Error fetching user:', error); // Log the full error
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
}
   
}
