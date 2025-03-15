const BASE_URL = "https://amhep.pythonanywhere.com";

async function fetchStudents() {
    try {
        let response = await fetch(`${BASE_URL}/grades`);
        
        console.log("Response Status:", response.status);

        if (!response.ok) {
            console.error("Error: API returned an error", response.status);
            document.getElementById("studentList").innerHTML = "<li>Failed to load students.</li>";
            return;
        }

        let students = await response.json();
        
        console.log("Students Data:", students);

        let studentList = document.getElementById("studentList");
        studentList.innerHTML = "";

        if (Object.keys(students).length === 0) {
            studentList.innerHTML = "<li>No students found.</li>";
            return;
        }

        for (let student in students) {
            let grade = students[student];
            let listItem = document.createElement("li");
            listItem.textContent = `${student}: ${grade}`;
            studentList.appendChild(listItem);
        }
    } catch (error) {
        console.error("Error fetching students:", error);
        document.getElementById("studentList").innerHTML = "<li>Error loading students.</li>";
    }
}

async function fetchGrade() {
    let name = document.getElementById("studentName").value.trim();
    if (name === "") {
        alert("Please enter a student name.");
        return;
    }

    let encodedName = encodeURIComponent(name);
    let studentGrade = document.getElementById("studentGrade");
    studentGrade.innerHTML = "";

    try {
        let response = await fetch(`${BASE_URL}/grades/${encodedName}`);
        if (response.status === 404) {
            studentGrade.textContent = `Student "${name}" not found.`;
            studentGrade.style.color = "red";
            return;
        }

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        let data = await response.json();

        if (!data[name]) {
            studentGrade.textContent = `Student "${name}" not found.`;
            studentGrade.style.color = "red";
        } else {
            studentGrade.textContent = `${name}: ${data[name]}`;
            studentGrade.style.color = "black";
        }
    } catch (error) {
        console.error("Error fetching grade:", error);
        studentGrade.textContent = "An error occurred while fetching the student.";
        studentGrade.style.color = "red";
    }
}


async function addStudent() {
    let name = document.getElementById("newStudentName").value;
    let grade = document.getElementById("newStudentGrade").value;

    try {
        await fetch(`${BASE_URL}/grades`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, grade: parseInt(grade)})
        });

        fetchStudents();
    } catch (error) {
        console.error("Error adding student:", error);
    }
}

async function updateStudent() {
    let name = document.getElementById("updateStudentName").value;
    let grade = document.getElementById("updateStudentGrade").value;

    try {
        await fetch(`${BASE_URL}/grades/${name}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({grade: parseInt(grade)})
        });

        fetchStudents();
    } catch (error) {
        console.error("Error updating student:", error);
    }
}

async function deleteStudent() {
    let name = document.getElementById("deleteStudentName").value;

    try {
        await fetch(`${BASE_URL}/grades/${name}`, { method: 'DELETE' });
        fetchStudents();
    } catch (error) {
        console.error("Error deleting student:", error);
    }
}
