#!/usr/bin/env bash
# Production build into ./_site
set -euo pipefail
cd "$(dirname "$0")/.."
bundle install
JEKYLL_ENV=production bundle exec jekyll build --trace
echo "Built into ./_site"
