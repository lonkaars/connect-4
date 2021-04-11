from colorama import Fore
import os

DISC_SHAPE = "o"
DISC_A = Fore.RED + DISC_SHAPE + Fore.RESET
DISC_B = Fore.BLUE + DISC_SHAPE + Fore.RESET
EMPTY = Fore.LIGHTBLACK_EX + "_" + Fore.RESET


class bord:
	def __init__(self, w, h):
		self.width = w
		self.height = h
		self.board = [
			[EMPTY for x in range(self.width)] for u in range(self.height)
		]

	def print(self):
		print(
			"\n".join(
				[
					"  ".join(self.board[y])
					for y in range(len(self.board) - 1, -1, -1)
				]
			)
		)

	def outside_board(self, coords):
		return coords[0] < 0 or \
                                                                     coords[1] < 0 or \
                                                                     coords[0] > self.height - 1 or \
                                                                     coords[1] > self.width - 1

	def recursive_solve(self, coords, check_for, direction, current_length):
		new_position = (coords[0] + direction[0], coords[1] + direction[1])
		if self.outside_board(new_position) or self.board[new_position[0]][
			new_position[1]] != check_for:
			return current_length
		else:
			return self.recursive_solve(
				new_position, check_for, direction, current_length + 1
			)

	def check_win(self, coords):
		directions = [
			(1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0), (-1, -1), (0, -1),
			(1, -1)
		]
		values = list()
		for direction in directions:
			values.append(
				self.recursive_solve(
					coords, self.board[coords[0]][coords[1]], direction, 0
				)
			)
		joined_directions = [
			values[0] + values[4], values[1] + values[5],
			values[2] + values[6], values[3] + values[7]
		]
		won = any(i >= 3 for i in joined_directions)
		if won:
			for i, value in enumerate(joined_directions):
				if value >= 3:
					start_pos = (
						coords[0] + directions[i][0] * values[i],
						coords[1] + directions[i][1] * values[i],
					)
					end_pos = (
						coords[0] + directions[i + 4][0] * values[i + 4],
						coords[1] + directions[i + 4][1] * values[i + 4],
					)
					print(start_pos, end_pos)

		return won

	def drop_fisje(self, column, disc):
		for row, value in enumerate(self.board):
			if self.board[row][column] == EMPTY:
				self.board[row][column] = disc
				won = self.check_win((row, column))
				print(won)
				return


def main():
	disc_a = True
	gert = bord(11, 8)
	while True:
		gert.print()
		column = int(input("column?: ")) - 1
		os.system("clear")
		gert.drop_fisje(column, DISC_A if disc_a else DISC_B)
		disc_a = not disc_a


if __name__ == "__main__":
	main()
