import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const vehicleTypeEnum = pgEnum('vehicle_type', ['sedan', 'suv', 'van', 'pickup', 'mpv']);
export const transmissionEnum = pgEnum('transmission', ['manual', 'automatic']);
export const vehicleStatusEnum = pgEnum('vehicle_status', ['available', 'unavailable']);
export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'cancelled']);

// 1. Provinces table
export const provinces = pgTable('provinces', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
});

// 2. Cities table (Region 8 cities only)
export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  provinceId: integer('province_id').notNull().references(() => provinces.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull(),
});

// 3. Vehicles table
export const vehicles = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  type: vehicleTypeEnum('type').notNull(),
  seats: integer('seats').notNull(),
  transmission: transmissionEnum('transmission').notNull(),
  dailyRatePhp: integer('daily_rate_php').notNull(),
  imageUrl: text('image_url').notNull(),
  withDriverAvailable: boolean('with_driver_available').default(true).notNull(),
  status: vehicleStatusEnum('status').default('available').notNull(),
});

// 4. Bookings table
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: text('user_id'), // WorkOS user ID or null
  vehicleId: integer('vehicle_id').references(() => vehicles.id, { onDelete: 'set null' }),
  pickupCityId: integer('pickup_city_id').notNull().references(() => cities.id),
  dropoffCityId: integer('dropoff_city_id').notNull().references(() => cities.id),
  pickupAt: timestamp('pickup_at').notNull(),
  dropoffAt: timestamp('dropoff_at').notNull(),
  vehicleType: text('vehicle_type'),
  minSeats: integer('min_seats'),
  transmission: text('transmission'),
  needDriver: boolean('need_driver').default(false).notNull(),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone').notNull(),
  notes: text('notes'),
  status: bookingStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 5. Inquiries table
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const provincesRelations = relations(provinces, ({ many }) => ({
  cities: many(cities),
}));

export const citiesRelations = relations(cities, ({ one, many }) => ({
  province: one(provinces, {
    fields: [cities.provinceId],
    references: [provinces.id],
  }),
  pickupBookings: many(bookings, { relationName: 'pickupCity' }),
  dropoffBookings: many(bookings, { relationName: 'dropoffCity' }),
}));

export const vehiclesRelations = relations(vehicles, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [bookings.vehicleId],
    references: [vehicles.id],
  }),
  pickupCity: one(cities, {
    fields: [bookings.pickupCityId],
    references: [cities.id],
    relationName: 'pickupCity',
  }),
  dropoffCity: one(cities, {
    fields: [bookings.dropoffCityId],
    references: [cities.id],
    relationName: 'dropoffCity',
  }),
}));

export type Province = typeof provinces.$inferSelect;
export type City = typeof cities.$inferSelect;
export type Vehicle = typeof vehicles.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
