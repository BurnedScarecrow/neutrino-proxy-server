export const hexEncode = function (str) {
  let hex, i;

  let result = '';
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-2);
  }

  return result;
};

export const hexDecode = function (hex) {
  let j;
  const hexes = hex.match(/.{1,2}/g) || [];
  let back = '';
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};
