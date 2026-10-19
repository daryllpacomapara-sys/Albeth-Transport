import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { provinces, cities, vehicles } from '../src/db/schema.ts';
import { SEED_PROVINCES, SEED_CITIES, SEED_VEHICLES } from '../src/data/seedData.ts';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.log('⚠️  DATABASE_URL is not set in environment. Seed dataset is prepared in src/data/seedData.ts and used by the application directly.');
    return;
  }

  console.log('🌱 Connecting to PostgreSQL database for ALBETH TRANSPORT...');
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  const db = drizzle(pool);

  try {
    console.log('1. Seeding 6 Region 8 Provinces (Leyte, Southern Leyte, Biliran, Samar, Eastern Samar, Northern Samar)...');
    for (const prov of SEED_PROVINCES) {
      await db
        .insert(provinces)
        .values({
          id: prov.id,
          name: prov.name,
          slug: prov.slug,
        })
        .onConflictDoNothing();
    }

    console.log('2. Seeding 11 Region 8 Cities & Municipalities...');
    for (const city of SEED_CITIES) {
      await db
        .insert(cities)
        .values({
          id: city.id,
          name: city.name,
          slug: city.slug,
          provinceId: city.provinceId,
          imageUrl: city.imageUrl,
        })
        .onConflictDoNothing();
    }

    console.log('3. Seeding 12 Fleet Vehicles (Sedans, SUVs, Vans, Pickups, MPVs)...');
    for (const v of SEED_VEHICLES) {
      await db
        .insert(vehicles)
        .values({
          id: v.id,
          name: v.name,
          slug: v.slug,
          type: v.type,
          seats: v.seats,
          transmission: v.transmission,
          dailyRatePhp: v.dailyRatePhp,
          imageUrl: v.imageUrl,
          withDriverAvailable: v.withDriverAvailable,
          status: v.status,
        })
        .onConflictDoNothing();
    }

    console.log('✅ Successfully seeded ALBETH TRANSPORT Region 8 Database!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await pool.end();
  }
}

seed();
