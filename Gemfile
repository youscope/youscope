source "https://rubygems.org"

# Jekyll 4.x: built and deployed via GitHub Actions / GitLab CI (not the
# classic GitHub Pages auto-build), so we are free to pick plugin versions.
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-seo-tag", "~> 2.8"
  # Enabled for the full site later; harmless to install now:
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-feed", "~> 0.17"
end

# Windows / JRuby timezone data + faster file watching on Windows.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.2.0", :platforms => [:mingw, :mswin, :x64_mingw]


# Ruby 3.4+ no longer ships these as default gems.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "webrick", "~> 1.8"
