import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
url: process.env.DRIZZLE_DATABASE_URL||'postgresql://InterviewAI_DB_owner:vwXVzryf9kQ0@ep-autumn-salad-a56c1z20.us-east-2.aws.neon.tech/InterviewAI_DB?sslmode=require',
  },
  verbose: true,
  strict: true,
})
