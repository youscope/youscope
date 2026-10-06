# Local preview at http://localhost:4000  (Windows PowerShell)
# Prereq: Ruby+Devkit from https://rubyinstaller.org  (then: gem install bundler)
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
if (-not (Get-Command bundle -ErrorAction SilentlyContinue)) {
  Write-Error "Bundler not found. Install Ruby+Devkit (rubyinstaller.org), then 'gem install bundler'."
}
bundle install
bundle exec jekyll serve --livereload --port 4005
