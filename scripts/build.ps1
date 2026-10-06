# Production build into ._site  (Windows PowerShell / CI)
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
$env:JEKYLL_ENV = "production"
bundle install
bundle exec jekyll build --trace
Write-Host "Built into ._site"
