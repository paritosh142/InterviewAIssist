import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: "postgresql://InterviewAI_DB_owner:vwXVzryf9kQ0@ep-autumn-salad-a56c1z20.us-east-2.aws.neon.tech/InterviewAI_DB?sslmode=require"
});
export const db = drizzle(pool, { schema });
