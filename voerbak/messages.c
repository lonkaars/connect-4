#include <stdio.h>
#include <stdbool.h>

#include "messages.h"

void parseMessage(char* message, int verbosity) {
	verbosity > 2 && printf("Got message: \"%s\"\n", message);
}
