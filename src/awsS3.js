import AWS from 'aws-sdk';

AWS.config.update({
  /* accessKeyId: '',
  secretAccessKey: '',
  sessionToken: '',
  region: 'us-east-1', */
});

const s3 = new AWS.S3();
const BUCKET_NAME = 'stockifypruebabucket';

const uploadImageToS3 = (file, callback) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${Date.now()}_${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading image:', err);
      callback(err, null);
    } else {
      console.log('Image uploaded successfully:', data.Location);
      callback(null, data.Location);
    }
  });
};

export { uploadImageToS3 };
