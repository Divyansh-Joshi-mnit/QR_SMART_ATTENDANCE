const crypto = require('crypto');

// simple encryption using AES-256-CTR
const algorithm = 'aes-256-ctr';
const secretKey = process.env.QR_SECRET_KEY || 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'; // Must be 32 chars
const iv = crypto.randomBytes(16);

const generateQRData = (sessionId, courseId, expiresIn) => {
    const data = JSON.stringify({
        sessionId,
        courseId,
        generatedAt: Date.now(),
        expiresIn // passed from teacher settings
    });

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const validateQRData = (hash) => {
    try {
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(hash.iv, 'hex'));
        let decrypted = decipher.update(Buffer.from(hash.content, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
    } catch (error) {
        return null; // Invalid QR code
    }
};

module.exports = { generateQRData, validateQRData };