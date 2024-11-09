import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

async function sendWelcomeEmail(userEmail) {
  const mailOptions = {
    from: "<no-reply@ebazaar.in>",
    to: userEmail,
    subject: "Welcome to Our App!",
    text: "Thank you for registering. We’re excited to have you on board!",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h1 style="text-align: center; color: #4CAF50;">Welcome to URBAN GLARE!</h1>
        <p style="font-size: 16px; color: #555;">
          Hi there! 👋
        </p>
        <p style="font-size: 16px; color: #555;">
          We're thrilled to have you on board. Thank you for registering with us! Our app is designed to provide you with the best experience, and we’re excited for you to explore all its features.
        </p>
        <p style="font-size: 16px; color: #555;">
          If you have any questions, feel free to reach out to our support team. We’re here to help you every step of the way.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="http://localhost:5173" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; border-radius: 4px; text-decoration: none;">
            Get Started
          </a>
        </div>
        <p style="font-size: 16px; color: #555;">
          Enjoy your journey with us!
        </p>
        <p style="font-size: 16px; color: #333; font-weight: bold;">
          Best Regards,<br>
          The Urban Glare team
        </p>
      </div>
      <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
        © MyApp 2024 | All Rights Reserved
      </footer>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
  }
}

export default sendWelcomeEmail;
