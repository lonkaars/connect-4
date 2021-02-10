from colorama import Fore
import os

DISC_SHAPE = "o"
DISC_A = Fore.RED + DISC_SHAPE + Fore.RESET
DISC_B = Fore.BLUE + DISC_SHAPE + Fore.RESET
EMPTY = Fore.LIGHTBLACK_EX + "_" + Fore.RESET

class bord:
    def __init__(self, w, h):
        self.board = [[EMPTY for x in range(w)] for u in range(h)]

    def print(self):
        print("\n".join(["  ".join(y) for y in self.board]))

    def drop_fisje(self, column, disc):
        row = -1
        for r in range(len(self.board)):
            if self.board[r][column] != EMPTY:
                row = r - 1
                break
        self.board[row][column] = disc

def main():
    disc_a = True
    gert = bord(7, 6)
    while True:
        gert.print()
        column = int(input("column?: ")) - 1
        os.system("clear")
        gert.drop_fisje(column, DISC_A if disc_a else DISC_B)
        disc_a = not disc_a

if __name__ == "__main__":
    main()

