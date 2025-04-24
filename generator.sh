#!/bin/bash


# STEP 0: Check if js-interpreter is empty and clone if necessary
if [ ! -d "js-interpreter" ] || [ ! "$(ls -A js-interpreter)" ]; then
    echo "js-interpreter is empty, cloning submodules..."
    git submodule update --init --recursive
fi

# STEP 1: Copy Acorn over
cp js-interpreter/acorn.js .

# STEP 2: Make up the interpreter

cp js-interpreter/interpreter.js js-interpreter.js
patch -p1 < my.diff js-interpreter.js
