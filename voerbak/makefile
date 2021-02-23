CC = gcc
LD = gcc
RM = rm -f
CFLAGS =

SOURCES := $(wildcard *.c)
OBJECTS := $(patsubst %.c,%.o, $(SOURCES))

all: voerbak

.cpp.o:
	$(CC) -c $(CFLAGS) $<

voerbak: $(OBJECTS)
	$(CC) $(OBJECTS) -o voerbak

clean:
	$(RM) voerbak

distclean: clean
	$(RM) *.o
