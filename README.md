# Framez

Framez is a simple, Instagram-inspired social app built with Expo (React Native) and Supabase. It supports authentication, a public feed, creating posts with optional images, user profiles with avatars, and secure storage via Supabase buckets.

## Features

- Authentication: sign up, login, logout with persistent sessions
- Public feed: view all posts with author name, timestamp, text, and image
- Create posts: write text and attach an image from the gallery
- Profile: see your name, email, avatar, and your posts
- Change avatar: upload and update your profile picture
- Dark mode: toggle light/dark theme via the header button
- Realtime-ready: Supabase Realtime enabled on `posts` table
- RLS-secure: Row Level Security for tables and storage objects

## Tech Stack

- Expo + React Native
- Supabase (Auth, Postgres, Storage, Realtime)
- Day.js for date formatting

## Getting Started

1. Clone and install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:

   - Copy `.env.example` to `.env` and set your project values.
   - Required:
     - `EXPO_PUBLIC_SUPABASE_URL`
     - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - Optional (with defaults in code):
     - `EXPO_PUBLIC_POSTS_BUCKET` (default `posts`)
     - `EXPO_PUBLIC_AVATARS_BUCKET` (default `avatars`)

3. Set up Supabase schema:

   - In the Supabase Dashboard, open SQL editor and run:
     - `supabase/schema.sql` (full schema + bucket)
     - `supabase/rls.sql` (RLS policies for tables and storage)
     - `supabase/derived_from_app.sql` (derived tables/views from app logic)
     - `supabase/avatars.sql` (avatars table with default avatars)
     - Alternatively, you can run `supabase/posts_minimal.sql` then `supabase/rls.sql`.

4. Start the app:

   ```bash
   npx expo start 
   ```

   - Web: open `http://localhost:8081/`
   - Expo Go (mobile): scan the QR from the terminal (use the IP shown).

5. Optional: Dark mode
   - Use the header icon (moon/sun) to toggle the theme.

## Usage

- Sign up with email, password, and optional name (used as author name).
- Login; the feed shows public posts.
- Create a post from the Create tab; optionally attach an image.
- Go to Profile to see your info and posts.
- Tap Change Avatar to upload a new profile picture.

## Supabase Schema

- `public.posts` table:
  - `id bigint` (identity) primary key
  - `user_id uuid` references `auth.users(id)`
  - `author_name text`
  - `content_text text`
  - `image_url text`
  - `created_at timestamptz` default `now()`
  - Index `posts_created_at_idx` on `created_at desc`
  - Realtime publication enabled

- Storage buckets:
  - `posts` (public) for post images
  - `avatars` (public) for profile pictures

- RLS policies:
  - `public.posts`: public select; authenticated insert; owner update/delete
  - `storage.objects` for `posts` and `avatars` buckets:
    - Public select limited to the bucket
    - Authenticated insert limited to paths prefixed by the uploader’s UID (`<uid>/...`)
    - Owner update/delete limited to their own objects under their UID prefix

## Deployment

- Expo Go: use the QR code from `npx expo start` to test on devices.
- Appetize.io: build a web preview or use Expo-generated bundles to upload and share a live demo.


## Backend Choice

- Backend: Supabase (Auth, Postgres, Storage, Realtime)
- Rationale: rapid setup, first-class auth and storage with simple client SDK.

