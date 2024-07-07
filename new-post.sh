#!/bin/bash
# Example usage: ./new-post.sh "This Is A Test Post"
rawTitle=$1
title=$(echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
posts="$HOME/github/niclake.github.io/src/posts"
year=$(date +%Y)
date=$(date +%Y-%m-%d)
time=$(date +%H:%M:%S)

cp $posts/_PostTemplate.md $posts/$year/$date-$title.md
sed -i '' -e "s/TITLE/$rawTitle/g" $posts/$year/$date-$title.md
sed -i '' -e "s/PERMALINK/$title/g" $posts/$year/$date-$title.md
sed -i '' -e "s/THEDATE/$date/g" $posts/$year/$date-$title.md
sed -i '' -e "s/THETIME/$time/g" $posts/$year/$date-$title.md
code $posts/$year/$date-$title.md
