// STEP 1: Student Class

class Student {
  constructor(studentId, studentName, studentClass, email) {
    this.studentId = studentId;
    this.studentName = studentName;
    this.studentClass = studentClass;
    this.email = email;
  }
}

// STEP 2: Students Array

let student = [
  new Student(101, "Erum Sultan", "Class 10", "erum@gmail.com"),
  new Student(102, "Amna Farooq", "Class 10", "amna@gmail.com"),
  new Student(103, "Jiya Farooq", "Class 10", "jiya@gmail.com"),
  new Student(104, "Modood Sultan", "Class 10", "modood@gmail.com"),
  new Student(105, "Jawwad Farooq", "Class 10", "jawwad@gmail.com"),
  new Student(106, "Hiba Khan", "Class 10", "hiba@gmail.com"),
  new Student(107, "Ahmed Inam", "Class 10", "ahmed@gmail.com"),
  new Student(108, "Bilal Qureshi", "Class 10", "bilal@gmail.com"),
  new Student(109, "Yasir Farooq", "Class 10", "yasir@gmail.com"),
  new Student(110, "Farooq Sultan", "Class 10", "farooq@gmail.com"),
  new Student(111, "Salih Ismail", "Class 10", "salih@gmail.com"),
  new Student(112, "Hooria Sheikh", "Class 10", "hooria@gmail.com"),
  new Student(113, "Hafsa Rehman", "Class 10", "hafsa@gmail.com"),
  new Student(114, "Maryum Fatima", "Class 10", "maryum@gmail.com"),
  new Student(115, "Fatima", "Class 10", "fatima@gmail.com"),
  new Student(116, "Zulfiqar Hussain", "Class 10", "zulfiqar@gmail.com"),
  new Student(117, "Ali Mujtaba", "Class 10", "ali@gmail.com"),
  new Student(118, "Saud Farooq", "Class 10", "saud@gmail.com"),
  new Student(119, "Iqbal Kasif", "Class 10", "iqbal@gmail.com"),
  new Student(120, "Liquat Murtaza", "Class 10", "liquat@gmail.com"),
  new Student(121, "Waqar Ahmed", "Class 10", "waqar@gmail.com"),
  new Student(122, "Nazia Jameel", "Class 10", "nazia@gmail.com"),
  new Student(123, "Ayesha Iqbal", "Class 10", "ayesha@gmail.com"),
  new Student(124, "Laiba Kamran", "Class 10", "laiba@gmail.com"),
  new Student(125, "Abdullah Masood", "Class 10", "abdullah@gmail.com"),
  new Student(126, "Ilyas Faisal", "Class 10", "ilyas@gmail.com"),
  new Student(127, "Areeba Tahir", "Class 10", "areeba@gmail.com"),
  new Student(128, "Dawood Ali", "Class 10", "dawood@gmail.com"),
  new Student(129, "Yusuf Aqeel", "Class 10", "yusuf@gmail.com"),
  new Student(130, "Khizr Salamat", "Class 10", "khizr@gmail.com"),
];

// STEP 3: Select HTML Elements

let studentTable = document.querySelector("#studentTable");
let form = document.querySelector("#studentForm");

let id = document.querySelector("#studentId");
let name = document.querySelector("#studentName");
let studentClass = document.querySelector("#studentClass");
let email = document.querySelector("#studentEmail");

let search = document.querySelector("#searchStudent");
let totalStudents = document.querySelector("#totalStudents");

// STEP 4: Display Students in Table

function displayStudents(list = student) {
  let rows = "";

  for (let items of list) {
    rows += `
            <tr>
                <td>${items.studentId}</td>
                <td>${items.studentName}</td>
                <td>${items.studentClass}</td>
                <td>${items.email}</td>
                <td>
                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editStudent('${items.studentId}')">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteStudent('${items.studentId}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
  }

  studentTable.innerHTML = rows;

  if (totalStudents) {
    totalStudents.textContent = student.length;
  }
}

displayStudents();

// STEP 5: Add New Student

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let studentId = id.value.trim();
  let studentName = name.value.trim();
  let studentClassValue = studentClass.value.trim();
  let studentEmail = email.value.trim();

  // Check empty fields

  if (
    studentId === "" ||
    studentName === "" ||
    studentClassValue === "" ||
    studentEmail === ""
  ) {
    alert("Please fill all fields!");
    return;
  }

  // Check duplicate Student ID

  let exists = student.some(function (item) {
    return String(item.studentId) === studentId;
  });

  if (exists) {
    alert("Student ID already exists!");
    return;
  }

  // Create new Student object

  let student1 = new Student(
    studentId,
    studentName,
    studentClassValue,
    studentEmail,
  );

  // Add student to array

  student.push(student1);

  // Clear search and display all students

  search.value = "";
  displayStudents();

  // Clear form

  form.reset();

  // Close Bootstrap modal

  let modalElement = document.querySelector("#studentModal");
  let modalInstance = bootstrap.Modal.getInstance(modalElement);

  if (modalInstance) {
    modalInstance.hide();
  }

  alert("Student added successfully!");
});

// STEP 6: Search Student by ID or Name

search.addEventListener("input", function () {
  let searchValue = search.value.toLowerCase().trim();

  let filteredStudents = student.filter(function (item) {
    return (
      String(item.studentId).toLowerCase().includes(searchValue) ||
      item.studentName.toLowerCase().includes(searchValue)
    );
  });

  displayStudents(filteredStudents);
});

// STEP 7: Edit Student

function editStudent(id) {
  let selectedStudent = student.find(function (item) {
    return String(item.studentId) === String(id);
  });

  if (!selectedStudent) {
    alert("Student not found!");
    return;
  }

  let newName = prompt("Enter student name:", selectedStudent.studentName);

  if (newName === null || newName.trim() === "") {
    return;
  }

  let newClass = prompt("Enter student class:", selectedStudent.studentClass);

  if (newClass === null || newClass.trim() === "") {
    return;
  }

  let newEmail = prompt("Enter student email:", selectedStudent.email);

  if (newEmail === null || newEmail.trim() === "") {
    return;
  }

  selectedStudent.studentName = newName.trim();
  selectedStudent.studentClass = newClass.trim();
  selectedStudent.email = newEmail.trim();

  displayStudents(
    search.value.trim() === ""
      ? student
      : student.filter(function (item) {
          let searchValue = search.value.toLowerCase().trim();

          return (
            String(item.studentId).toLowerCase().includes(searchValue) ||
            item.studentName.toLowerCase().includes(searchValue)
          );
        }),
  );

  alert("Student updated successfully!");
}

// STEP 8: Delete Student

function deleteStudent(id) {
  let confirmDelete = confirm("Are you sure you want to delete this student?");

  if (!confirmDelete) {
    return;
  }

  student = student.filter(function (item) {
    return String(item.studentId) !== String(id);
  });

  displayStudents(
    search.value.trim() === ""
      ? student
      : student.filter(function (item) {
          let searchValue = search.value.toLowerCase().trim();

          return (
            String(item.studentId).toLowerCase().includes(searchValue) ||
            item.studentName.toLowerCase().includes(searchValue)
          );
        }),
  );

  alert("Student deleted successfully!");
}
let total = document.querySelector("#totalStudents");
let presentStudents = document.querySelector("#presentStudents");
let absentStudents = document.querySelector("#absentStudents");
let leaveStudents = document.querySelector("#leaveStudents");
total.textContent = student.length;
presentStudents.textContent = 24;
absentStudents.textContent = 3;
leaveStudents.textContent = 3;
// screen moode

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});
