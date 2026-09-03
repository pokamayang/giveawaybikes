import { useState, useEffect } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type {
  SiteSettings,
  Giveaway,
  Review,
  Winner,
  CommunityPost,
  FAQItem,
  PageContent,
} from "../types";

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "SURRONSTER GIVEAWAY COMMUNITY 2026",
  tagline: "Your Next Ride Could Be Electric.",
  contactEmail: "contact@surronstergiveaway.com",
  whatsappNumber: "+12174973213",
  whatsappMessage: "Hi! I want to enter the 2026 Surronster Giveaway.",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
  heroImage:
    "https://images.unsplash.com/photo-1558981852-426c6c22b8d8?w=1600&q=80",
};

const DEFAULT_GIVEAWAY: Giveaway = {
  id: "main",
  title: "2026 GIVEAWAY",
  prizeName: "Electric Off-Road Bike",
  prizeDescription:
    "High-performance electric off-road motorcycle with long-range battery, advanced suspension, and trail-ready components. Exact model and specifications will be confirmed by the operator.",
  prizeImage:
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
  prizeSpecs: [
    "High-performance electric motor",
    "Lithium-ion battery pack",
    "Long-range riding capability",
    "Hydraulic disc brakes",
    "Front & rear suspension",
    "Off-road tires",
    "Digital display",
  ],
  closingDate: "2026-12-31T23:59:59",
  announcementDate: "2027-01-15",
  eligibility: "Open to residents 18+ in eligible countries. See official rules for full eligibility, geographic restrictions, and no-purchase-necessary details.",
  howToEnter: [
    "Register / join the community",
    "Complete the eligible entry method described in the rules",
    "Winner is selected according to the official rules",
    "Winner is contacted and verified",
  ],
  maxEntries: 1,
  selectionMethod: "Random drawing from all eligible entries conducted under the official rules.",
  isActive: true,
  sponsorName: "Surronster Giveaway Community",
  sponsorNote:
    "This promotion is operated independently. It is not sponsored, endorsed, or administered by Sur-Ron / Surron or any official manufacturer unless explicitly stated and authorized.",
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "site"), (snap) => {
      if (snap.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...snap.data() } as SiteSettings);
      }
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const saveSettings = async (data: Partial<SiteSettings>) => {
    await setDoc(doc(db, "settings", "site"), data, { merge: true });
  };

  return { settings, loading, saveSettings };
}

export function useGiveaway() {
  const [giveaway, setGiveaway] = useState<Giveaway>(DEFAULT_GIVEAWAY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "giveaway", "main"), (snap) => {
      if (snap.exists()) {
        setGiveaway({ ...DEFAULT_GIVEAWAY, id: "main", ...snap.data() } as Giveaway);
      }
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const saveGiveaway = async (data: Partial<Giveaway>) => {
    await setDoc(doc(db, "giveaway", "main"), { ...data, updatedAt: serverTimestamp() }, { merge: true });
  };

  return { giveaway, loading, saveGiveaway };
}

export function useReviews(approvedOnly = true) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Order only — filter approved client-side to avoid composite index requirement
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        let list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
        if (approvedOnly) list = list.filter((r) => r.isApproved);
        setReviews(list);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, [approvedOnly]);

  const addReview = async (data: Omit<Review, "id" | "createdAt">) => {
    await addDoc(collection(db, "reviews"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  const updateReview = async (id: string, data: Partial<Review>) => {
    await updateDoc(doc(db, "reviews", id), data);
  };

  const deleteReview = async (id: string) => {
    await deleteDoc(doc(db, "reviews", id));
  };

  return { reviews, loading, addReview, updateReview, deleteReview };
}

export function useWinners() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "winners"), orderBy("announcementDate", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setWinners(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Winner)));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const addWinner = async (data: Omit<Winner, "id">) => {
    await addDoc(collection(db, "winners"), data);
  };

  const updateWinner = async (id: string, data: Partial<Winner>) => {
    await updateDoc(doc(db, "winners", id), data);
  };

  const deleteWinner = async (id: string) => {
    await deleteDoc(doc(db, "winners", id));
  };

  return { winners, loading, addWinner, updateWinner, deleteWinner };
}

export function useCommunityPosts() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "community"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as CommunityPost)));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const addPost = async (data: Omit<CommunityPost, "id" | "createdAt">) => {
    await addDoc(collection(db, "community"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  const updatePost = async (id: string, data: Partial<CommunityPost>) => {
    await updateDoc(doc(db, "community", id), data);
  };

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "community", id));
  };

  return { posts, loading, addPost, updatePost, deletePost };
}

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "faqs"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setFaqs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQItem)));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const addFAQ = async (data: Omit<FAQItem, "id">) => {
    await addDoc(collection(db, "faqs"), data);
  };

  const updateFAQ = async (id: string, data: Partial<FAQItem>) => {
    await updateDoc(doc(db, "faqs", id), data);
  };

  const deleteFAQ = async (id: string) => {
    await deleteDoc(doc(db, "faqs", id));
  };

  return { faqs, loading, addFAQ, updateFAQ, deleteFAQ };
}

export function usePageContent() {
  const [content, setContent] = useState<PageContent>({
    about: "",
    privacy: "",
    terms: "",
    rules: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "pages"), (snap) => {
      if (snap.exists()) setContent(snap.data() as PageContent);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const savePageContent = async (data: Partial<PageContent>) => {
    await setDoc(doc(db, "settings", "pages"), data, { merge: true });
  };

  return { content, loading, savePageContent };
}
