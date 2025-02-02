


class Course:
    def __init__(self, department, number, name, credits, days, start_time, end_time, avg_grade):
        self.department = department
        self.number = number
        self.name = name
        self.credits = credits
        self.days = days
        self.start_time = start_time
        self.end_time = end_time
        self.avg_grade = avg_grade

    def format_course(self, course_index):
        return (f"COURSE {course_index}: {self.department}{self.number}: {self.name}\n"
                f"Number of Credits: {self.credits}\n"
                f"Days of Lectures: {self.days}\n"
                f"Lecture Time: {self.start_time} - {self.end_time}\n"
                f"Stat: on average, students get {self.avg_grade}% in this course\n\n")

def format_class_schedule(input_filename, output_filename):
    try:
        with open(input_filename, "r") as file:
            lines = file.readlines()
            
            num_courses = int(lines[0].strip())
            index = 1
            courses = []
            
            for i in range(num_courses):
                course = Course(
                    department=lines[index].strip(),
                    number=lines[index + 1].strip(),
                    name=lines[index + 2].strip(),
                    credits=lines[index + 3].strip(),
                    days=lines[index + 4].strip(),
                    start_time=lines[index + 5].strip(),
                    end_time=lines[index + 6].strip(),
                    avg_grade=lines[index + 7].strip()
                )
                courses.append(course)
                index += 8 
            
        with open(output_filename, "w") as output_file:
            for i, course in enumerate(courses, start=1):
                output_file.write(course.format_course(i)) 

        print(f"Class schedule has been formatted and saved in '{output_filename}'.")

    except FileNotFoundError:
        print(f"Error: The file '{input_filename}' could not be found.")
    except (IndexError, ValueError):
        print("Error: The file format is incorrect.")


input_filename = "classesInput.txt"
output_filename = "formattedSchedule.txt"

format_class_schedule(input_filename, output_filename)
