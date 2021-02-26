#include <stdbool.h>
#include <memory.h>

#include "voerbak.h"
#include "win.h"
#include "board.h"
#include "messages.h"
#include "argparse.h"
#include "solvers.h"

#define EMPTY ""

int verbosity = 0;

int main(int argc, char* argv[]) {
	struct arguments arguments = argparse(argc, argv);
	verbosity = arguments.verbosity;

	Board *gameBoard = createBoard(arguments.width, arguments.height);

	bool cpu_2 = strlen(arguments.solver) > 0;
	bool player_1 = true;
	int move = 0;
	char* message = malloc(1); // this is weird and i don't understand it but it prevents a segmentation fault or something
	strcpy(message, EMPTY);
	while (scanf("%d", &move) == 1 || scanf("%s", message) == 1) {
		if (strlen(message) != 0) {
			parseMessage(message);

			strcpy(message, EMPTY); // clear message
			continue;
		}

		move:

		if (move == 0) break;
		if (move < 1 || move > gameBoard->width) continue;

		int drop = dropFisje(gameBoard, move - 1, player_1 + 1);

		if (drop == -1) {
			printBoard(gameBoard);
			continue;
		}

		player_1 = !player_1; // only flip turns on successful drop

		bool won = checkWin(gameBoard, drop);

		if (verbosity >= 0 ) {
			cpu_2 == false && printf("m:%s\n", player_1 ? "true" : "false");
			fflush(stdout);
		}

		if (boardFull(gameBoard)) {
			printf("d:full\n");
			fflush(stdout);
		}

		printBoard(gameBoard);

		if (cpu_2 && !player_1) {
			move = cpuMove(gameBoard, arguments.solver);
			goto move;
		}
	}

	return 0;
}
