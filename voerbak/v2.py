from colorama import Fore
import os
import time

DISC_SHAPE = "o"
DISC_A = Fore.RED + DISC_SHAPE + Fore.RESET
DISC_B = Fore.BLUE + DISC_SHAPE + Fore.RESET
EMPTY = Fore.LIGHTBLACK_EX + "_" + Fore.RESET


class bord:
    def __init__(self, w, h):
        self.width = w
        self.height = h
        self.board = [EMPTY] * (w * h)

    def print(self):
        for y in range(self.height - 1, -1, -1):
            for x in range(self.width):
                print(self.board[x + y * self.width], end="  ")
            print("\n", end="")

    def recursive_solve(self, pos, check_for, direction, current_length):
        overflow = (pos % self.width) + direction
        if overflow == self.width or overflow == -1:  # horizontal overflow
            return current_length
        new_position = pos + direction
        if new_position < 0 or new_position > self.width * self.height - 1:  # vertical overflow
            return current_length
        if self.board[new_position] != check_for:
            return current_length
        return self.recursive_solve(
            new_position, check_for, direction, current_length + 1
        )

    def check_win(self, pos):
        directions = [
            self.width,  # north
            self.width + 1,  # northeast
            1,  # east
            -self.width + 1,  # southeast
            -self.width,  # south
            -self.width - 1,  # southwest
            -1,  # west
            self.width - 1,  # northwest
        ]
        values = list()
        for direction in directions:
            values.append(
                self.recursive_solve(pos, self.board[pos], direction, 0)
            )
        joined_directions = [
            values[0] + values[4], values[1] + values[5],
            values[2] + values[6], values[3] + values[7]
        ]
        won = any(i >= 3 for i in joined_directions)
        if won:
            for i, value in enumerate(joined_directions):
                if value >= 3:
                    start_pos = pos + directions[i] * values[i]
                    end_pos = pos + directions[i + 4] * values[i + 4]
                    print(start_pos, end_pos)
                    self.board[start_pos] = "x"
                    self.board[end_pos] = "x"
        return won

    def debug(self, pos):
        self.board[pos] = "x"
        directions = [
            self.width,  # 0: north
            self.width + 1,  # 1: northeast
            1,  # 2: east
            -self.width + 1,  # 3: southeast
            -self.width,  # 4: south
            -self.width - 1,  # 5: southwest
            -1,  # 6: west
            self.width - 1,  # 7: northwest
        ]

        for index, direction in enumerate(directions):
            new_position = pos + direction
            if new_position > len(self.board) - 1 or new_position < 0: continue
            if index in range(1, 4) and pos % self.width == self.width - 1:
                continue
            if index in range(5, 8) and pos % self.width == 0: continue
            self.board[new_position] = "o"

    def drop_fisje(self, column, disc):
        for row in range(self.height):
            pos = column + row * self.width
            if self.board[pos] == EMPTY:
                self.board[pos] = disc
                won = self.check_win(pos)
                print(won)
                return


def main():
    disc_a = True
    gert = bord(7, 6)
    for x in range(len(gert.board)):
        gert = bord(7, 6)
        gert.debug(x)
        gert.print()
        print("\n\n", end='')
        time.sleep(0.1)


if __name__ == "__main__":
    main()
