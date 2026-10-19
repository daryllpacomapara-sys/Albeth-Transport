export type VehicleCategory = 'Sedan' | 'Compact' | 'SUV' | 'Pickup 4x4' | 'Van' | 'MPV';

export type TransmissionType = 'Automatic' | 'Manual';

export type FuelType = 'Diesel' | 'Gasoline' | 'Hybrid' | 'Electric';

export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'reserved';

export interface LocationHub {
  id: string;
  name: string;
  province: 'Leyte' | 'Southern Leyte' | 'Samar' | 'Eastern Samar' | 'Northern Samar' | 'Biliran';
  city: string;
  address: string;
  type: 'airport' | 'port' | 'downtown' | 'transit_hub';
  coordinates: {
    lat: number;
    lng: number;
  };
  deliveryFee: number; // in PHP
  isInstantPickup: boolean;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  category: VehicleCategory;
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
  dailyRate: number; // in PHP
  securityDeposit: number; // in PHP
  plateNumber: string;
  orCrVerified: boolean;
  insuranceType: 'Comprehensive + CTPL' | 'Full Fleet Comprehensive';
  instantBooking: boolean;
  status: VehicleStatus;
  primaryImage: string;
  images: string[];
  features: string[];
  odometerKm: number;
  fuelCapacityLiters: number;
  currentFuelLevelPercent: number;
  batteryHealthPercent: number;
  currentLocationHubId: string;
  currentLocationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  telematics: {
    speedKmh: number;
    engineStatus: 'running' | 'idle' | 'off';
    lastPingTime: string;
    isInsideRegion8: boolean;
    deviceImei: string;
  };
  host: {
    name: string;
    avatar: string;
    rating: number;
    totalTrips: number;
    responseRate: string;
    isSuperHost: boolean;
    phone: string;
  };
  rating: number;
  reviewCount: number;
  withDriverAvailable: boolean;
  withDriverDailyFee: number; // in PHP, e.g. 800
}

export interface Booking {
  id: string;
  vehicleId: string;
  vehicle: Vehicle;
  userId: string;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  renterLicenseNo: string;
  pickupHubId: string;
  pickupLocation: string;
  returnHubId: string;
  returnLocation: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:mm
  durationDays: number;
  withDriver: boolean;
  protectionPlan: 'basic' | 'comprehensive' | 'zero_excess';
  protectionFee: number;
  addons: {
    childSeat?: boolean;
    unlimitedMileage?: boolean;
    rfidTollTag?: boolean;
    actionCam?: boolean;
  };
  addonsTotal: number;
  dailyTotal: number;
  subtotal: number;
  deliveryFeeTotal: number;
  discount: number;
  promoCode?: string;
  vatTax: number;
  totalAmount: number;
  securityDeposit: number;
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentMethod: 'gcash' | 'maya' | 'credit_card' | 'bank_transfer' | 'cash_on_pickup';
  paymentStatus: 'paid' | 'deposit_authorized' | 'pending';
  createdAt: string;
  qrCodeToken: string;
  inspectionCompleted: boolean;
}

export interface InspectionReport {
  bookingId: string;
  vehicleId: string;
  type: 'pre_trip' | 'post_trip';
  date: string;
  agentName: string;
  renterSignatureName: string;
  fuelLevelPercent: number;
  odometerReading: number;
  exteriorCondition: {
    frontBumper: boolean;
    rearBumper: boolean;
    windshield: boolean;
    leftSide: boolean;
    rightSide: boolean;
    tiresAndRims: boolean;
    spareTirePresent: boolean;
  };
  interiorCondition: {
    cleanUpholstery: boolean;
    airConditioningWorking: boolean;
    infotainmentDashWorking: boolean;
    toolsAndJackPresent: boolean;
  };
  notes: string;
  photos: string[];
}

export type UserRole = 'renter' | 'host' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  driversLicenseNo: string;
  licenseExpiry: string;
  licenseVerified: boolean;
  governmentIdVerified: boolean;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  rating: number;
  totalRentals: number;
  joinedDate: string;
}

export interface SearchCriteria {
  pickupHubId: string;
  returnHubId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  category: VehicleCategory | 'All';
  transmission: TransmissionType | 'All';
  fuelType: FuelType | 'All';
  withDriver: boolean;
  minPrice?: number;
  maxPrice?: number;
  instantOnly: boolean;
}
