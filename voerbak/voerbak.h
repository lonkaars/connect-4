#pragma once
#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
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
 * @return `true` if drop was successful, `false` if column full
 */
bool dropFisje(Board*, int, int);

/**
 * @brief Main function
 */
int main();
