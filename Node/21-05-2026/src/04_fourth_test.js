const { getLevelLabel } = require("../src/04_fourth_test_2");

const buildStudentSummary = (studentName, score) => {

  const level = getLevelLabel(score);

  return {
    studentName,
    score,
    level,
    message: `${studentName} is currently at ${level} level`,
  };
};

module.exports = {
  buildStudentSummary,
};