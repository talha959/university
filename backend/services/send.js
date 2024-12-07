import { createTransport } from "nodemailer";

const send = async (email, subject, text) => {
    try {
        // Create a transporter object
        const transporter = createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use SSL for secure connection
            auth: {
                user: "muhammadtalhaishaq478@gmail.com",
                pass: "oxwoxpfixkrpsakc", // Ensure this is an App Password
            },
        });

        // Email options
        const mailOptions = {
            from: "muhammadtalhaishaq478@gmail.com", // Sender email address
            to: email, // Receiver email address
            subject: subject, // Email subject
            text: text, // Plain text body
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent: " + info.response);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error; // Re-throw the error for proper handling
    }
};

export default send;
