import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'ASIAQKTYA4RH6LHXV4VA',
  secretAccessKey: 'hMaVq5/8PhcgCbmS36cbjJ94EyEy3LDJvUmfZVOY',
  sessionToken: 'IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJIMEYCIQDN0Sr3aStDN0jUPUFyDe/h1tm4U4BhQ90jnhoUAFPnDwIhAOrDROGEsU/41BPwgbivyXMMoY68vSH0BYd6wZjAfSaiKrUCCKX//////////wEQABoMMDIyODAwMjk0OTkxIgyjpl5tMOKd8BsrFc4qiQIBK5ovQCUdxVN8M7xQrG9aKojcH5+3ddaMuJL2rAS0J2584scpVmhqCjIZp3K+b04wcB7mjUcijTl0+JvQlX73pCj99xoSkgPfgI+OhOPWqLjhKXl5eUWZkAruLwCKAiiMFM5QcL9VEPnH4Cq6iWndehunuCAg1hNouLsfFbRJ9sNMBEvY55zf8mk2ksoG3IjlX9/0dnm04i3Gcky4jXLrKuGkl5cEMyiTo+SIvQr2ZqUceRZIrw7jZUy1Yh/B5VwNw7fo0sm3idyQ3aEInbXTPMbEdZHSAsnsuYpe1U4D2J8siTqyzYKZ8R90UEinEXvLkVBO4FvTt7KYOwC10jXGlz0U7SIaQiogMPqJ/LIGOpwB9K7/o2vWmG6+pKfJiHRiVYBJ+LD8TrJcN/Wq04NWollPHazqJCwiGtEBbRwEud9YTM54zjqEsiY8ygGXXds6IO/GAtQZ55G9hfrGjgYnM85MTAr69IeQPgWI+dW3uf/m1IZkZJK4Oi5KQLMotMEitH9s1ycArhVUuj1Ocp9PHf6wU+wlBPAyd4ZS8iw7PdBGJVIfXQ5+xOyXvcoT',
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
