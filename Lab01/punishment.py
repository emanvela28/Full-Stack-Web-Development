

def punishment ():
    sentence = input("Please enter a sentence: ")
    rep = input ("How many times should this sentence be repeated? ")

    if not rep.isdigit() or int(rep) < 1:
        print("Please enter a valid positive number for sentence repetition.")
        return
    
    rep = int(rep)


    with open("CompletedPunishment.txt","w") as file:
        for i in range(rep): 
            file.write(sentence + "\n")

    print("Punishment completed! Please check CompletedPunishment.txt for the results.")


punishment()