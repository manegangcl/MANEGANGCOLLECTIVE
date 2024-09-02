import secrets
import string

print('\n'.join(''.join(secrets.choice("abcdefghijklmnopqrstuvwxyz" + "1234567890") for _ in range(14)) for _ in range(10)))