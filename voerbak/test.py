import subprocess

w = 7
h = 6
column = 3

process = subprocess.Popen(["./voerbak"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=None)

process.stdin.write(bytearray(f"{w} {h}\n", "utf-8"))
process.stdin.flush()

process.stdin.write(bytearray(f"{column}\n", "utf-8"))
process.stdin.flush()

# process.stdin.write(b"0\n")
# process.stdin.flush()
# for c in iter(lambda: process.stdout.read(1), b''):
#     sys.stdout.write(c)

print(process.stdout.readlines(5))

