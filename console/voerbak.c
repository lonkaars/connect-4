#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
#include <stdbool.h>

#define DISC_A "\x1b[31mo\x1b[39m"
#define DISC_B "\x1b[34mo\x1b[39m"
#define EMPTY  "\x1b[90m_\x1b[39m"

void printBoard(int board[], int width, int height) {
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
	printf("recursiveSolve call\n");
	int overflow = (pos % width) + direction;
	printf("overflow: %d\n", overflow);
	if (overflow == width || overflow == -1)
		return currentLength;
	int newPos = pos + direction;
	printf("newPos: %d\n", newPos);
	if (newPos < 0 || newPos > width * height - 1)
		return currentLength;
	if (board[newPos] != checkFor)
		return currentLength;
	printf("recursion increase\n");
	/* exit(0); */
	return recursiveSolve(board, width, height, pos, checkFor, direction, currentLength + 1);
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
			won = true;
			break;
		}
	}

	return won;
}

void dropFisje(int board[], int width, int height, int column, int disc) {
	for (int row = 0; row < height; row++) {
		int pos = column + row * width;
		if (board[pos] == 0) {
			board[pos] = disc;
			bool won = checkWin(board, width, height, pos);
			/* printf("%d", won); */
			return;
		}
	}
}

int main() {
	int width, height;
	scanf("%d %d", &width, &height);

	int board[width * height];
	memset(board, 0, sizeof board);

	bool player_1 = true;
	int move = 0;
	while (scanf("%d", &move) == 1) {
		dropFisje(board, width, height, move - 1, player_1 + 1);
		printf("New board:\n");
		printBoard(board, width, height);
		player_1 = !player_1;
	}
	printBoard(board, width, height);

	return 0;
}
