#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
#include <stdbool.h>

#define DISC_A "\x1b[31mo\x1b[39m"
#define DISC_B "\x1b[34mo\x1b[39m"
#define EMPTY  "\x1b[90m_\x1b[39m"

void printBoard(int board[], int width, int height) {
	for (int i = 0; i < width * height; i++)
		printf("%d", board[i]);
	printf("\n");
	fflush(stdout);
}

void printHumanBoard(int board[], int width, int height) {
	for (int y = height - 1; y > -1; y--) {
		for (int x = 0; x < width; x++) {
			int val = board[x + y * width];
			char *print =
				val == 0 ? EMPTY :
				val == 1 ? DISC_A :
				val == 2 ? DISC_B :
				EMPTY;
			printf("%s  ", print);
		}
		printf("\n");
	}
}

int recursiveSolve(int board[], int width, int height, int pos, int checkFor, int direction, int currentLength) {
	int overflow = (pos % width) + direction;
	if (overflow == width || overflow == -1)
		return currentLength;
	int newPos = pos + direction;
	if (newPos < 0 || newPos > width * height - 1)
		return currentLength;
	if (board[newPos] != checkFor)
		return currentLength;
	return recursiveSolve(board, width, height, newPos, checkFor, direction, currentLength + 1);
}

bool checkWin(int board[], int width, int height, int pos) {
	int directions[8] = {
		width,      // north
		width + 1,  // northeast
		1,          // east
		-width + 1, // southeast
		-width,     // south
		-width -1,  // southwest
		-1,         // west
		width -1    // northwest
	};

	int values[8];
	for (int i = 0; i < 8; i++)
		values[i] = recursiveSolve(board, width, height, pos, board[pos], directions[i], 0);

	int joinedValues[4] = {
		values[0] + values[4],
		values[1] + values[5],
		values[2] + values[6],
		values[3] + values[7]
	};

	bool won = false;
	for (int i = 0; i < 4; i++) {
		if (joinedValues[i] >= 3) {
			won = won || true;

			int start_pos = pos + directions[i+0] * values[i+0];
			int end_pos =   pos + directions[i+4] * values[i+4];
			printf("w:%d-%d\n", start_pos, end_pos);
			fflush(stdout);
		}
	}

	return won;
}

bool dropFisje(int board[], int width, int height, int column, int disc) {
	for (int row = 0; row < height; row++) {
		int pos = column + row * width;
		if (board[pos] == 0) {
			board[pos] = disc;
			bool won = checkWin(board, width, height, pos);
			return true; // success
		}
	}
	printf("e:full\n");
	fflush(stdout);
	return false; // unsuccessful drop on board full
}

int main() {
	int width, height;
	scanf("%d %d", &width, &height);

	int board[width * height];
	memset(board, 0, sizeof board);

	bool player_1 = true;
	int move = 0;
	while (scanf("%d", &move) == 1) {
		if (move == 0) break;
		if (move < 1 || move > width) continue;

		bool dropSuccess = dropFisje(board, width, height, move - 1, player_1 + 1);

		player_1 = player_1 ^ dropSuccess; // only flip turns on successful drop
		printf("m:%s\n", player_1 ? "true" : "false");
		fflush(stdout);

		printBoard(board, width, height);
	}

	return 0;
}
