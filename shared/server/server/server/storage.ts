import {
  users,
  systems,
  threats,
  scans,
  type User,
  type UpsertUser,
  type System,
  type InsertSystem,
  type Threat,
  type InsertThreat,
  type Scan,
  type InsertScan,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getSystems(userId: string): Promise<System[]>;
  createSystem(system: InsertSystem): Promise<System>;
  getThreats(systemId: number): Promise<Threat[]>;
  createThreat(threat: InsertThreat): Promise<Threat>;
  getScans(systemId: number): Promise<Scan[]>;
  createScan(scan: InsertScan): Promise<Scan>;
  getDashboardStats(userId: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getSystems(userId: string): Promise<System[]> {
    return await db.select().from(systems).where(eq(systems.userId, userId));
  }

  async createSystem(systemData: InsertSystem): Promise<System> {
    const [system] = await db.insert(systems).values(systemData).returning();
    return system;
  }

  async getThreats(systemId: number): Promise<Threat[]> {
    return await db.select().from(threats).where(eq(threats.systemId, systemId));
  }

  async createThreat(threatData: InsertThreat): Promise<Threat> {
    const [threat] = await db.insert(threats).values(threatData).returning();
    return threat;
  }

  async getScans(systemId: number): Promise<Scan[]> {
    return await db.select().from(scans).where(eq(scans.systemId, systemId));
  }

  async createScan(scanData: InsertScan): Promise<Scan> {
    const [scan] = await db.insert(scans).values(scanData).returning();
    return scan;
  }

  async getDashboardStats(userId: string): Promise<any> {
    const userSystems = await this.getSystems(userId);
    const systemIds = userSystems.map(s => s.id);
    
    return {
      systemsOnline: userSystems.filter(s => s.status === 'online').length,
      totalSystems: userSystems.length,
      threatsDetected: 0,
      scansCompleted: 0,
    };
  }
}

export const storage = new DatabaseStorage();
