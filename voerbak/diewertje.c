#include <stdio.h>

#include "board.h"

int diewertje(Board *b) {
	printf("Got a diewertje request, from a board that's %dx%d\n", b->width, b->height);
	return 2;
}
