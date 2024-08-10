import { create } from 'domain';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const InterviewAIssist = pgTable('InterviewAIssistData', {
  id:serial('id').primaryKey(), 
  mockId: varchar('mockId').notNull(),
  MockRes: text('MockRes').notNull(),
  position: varchar('position').notNull(),
  description: varchar('description').notNull(),
  experience: varchar('experience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
  
});

export const UserAnswer = pgTable('userAnswer' , {
  id:serial('id').primaryKey(),
  mockIdRef: varchar('mockId').notNull(),
  question : varchar('question').notNull(),
  correctAnswer : text('correctAnswer'),
  userAns : text('userAns'),
  feedback : text('feedback'),
  rating : varchar('rating'),
  createdAt : varchar('createdAt'),
  email : varchar('email')
})  