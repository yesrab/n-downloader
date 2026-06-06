import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dbURI = "./src/db/ndownload.db"

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.VITE_DB_FILE_NAME! || dbURI,
  },
});
