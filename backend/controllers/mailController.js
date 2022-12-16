const nodeMailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    let transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_APP_PWD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let details = {
      from: `"Anas test mail" <${process.env.EMAIL_SENDER}>`, // sender address
      to: email,
      subject: subject ? subject : "No subject",
      text: content,
    };

    const response = await transporter.sendMail(details);

    console.log("Message sent");
    console.log(response);

    return res.status(200).json({ msg: "Message sent successfully" });
  } catch (error) {
    //console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again !!" });
  }
};

module.exports = { sendMail };
