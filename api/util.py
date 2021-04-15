def all_def(props):
	return all(bool(v) for v in props)


def all_notdef(props):
	return all(not v for v in props)
