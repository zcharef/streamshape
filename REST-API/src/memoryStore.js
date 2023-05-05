import session from "express-session";

const memoryStore = new session.MemoryStore();

export default memoryStore;
