// Jest setup — global mocks for Firebase and external services

// Define mock Firebase environment variables globally before any module imports
process.env.GCLOUD_PROJECT = 'sierra-blu-dev';
process.env.FIREBASE_CONFIG = JSON.stringify({
  projectId: 'sierra-blu-dev',
  storageBucket: 'sierra-blu-dev.appspot.com',
});

// Initialize Firestore global mock state
(global as any).mockDbState = { rawScrapeData: {}, processedDataStore: {} };

Object.defineProperty(global, 'rawScrapeData', {
  get() { return (global as any).mockDbState.rawScrapeData; },
  set(val) { (global as any).mockDbState.rawScrapeData = val; },
  configurable: true
});

Object.defineProperty(global, 'processedDataStore', {
  get() { return (global as any).mockDbState.processedDataStore; },
  set(val) { (global as any).mockDbState.processedDataStore = val; },
  configurable: true
});

// --------------------------------------------------------------------------
// Shared Firestore mock implementation
// --------------------------------------------------------------------------
const mockDbInstance = {
  collection: jest.fn((name: string) => ({
    add: jest.fn(async (data) => {
      const id = `mock-id-${Date.now()}`;
      const state = (global as any).mockDbState;
      state.rawScrapeData[id] = data;
      return { id };
    }),
    doc: jest.fn((docId) => ({
      set: jest.fn(async (data) => {
        const state = (global as any).mockDbState;
        state.processedDataStore[docId] = data;
      }),
      get: jest.fn(async () => ({
        exists: true,
        data: () => ({}),
      })),
      update: jest.fn(async () => true),
    })),
  })),
};

// Export mockDbInstance globally for pipeline tests or direct references
(global as any).mockDbInstance = mockDbInstance;

// --------------------------------------------------------------------------
// Mock subpath files of firebase-admin
// --------------------------------------------------------------------------
jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}));

jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn(() => mockDbInstance),
  Timestamp: {
    now: jest.fn(() => ({ toDate: () => new Date() })),
  },
}));

jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(() => ({
    verifyIdToken: jest.fn().mockRejectedValue(new Error('No token')),
  })),
}));

jest.mock('firebase-admin/storage', () => ({
  getStorage: jest.fn(() => ({})),
}));

// Mock heavy services
jest.mock('@/lib/services/orchestrator');
jest.mock('@/lib/services/profiling-service');
jest.mock('@/lib/services/matching-engine');
jest.mock('@/lib/services/legal-brain');
jest.mock('@/lib/services/sales-engine');
jest.mock('@/lib/services/closing-engine');

// Mock googleapis
jest.mock('googleapis', () => ({
  google: {
    auth: { GoogleAuth: jest.fn() },
    sheets: jest.fn(() => ({
      spreadsheets: {
        values: {
          get: jest.fn(),
          update: jest.fn(),
        },
      },
    })),
  },
}));

// Global test timeout
jest.setTimeout(10000);

// Suppress console noise from intentional error-path tests and function logs
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});
