#!/bin/bash
# Example usage: ./new-post.sh "This Is A Test Post"
# Or via npm: npm run new-post "This Is A Test Post"

if [ -z "$1" ]; then
    echo "Error: Post title is required"
    echo "Usage: ./new-post.sh \"Post Title\""
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
POSTS_DIR="$SCRIPT_DIR/src/posts"
TEMPLATE="$POSTS_DIR/_PostTemplate.md"

if [ ! -f "$TEMPLATE" ]; then
    echo "Error: Template file not found at $TEMPLATE"
    exit 1
fi

rawTitle="$1"
title=$(echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
year=$(date +%Y)
date=$(date +%Y-%m-%d)

# Create year directory if it doesn't exist
mkdir -p "$POSTS_DIR/$year"

# Create the new post file
newPost="$POSTS_DIR/$year/$date-$title.md"

if [ -f "$newPost" ]; then
    echo "Error: Post file already exists: $newPost"
    exit 1
fi

cp "$TEMPLATE" "$newPost"

# Use sed with different flags for macOS vs Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -e "s/TITLE/$rawTitle/g" -e "s/PERMALINK/$title/g" "$newPost"
else
    sed -i -e "s/TITLE/$rawTitle/g" -e "s/PERMALINK/$title/g" "$newPost"
fi

echo "Created new post: $newPost"

# Try to open in editor (Cursor first, then VS Code, then system default)
if command -v cursor &> /dev/null; then
    cursor "$newPost"
elif command -v code &> /dev/null; then
    code "$newPost"
elif command -v open &> /dev/null; then
    open "$newPost"
elif command -v xdg-open &> /dev/null; then
    xdg-open "$newPost"
fi
