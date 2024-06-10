import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'ASIAQKTYA4RHUE7ZCFE4',
  secretAccessKey: 'Ro8WoTZJ0jRXgL42QVrsPrdfjo4UE8nC/+e1QRM7',
  sessionToken: 'IQoJb3JpZ2luX2VjEKv//////////wEaCXVzLXdlc3QtMiJHMEUCIDB9gv5ao7HlF/oDfBSHinseyXHCQrFlNU8s8jF5hE4vAiEAq5mZU125kGR+teU2zxaNWvHSXXdfuuo87WD/HtnFhFQqrAIIRBAAGgwwMjI4MDAyOTQ5OTEiDGM3lQkvthP9Twrf2yqJAll0H1/rUtlpYfEf3p67OjhxsvxeYWyy3F4m1F+jmkdcSUZLYUxVmlDIiCRtUaRhiS+Q4igJzkHjZAM9g3Urxge81A2SEgUNYTFaNAsKrzrkIxIrk8m9QPZVsPAWXbHyVoeSKWgtqgKoh+gd6owRqiHydYlx4T8HxE6Vqo5gT018xdJp9u75lTxNmgE5jh7H83U43X+P5AxNngBFfXEeqd0Na9GfyiryAzA0Sv+chS1+CmOLT8d5vzbPEkkQh9tX0ybyWnaXsQjGRe3THtHga7/N24X0zD/7QipNTCSxSEQ3LGf/hd3XoBJICgcpRFWEPGCMSkkAVa/gbQ+yfduJziBKGHMk/75ysikwiLmbswY6nQHzZ/ouo7cJ1eEa+VUmshS0C3hF3UQ41lZ2adV128vEMu4nLI+xYUKopEK4sfom6ztN4m5sn8dsBG6jLZhxCaNV5utSMOQ+wiXUmqLize7XKfuzj+pjbClEiCqp6cpesBh707L1AngtPDRJ27jL8CqAu2KyZYdFDOhmQ9x1lOUrgHtmy31AjfLjZZPURtttXK5NjkyHvucsPiz2Inp3',
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
      callback(null, data.Location);
    }
  });
};

export { uploadImageToS3 };
