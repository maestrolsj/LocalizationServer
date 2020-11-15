import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: process.env.MAIL_SSL === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

interface SendResetPasswordMailParams {
  name: String;
  email: String;
  token: String;
}

export async function sendResetPasswordMail({
  name,
  email,
  token,
}: SendResetPasswordMailParams) {
  const content = `Set your password by clicking here`;
  const html = `Set your password by clicking <a href="${process.env.FRONT_END_URL}/resetPassword?token=${token}">here</a>`;
  try {
    await mailer.sendMail({
      from: `SG Translation Tool <${process.env.MAIL_FROM}>`,
      to: `${name} <${email}>`,
      subject: "Set your password!",
      text: content,
      html: html,
    });
  } catch (err) {
    console.log(err);
  }
}
