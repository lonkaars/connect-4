#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
#include <stdbool.h>

struct Board {
	int width;
	int height;
	int length;
	int* board;
};

void printBoard(struct Board *b) {
	for (int i = 0; i < b->length; i++)
		printf("%d", b->board[i]);
	printf("\n");
	fflush(stdout);
}

int recursiveSolve(struct Board *b, int pos, int direction, int d_index, int currentLength) {
	int newPos = pos + direction;
	if (newPos > b->length - 1 || newPos < 0) return currentLength;
	int row = pos % b->width;
	if (row == b->width && d_index >= 1 && d_index <= 3) return currentLength;
	if (row == 0 && d_index >= 5 && d_index <= 7) return currentLength;
	if (b->board[newPos] != b->board[pos]) return currentLength;
	return recursiveSolve(b, newPos, direction, d_index, currentLength + 1);
}

bool checkWin(struct Board *b, int pos) {
	int directions[8] = {
		b->width,      // north
		b->width + 1,  // northeast
		1,          // east
		-b->width + 1, // southeast
		-b->width,     // south
		-b->width -1,  // southwest
		-1,         // west
		b->width -1    // northwest
	};

	int values[8];
	for (int i = 0; i < 8; i++)
		values[i] = recursiveSolve(b, pos, directions[i], i, 0);

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

bool boardFull(struct Board *b) {
	for (int i = 0; i < b->length; i++)
		if (b->board[i] == 0) return false;
	return true;
}

bool dropFisje(struct Board *b, int column, int disc) {
	for (int row = 0; row < b->height; row++) {
		int pos = column + row * b->width;
		if (b->board[pos] == 0) {
			b->board[pos] = disc;
			bool won = checkWin(b, pos);
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

	struct Board *gameBoard = malloc(sizeof(struct Board));
	gameBoard->board = malloc(sizeof(int) * (width * height - 1));
	gameBoard->width = width;
	gameBoard->height = height;
	gameBoard->length = width * height;

	bool player_1 = true;
	int move = 0;
	while (scanf("%d", &move) == 1) {
		if (move == 0) break;
		if (move < 1 || move > gameBoard->width) continue;

		bool dropSuccess = dropFisje(gameBoard, move - 1, player_1 + 1);

		player_1 = player_1 ^ dropSuccess; // only flip turns on successful drop
		printf("m:%s\n", player_1 ? "true" : "false");
		fflush(stdout);

		if (boardFull(gameBoard)) {
			printf("d:full\n");
			fflush(stdout);
		}

		printBoard(gameBoard);
	}

	return 0;
}
