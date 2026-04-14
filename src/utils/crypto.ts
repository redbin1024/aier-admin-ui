import CryptoJS from 'crypto-js';

/**
 * 随机生成 32 位字符串（与原项目保持一致）
 */
const generateRandomString = (): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * 生成 AES 密钥
 * 返回 WordArray 对象（32字节，AES-256），与后端解密规格一致
 */
export function generateAesKey(): CryptoJS.lib.WordArray {
  return CryptoJS.enc.Utf8.parse(generateRandomString());
}

/**
 * 对 WordArray 进行 Base64 编码
 * 注意：入参必须是 WordArray（与原项目 encryptBase64 一致）
 */
export function encryptBase64(wordArray: CryptoJS.lib.WordArray): string {
  return CryptoJS.enc.Base64.stringify(wordArray);
}

/**
 * AES-ECB 加密（与后端解密模式 ECB 一致）
 */
export function encryptWithAes(
  message: string,
  aesKey: CryptoJS.lib.WordArray
): string {
  return CryptoJS.AES.encrypt(message, aesKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

/**
 * AES-ECB 解密
 */
export function decryptWithAes(
  message: string,
  aesKey: CryptoJS.lib.WordArray
): string {
  return CryptoJS.AES.decrypt(message, aesKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
}
