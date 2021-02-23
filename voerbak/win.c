#include <stdio.h>
#include <stdbool.h>

#include "voerbak.h"
#include "board.h"

int winCheckRecursive(Board *b, int pos, int direction, int d_index, int currentLength) {
	int newPos = pos + direction;
	if (newPos > b->length - 1 || newPos < 0) return currentLength;
	int row = pos % b->width;
	if (row == b->width && d_index >= 1 && d_index <= 3) return currentLength;
	if (row == 0 && d_index >= 5 && d_index <= 7) return currentLength;
	if (b->board[newPos] != b->board[pos]) return currentLength;
	return winCheckRecursive(b, newPos, direction, d_index, currentLength + 1);
}

bool checkWin(Board *b, int pos) {
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
		values[i] = winCheckRecursive(b, pos, directions[i], i, 0);

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

