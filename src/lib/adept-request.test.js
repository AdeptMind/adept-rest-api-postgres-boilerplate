jest.mock('request-promise');

const rp = require('request-promise');

const {
  getFailedPayload,
  getSuccessPayload,
  request,
} = require('./adept-request');

rp.mockImplementation(async ({ url }) => {
  if (!url) {
    return {};
  }
  if (!url.endsWith('adeptmind.ai')) {
    return getFailedPayload('failed');
  }
  return getSuccessPayload('success');
});

describe('request', () => {
  it('should return data if successful', async () => {
    const data = await request({
      url: 'platform-manager.adeptmind.ai',
    });
    expect(data).toEqual('success');
  });
  it('should throw error if failed', async () => {
    expect(request({ url: 'google.com' })).rejects.toThrow('failed');
  });
  it('should throw error if malformed', async () => {
    expect(request({})).rejects.toThrow('malformed');
  });
});
