---
title: "Move File to Group - a VS Code extension"
permalink: /vs-code-move-file-to-group/index.html
date: 2025-03-17T21:19:10Z
description: A VS Code extension that puts 'Move {direction}' into a file's contextual menu.
image: vs-code-move-icon.png
projectInfo: "A VS Code extension that puts 'Move {direction}' into a file's contextual menu."
projectLink: https://marketplace.visualstudio.com/items?itemName=niclake.move-file-to-group
tags: 
  - Project
---

{% include 'image.njk',
  src: "vs-code-move-icon.png",
  position: "banner",
  alt: "someAltText"
%}

Long-time JetBrains IDE users will be familiar with the "Move {direction}" options from the tab contextual menus. VS Code defaults to Split, which isn't always the most ideal, and the Move commands are buried in keyboard settings & never surfaced in any menus.

Thankfully, VS Code extensions are relatively easy to make... so I did. This extension puts "Move {direction}" options in the editor tab contextual (right click) menu.

{% include 'image.njk',
  src: "vs-code-move.png",
  position: "banner",
  alt: "someAltText"
%}

[The extension is available in the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=niclake.move-file-to-group), or you can find it by searching `Move File to Group` and looking for the moving van picture. [The source code is available on Github](https://github.com/niclake/move-file-to-group).
