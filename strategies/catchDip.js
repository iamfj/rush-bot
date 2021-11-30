module.exports.onInit = (register) => {
  var name = 'catchDip';
  var label = 'Catch Dip Strategy';
  var options = {
    timeframe: {
      type: 'timeframe',
      default: '5m',
    },
    trendCloudMultiplier: {
      type: 'number',
      default: 4,
    },
    hmaHighPeriod: {
      type: 'number',
      default: 9,
    },
    hmaHighCandleSource: {
      type: 'candlestick',
      default: 'close',
    },
    hmaLowPeriod: {
      type: 'number',
      default: 9,
    },
    hmaLowCandleSource: {
      type: 'candlePrice',
      default: 'close',
    },
  };

  register(name, label, options, onRequestData, onTick);
};

function onRequestData(options) {}
function onTick(data, triggerSignal) {}
