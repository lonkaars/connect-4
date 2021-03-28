import bcrypt

# encode string as utf-8
def enc(string):
    return string.encode('utf-8')

# check if password matches against hash in database
def check_password(password, password_hash):
    return bcrypt.checkpw(enc(password), password_hash)

# hash a password for storing in the database
def password_hash(password):
    return bcrypt.hashpw(enc(password), bcrypt.gensalt())

