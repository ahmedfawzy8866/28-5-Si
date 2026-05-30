/**
 * DataPipeline tests — collectData & processDataForApp
 * Uses global setup mocks for firebase-admin and firebase-functions so no real
 * Firebase project is needed to run these tests.
 */

const admin = require('firebase-admin');

// Mock server timestamp spy
const mockServerTimestamp = jest.fn(() => '__TIMESTAMP__');
admin.firestore.FieldValue = { serverTimestamp: mockServerTimestamp };

// --------------------------------------------------------------------------
// Mock firebase-functions (virtual mock since it's only required in functions)
// --------------------------------------------------------------------------
jest.mock('firebase-functions', () => ({
  https: {
    onRequest: jest.fn((handler) => handler),
  },
  firestore: {
    document: jest.fn(() => ({
      onCreate: jest.fn((handler) => handler),
    })),
  },
}), { virtual: true });

// Import the functions under test AFTER mocking is established
const { collectData } = require('../../firebase-backend/functions/collectData');
const { processDataForApp } = require('../../firebase-backend/functions/processData');

// Helper to create document references for trigger testing
const mockDocRef = (id = 'doc123') => ({
  id,
  update: jest.fn().mockResolvedValue(true),
});

// Helper: build a minimal Express-like req/res pair
function mockReqRes(method = 'POST', body = {}) {
  const res = {
    _status: 200,
    _body: null,
    status(code) { this._status = code; return this; },
    send(body) { this._body = body; return this; },
    json(body) { this._body = body; return this; },
  };
  return [{ method, body }, res];
}

// --------------------------------------------------------------------------
// collectData tests
// --------------------------------------------------------------------------
describe('collectData (HTTP function)', () => {
  beforeEach(() => {
    // Reset global db mock states
    global.mockDbState.rawScrapeData = {};
    global.mockDbState.processedDataStore = {};
    jest.clearAllMocks();
  });

  test('rejects non-POST requests with 405', async () => {
    const [req, res] = mockReqRes('GET');
    await collectData(req, res);
    expect(res._status).toBe(405);
    expect(res._body).toBe('Method Not Allowed');
  });

  test('rejects null body with 400', async () => {
    const [req, res] = mockReqRes('POST', null);
    await collectData(req, res);
    expect(res._status).toBe(400);
    expect(res._body).toBe('Invalid payload');
  });

  test('rejects non-object body with 400', async () => {
    const [req, res] = mockReqRes('POST', 'string-payload');
    await collectData(req, res);
    expect(res._status).toBe(400);
  });

  test('accepts valid payload and returns 200 with doc id', async () => {
    const payload = { title: 'Villa A', price: '5000000', location: 'New Cairo' };
    const [req, res] = mockReqRes('POST', payload);
    await collectData(req, res);
    expect(res._status).toBe(200);
    expect(res._body).toMatchObject({ success: true, id: expect.any(String) });
  });

  test('written document includes status: raw_unprocessed', async () => {
    const payload = { title: 'Penthouse B' };
    const [req, res] = mockReqRes('POST', payload);
    await collectData(req, res);
    const stored = Object.values(global.mockDbState.rawScrapeData)[0];
    expect(stored).toBeDefined();
    expect(stored.status).toBe('raw_unprocessed');
    expect(stored.title).toBe('Penthouse B');
  });
});

// --------------------------------------------------------------------------
// processDataForApp tests
// --------------------------------------------------------------------------
describe('processDataForApp (Firestore trigger)', () => {
  beforeEach(() => {
    // Reset global db mock states
    global.mockDbState.rawScrapeData = {};
    global.mockDbState.processedDataStore = {};
    jest.clearAllMocks();
  });

  function makeSnap(data, docId = 'snap-doc-1') {
    const ref = mockDocRef(docId);
    return {
      data: () => data,
      ref,
      _ref: ref,
    };
  }

  const context = { params: { docId: 'snap-doc-1' } };

  test('writes normalized document to processedData', async () => {
    const snap = makeSnap({ title: 'Apartment', price: '2500000', location: 'Mivida', source: 'Bot' });
    await processDataForApp(snap, context);

    const written = global.mockDbState.processedDataStore['snap-doc-1'];
    expect(written).toBeDefined();
    expect(written.title).toBe('Apartment');
    expect(written.price).toBe(2500000);
    expect(written.location).toBe('Mivida');
    expect(written.isAvailable).toBe(true);
  });

  test('falls back to defaults for missing fields', async () => {
    const snap = makeSnap({});
    await processDataForApp(snap, context);

    const written = global.mockDbState.processedDataStore['snap-doc-1'];
    expect(written).toBeDefined();
    expect(written.title).toBe('Untitled Property');
    expect(written.price).toBe(0);
    expect(written.location).toBe('Unknown');
    expect(written.source).toBe('Scraper Bot');
  });

  test('marks source document processed_success after writing', async () => {
    const snap = makeSnap({ title: 'Villa', price: '3000000' });
    await processDataForApp(snap, context);
    expect(snap.ref.update).toHaveBeenCalledWith({ status: 'processed_success' });
  });

  test('marks processed_error and does not throw when write fails', async () => {
    // Make processedData write fail
    const dbMock = admin.firestore();
    const originalCollection = dbMock.collection;

    dbMock.collection = jest.fn((name) => {
      if (name === 'processedData') {
        return {
          doc: jest.fn(() => ({
            set: jest.fn().mockRejectedValue(new Error('Firestore write failed'))
          }))
        };
      }
      return originalCollection(name);
    });

    const snap = makeSnap({ title: 'Failing Unit' });
    await processDataForApp(snap, context);
    expect(snap.ref.update).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'processed_error', error: expect.any(String) })
    );

    // Restore original mock collection logic
    dbMock.collection = originalCollection;
  });
});
