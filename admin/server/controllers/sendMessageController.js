const contactSendMail = require("../config/contactSendMail");

const sendMessageController = {
  async sendMessage(req, res, next) {
    const { username, email, subject, text } = req.body;
    try {
      console.log(req.body);
      //   sendMailPaymentSuccess(req.body.email, "Thanks for your message!");
      contactSendMail(username, email, subject, text);

      res.status(200).json({ message: "Thanks for your message!." });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = sendMessageController;
