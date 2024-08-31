import secrets
import string

print('\n'.join(''.join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(14)) for _ in range(100)))