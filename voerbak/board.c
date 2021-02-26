#include <memory.h>

#include "board.h"
#include "win.h"

Board* createBoard(int width, int height) {
	Board *gameBoard = malloc(sizeof(Board));
	gameBoard->board = malloc(sizeof(int) * (width * height - 1));
	gameBoard->width = width;
	gameBoard->height = height;
	gameBoard->length = width * height;
	return gameBoard;
}

Board* createCopy(Board* original) {
	Board *copy = createBoard(original->width, original->height);
	copy->board = original->board;
	return copy;
}

void printBoard(Board *b) {
	for (int i = 0; i < b->length; i++)
		printf("%d", b->board[i]);
	printf("\n");
	fflush(stdout);
}

bool boardFull(Board *b) {
	for (int i = 0; i < b->length; i++)
		if (b->board[i] == 0) return false;
	return true;
}

int dropFisje(Board *b, int column, int disc) {
	for (int row = 0; row < b->height; row++) {
		int pos = column + row * b->width;
		if (b->board[pos] == 0) {
			b->board[pos] = disc;
			/* bool won = checkWin(b, pos); */
			return pos;
		}
	}
	if (verbosity >= 0) {
		printf("e:full\n");
		fflush(stdout);
	}
	return -1;
}

