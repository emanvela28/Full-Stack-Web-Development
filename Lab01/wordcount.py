
def word_count (filename, word):
    try:
        with open(filename, "r") as file:
            content = file.read().lower()
            word = word.lower()
            words = content.replace("\n", " ").split()
            total_count = 0

            for i in words:
                if (word in i):
                    total_count += 1

        print(f"The word '{word}' occurs {total_count} times in '{filename}'.")

    except FileNotFoundError:
        print(f"Error: The file '{filename}' could not be found.")

user_word = input("Please enter a word to count: ")

filename = "PythonSummary.txt"

word_count(filename, user_word)