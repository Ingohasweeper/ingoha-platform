import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Systems being monitored
export const systems = pgTable("systems", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  ipAddress: varchar("ip_address").notNull(),
  operatingSystem: varchar("operating_system"),
  status: varchar("status").notNull().default("offline"),
  lastSeen: timestamp("last_seen"),
  userId: varchar("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Threat detections
export const threats = pgTable("threats", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(),
  severity: varchar("severity").notNull(),
  filePath: text("file_path"),
  fileHash: varchar("file_hash"),
  systemId: integer("system_id").notNull().references(() => systems.id),
  status: varchar("status").notNull().default("detected"),
  virusTotalResult: jsonb("virus_total_result"),
  detectedAt: timestamp("detected_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// Additional tables and relations...
export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id").notNull().references(() => systems.id),
  type: varchar("type").notNull(),
  status: varchar("status").notNull().default("pending"),
  progress: decimal("progress").default("0"),
  filesScanned: integer("files_scanned").default(0),
  threatsFound: integer("threats_found").default(0),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertSystemSchema = createInsertSchema(systems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type System = typeof systems.$inferSelect;
export type InsertSystem = z.infer<typeof insertSystemSchema>;
