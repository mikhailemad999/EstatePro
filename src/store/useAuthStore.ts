import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type RoleType = "GUEST" | "BUYER" | "AGENT" | "AGENCY_ADMIN" | "SUPER_ADMIN";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  title: string;
  avatar: string;
  tier: string;
  activeMandate?: string;
  grossBook?: string;
}

const PRESET_USERS: Record<RoleType, UserSession> = {
  GUEST: {
    id: "guest-user",
    name: "Private Visitor",
    email: "visitor@private-reserve.io",
    role: "GUEST",
    title: "Prospective Sovereign Client",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    tier: "Tier 3 Explorer",
  },
  BUYER: {
    id: "buyer-1",
    name: "Lord Alistair Sterling",
    email: "a.sterling@sterling-holdings.co.uk",
    role: "BUYER",
    title: "Family Office Principal • Zurich & London",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    tier: "Ultra-HNW Sovereign Investor",
    activeMandate: "Portfolio Acquisition: Alpine & Mediterranean ($50M+)",
  },
  AGENT: {
    id: "agent-1",
    name: "Kenjiro Takahashi",
    email: "k.takahashi@estatepro-reserve.io",
    role: "AGENT",
    title: "Managing Partner, Asia-Pacific Private Client Group",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    tier: "Tier 1 Sovereign Node",
    activeMandate: "Tokyo Central & Lake Geneva Trophy Mandates",
    grossBook: "$148.5M",
  },
  AGENCY_ADMIN: {
    id: "agency-admin-1",
    name: "Victoria Vance-Rothschild",
    email: "v.vance@sothebys-reserve.ch",
    role: "AGENCY_ADMIN",
    title: "Global Managing Director • Sotheby's Private Reserve",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    tier: "Sovereign Brokerage Executive",
    activeMandate: "Global Sovereign Agency Network (84 Nodes)",
    grossBook: "$840M",
  },
  SUPER_ADMIN: {
    id: "admin-1",
    name: "Alexander von Berg",
    email: "admin@estatepro-overseer.io",
    role: "SUPER_ADMIN",
    title: "Executive Platform Overseer • Tier-0 Protocol",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    tier: "Root Overseer Clearance",
    activeMandate: "Full Platform Custody & Cryptographic Reconciliations",
    grossBook: "$1.42B GMV",
  },
};

export interface AuthState {
  user: UserSession;
  isAuthenticated: boolean;
}

export interface AuthActions {
  switchRole: (role: RoleType) => void;
  setUser: (user: UserSession) => void;
  logout: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector((set) => ({
    user: PRESET_USERS.AGENT, // Default to Agent to demonstrate the CRM dashboard immediately
    isAuthenticated: true,

    switchRole: (role: RoleType) => {
      set({
        user: PRESET_USERS[role],
        isAuthenticated: role !== "GUEST",
      });
    },

    setUser: (user: UserSession) => {
      set({ user, isAuthenticated: true });
    },

    logout: () => {
      set({
        user: PRESET_USERS.GUEST,
        isAuthenticated: false,
      });
    },
  }))
);
