CC=gcc
FZ=./SQLiteFuzzySearch
FLAGS=-shared -fPIC -Isqlite3

all: levenshtein damerau_levenshtein metaphone soundex map

levenshtein: $(FZ)/levenshtein.c
	$(CC) $(FLAGS) -o levenshtein.sqlext $(FZ)/levenshtein.c

damerau_levenshtein: $(FZ)/damerau_levenshtein.c
	$(CC) $(FLAGS) -o damerau_levenshtein.sqlext $(FZ)/damerau_levenshtein.c

metaphone: $(FZ)/metaphone.c
	$(CC) $(FLAGS) -o metaphone.sqlext $(FZ)/metaphone.c

soundex: $(FZ)/soundex.c
	$(CC) $(FLAGS) -o soundex.sqlext $(FZ)/soundex.c

map: $(FZ)/map.c
	$(CC) $(FLAGS) -o map.sqlext $(FZ)/map.c
