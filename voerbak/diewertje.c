#include <stdio.h>
#include <memory.h>

#include "board.h"
#include "win.h"
#include "voerbak.h"

int diewertje(Board *b) {
	int pre_verbosity = verbosity;
	verbosity >= 2 && printf("Got a diewertje request, from a board that's %dx%d\n", b->width, b->height);
	
	int outcome[b->width];

	verbosity = -1;
	Board *copy = createCopy(b);
	for (int c = 0; c < b->width; c++) {
		int drop = dropFisje(copy, c, 1);

		printBoard(copy);

		outcome[c] = drop == -1 ? 0 : checkWin(copy, drop);
		if(drop != -1) copy->board[drop] = 0; // remove disc from copy
	}
	verbosity = pre_verbosity;

	printf("[");
	for(int i = 0; i < b->width; i++) {
		printf(i + 1 == b->width ? "%d" : "%d, ", outcome[i]);
	}
	printf("]\n");

	return 2;
}

