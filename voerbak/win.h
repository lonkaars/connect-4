#pragma once
#include <stdbool.h>

#include "voerbak.h"
#include "board.h"

/**
 * @brief Get length of longest streak with same color from `pos` in direction `direction`
 *
 * @param b Board to check
 * @param pos Position to check win position from (position of last dropped disc)
 * @param direction Direction offset to step forward to
 * @param d_index Index of direction in directions array (defined in `checkWin()`)
 * @param currentLength Current length of same color 'streak'
 *
 * @return Length of longest streak with same color from `pos` in direction `direction`
 */
int winCheckRecursive(Board*, int, int, int, int);

/**
 * @brief Check for winning position from position `pos`
 *
 * @param b Board to check
 * @param pos Position to check win position from (position of last dropped disc)
 *
 * @return `true` if game was won by the color that's in `b->board[pos]`
 */
bool checkWin(Board*, int);
