# Deploying CanIPlay to GCP

## Domain: caniplay.dpdns.org

This guide covers deploying a static website to Google Cloud Platform.

---

## Option A: Firebase Hosting (Recommended - Free & Easy)

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase in Project

```bash
cd d:\!_Projects\GamePingChecker
firebase init hosting
```

When prompted:
- Select "Use an existing project" or "Create a new project"
- Public directory: `.` (current directory)
- Single-page app: `No`
- Overwrite index.html: `No`

### Step 4: Deploy

```bash
firebase deploy
```

You'll get a URL like `https://your-project.web.app`

### Step 5: Add Custom Domain

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → Hosting
3. Click "Add custom domain"
4. Enter: `caniplay.dpdns.org`
5. Firebase will give you DNS records to add

### Step 6: Configure DNS (dpdns.org)

Add these records in your dpdns.org dashboard:

| Type | Name | Value |
|------|------|-------|
| A | caniplay | 151.101.1.195 |
| A | caniplay | 151.101.65.195 |
| TXT | caniplay | (verification token from Firebase) |

Wait 15-30 minutes for DNS propagation.

---

## Option B: Google Cloud Storage + Load Balancer

### Step 1: Create GCP Project

```bash
# Install gcloud CLI if not installed
# https://cloud.google.com/sdk/docs/install

gcloud auth login
gcloud projects create caniplay-hosting --name="CanIPlay"
gcloud config set project caniplay-hosting
```

### Step 2: Enable Billing

Go to [GCP Console](https://console.cloud.google.com) → Billing → Link a billing account

### Step 3: Create Storage Bucket

```bash
# Bucket name must match domain for custom domain hosting
gsutil mb -l us-central1 gs://caniplay.dpdns.org

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://caniplay.dpdns.org

# Set as website
gsutil web set -m index.html -e index.html gs://caniplay.dpdns.org
```

### Step 4: Upload Files

```bash
cd d:\!_Projects\GamePingChecker
gsutil -m cp -r * gs://caniplay.dpdns.org/
```

### Step 5: Create Load Balancer (for HTTPS)

1. Go to GCP Console → Network Services → Load Balancing
2. Create HTTP(S) Load Balancer
3. Backend: Select your bucket
4. Frontend: Create HTTPS with managed SSL certificate
5. Add domain: `caniplay.dpdns.org`

### Step 6: Configure DNS

Add a CNAME record in dpdns.org:

| Type | Name | Value |
|------|------|-------|
| CNAME | caniplay | c.storage.googleapis.com |

Or use the Load Balancer IP:

| Type | Name | Value |
|------|------|-------|
| A | caniplay | (Load Balancer IP) |

---

## Option C: Cloud Run (Containerized)

### Step 1: Create Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

### Step 2: Build & Deploy

```bash
cd d:\!_Projects\GamePingChecker

# Build container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/caniplay

# Deploy to Cloud Run
gcloud run deploy caniplay \
  --image gcr.io/YOUR_PROJECT_ID/caniplay \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

### Step 3: Map Custom Domain

1. Go to Cloud Run → caniplay service
2. Click "Manage Custom Domains"
3. Add `caniplay.dpdns.org`
4. Follow DNS verification steps

---

## Quick Comparison

| Option | Cost | Setup Time | HTTPS |
|--------|------|------------|-------|
| Firebase Hosting | Free (generous limits) | 10 min | Auto |
| Cloud Storage + LB | ~$18+/month | 30 min | Manual |
| Cloud Run | Pay per request | 20 min | Auto |

---

## Recommended: Firebase Hosting

For a static website like CanIPlay, **Firebase Hosting** is the best choice:
- Free tier handles most traffic
- Automatic HTTPS
- Global CDN
- Easy custom domain setup
- One-command deploys

```bash
# Quick deploy commands
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Then add your custom domain in the Firebase Console.
