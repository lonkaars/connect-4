#include <stdio.h>
#include <stdbool.h>

#include "messages.h"
#include "voerbak.h"

void parseMessage(char* message) {
	verbosity >= 2 && printf("Got message: \"%s\"\n", message);
}
