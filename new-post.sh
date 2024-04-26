#!/bin/bash
title=$(echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
cp ~/github/niclake.github.io/_posts/_PostTemplate.md ~/github/niclake.github.io/_posts/$(date +%Y-%m-%d)-$title.md