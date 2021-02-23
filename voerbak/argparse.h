/** @brief Used for storing arguments */
struct arguments {
	int width, height;
	char* solver;
	int verbosity;
};

/** @brief Parse arguments */
struct arguments argparse(int argc, char* argv[]);
