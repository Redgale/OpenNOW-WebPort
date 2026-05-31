import type { OpenNowApi, AuthSessionResult, AuthRefreshStatus, NativeStreamerStatus } from "@shared/gfn";

const noop = () => {};

const defaultRefreshStatus: AuthRefreshStatus = {
  attempted: false,
  forced: false,
  outcome: "not_attempted",
  message: "",
};

function makeUnsupportedNativeStatus(): NativeStreamerStatus {
  return {
    detected: false,
    gstreamerAvailable: false,
    supportsOfferAnswer: false,
    gstreamerRuntime: {
      source: "unknown",
      bundled: false,
      message: "native streamer not available in web build",
    },
    message: "native streamer not available in web build",
  } as NativeStreamerStatus;
}

let _demoSession: any = null;

const openNowStub: OpenNowApi = {
  async getAuthSession() {
    return { session: _demoSession, refresh: defaultRefreshStatus } as any;
  },
  async getLoginProviders() {
    // Provide a simple demo provider so UI can proceed in web builds
    return [
      {
        idpId: "demo",
        code: "DEMO",
        displayName: "Demo Provider",
        streamingServiceUrl: "https://demo.streaming.service",
        priority: 100,
      },
    ];
  },
  async getRegions() { return []; },
  async login(request?: any) {
    // Support a minimal demo login flow for the web build
    const providerIdpId = request?.providerIdpId ?? "demo";
    if (providerIdpId === "demo") {
      const now = Math.floor(Date.now() / 1000);
      _demoSession = {
        provider: {
          idpId: "demo",
          code: "DEMO",
          displayName: "Demo Provider",
          streamingServiceUrl: "https://demo.streaming.service",
          priority: 100,
        },
        tokens: {
          accessToken: "demo-access-token",
          refreshToken: "demo-refresh-token",
          idToken: "demo-id-token",
          expiresAt: now + 60 * 60,
        },
        user: {
          userId: "demo-user",
          displayName: "Demo User",
          membershipTier: "free",
        },
      };
      // Return just the session (not wrapped in AuthSessionResult)
      return _demoSession as any;
    }
    throw new Error("Login provider not supported in web build");
  },
  async logout() { _demoSession = null; return; },
  async logoutAll() { return; },
  async getSavedAccounts() {
    if (!_demoSession) return [];
    return [{ userId: _demoSession.user.userId, displayName: _demoSession.user.displayName, membershipTier: _demoSession.user.membershipTier, providerCode: _demoSession.provider.code }];
  },
  async switchAccount() { throw new Error("Not supported in web build"); },
  async removeAccount() { return; },
  async fetchSubscription() { return { membershipTier: "free", allottedHours: 0, purchasedHours: 0, rolledOverHours: 0, usedHours: 0, remainingHours: 0, totalHours: 0, isUnlimited: false, entitledResolutions: [] }; },
  async fetchMainGames() { return []; },
  async fetchStorePanels() { return { panels: [], total: 0 }; },
  async fetchFeaturedGames() { return []; },
  async fetchLibraryGames() { return []; },
  async browseCatalog() { return { results: [], total: 0 }; },
  async fetchPublicGames() { return []; },
  async resolveLaunchAppId() { return null; },
  async resolveStoreUrl() { return null; },
  async createSession() { throw new Error("Streaming not supported in web build"); },
  async pollSession() { throw new Error("Streaming not supported in web build"); },
  async reportSessionAd() { throw new Error("Not supported in web build"); },
  async stopSession() { return; },
  async getActiveSessions() { return []; },
  async claimSession() { throw new Error("Not supported in web build"); },
  async getNativeStreamerStatus() { return makeUnsupportedNativeStatus(); },
  async getNativeCloudGsyncCapabilities() { return {}; },
  async showSessionConflictDialog() { return "cancel"; },
  async connectSignaling() { return; },
  async disconnectSignaling() { return; },
  async sendAnswer() { return; },
  async sendIceCandidate() { return; },
  sendNativeInput() { /* noop */ },
  updateNativeRenderSurface() { /* noop */ },
  async requestKeyframe() { return; },
  onSignalingEvent(listener: any) { return () => {}; },
  onToggleFullscreen(listener: any) { return () => {}; },
  async quitApp() { return; },
  async getUpdaterState() { return { status: "disabled", currentVersion: "0.0.0", updateSource: "github-releases", canCheck: false, canDownload: false, canInstall: false, isPackaged: false }; },
  async checkForUpdates() { return { status: "disabled", currentVersion: "0.0.0", updateSource: "github-releases", canCheck: false, canDownload: false, canInstall: false, isPackaged: false }; },
  async downloadUpdate() { return { status: "disabled", currentVersion: "0.0.0", updateSource: "github-releases", canCheck: false, canDownload: false, canInstall: false, isPackaged: false }; },
  async installUpdateAndRestart() { return { status: "disabled", currentVersion: "0.0.0", updateSource: "github-releases", canCheck: false, canDownload: false, canInstall: false, isPackaged: false }; },
  onUpdaterStateChanged(listener: any) { return () => {}; },
  async setFullscreen() { return; },
  async toggleFullscreen() { return; },
  async togglePointerLock() { return; },
  notifyPointerLockChange() { /* noop */ },
  async readClipboardText() { return ""; },
  async getSettings() {
    // Provide a full default settings object so web builds don't crash
    return {
      resolution: "1920x1080",
      aspectRatio: "16:9",
      posterSizeScale: 1,
      fps: 60,
      maxBitrateMbps: 75,
      streamClientMode: "web",
      nativeStreamerBackend: "gstreamer",
      nativeVideoBackend: "auto",
      nativeStreamerExecutablePath: "",
      nativeCloudGsyncMode: "auto",
      nativeD3dFullscreenMode: "auto",
      nativeExternalRenderer: true,
      showNativeStreamerStats: false,
      codec: "H264",
      decoderPreference: "auto",
      encoderPreference: "auto",
      colorQuality: "high",
      region: "",
      sessionProxyEnabled: false,
      sessionProxyUrl: "",
      clipboardPaste: false,
      mouseSensitivity: 1,
      mouseAcceleration: 1,
      shortcutToggleStats: "F3",
      shortcutTogglePointerLock: "F8",
      shortcutToggleFullscreen: "F10",
      shortcutStopStream: "Ctrl+Shift+Q",
      shortcutToggleAntiAfk: "Ctrl+Shift+K",
      shortcutToggleMicrophone: "Ctrl+Shift+M",
      shortcutScreenshot: "F11",
      shortcutToggleRecording: "F12",
      microphoneMode: "disabled",
      microphoneDeviceId: "",
      hideStreamButtons: false,
      showAntiAfkIndicator: true,
      showStatsOnLaunch: false,
      hideServerSelector: false,
      appAccentColor: "green",
      controllerMode: false,
      autoFullScreen: false,
      favoriteGameIds: [],
      sessionCounterEnabled: false,
      showSessionTimeRemainingInStatsOverlay: false,
      sessionClockShowEveryMinutes: 60,
      sessionClockShowDurationSeconds: 30,
      windowWidth: 1400,
      windowHeight: 900,
      keyboardLayout: "us",
      gameLanguage: "en_US",
      enableL4S: false,
      enableCloudGsync: false,
      discordRichPresence: false,
      autoCheckForUpdates: true,
    } as any;
  },
  async setSetting() { return; },
  async resetSettings() {
    return await (this.getSettings() as Promise<any>);
  },
  async selectNativeStreamerExecutable() { return null; },
  async getMicrophonePermission() { return { platform: "unknown", isMacOs: false, status: "not-determined", granted: false, canRequest: false, shouldUseBrowserApi: true }; },
  async exportLogs() { return ""; },
  async pingRegions() { return []; },
  async saveScreenshot() { throw new Error("Not supported in web build"); },
  async listScreenshots() { return []; },
  async deleteScreenshot() { return; },
  async saveScreenshotAs() { return { saved: false }; },
  onTriggerScreenshot() { return () => {}; },
  onExternalEscape() { return () => {}; },
  async openExternalUrl() { return; },
  async beginRecording() { throw new Error("Not supported in web build"); },
  async sendRecordingChunk() { return; },
  async finishRecording() { throw new Error("Not supported in web build"); },
  async abortRecording() { return; },
  async listRecordings() { return []; },
  async deleteRecording() { return; },
  async showRecordingInFolder() { return; },
  async listMediaByGame() { return { screenshots: [], videos: [] }; },
  async getMediaThumbnail() { return null; },
  async showMediaInFolder() { return; },
  async getMediaPlaybackUrl() { return null; },
  async deleteMediaFile() { return { ok: false }; },
  async regenMediaThumbnail() { return { ok: false, thumbnailDataUrl: null }; },
  async deleteCache() { return; },
  async fetchPrintedWasteQueue() { return {}; },
  async fetchPrintedWasteServerMapping() { return {}; },
  async getThanksData() { return { thanksMessage: "" } as any; },
  async clearDiscordActivity() { return; },
};

// Expose on window for web builds
(window as any).openNow = openNowStub;

export default openNowStub;
