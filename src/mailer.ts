import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Shakesnord@gmail.com",
    pass: "pmlvzsxodsqygabg", // Use an app password if 2FA is enabled
    // user: "support@octatradings.com",
		// pass: "@Spicey2128",
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string, // renamed from 'text' to 'html'
  replyTo?: string // allow dynamic reply-to
) => {
  try {
    const info = await transporter.sendMail({
      from: "No reply <support@octatradings.com>",
      to,
      subject,
      html, // send styled HTML content
      ...(replyTo && { replyTo }), // add replyTo if provided
    });
    console.log("Email sent:", info.response);
  } catch (error: any) {
    console.error("Error sending email:", error?.message || error);
  }
};
<<<<<<< HEAD
=======







// export {};
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "Shakesnord@gmail.com",
//     pass: "zcqckdsgetudutqm",
//   },
// });

// export const sendEmail = async (to: string, subject: string, text: string) => {
//   try {
//     const info = await transporter.sendMail({
//       from: "Shakesnord@gmail.com",
//       to,
//       subject,
//       html: text,
//     });
//     console.log("Email sent:", info.response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// //send email
// export {};
>>>>>>> 6de56487dbb3fd59846fbd4a54280c07deeb9c60
