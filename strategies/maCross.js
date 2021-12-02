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
    type: 'source',
    default: 'close',
  },
  emaPeriod: {
    type: 'number',
    default: 9,
  },
  emaSource: {
    type: 'source',
    default: 'close',
  },
};

module.exports.beforeStart = (options) => {
  // Will me executed before starting
};

module.exports.onTick = (data) => {
  // Executing on every data tick with requested data
};
