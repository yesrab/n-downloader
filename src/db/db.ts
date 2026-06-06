import { drizzle } from 'drizzle-orm/libsql';
const dbURI = "./src/db/ndownload.db"

const db = drizzle(import.meta.env.VITE_DB_FILE_NAME! || dbURI);

export default db;