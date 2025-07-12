const logAction = async ({ actor, action, metadata }) => {
  try {
    const timestamp = new Date().toISOString();
    console.log(`[LOG] ${timestamp}`);
    console.log(`Actor: ${actor}`);
    console.log(`Action: ${action}`);
    console.log(`Metadata:`, metadata);
  } catch (err) {
    console.error('Failed to log action:', err);
  }
};

export default logAction;
