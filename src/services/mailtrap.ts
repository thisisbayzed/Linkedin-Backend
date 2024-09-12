import { MailtrapClient } from "mailtrap";
import { config } from "../config/config";

const TOKEN = config.MAILTRAP

export const mailtrapClient = new MailtrapClient({
	token: TOKEN,
});

export const sender = {
	email: config.EMAIL_FROM,
	name: config.EMAIL_FROM_NAME,
};