import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'ASIAQKTYA4RHX7YGAWE5',
  secretAccessKey: 'Og/5prMOCBUI8PSG0sgXMnsq3Bp8mRG2L3uwVEQP',
  sessionToken: 'IQoJb3JpZ2luX2VjEN7//////////wEaCXVzLXdlc3QtMiJGMEQCICvUAlZTOCtDo5Q3083QJuZyXcam38E0f7S1KZxHdl4bAiApI6XEq5tUB/XPxBvUbhDqtbL91aNKI0+B0A1gJC4w7SqsAghnEAAaDDAyMjgwMDI5NDk5MSIM0RiEB+/1drivd8rQKokCcZPk0WuL0Edz12W8B2Ihpo6YNbizc1WCnGDpwmcO2JZqsDu98Ji0jllXBtLPF2yLXHZ0JKV46vXsQmULI6k/6jyJbikScygSb+ARKGfHgFdQ8bhypGjqci1Y0bqUdSxg3UiPdqcuMNYlLHsdVSdhkRRNJfIOCNUYvyeXlNBrTOZkBbE2zqu7nyx7gwVAtbEA2OGOXQ7vvCwpokB4m61Pi23F+7vYvetELQ8y+Trm5O7MEsQ68Ty8XlrTn31btwV/P1gBssCnTONNQ1NQ5o3hAJL9CxEjgFeIypYoOyPW+LpA91evwPDX0jdc/kq73bxDafmRZRTNRJIFC6a4YGbQAyP9JmSCaVTxwzCPq+6yBjqeAfQHNYtofTRpOqnUOEVFYYxEghB0uACi17raOFlOPZlLQl1Rls/AslOqo2O9qtJxN+5Y3T5gP2AmKVN30pvaySVGkugraeNcqgJYty2PCepErzWb1eZF85od3PAp7XEk2iO0eAS+NIlMj1AJySoHx5NYe4t5y0UUxAU1beB7oADng6WLx9uGZTbGQoagIeCOBWsaGZk+SOVXpnrYa5MK',
  region: 'us-east-1',
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
