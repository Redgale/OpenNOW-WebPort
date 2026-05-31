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

const openNowStub: OpenNowApi = {
  async getAuthSession() {
    return { session: null, refresh: defaultRefreshStatus } as AuthSessionResult;
  },
  async getLoginProviders() { return []; },
  async getRegions() { return []; },
  async login() { throw new Error("Not supported in web build"); },
  async logout() { return; },
  async logoutAll() { return; },
  async getSavedAccounts() { return []; },
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
  async getSettings() { return {} as any; },
  async setSetting() { return; },
  async resetSettings() { return {} as any; },
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
