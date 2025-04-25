#!/usr/bin/env bash

# Bash Strict Mode (http://redsymbol.net/articles/unofficial-bash-strict-mode/)
set -euo pipefail
IFS=$'\n\t'

# Constants
CUSTOM_POST_CREATE_SCRIPT_PATH=.post_create_custom.sh

# Run custom post create script
if [ -f "$CUSTOM_POST_CREATE_SCRIPT_PATH" ]; then
  echo "Run custom post create script ($CUSTOM_POST_CREATE_SCRIPT_PATH)..."
  eval "$CUSTOM_POST_CREATE_SCRIPT_PATH"
fi
