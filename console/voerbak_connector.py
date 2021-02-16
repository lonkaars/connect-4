from colorama import Fore
import subprocess
import os

DISC_SHAPE = "o"
DISC_A = Fore.RED + DISC_SHAPE + Fore.RESET
DISC_B = Fore.BLUE + DISC_SHAPE + Fore.RESET
EMPTY = Fore.LIGHTBLACK_EX + "_" + Fore.RESET

class bord:
    def __init__(self, w, h):
        self.width = w
        self.height = h
        self.process = subprocess.Popen(["./voerbak"],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE)
        msg = bytearray(f"{w} {h}\n", "utf-8")
        print({"msg": msg})
        self.process.stdin.write(msg)
        self.process.stdin.flush()

    # def print(self):
    #     for y in range(self.height -1, -1, -1):
    #         for x in range(self.width):
    #             print(self.board[x + y * self.width], end="  ")
    #         print("\n", end="")

    def drop_fisje(self, column):
        msg = bytearray(f"{column}\n", "utf-8")
        print({"msg": msg})
        self.process.stdin.write(msg)
        self.process.stdin.flush()

def main():
    gert = bord(7, 6)
    while True:
        # gert.print()
        column = int(input("column?: ")) - 1
        if column not in range(gert.width):
            continue
        # os.system("clear")
        gert.drop_fisje(column)
        print(gert.process.stdout.readline())

if __name__ == "__main__":
    main()

