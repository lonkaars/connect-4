# Voerbak

Here's the source for voerbak, this project's connect 4 engine. The name comes
from an abbreviation for the Dutch word for connect 4: Vier Op Een Rij -> VOER +
bak = voerbak

Voerbak uses a 1-dimensional array for storing the playfield, and it's printed
after every move. The ordering is left to right, then bottom to top:

| 35 | 36 | 37 | 38 | 39 | 40 | 41 |
| -- | -- | -- | -- | -- | -- | -- |
| 28 | 29 | 30 | 31 | 32 | 33 | 34 |
| 21 | 22 | 23 | 24 | 25 | 26 | 27 |
| 14 | 15 | 16 | 17 | 18 | 19 | 20 |
| 7  | 8  | 9  | 10 | 11 | 12 | 13 |
| 0  | 1  | 2  | 3  | 4  | 5  | 6  |

Voerbak is used in this project using api/game/voerbak_connector.py

## Building

```sh
make
```

## Input

Voerbak takes moves seperated by newlines from stdin. An example game would look
like this:

```sh
echo "4,3,3,2,1,2,2,7,1,7,1,7,1" | sed "s/,/\n/g" | ./voerbak
#                                  ^ convert "," to newline
```

## Output

Voerbak outputs special messages in this format:

```
e:full
^ \__/
|  |
|  message (without spaces)
|
message type
```

Message reference:

| type | name   | messages                                      |
| ---- | ------ | --------------------------------------------- |
| d    | draw   | full = board is full                          |
| e    | errors | full = column is full                         |
| m    | move   | true                                          |
| w    | win    | int-int = board indices where 4 was connected |

## Command-line arguments

```sh
$ ./voerbak --help
Usage: voerbak [OPTION...] arguments
Connect 4 engine

  -c, --solver=NAME          Solver used for computing moves (unset is two
                             humans playing)
  -h, --height=HEIGHT        Field height (rows)
  -v, --verbosity=LEVEL      Verbosity, 0 = none (default), 1 = info, 2 =
                             debug
  -w, --width=WIDTH          Field width (columns)
  -?, --help                 Give this help list
      --usage                Give a short usage message
  -V, --version              Print program version

Mandatory or optional arguments to long options are also mandatory or optional
for any corresponding short options.

Report bugs to https://github.com/lonkaars/po-4-op-een-rij/.
```
