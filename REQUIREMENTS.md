## Requirements

- Node.js >= 18 (LTS recommended)
- npm >= 9
- VS Code (recommended)

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Run in development:
   ```
   npm run dev
   ```
   Open the printed URL (e.g., http://localhost:8080 or http://localhost:5173).
3. Build for production:
   ```
   npm run build
   ```
4. Preview production build:
   ```
   npm run preview
   ```

## Editor configuration (fix stale TS errors)

- Use the workspace TypeScript version and restart the TS server. VS Code settings included in `.vscode/settings.json` to point to the workspace TS SDK.

## Notes

- Image alt text and metadata added for `src/assets/weather-hero.jpg`:
  "A beautiful weather-themed hero image showing a blue sky with white clouds, a bright sun, and rain droplets - perfect for a weather application background."
- OpenWeather key is entered in the UI; no env vars required.

