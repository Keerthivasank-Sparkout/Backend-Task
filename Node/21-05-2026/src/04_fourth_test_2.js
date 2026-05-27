const getLevelLabel = (score) => {

  if (score >= 80) {
    return "Advanced";
  }

  if (score >= 50) {
    return "Intermediate";
  }

  return "Beginner";
};

module.exports = {
  getLevelLabel,
};