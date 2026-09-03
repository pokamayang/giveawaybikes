# Firebase Admin Setup (one-time)

1. Firebase Console → Authentication → Sign-in method → enable **Email/Password**.
2. Authentication → Users → **Add user** (this will be your admin login).
3. Copy the new user's **UID**.
4. Firestore → Start collection `admins` → Document ID = that UID → field:
   - `role` (string) = `admin`
5. (Optional) Seed defaults from the admin UI after first login:
   - Site Settings → set WhatsApp number, email, social links
   - Giveaway → prize image URL, dates, specs
6. Apply security rules from README.md

Admin URL: `/admin/login`
