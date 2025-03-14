const apiUrl = "https://amhep.pythonanywhere.com/grades";


// Fetch all students and display in table
function getAllGrades() {
    fetch("https://amhep.pythonanywhere.com/grades")
        .then(response => response.text()) // Get response as text first
        .then(text => {
            console.log("Raw API Response:", text); // Log raw response

            try {
                // Replace NaN with null to ensure valid JSON
                const cleanText = text.replace(/NaN/g, "null");
                const data = JSON.parse(cleanText); // Parse fixed JSON

                console.log("Cleaned API Response:", data);

                if (typeof data !== "object" || data === null) {
                    throw new Error("Invalid API response format");
                }

                // Convert object into an array and filter out invalid values
                const studentArray = Object.entries(data)
                    .map(([name, grade]) => ({
                        name,
                        grade
                    }))
                    .filter(student => 
                        typeof student.grade === "number" && !isNaN(student.grade) // Keep only valid numbers
                    );

                const tableBody = document.getElementById("gradesBody");
                tableBody.innerHTML = "";
                studentArray.forEach(student => {
                    const row = `<tr>
                        <td>${student.name}</td>
                        <td>${student.grade}</td>
                        <td>
                            <button onclick="editGrade('${student.name}', ${student.grade})">Edit</button>
                            <button onclick="deleteStudent('${student.name}')">Delete</button>
                        </td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });

            } catch (error) {
                console.error("Error parsing API response:", error);
                document.getElementById("gradeDisplay").innerText = "Invalid JSON";
                document.getElementById("pagination").innerHTML = "";
            }
        })
        .catch(error => {
            console.error("Error fetching grades:", error);
            alert("Failed to load student data.");
        });
}




function getGrade() {
    const name = document.getElementById("searchName").value;

    fetch(`https://amhep.pythonanywhere.com/grades/${encodeURIComponent(name)}`)
        .then(response => response.text()) // Get response as text first
        .then(text => {
            console.log("Raw API Response:", text); // Debugging output

            try {
                // Replace NaN values with null to ensure valid JSON
                const cleanText = text.replace(/NaN/g, "null");
                const data = JSON.parse(cleanText); // Parse fixed JSON

                console.log("Cleaned API Response:", data);

                if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
                    alert("Student not found!");
                    return;
                }

                // Extract the grade from the response object
                const studentName = Object.keys(data)[0];  // The first (and only) key
                const studentGrade = data[studentName];  // The value for that key

                // Handle invalid grades
                if (typeof studentGrade !== "number" || isNaN(studentGrade)) {
                    alert(`Student: ${studentName}\nGrade: N/A (Invalid data)`);
                } else {
                    alert(`Student: ${studentName}\nGrade: ${studentGrade}`);
                }
            } catch (error) {
                console.error("Error parsing API response:", error);
                alert("Error: Invalid data received from the server.");
            }
        })
        .catch(error => {
            console.error("Error fetching student grade:", error);
            alert("Error: Could not retrieve student data.");
        });
}



// Add a new student with a grade
function addStudent() {
    const name = document.getElementById("newName").value.trim(); // Trim removes extra spaces
    const grade = document.getElementById("newGrade").value.trim();

    // Validate input: Ensure name and grade are not empty
    if (!name || !grade) {
        alert("Please enter both a name and a grade.");
        return;
    }

    // Ensure the grade is a valid number
    const numericGrade = parseFloat(grade);
    if (isNaN(numericGrade) || numericGrade < 0) {
        alert("Please enter a valid numeric grade.");
        return;
    }

    fetch("https://amhep.pythonanywhere.com/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, grade: numericGrade })
    })
    .then(response => response.text()) // Get raw response as text
    .then(text => {
        console.log("Raw API Response:", text);

        try {
            // Replace NaN with null to ensure valid JSON
            const cleanText = text.replace(/NaN/g, "null");
            const data = JSON.parse(cleanText);

            console.log("Parsed API Response:", data);

            if (!data || typeof data !== "object") {
                throw new Error("Invalid API response format");
            }

            alert("Student added successfully!");
            document.getElementById("newName").value = "";
            document.getElementById("newGrade").value = "";
            getAllGrades(); // Refresh the table
        } catch (error) {
            console.error("Error parsing API response:", error);
            alert("Error: Invalid response from server.");
        }
    })
    .catch(error => {
        console.error("Error adding student:", error);
        alert("Failed to add student. Please try again.");
    });
}



// Edit an existing student's grade
function editGrade(name, currentGrade) {
    const newGrade = prompt(`Enter new grade for ${name}:`, currentGrade);

    if (newGrade !== null) {
        // Ensure the new grade is a valid number
        const numericGrade = parseFloat(newGrade);
        if (isNaN(numericGrade) || numericGrade < 0) {
            alert("Please enter a valid numeric grade.");
            return;
        }

        fetch(`https://amhep.pythonanywhere.com/grades/${encodeURIComponent(name)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ grade: numericGrade })
        })
        .then(response => response.text()) // Get raw response as text
        .then(text => {
            console.log("Raw API Response:", text);

            try {
                // Replace NaN with null to ensure valid JSON
                const cleanText = text.replace(/NaN/g, "null");
                const data = JSON.parse(cleanText);

                console.log("Parsed API Response:", data);

                if (!data || typeof data !== "object") {
                    throw new Error("Invalid API response format");
                }

                alert("Grade updated successfully!");
                getAllGrades();
            } catch (error) {
                console.error("Error parsing API response:", error);
                alert("Error: Invalid response from server.");
            }
        })
        .catch(error => {
            console.error("Error updating grade:", error);
            alert("Failed to update grade. Please try again.");
        });
    }
}


// Delete a student
function deleteStudent(name) {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
        fetch(`https://amhep.pythonanywhere.com/grades/${encodeURIComponent(name)}`, {
            method: "DELETE"
        })
        .then(response => response.text()) // Get raw response as text
        .then(text => {
            console.log("Raw API Response:", text);

            try {
                // Replace NaN with null to ensure valid JSON
                const cleanText = text.replace(/NaN/g, "null");
                const data = JSON.parse(cleanText);

                console.log("Parsed API Response:", data);

                if (!data || typeof data !== "object") {
                    throw new Error("Invalid API response format");
                }

                alert("Student deleted successfully!");
                getAllGrades();
            } catch (error) {
                console.error("Error parsing API response:", error);
                alert("Error: Invalid response from server.");
            }
        })
        .catch(error => {
            console.error("Error deleting student:", error);
            alert("Failed to delete student. Please try again.");
        });
    }
}


// Load all grades initially
getAllGrades();
