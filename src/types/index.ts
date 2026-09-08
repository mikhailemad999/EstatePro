export type Currency = "USD" | "EUR" | "CHF" | "GBP" | "JPY";

export interface PropertyCardData {
  id: string;
  title: string;
  slug: string;
  refNumber: string;
  propertyType: string;
  listingType: "FOR_SALE" | "FOR_RENT" | "DAILY_RENTAL" | "COMMERCIAL_SALE" | "COMMERCIAL_RENT";
  status: "DRAFT" | "PENDING_REVIEW" | "APPROVED" | "PUBLISHED" | "REJECTED" | "SOLD" | "RENTED";
  price: number;
  currency: string;
  pricePerSqm?: number | null;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  country: string;
  city: string;
  district?: string | null;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  heroImage?: string | null;
  featured: boolean;
  verified: boolean;
  viewsCount: number;
  favoritesCount: number;
  agent?: {
    id: string;
    title: string;
    rating: number;
    user: {
      name: string;
      avatar?: string | null;
    };
  } | null;
  livingRooms?: number | null;
  landAreaSqm?: number | null;
  buildingYear?: number | null;
  parkingSpaces?: number | null;
  kitchenCount?: number | null;
  floor?: number | null;
  totalFloors?: number | null;
  serviceCharge?: number | null;
  negotiable?: boolean;
  videoUrl?: string | null;
  virtualTourUrl?: string | null;
  amenities?: { name: string; category: string }[];
}

export interface AgentData {
  id: string;
  userId: string;
  title: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  grossMandateBook: number;
  activeMandates: number;
  officeLocation?: string | null;
  specializations?: string | null;
  tierBadge: string;
  user: {
    name: string;
    email: string;
    phone?: string | null;
    avatar?: string | null;
  };
  agency?: {
    name: string;
    slug: string;
    logo?: string | null;
  } | null;
}

export interface LeadData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  stage: "NEW" | "CONTACTED" | "QUALIFIED" | "VIEWING_SCHEDULED" | "VIEWING_COMPLETED" | "NEGOTIATION" | "OFFER_SUBMITTED" | "WON" | "LOST";
  score: number;
  source: string;
  budget: number;
  netWorth?: string | null;
  notes?: string | null;
  createdAt: string;
  property?: {
    title: string;
    slug: string;
    price: number;
  } | null;
}

export interface AppointmentData {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  type: string;
  transferType: string;
  date: string;
  timeSlot: string;
  status: "REQUESTED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  notes?: string | null;
  property?: {
    title: string;
    address: string;
    price: number;
  } | null;
}

export interface DevelopmentData {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  location: string;
  heroImage?: string | null;
  brochureUrl?: string | null;
  startingPrice: number;
  completionDate?: string | null;
  totalUnits: number;
  availableUnits: number;
  developer: {
    companyName: string;
    logo?: string | null;
  };
  buildings?: {
    id: string;
    name: string;
    floors: number;
    unitsCount: number;
  }[];
  paymentPlans?: {
    name: string;
    downPaymentPercent: number;
    constructionPercent: number;
    handoverPercent: number;
    tenureMonths: number;
  }[];
}

export interface MonographData {
  id: string;
  title: string;
  slug: string;
  category: string;
  volume: string;
  subtitle?: string | null;
  summary: string;
  content: string;
  coverImage?: string | null;
  publishedAt: string;
}
