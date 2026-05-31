Deployment notes (Koyeb)

- Build locally:
  ```bash
  npm --prefix opennow-stable install
  npm --prefix opennow-stable run build
  ```

- Docker (recommended for Koyeb): builds image using `opennow-stable/Dockerfile` and serves on port 8080.

- Koyeb:
  - Create a new app and point to this repository.
  - Use the provided `koyeb.yml` or set the build context to the repo root and Dockerfile to `opennow-stable/Dockerfile`.
  - Expose port `8080` and set `NODE_ENV=production`.

Notes:
- Native Electron features were removed. The app now runs purely in the browser and any previously native features are stubbed or removed.
