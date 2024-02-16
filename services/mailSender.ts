import nodemailer from 'nodemailer';
import configs from '../configs';

const pass = 'smaplepass '
const servicesProvider = 'service-provider-address'

const sender = nodemailer.createTransport({
    service: servicesProvider,
    auth: {
        user: configs?.ourEmailProvider,
        pass: pass,
    },
});

const mailSender = async (target: string, otp: string): Promise<void> => {

    const options = {
        from: configs?.ourEmailProvider,
        to: target,
        subject: 'OTP for the renewing your pass ',
        text: `otp code for revoking the your pass word : ${otp}`,
    };

    try {
        await sender.sendMail(options);
    } catch (err) {
        console.log(err)
    }
}


export default mailSender