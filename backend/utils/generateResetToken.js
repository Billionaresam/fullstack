import crypto from 'crypto';

export const generateResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expires = Date.now() + 15 * 60 * 1000; // 15 mins

  return { rawToken, hashedToken, expires };
};
