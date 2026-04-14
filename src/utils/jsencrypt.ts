import JSEncrypt from 'jsencrypt';

const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAN2dLr6jX0jKIzusfgXnH291tBJNwhxn
2izBrEMmwiBT58av/WKJpi1UqkrwlikGnOj86oGPKot9uy0YfMDvabcCAwEAAQ==`;

// RSA 加密
export function encrypt(text: string): string | false {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(text);
}

// RSA 解密 (注意：浏览器端通常不保存私钥，如需在前端解密 Cookie 建议改用 crypto.ts 中的 AES 对称加解密)
export function decrypt(txt: string): string | false {
  const encryptor = new JSEncrypt();
  // encryptor.setPrivateKey('YOUR_PRIVATE_KEY'); // 如果有私钥可在此设置
  return encryptor.decrypt(txt);
}

export default encrypt;
