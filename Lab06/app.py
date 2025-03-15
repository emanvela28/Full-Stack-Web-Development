from flask import Flask, jsonify, request, render_template

app = Flask(__name__, static_folder="static", template_folder="templates")

# Simulated database
students = {
    "Alice": 85,
    "Bob": 92,
    "Charlie": 78
}

# Serve the frontend (index.html)
@app.route('/')
def index():
    return render_template("index.html")

# API: Get all students and their grades
@app.route('/api/students', methods=['GET'])
def get_students():
    return jsonify(students)

# API: Get a student's grade
@app.route('/api/students/<name>', methods=['GET'])
def get_student(name):
    grade = students.get(name)
    if grade is None:
        return jsonify({"error": "Student not found"}), 404
    return jsonify({name: grade})

# API: Add a new student
@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.get_json()
    name = data.get("name")
    grade = data.get("grade")
    if not name or grade is None:
        return jsonify({"error": "Missing data"}), 400
    students[name] = grade
    return jsonify({name: grade}), 201

# API: Update a student's grade
@app.route('/api/students/<name>', methods=['PUT'])
def update_student(name):
    if name not in students:
        return jsonify({"error": "Student not found"}), 404
    data = request.get_json()
    grade = data.get("grade")
    if grade is None:
        return jsonify({"error": "Missing grade"}), 400
    students[name] = grade
    return jsonify({name: grade})

# API: Delete a student
@app.route('/api/students/<name>', methods=['DELETE'])
def delete_student(name):
    if name not in students:
        return jsonify({"error": "Student not found"}), 404
    del students[name]
    return jsonify({"message": f"{name} deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
