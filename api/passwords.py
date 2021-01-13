import bcrypt

def enc(string):
    return string.encode('utf-8')

def salt():
    return bcrypt.gensalt()

def check_password(password, salt, password_hash):
    return bcrypt.checkpw(enc(password)+salt, enc(password_hash))

def password_hash(password, salt):
    return bcrypt.hashpw(enc(password), salt);
