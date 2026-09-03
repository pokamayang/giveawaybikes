# Admin Setup Guide

## 1. Create Firebase Auth User

In Firebase Console → Authentication → Users → Add User:
- Email: your-admin@email.com
- Password: yourStrongPassword123

Copy the **UID** shown (e.g. `abc123xyz`)

## 2. Create Firestore Admin Document

In Firebase Console → Firestore → Start collection `admins` → Document ID = **your UID**:

```json
{
  "role": "admin"
}
```

That's it. Now login at `/admin/login` with the email & password you created.

## 3. Set Firestore Security Rules (recommended)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Only authenticated admins can write
    function isAdmin() {
      return request.auth != null &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'admin';
    }

    // Public reads for site content
    match /settings/{doc} { allow read: if true; allow write: if isAdmin(); }
    match /giveaway/{doc}  { allow read: if true; allow write: if isAdmin(); }
    match /faqs/{doc}      { allow read: if true; allow write: if isAdmin(); }
    match /community/{doc} { allow read: if true; allow write: if isAdmin(); }
    match /winners/{doc}   { allow read: if true; allow write: if isAdmin(); }

    // Reviews: anyone can submit (pending approval), only admin can approve/delete
    match /reviews/{doc} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if isAdmin();
    }

    // Admin list: only admins can read/write
    match /admins/{uid} { allow read, write: if isAdmin(); }
  }
}
```

## 4. How the ENTER GIVEAWAY button works

The navbar and all CTA buttons redirect users to WhatsApp (if a number is set) or email.
Configure these in Admin Panel → Site Settings:
- **WhatsApp Number**: `+1234567890` (include country code)
- **Contact Email**: `you@example.com`
- **Default Message**: what gets pre-filled in WhatsApp

## 5. Setting Review Avatars

In Admin Panel → Reviews, paste any image URL (from Google Images, Pinterest, etc.)
into the avatar URL field next to the review, then click **Set Avatar**.
