  import { connectDb } from "@/dbConnection/dbConnection";
  import User from "@/models/user.model";
  import { NextRequest, NextResponse } from "next/server";
  import bcryptjs from "bcryptjs";
  import { sendEmail } from "@/utils/mailer";

  connectDb();

  export async function POST(request: NextRequest) {
    try {
      const reqBody = await request.json();
      const { username, email, password } = reqBody;
      
      const existingUser  = await User.findOne({ email });
      if (existingUser ) {
        return NextResponse.json({ error: "user already exit" }, { status: 400 });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();;
      console.log(savedUser);

      //send verification email
      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
      return NextResponse.json({
        message: "user registered successfully",
        success: true,
        savedUser,
      });
      
    } catch (error: any) {
      console.error("Registration error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
