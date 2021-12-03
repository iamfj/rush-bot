module.exports.name = 'maCross';
module.exports.label = 'EMA Cross Strategy';
module.exports.options = {
  timeframe: {
    type: 'timeframe',
    default: '15m',
  },
  smaPeriod: {
    type: 'number',
    default: 200,
  },
  smaSource: {
    type: 'candleSource',
    default: 'close',
  },
  emaPeriod: {
    type: 'number',
    default: 26,
  },
  emaSource: {
    type: 'candleSource',
    default: 'close',
  },
};

module.exports.onStart = (options) => {
  // Will me executed before starting
};

module.exports.onTick = (data) => {
  // Executing on every data tick with requested data
};
