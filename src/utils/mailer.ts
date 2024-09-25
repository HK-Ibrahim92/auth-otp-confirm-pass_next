import  User  from "@/models/user.model";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId, {
          $set: {

            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000, 
          }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId, {
          $set: {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, 
          }
      });
    }

    const  transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "266a4ed2a7d8cd",
        pass: "681b7fea412c82"
      }
    });
    const mailOption = {
      from: "maddison53@ethereal.email",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4A90E2;">
            ${emailType === 'VERIFY' ? 'email Verification' : 'Reset Your Password'}
          </h2>
          <p>Hi there,</p>
          ${emailType === 'VERIFY' ? `
            <p>We noticed a request to verify your email. Please click the button below to proceed:</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" style="display: inline-block; padding: 10px 20px; background-color: #4A90E2; color: #fff; text-decoration: none; border-radius: 5px;">
              Verify Password
            </a>
            for copy paste ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
          ` : `
            <p>If you wish to reset your password, click the button below:</p>
            <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}" style="display: inline-block; padding: 10px 20px; background-color: #E94E77; color: #fff; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          `}
          <p>If you have any questions, feel free to reach out!</p>
          <p>Best regards,<br/>Your Team</p>
        </div>
      `, // HTML body as a string
    };
    const mailResponse = await transporter.sendMail(mailOption);
  } catch (error: any) {
    throw new error();
  }
};
