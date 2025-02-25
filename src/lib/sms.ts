import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(
    accountSid,
    authToken
);

export const sendSMS = async (to: string, message: string) => {
    try {
        const response = await client.messages.create({
            body: message,
            to: `+52${to}`,
            from: phoneNumber
        });
        return { success: true, sid: response.sid };
    } catch (error) {
        console.error('Error sending SMS:', error);
        return { success: false, error: error.message };
    }
};