#!/bin/sh

if ! command -v circleci > /dev/null 2>&1; then
  echo "\033[0;31m" \
    "Please, install CircleCI CLI to validate config:" \
    "https://circleci.com/docs/2.0/local-cli/"

  exit 0
fi

# Update circleci-cli to the latest version to use --org-slug option
circleci config validate --org-slug gh/shelfio
