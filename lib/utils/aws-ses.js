require('dotenv').config();

const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: 'us-west-2',
};

const AWS_SES = new AWS.SES(SES_CONFIG)

let sendEmail = (serviceMessage) => {
    let params = {
        Source: 'stephen.tamiesie@gmail.com',
        Destination: {
            ToAddresses: [
                'stephen.tamiesie@gmail.com'
            ],
        },
        ReplyToAddresses: ['stephen.tamiesie@gmail.com'],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `${serviceMessage}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `🐈  Kittens By Mail 🐈 `,
            }
        },
    };
    return AWS_SES.sendEmail(params).promise();
};

module.exports = {
    sendEmail,
}