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

// Write function to confirm password

export const add = (a, b) => {
  var result = ''
  var carry = 0
  a = a.split('')
  b = b.split('')
  while (a.length || b.length || carry) {
    carry += ~~a.pop() + ~~b.pop()
    console.log(typeof carry)
    result = carry % 10 + result
    carry = carry > 9
  }
  if (/^0+/.test(result)) {
    let fan = result.replace(/^0+/, '')
    return fan
  }else{
    return result
  }
}

export const subtract = (a, b) => {
  var result = '';
  var borrow = 0;
  a = a.split('');
  b = b.split('');

  while (a.length || b.length) {
    var digitA = ~~a.pop() || 0;
    var digitB = ~~b.pop() || 0;

    // Apply borrowing if necessary
    if (digitA < digitB + borrow) {
      digitA += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    var subtractedDigit = digitA - digitB - borrow;
    result = subtractedDigit + result;
  }
  if (/^0+/.test(result)) {
    let fan = result.replace(/^0+/, '')
    return fan
  }else{
    return result
  }
};

export const displayLargeNumbers = (number) => {
  var result = "";
  var i = 0;
  while (number > 0) {
    var digit = number % 10;
    result = digit + result;
    number = Math.floor(number / 10);
    i++;
    if (i % 3 === 0 && number !== 0) {
      result = "," + result;
    }
  }
  return result;
};
