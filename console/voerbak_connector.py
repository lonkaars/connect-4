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
        self.board = "0" * (w * h)
        self.win_positions = []
        self.process = subprocess.Popen(["./voerbak"],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE)
        self.process.stdin.write(bytearray(f"{w} {h}\n", "utf-8"))
        self.process.stdin.flush()

    def update_board(self):
        buffer = self.process.stdout.readline()
        while buffer.decode().startswith("w"):
            self.win_positions.append(buffer.decode()[2:-1].split("-"))
            buffer = self.process.stdout.readline()
        self.board = buffer.decode()

    def print(self):
        for y in range(self.height -1, -1, -1):
            for x in range(self.width):
                state = self.board[x + y * self.width]
                char = [EMPTY,
                        DISC_A,
                        DISC_B
                        ]
                print(char[int(state)], end="  ")
            print("\n", end="")

    def drop_fisje(self, column):
        self.process.stdin.write(bytearray(f"{column}\n", "utf-8"))
        self.process.stdin.flush()
        self.update_board()

def main():
    gert = bord(7, 6)
    while True:
        # gert.print()
        column = int(input("column?: "))
        if column not in range(gert.width):
            continue
        # os.system("clear")
        gert.drop_fisje(column)
        gert.print()
        print(gert.win_positions)

if __name__ == "__main__":
    main()

