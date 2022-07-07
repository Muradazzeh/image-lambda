# image-lambda
## Introduction 

### Amazon Simple Storage Service (Amazon S3)
* What is Amazon S3? s an object storage service offering industry-leading scalability, data availability, security, and performance.
* Name some use cases for Amazon S3. use case, such as data lakes, cloud-native applications, and mobile apps
* Name some benefits of using Amazon S3 cost-effective storage classes and easy-to-use management features, you can optimize costs, organize data, and configure fine-tuned access controls to meet specific business, organizational, and compliance requirements 

 ### What is AWS Lambda?
AWS Lambda is a serverless computing service provided by Amazon Web Services (AWS). Users of AWS Lambda create functions, self-contained applications written in one of the supported languages and runtimes, and upload them to AWS Lambda, which executes those functions in an efficient and flexible manner.
 ### How does AWS Lambda work?
Each Lambda function runs in its own container. When a function is created, Lambda packages it into a new container and then executes that container on a multi-tenant cluster of machines managed by AWS. Before the functions start running, each function’s container is allocated its necessary RAM and CPU capacity. Once the functions finish running, the RAM allocated at the beginning is multiplied by the amount of time the function spent running. The customers then get charged based on the allocated memory and the amount of run time the function took to complete.

### What requierd in this lap-17
* Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser
* A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far
* When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:
Download a file called “images.json” from the S3 Bucket if it exists
The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present

### lets start 

* First we need to create new bucket in amazon web service , we have to add some permition on it 

![link](./image/Screenshot%20(380).png)

* then we need to go to Lambda , then function , then we create new function , 

* we prepare the function from open resources , and we did some modification on the code , 

````
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
````
* then we need to add trigger an event , when  the user uploade an image , it will fire the lambda function , and it will creat json file , and we will add all image details to this file 

> ### note that , we have issue that each image will be create , it is own json file we will see 

* this is the lambda function 

![link](./image/Screenshot%20(381).png)

* now when we uploade any image to our bucket we will check the log , we did console log a message , so it will show us that the event triggered when image uploaded 

* first we see an event we uploded image as shown :

![link](./image/Screenshot%20(382).png)

* we open the log we should see every thing is ok 

![link](./image/Screenshot%20(384).jpg)

* now we should found that a json file created and inside it saved the image details 

![link](./image/Screenshot%20(386).png)

![link](./image/Screenshot%20(387).png)

* as shown below every image we uploade , lambda function create new json file for details , the only thing we need to do , is to add all details in one file 

![link](./image/Screenshot%20(389).png)

* each image uploded we should recive a log from lambda function as shown below 

![link](./image/Screenshot%20(391).png)



* this is sample link to the json file created from image 
[link to json file AWS bucket](./image/Screenshot%20(389).png)
