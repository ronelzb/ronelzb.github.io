source "https://rubygems.org"

gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-sitemap", "~> 1.4"
end

gem "webrick", "~> 1.9"

# Windows and JRuby do not include zoneinfo files
platforms :windows, :jruby do
  gem "tzinfo", "~> 2.0"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.2", platforms: [:windows]
