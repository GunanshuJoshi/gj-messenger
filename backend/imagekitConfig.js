export const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_API_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});
