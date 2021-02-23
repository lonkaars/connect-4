#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
#include <stdbool.h>

#include "voerbak.h"
#include "win.h"

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

bool dropFisje(Board *b, int column, int disc) {
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

	Board *gameBoard = malloc(sizeof(Board));
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
