import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Vehicle,
  Booking,
  LocationHub,
  UserProfile,
  SearchCriteria,
  VehicleCategory,
  TransmissionType,
  FuelType,
  VehicleStatus,
  UserRole,
} from '../types';
import {
  REGION_8_HUBS,
  INITIAL_VEHICLES,
  INITIAL_USER,
  INITIAL_HOST,
  INITIAL_BOOKINGS,
} from '../data/mockData';

interface AppContextType {
  vehicles: Vehicle[];
  hubs: LocationHub[];
  bookings: Booking[];
  currentUser: UserProfile;
  currentRole: UserRole;
  searchCriteria: SearchCriteria;
  selectedVehicle: Vehicle | null;
  activeTab: 'catalog' | 'fleet-tracking' | 'my-bookings' | 'host-portal';
  isBookingModalOpen: boolean;
  vehicleForBooking: Vehicle | null;
  isInspectionModalOpen: boolean;
  bookingForInspection: Booking | null;
  isAddVehicleModalOpen: boolean;
  isAuthModalOpen: boolean;

  // Actions
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setActiveTab: (tab: 'catalog' | 'fleet-tracking' | 'my-bookings' | 'host-portal') => void;
  openBookingModal: (vehicle: Vehicle) => void;
  closeBookingModal: () => void;
  openInspectionModal: (booking: Booking) => void;
  closeInspectionModal: () => void;
  setIsAddVehicleModalOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Vehicle inventory actions
  addVehicle: (newVehicle: Omit<Vehicle, 'id' | 'rating' | 'reviewCount'>) => void;
  updateVehicleStatus: (vehicleId: string, status: VehicleStatus) => void;
  updateVehicleRate: (vehicleId: string, dailyRate: number) => void;
  toggleInstantBooking: (vehicleId: string) => void;
  deleteVehicle: (vehicleId: string) => void;

  // Booking actions
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'qrCodeToken' | 'status' | 'inspectionCompleted'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  completeInspection: (bookingId: string) => void;

  // Utility helpers
  getHubById: (id: string) => LocationHub | undefined;
  checkAvailability: (vehicleId: string, startDate: string, endDate: string) => boolean;
}

const STORAGE_KEY = 'waraywheels_fleet_state_v1';

