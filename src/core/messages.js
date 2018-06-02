const firebaseMessages = new Map();
firebaseMessages.set("MISSING_PASSWORD", "Invalid password.");
firebaseMessages.set("EMAIL_EXISTS", "Email already registered.");

const messageMapper = () => firebaseMessages;

export default messageMapper;