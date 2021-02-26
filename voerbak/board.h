#pragma once
#include <stdbool.h>

/**
 * @brief Structure to store a board
 *
 * @param width Board width
 * @param height Board height
 * @param length Board state array length (width * height)
 * @param board Board state array
 */
typedef struct {
	int width;
	int height;
	int length;
	int* board;
} Board;

/**
 * @brief Create new board
 *
 * @param width Board width
 * @param height Board height
 *
 * @return Empty board
 */
Board* createBoard(int, int);

/**
 * @brief Create a copy of board
 *
 * @param board Original board
 *
 * @return Pointer to new board
 */
Board* createCopy(Board*);

/**
 * @brief Print the board array
 */
void printBoard(Board*);

/**
 * @brief Check if the board is full (draw)
 *
 * @return `true` board is full
 */
bool boardFull(Board*);

/**
 * @brief Drop a disc into the board
 *
 * @return New disc position or -1 if disc wasn't dropped
 */
int dropFisje(Board*, int, int);

