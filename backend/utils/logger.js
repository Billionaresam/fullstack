import Log from '../models/Log.js';

export const logAction = async ({ actor, action, metadata = {}, target = '' }) => {
  try {
    await Log.create({ actor, action, metadata, target });
  } catch (err) {
    console.error('🚨 Logging failed:', err.message);
  }
};
