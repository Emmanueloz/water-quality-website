// import twilio from 'twilio';
// import request from 'request';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

// const client = twilio(
//     accountSid,
//     authToken
// );

// export const sendSMS = async (to: string, message: string) => {
//     try {
//         const response = await request.post('https://textbelt.com/text', {
//             form: {
//               phone: '5555555555',
//               message: 'Hello world',
//               key: 'textbelt',
//             },
//           }, (err, httpResponse, body) => {
//             console.log(JSON.parse(body));
//           });
//         return { success: true, sid: response.sid };
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         return { success: false, error: error.message };
//     }
// };

import axios from 'axios';
const token = process.env.ACCESS_TOKEN;
const phoneNumberId = process.env.PHONE_NUMBER_ID;
const version = process.env.VERSION;


export const sendSMS = async (to: string, message: string) => {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
            {
                "messaging_product": "whatsapp",
                "to": `52${to}`,
                "type": "template",
                "template": {
                    "name": "recuperar_contrasea",
                    "language": { "code": "es" },
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                { "type": "text", "text": message }
                            ]
                        },
                        {
                            "type": "button",
                            "sub_type": "url",
                            "index": "0",
                            "parameters": [
                                { "type": "text", "text": message }  // Código para el enlace dinámico
                            ]
                        }
                    ]
                }
            }
            ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Mensaje enviado:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error enviando mensaje:', error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};