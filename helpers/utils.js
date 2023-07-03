import nodemailer from 'nodemailer';
import twilio from 'twilio'
import jwt from 'jsonwebtoken'

// Send email notification
export const sendEmailNotification = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'your-email-service',
      auth: {
        user: 'your-email',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email',
      to: email,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendSMSNotification = async (phoneNumber, message) => {
    try {
      const client = twilio('your-account-sid', 'your-auth-token');
  
      await client.messages.create({
        body: message,
        from: 'your-twilio-phone-number',
        to: phoneNumber,
      });
  
      console.log('SMS sent successfully');
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  

  // Verify JWT token
  export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
  
    try {
      const decodedToken = jwt.verify(token, 'your-secret-key');
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };