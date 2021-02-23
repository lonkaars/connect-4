#include <stdbool.h>
#include <memory.h>

#include "voerbak.h"
#include "win.h"
#include "board.h"
#include "messages.h"
#include "argparse.h"

#define EMPTY ""

int main(int argc, char* argv[]) {
	struct arguments arguments = argparse(argc, argv);

	Board *gameBoard = createBoard(arguments.width, arguments.height);

	bool player_1 = true;
	int move = 0;
	char* message = malloc(1); // this is weird and i don't understand it but it prevents a segmentation fault or something
	strcpy(message, EMPTY);
	while (scanf("%d", &move) == 1 || scanf("%s", message) == 1) {
		if (strlen(message) != 0) {
			parseMessage(message, arguments.verbosity);

			strcpy(message, EMPTY); // clear message
			continue;
		}

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
