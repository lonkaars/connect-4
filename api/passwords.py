import bcrypt

def enc(string):
    return string.encode('utf-8')

def check_password(password, password_hash):
    return bcrypt.checkpw(enc(password), password_hash)

def password_hash(password):
    return bcrypt.hashpw(enc(password), bcrypt.gensalt())