const defaultSearchCriteria: SearchCriteria = {
  pickupHubId: 'hub-tac-airport',
  returnHubId: 'hub-tac-airport',
  startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  startTime: '09:00',
  endDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
  endTime: '17:00',
  category: 'All',
  transmission: 'All',
  fuelType: 'All',
  withDriver: false,
  instantOnly: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage fallback
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_vehicles`);
      return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
    } catch {
      return INITIAL_VEHICLES;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_bookings`);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [currentRole, setCurrentRole] = useState<UserRole>('renter');
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(defaultSearchCriteria);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeTab, setActiveTab] = useState<'catalog' | 'fleet-tracking' | 'my-bookings' | 'host-portal'>('catalog');

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [vehicleForBooking, setVehicleForBooking] = useState<Vehicle | null>(null);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [bookingForInspection, setBookingForInspection] = useState<Booking | null>(null);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_vehicles`, JSON.stringify(vehicles));
    } catch (e) {
      console.warn('Could not save vehicles to localStorage', e);
    }
  }, [vehicles]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_bookings`, JSON.stringify(bookings));
    } catch (e) {
      console.warn('Could not save bookings to localStorage', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Could not save user to localStorage', e);
    }
  }, [currentUser]);

  // Real-time telematics simulator: subtle changes to active vehicle telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          if (v.status === 'rented') {
            // Simulated movement along Eastern Visayas highway
            const latDelta = (Math.random() - 0.49) * 0.0008;
            const lngDelta = (Math.random() - 0.49) * 0.0008;
            const newSpeed = Math.floor(35 + Math.random() * 40);
            return {
              ...v,
              coordinates: {
                lat: Number((v.coordinates.lat + latDelta).toFixed(5)),
                lng: Number((v.coordinates.lng + lngDelta).toFixed(5)),
              },
              telematics: {
                ...v.telematics,
                speedKmh: newSpeed,
                engineStatus: 'running',
                lastPingTime: 'Just now',
              },
            };
          }
          return v;
        })
      );
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const getHubById = (id: string) => REGION_8_HUBS.find((h) => h.id === id);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'host') {
      setCurrentUser(INITIAL_HOST);
    } else {
      setCurrentUser(INITIAL_USER);
    }
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...profile }));
  };

  const openBookingModal = (vehicle: Vehicle) => {
    setVehicleForBooking(vehicle);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setVehicleForBooking(null);
  };

  const openInspectionModal = (booking: Booking) => {
    setBookingForInspection(booking);
    setIsInspectionModalOpen(true);
  };

  const closeInspectionModal = () => {
    setIsInspectionModalOpen(false);
    setBookingForInspection(null);
  };

  const checkAvailability = (vehicleId: string, startDate: string, endDate: string): boolean => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle || vehicle.status === 'maintenance') return false;

    // Check against confirmed / active bookings for that vehicle
    const vehicleBookings = bookings.filter(
      (b) => b.vehicleId === vehicleId && (b.status === 'confirmed' || b.status === 'active')
    );

    const reqStart = new Date(startDate).getTime();
    const reqEnd = new Date(endDate).getTime();

    for (const b of vehicleBookings) {
      const bStart = new Date(b.startDate).getTime();
      const bEnd = new Date(b.endDate).getTime();
      // Overlap condition
      if (reqStart <= bEnd && reqEnd >= bStart) {
        return false;
      }
    }

    return true;
  };

  const addVehicle = (newVehicleData: Omit<Vehicle, 'id' | 'rating' | 'reviewCount'>) => {
    const hub = getHubById(newVehicleData.currentLocationHubId);
    const newVehicle: Vehicle = {
      ...newVehicleData,
      id: `v-custom-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      coordinates: hub ? hub.coordinates : { lat: 11.244, lng: 125.003 },
      currentLocationName: hub ? `${hub.name}, ${hub.city}` : 'Tacloban City Fleet Bay',
      telematics: {
        speedKmh: 0,
        engineStatus: 'off',
        lastPingTime: 'Just configured',
        isInsideRegion8: true,
        deviceImei: `IMEI-863920-${Math.floor(1000 + Math.random() * 9000)}`,
      },
    };
    setVehicles((prev) => [newVehicle, ...prev]);
  };

  const updateVehicleStatus = (vehicleId: string, status: VehicleStatus) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status } : v))
    );
  };

  const updateVehicleRate = (vehicleId: string, dailyRate: number) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, dailyRate } : v))
    );
  };

  const toggleInstantBooking = (vehicleId: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, instantBooking: !v.instantBooking } : v))
    );
  };

  const deleteVehicle = (vehicleId: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
  };

  const createBooking = (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'qrCodeToken' | 'status' | 'inspectionCompleted'>
  ): Booking => {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const cityCode = bookingData.pickupLocation.toLowerCase().includes('ormoc') ? 'ORM' : 'TAC';
    const newId = `WW-${cityCode}-2026-${randomHex}`;

    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      qrCodeToken: `WW-PASS-${newId}-SECURED`,
      inspectionCompleted: false,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Mark vehicle as reserved or update telemetry
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === bookingData.vehicleId) {
          return {
            ...v,
            status: 'reserved',
          };
        }
        return v;
      })
    );

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, status: 'cancelled' };
        }
        return b;
      })
    );

    // Free up vehicle if it was tied to this booking
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      setVehicles((prev) =>
        prev.map((v) => {
          if (v.id === booking.vehicleId && v.status === 'reserved') {
            return { ...v, status: 'available' };
          }
          return v;
        })
      );
    }
  };

  const completeInspection = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, inspectionCompleted: true, status: 'active' };
        }
        return b;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        hubs: REGION_8_HUBS,
        bookings,
        currentUser,
        currentRole,
        searchCriteria,
        selectedVehicle,
        activeTab,
        isBookingModalOpen,
        vehicleForBooking,
        isInspectionModalOpen,
        bookingForInspection,
        isAddVehicleModalOpen,
        isAuthModalOpen,
        setSearchCriteria,
        setSelectedVehicle,
        setActiveTab,
        openBookingModal,
        closeBookingModal,
        openInspectionModal,
        closeInspectionModal,
        setIsAddVehicleModalOpen,
        setIsAuthModalOpen,
        switchRole,
        updateUserProfile,
        addVehicle,
        updateVehicleStatus,
        updateVehicleRate,
        toggleInstantBooking,
        deleteVehicle,
        createBooking,
        cancelBooking,
        completeInspection,
        getHubById,
        checkAvailability,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
