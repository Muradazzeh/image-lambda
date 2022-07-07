`use strict`
const AWS = require("aws-sdk");

const Rekon = new AWS.Rekognition();
const S3 = new AWS.S3();

exports.handler = async (event, context, lambdaCallback) => {
  try {
    
    const img = event.Records[0].s3.object.key; // get uploaded img file name
    const s3Bucket = event.Records[0].s3.bucket.name; // get uploaded s3 bucket name
    
    await S3.upload({
      Bucket: s3Bucket,
      Key: img.replace(/\.\w\w\w$/, ".json"), // replace image extention with .json file extention
      ContentType: "application/json",
      'massage':console.log("image updated successfuly"),
       Body:JSON.stringify(event.Records[0].s3.object)
       
    }).promise();
    
    lambdaCallback(null);
  } catch (err) {
    lambdaCallback(err);
  }
};