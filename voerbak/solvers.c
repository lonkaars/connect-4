#include <string.h>
#include <stdio.h>

#include "board.h"

#include "diewertje.h"

int cpuMove(Board* b, char* solver) {
	if (strcmp(solver, "diewertje") == 0) return diewertje(b);

	return 0;
}
