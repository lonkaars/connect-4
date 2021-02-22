#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
#include <stdbool.h>

void printBoard(int board[], int width, int height) {
	for (int i = 0; i < width * height; i++)
		printf("%d", board[i]);
	printf("\n");
	fflush(stdout);
}

int recursiveSolve(int board[], int width, int height, int pos, int checkFor, int direction, int d_index, int currentLength) {
	int newPos = pos + direction;
	if (newPos > width * height - 1 || newPos < 0) return currentLength;
	int row = pos % width;
	if (row == width && d_index >= 1 && d_index <= 3) return currentLength;
	if (row == 0 && d_index >= 5 && d_index <= 7) return currentLength;
	if (board[newPos] != checkFor) return currentLength;
	return recursiveSolve(board, width, height, newPos, checkFor, direction, d_index, currentLength + 1);
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
		values[i] = recursiveSolve(board, width, height, pos, board[pos], directions[i], i, 0);

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

bool boardFull(int board[], int width, int height) {
	for (int i = 0; i < width * height; i++)
		if (board[i] == 0) return false;
	return true;
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

		if (boardFull(board, width, height)) {
			printf("d:full\n");
			fflush(stdout);
		}

		printBoard(board, width, height);
	}

	return 0;
}
