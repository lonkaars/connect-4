#include <argp.h>
#include <stdlib.h>

#include "argparse.h"

const char *argp_program_version = "2.1.3";
const char *argp_program_bug_address = "https://github.com/lonkaars/po-4-op-een-rij/";
static char doc[] = "Connect 4 game solver";
static char args_doc[] = "arguments";
static struct argp_option options[] = { 
	{ "width",		'w',	"WIDTH",	0,	"Field width (columns)"},
	{ "height",		'h',	"HEIGHT",	0,	"Field height (rows)"},
	{ "solver",		'c',	"NAME",		0,	"Solver used for computing moves (unset is two humans playing)"},
	{ "verbosity",	'v',	"LEVEL",	0,	"Verbosity, 0 = none (default), 1 = info, 2 = debug"},
	{ 0 } 
};

static error_t parse_opt (int key, char *arg, struct argp_state *state) {
	struct arguments *arguments = state->input;
	switch (key) {
		case 'w': {
			arguments->width = atoi(arg);
			break;
		}
		case 'h': {
			arguments->height = atoi(arg);
			break;
		}
		case 'c': {
			arguments->solver = arg;
			break;
		}
		case 'v': {
			arguments->verbosity = atoi(arg);
			break;
		}
	}
	return 0;
}

static struct argp argp = { options, parse_opt, args_doc, doc };

struct arguments argparse(int argc, char* argv[]) {
	struct arguments arguments;
	
	arguments.height = 6;
	arguments.width = 7;
	arguments.solver = "";
	arguments.verbosity = 0;

	argp_parse(&argp, argc, argv, 0, 0, &arguments);

	return arguments;
}
