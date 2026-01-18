import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
EXCLUDE_DIRS = {'.venv', 'node_modules', '__pycache__', '.git', '.pytest_cache', 'dist', 'build'}

TARGETS = [
    '/uxbot/api/otp/send',
    '/uxbot/api/otp/verify',
    '/uxbot/api/guru/register',
]


def iter_files(exts):
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            if any(fn.endswith(ext) for ext in exts):
                yield os.path.join(dirpath, fn)


def find_literal(lit, exts):
    for path in iter_files(exts):
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                for i, line in enumerate(f, 1):
                    if lit in line:
                        yield path, i, line.rstrip('\n')
        except OSError:
            continue


def main():
    for t in TARGETS:
        print(f"\n=== LITERAL SEARCH: {t} ===")
        hits = list(find_literal(t, exts=['.py', '.html', '.js']))
        if not hits:
            print('(no matches)')
        else:
            for path, i, line in hits[:200]:
                print(f"{path}:{i}: {line.strip()}")

    print("\n=== ROUTE-LIKE SEARCH (Python only) ===")
    rx = re.compile(r"route\([^\n]*?(otp|guru|/api/otp|/api/guru|otp/send|otp/verify|guru/register)", re.IGNORECASE)
    count = 0
    for path in iter_files(exts=['.py']):
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                for i, line in enumerate(f, 1):
                    if rx.search(line):
                        print(f"{path}:{i}: {line.strip()}")
                        count += 1
                        if count >= 400:
                            return 0
        except OSError:
            continue
    if count == 0:
        print('(no matches)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
