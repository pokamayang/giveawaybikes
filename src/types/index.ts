export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  whatsappNumber: string;
  whatsappMessage: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  heroImage: string;
  heroVideo?: string;
}

export interface Giveaway {
  id: string;
  title: string;
  prizeName: string;
  prizeDescription: string;
  prizeImage: string;
  prizeSpecs: string[];
  closingDate: string;
  announcementDate: string;
  eligibility: string;
  howToEnter: string[];
  maxEntries: number;
  selectionMethod: string;
  termsUrl?: string;
  isActive: boolean;
  sponsorName: string;
  sponsorNote: string;
  updatedAt?: any;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: any;
  isApproved: boolean;
  userId?: string;
}

export interface Winner {
  id: string;
  displayName: string;
  prizeWon: string;
  announcementDate: string;
  photoUrl: string;
  testimonial: string;
  isPublished: boolean;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  type: "story" | "build" | "event" | "announcement";
  author: string;
  createdAt: any;
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface AdminProfile {
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface PageContent {
  about: string;
  privacy: string;
  terms: string;
  rules: string;
}
