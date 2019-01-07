const rp = require('request-promise');

class RequestError extends Error {
  constructor(message, payload) {
    super(message);
    this.payload = payload;
  }
}

const getSuccessPayload = (data) => {
  return { success: true, data };
};

const getFailedPayload = (message) => {
  return { success: false, message };
};

const request = async (options) => {
  const payload = await rp(options);
  if (typeof payload === 'object' && payload.success === false) {
    throw new RequestError(payload.message, payload);
  }
  if (
    typeof payload !== 'object' ||
    payload.success !== true ||
    !payload.data
  ) {
    throw new RequestError('Got malformed response payload', payload);
  }
  return payload.data;
};

module.exports = {
  RequestError,
  getFailedPayload,
  getSuccessPayload,
  request,
};
