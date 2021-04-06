require('dotenv').config();

const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:AWS_SES_SECRET_ACCESS_KEY,
    region: 'us-west-2',
};

const AWS_SES = new AWS.SES(SES_CONFIG)

let sendEmail = (message) => {
    let params = {
        Source: 'stephen.tamiesie@gmail.com',
        Destination: {
            ToAddresses: [
               email 
            ],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: 'Order Info',
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Your order had changed`,
            }
        },
    };
    return AWS_SES.sendEmail(params).promise();
};

module.exports = {
    sendEmail,
}