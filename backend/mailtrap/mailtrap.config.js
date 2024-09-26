import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const SENDER_EMAIL = "hello@demomailtrap.com";
//const RECIPIENT_EMAIL = "pathaksairantri@gmail.com";

export const mailtrapClient = new MailtrapClient({ token: TOKEN , endpoint: process.env.MAILTRAP_ENDPOINT });

export const sender = { name: "Sairantri", email: SENDER_EMAIL };

// client
//   .send({
//     from: sender,
//     to: [{ email: RECIPIENT_EMAIL }],
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//   })
//   .then(console.log)
//   .catch(console.error);
