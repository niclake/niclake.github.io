#!/bin/bash

# Install git hooks by copying them from the hooks/ directory to .git/hooks/

HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)/hooks"
GIT_HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)/.git/hooks"

if [ ! -d "$HOOKS_DIR" ]; then
    echo "Error: hooks/ directory not found"
    exit 1
fi

if [ ! -d "$GIT_HOOKS_DIR" ]; then
    echo "Error: .git/hooks/ directory not found. Are you in a git repository?"
    exit 1
fi

# Copy all hooks from hooks/ to .git/hooks/
for hook in "$HOOKS_DIR"/*; do
    if [ -f "$hook" ]; then
        hook_name=$(basename "$hook")
        cp "$hook" "$GIT_HOOKS_DIR/$hook_name"
        chmod +x "$GIT_HOOKS_DIR/$hook_name"
        echo "Installed: $hook_name"
    fi
done

echo "Git hooks installed successfully!"
