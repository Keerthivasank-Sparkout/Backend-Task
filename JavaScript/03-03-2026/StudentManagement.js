let students = [];
function addStudent(name, age, grade, marks) {
  const newStudent = {
    id: Date.now(),
    name,
    age,
    grade,
    marks
  };
  students.push(newStudent);
  console.log("Student added:", newStudent);
}
function getAllStudents() {
  console.log("All Students:");
  console.table(students);
}
function updateStudent(id, updatedData) {
  const index = students.findIndex(student => student.id === id);
  if (index === -1) {
    console.log("Student not found");
    return;
  }
  students[index] = { ...students[index], ...updatedData };
  console.log("Student updated:", students[index]);
}
function deleteStudent(id) {
  const initialLength = students.length;
  students = students.filter(student => student.id !== id);
  if (students.length === initialLength) {
    console.log("Student not found");
  } else {
    console.log("Student deleted successfully");
  }
}
function searchStudent(name) {
  const result = students.filter(student =>
    student.name.toLowerCase().includes(name.toLowerCase())
  );
  console.log("Search Results:");
  console.table(result);
}
function filterByGrade(grade) {
  const result = students.filter(student => student.grade === grade);
  console.log(`Students in Grade ${grade}:`);
  console.table(result);
}
function filterTopStudents(minMarks) {
  const result = students.filter(student => student.marks >= minMarks);
  console.log(`Students with marks >= ${minMarks}:`);
  console.table(result);
}
addStudent("Keerthi", 21, "A", 92);
addStudent("Rahul", 20, "B", 75);
addStudent("Anjali", 22, "A", 88);
addStudent("Vikram", 21, "C", 60);
const firstId = students[0].id;
updateStudent(firstId, { marks: 95 });
searchStudent("rah");
filterByGrade("A");
filterTopStudents(80);
deleteStudent(firstId);
getAllStudents();