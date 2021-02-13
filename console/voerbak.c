#include <stdio.h>
#include <memory.h>

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

int main() {
	int width, height;
	scanf("%d %d", &width, &height);

	int board[width * height];
	memset(board, 0, sizeof board);

	board[2] = 1;
	board[3] = 2;
	printBoard(board, width, height);

	return 0;
}
