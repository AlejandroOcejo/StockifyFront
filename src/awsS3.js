import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'ASIAQKTYA4RHVGAW3SN5',
  secretAccessKey: 'tVlvKq7mUG9rmKfDpXhVFWmJRbfe+1BE28WbyCob',
  sessionToken: 'IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDo3TilEb5tKRtwJUNfbaQHqfOsOuVr8k08V/gM3uo5kwIhAJxtkwbHXh6RxA+GTeYpwdx6Pc4tkAwfhjesUkBlJuWQKrUCCNn//////////wEQABoMMDIyODAwMjk0OTkxIgy448H6SPF8yDNxGHwqiQKaeIVkqRBCFr1wfoKuStJfh+dG5OnA/gEIxiNFk2wJdus1dGNNS5hcX8GolhSqay/ckdZFSDFuaISDWObtUH526s6LMlV/RZhIswvrX+Db1c7qogd4U/co0xdcPCvrIvUhfxRejHVoyNfFJEBMLxWFJRcs4gbR+zrQToKo0n7Pu8r3qEF87XxA/VVuHiBGjJOb4J6x/Q24+fANoNt9lJt22Otx0QXzVEvRG/iJTEehqbOzKf2v0LsQs4nC5GQz3KsURdwyya0atCWLbo/U1edlByTtG1uRWS7dJ6WNmT4bMLm9YnjHKq8XZPhwgxtOwPIZq5KiJwhvT9bV/ByM/NGyfOBgCSnj9WEdMLqth7MGOpwBI4wTRHn5uuMnKvCKpuVz/DQKxCvyrNJb/VdNa0cKH/wPIOcse6l2r8XkWa0NPwS8OEXOlNcsNDbo0TTS4qcp5c2PV/iEs8nIZymbVjaAsqE9qRNSX9KRH/FdiCZs2KKAjd93VJbVDoKV9+8Vc3XFYF2B+BG/HhAiOhjxVdQsoA9AV8udBF8KW/WIsnlyenyCaM1NI3h6C5TiX1J+',
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
