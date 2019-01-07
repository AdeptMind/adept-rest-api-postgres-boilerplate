jest.mock('request-promise');

const rp = require('request-promise');

const { getFailedPayload, getSuccessPayload, request } = require('./request');

rp.mockImplementation(async ({ url }) => {
  if (!url) {
    return {};
  }
  if (!url.endsWith('example.com')) {
    return getFailedPayload('failed');
  }
  return getSuccessPayload('success');
});

describe('request', () => {
  it('should return data if successful', async () => {
    const data = await request({
      url: 'example.com',
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
