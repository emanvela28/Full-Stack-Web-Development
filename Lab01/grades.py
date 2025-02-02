

import json

# File to store grades
GRADES_FILE = "grades.txt"

# Load grades from file (if file exists)
def load_grades():
    try:
        with open(GRADES_FILE, "r") as file:
            return json.load(file)  # Load JSON data into dictionary
    except (FileNotFoundError, json.JSONDecodeError):
        return {}  # Return empty dictionary if file doesn't exist or is empty

# Save grades to file
def save_grades(grades):
    with open(GRADES_FILE, "w") as file:
        json.dump(grades, file, indent=4)  # Save dictionary as JSON

# Add a new student grade
def add_grade(grades):
    name = input("Enter the full name of the student: ").strip()
    grade = input("Enter the student's grade: ").strip()

    grades[name] = grade  # Store in dictionary
    save_grades(grades)  # Update file
    print(f"Grade added for {name}.")

# Get a student's grade
def get_grade(grades):
    name = input("Enter the full name of the student: ").strip()
    if name in grades:
        print(f"{name}'s grade is {grades[name]}.")
    else:
        print(f"No grade found for {name}.")

# Edit an existing grade
def edit_grade(grades):
    name = input("Enter the full name of the student to edit: ").strip()
    if name in grades:
        new_grade = input(f"Enter the new grade for {name}: ").strip()
        grades[name] = new_grade  # Update dictionary
        save_grades(grades)  # Update file
        print(f"{name}'s grade updated to {new_grade}.")
    else:
        print(f"No grade found for {name}.")

# Delete a student grade
def delete_grade(grades):
    name = input("Enter the full name of the student to delete: ").strip()
    if name in grades:
        del grades[name]  # Remove from dictionary
        save_grades(grades)  # Update file
        print(f"Grade deleted for {name}.")
    else:
        print(f"No grade found for {name}.")

# Main menu
def main():
    grades = load_grades()  # Load grades from file

    while True:
        print("\nGrades Management System")
        print("1. Add a grade")
        print("2. Get a grade")
        print("3. Edit a grade")
        print("4. Delete a grade")
        print("5. Exit")

        choice = input("Enter your choice (1-5): ").strip()

        if choice == "1":
            add_grade(grades)
        elif choice == "2":
            get_grade(grades)
        elif choice == "3":
            edit_grade(grades)
        elif choice == "4":
            delete_grade(grades)
        elif choice == "5":
            print("Exiting program. Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a number between 1 and 5.")

# Run the program
if __name__ == "__main__":
    main()
