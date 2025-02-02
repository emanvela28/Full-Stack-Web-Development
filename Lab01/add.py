
# Task 1

def main ():

    # Ask the user for 2 or more number with spaces
    user_input = input("\nEnter two or more numbers separated by spaces: ").split()

    # Check if the users input is valid
    if len(user_input) < 2:
            print("Error: Please enter more than 2 numbers.\n")
            return

    # Initialize sum
    sum = 0

    # Loop through the user input
    for i in user_input:
         if i.replace('.', '', 1).isdigit():
            sum += float(i)
         else:
              print("Error: Please enter only numbers.\n")
              return
         
    print("The sum is:", sum)
    print()
 

if __name__ == "__main__": 
    main()