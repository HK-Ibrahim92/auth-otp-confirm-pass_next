import bcryptjs from "bcryptjs";
import { connectDb } from "@/dbConnection/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }
    console.log("user exist");
    const validPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return NextResponse.json(
        { error: "password is incorrect" },
        { status: 400 }
      );
    }
    const tokenPayload = {
      id: existingUser._id,
    };
    const token =  jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: "true",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
