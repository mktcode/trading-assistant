import crypto from 'crypto';
import qs from 'qs';

export default function signKrakenMessage(
  path: string,
  payload: Record<string, any>,
  secret: string,
) {
    const message       = qs.stringify(payload);
    const secret_buffer = Buffer.from(secret, 'base64');
    const hash          = crypto.createHash('sha256');
    const hmac          = crypto.createHmac('sha512', secret_buffer);
    const hash_digest   = hash.update(payload.nonce + message).digest('binary');
    const hmac_digest   = hmac.update(path + hash_digest, 'binary').digest('base64');

    return hmac_digest;
};
