import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipent = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipent,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification",
        })
        console.log("Email sent successfully",response);
    } catch (error) {

        console. log("Error sending email",error);  
        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, username) => {
    const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
			template_variables: {
				company_info_name: "Auth Company",
				name: username,
			},
		});

		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipent = [{email}];
	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipent,
			subject: "Password reset successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.log("Error sending password reset email", error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
}