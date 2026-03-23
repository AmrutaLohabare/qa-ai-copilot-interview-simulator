const extractJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
    } catch (e) {
      return null;
    }
  }
  return null;
};

module.exports = { extractJSON };