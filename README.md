# ChassisWhy Reasoning Engine

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini Live API](https://img.shields.io/badge/Google%20Gemini%20Live%20API-8E75B2?style=flat&logo=google&logoColor=white)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api)

An interactive voice-powered reasoning engine built on the **Google Gemini Live SDK**. Ask any question and get a structured cause → mechanism → effect explanation — spoken aloud and displayed as a Why Card.

## How it works

You speak a question. ChassisWhy responds with:

1. **Cause** — the root condition behind the phenomenon
2. **Mechanism** — the process connecting cause to outcome
3. **Effect** — the resulting consequence

The spoken explanation plays as audio. A Why Card appears on screen with the structured breakdown.

## Features

- **Voice interaction** — speak naturally, get spoken responses via Gemini Live
- **Why Cards** — structured JSON cause/mechanism/effect cards rendered in real time
- **Scenario missions** — pre-built contexts (warehouse dispatcher, race engineer, etc.) to frame your questions
- **Real-time audio streaming** — low-latency full-duplex WebSocket audio

## Tech Stack

- **Frontend**: Vanilla JavaScript, Vite, Web Audio API, WebSocket
- **Backend**: Python, FastAPI, `google-genai` SDK
- **AI**: Google Gemini Live API via Vertex AI

## Prerequisites

- Node.js (v18+)
- Python (v3.11)
- Google Cloud Project with Vertex AI enabled and billing enabled
- Google Cloud Application Default Credentials configured

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/frasfras/chassiswhy-reasoning-engine
cd chassiswhy-reasoning-engine
```

### 2. Install dependencies

```bash
./scripts/install.sh
```

Or manually:

```bash
python3.11 -m venv venv
venv/bin/pip install -r requirements.txt
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```
PROJECT_ID=your-google-cloud-project-id
LOCATION=us-central1
MODEL=gemini-live-2.5-flash-native-audio
DEV_MODE=true
```

### 4. Authenticate with Google Cloud

```bash
gcloud auth application-default login
gcloud services enable aiplatform.googleapis.com --project=YOUR_PROJECT_ID
```

## Running locally

```bash
./scripts/dev.sh
```

Or in separate terminals:

```bash
# Terminal 1 — backend
venv/bin/python -m uvicorn server.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2 — frontend
npm run dev
```

Open `http://localhost:5173`, click **Start Mission**, and ask a why question.

## Production build

```bash
npm run build
python3 server/main.py
```

Access at `http://localhost:8000`.

## Deploy to Google Cloud Run

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run/)

Or manually:

```bash
cp scripts/example.deploy.sh scripts/deploy.sh
# edit scripts/deploy.sh with your project details
./scripts/deploy.sh
```

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `PROJECT_ID` | — | Google Cloud project ID |
| `LOCATION` | `us-central1` | Vertex AI region |
| `MODEL` | `gemini-live-2.5-flash-native-audio` | Gemini Live model |
| `DEV_MODE` | `true` | Disables rate limiting and reCAPTCHA |
| `SESSION_TIME_LIMIT` | `180` | Max session duration in seconds |
| `REDIS_URL` | — | Redis URL for production rate limiting |
| `RECAPTCHA_SITE_KEY` | — | reCAPTCHA v3 site key for bot protection |
