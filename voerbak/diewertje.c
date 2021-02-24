#include <stdio.h>

#include "board.h"
#include "voerbak.h"

int diewertje(Board *b) {
	verbosity >= 2 && printf("Got a diewertje request, from a board that's %dx%d\n", b->width, b->height);
	return 2;
}
