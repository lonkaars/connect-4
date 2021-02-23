from colorama import Fore
import log
import subprocess
import os

DISC_SHAPE = "o"
DISC_A = Fore.RED + DISC_SHAPE + Fore.RESET
DISC_B = Fore.BLUE + DISC_SHAPE + Fore.RESET
EMPTY = Fore.LIGHTBLACK_EX + "_" + Fore.RESET

VOERBAK_LOCATION = os.path.join(os.getcwd(), "voerbak/", "voerbak")
if os.name == "nt": VOERBAK_LOCATION += ".exe"

class bord:
    def __init__(self, w, h):
        self.width = w
        self.height = h
        self.player_1 = True
        self.board = "0" * (w * h)
        self.board_full = False
        self.win_positions = []
        self.process = subprocess.Popen([VOERBAK_LOCATION],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=None)
        self.process.stdin.write(bytearray(f"{w} {h}\n", "utf-8"))
        self.process.stdin.flush()

    def get_output(self):
        return self.process.stdout.readline().decode()[:-1]

    def kill_voerbak(self):
        self.process.stdin.write(bytearray("0", "utf-8"))
        self.process.stdin.flush()

    def update_board(self):
        buffer = self.get_output()
        while not buffer.isdigit():
            if buffer.startswith("w:"):
                self.win_positions.append(buffer[2:].split("-"))
                log.info(f"won: {buffer[2:].split('-')}")
                self.kill_voerbak()
            elif buffer.startswith("e:"):
                log.warning(buffer[2:])
            elif buffer.startswith("m:"):
                substr = buffer[2:]
                self.player_1 = True if substr == "true" else False
            elif buffer.startswith("d:"):
                self.board_full = True
                self.kill_voerbak()
            buffer = self.get_output()
        self.board = buffer

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
        print(gert.player_1)
        if len(gert.win_positions) > 0:
            print(f"won: {gert.win_positions}")
            exit(0)
        gert.print()
        column = int(input("column?: ")) - 1
        if column not in range(gert.width):
            continue
        gert.drop_fisje(column + 1)

if __name__ == "__main__":
    main()

