# Surronster Giveaway Community 2026

Professional electric-bike giveaway & community website built with **Vite + React + TypeScript + Firebase + Tailwind CSS**.

## Features

- Responsive homepage (Hero, Giveaway, Prize/Bike, How It Works, Community, Winners, Reviews, FAQ)
- **Enter Giveaway** opens WhatsApp (or email fallback) using admin-configured number/message
- Full **Admin Panel** (`/admin`) with control over:
  - Site settings (email, WhatsApp, social links, hero image)
  - Giveaway content (prize, dates, eligibility, specs, disclaimer)
  - Reviews (approve/unapprove, set avatar via image URL, delete)
  - Winners (add/edit/delete, photos & testimonials)
  - Community posts (stories, builds, events, announcements)
  - FAQs and legal pages (About, Rules, Terms, Privacy)
  - Admin account email & password
- Professional palette: Trust Blue `#1E3A8A`, Clean Slate `#F8FAFC`, Charcoal `#0F172A`, Action Orange `#F97316`

## Setup

### 1. Install dependencies

```bash
cd surronster-giveaway
npm install
```

### 2. Firebase setup (required)

1. Open [Firebase Console](https://console.firebase.google.com/) → project `bikegiveaway`.
2. **Authentication** → enable **Email/Password**.
3. Create an admin user (Authentication → Users → Add user).
4. **Firestore Database** → create database (start in test mode for development, then lock down).
5. Add an admin document so the panel recognizes you:

   Collection: `admins`  
   Document ID: **your user's UID** (from Authentication)  
   Fields:
   ```
   role: "admin"
   ```

6. Recommended collections (created automatically when you save from admin):
   - `settings/site` – site settings
   - `settings/pages` – about/rules/terms/privacy text
   - `giveaway/main` – prize & giveaway config
   - `reviews` – community reviews
   - `winners` – winners list
   - `community` – posts
   - `faqs` – FAQ items
   - `admins/{uid}` – admin role flag

### 3. Firestore security rules (example)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    match /giveaway/{doc} {
      allow read: if true;
      allow write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    match /reviews/{doc} {
      allow read: if true;
      allow create: if true;  // optional: public submit
      allow update, delete: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    match /winners/{doc} {
      allow read: if true;
      allow write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    match /community/{doc} {
      allow read: if true;
      allow write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    match /faqs/{doc} {
      allow read: if true;
      allow write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    match /admins/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }
  }
}
```

### 4. Run locally

```bash
npm run dev
```

- Site: http://localhost:5173  
- Admin login: http://localhost:5173/admin/login  

### 5. Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Firebase Hosting, Vercel, Netlify, etc.

## Important legal notes

- Do **not** claim official Sur-Ron / Surron sponsorship unless you have authorization.
- Giveaway rules vary by country; have final rules reviewed for jurisdictions where you operate.
- Clearly state operator identity, eligibility, age, geography, and no-purchase-necessary language where required.

## Tech stack

- Vite 8 + React 19 + TypeScript
- Firebase (Auth, Firestore, Analytics)
- Tailwind CSS 4
- React Router 7
- Lucide React icons
# giveawaybikes
