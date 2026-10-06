#!/usr/bin/env bash
# Local preview at http://localhost:4000  (Linux / macOS / WSL)
set -euo pipefail
cd "$(dirname "$0")/.."
command -v bundle >/dev/null 2>&1 || { echo "Bundler not found. Install Ruby+Bundler first (see README)."; exit 1; }
bundle install
exec bundle exec jekyll serve --livereload --open-url
