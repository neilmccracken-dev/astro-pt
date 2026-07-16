#!/usr/bin/env bash

set -e

BASE_REF="${CACHED_COMMIT_REF:-HEAD^}"
HEAD_REF="${COMMIT_REF:-HEAD}"

CHANGED_FILES="$(git diff --name-only "$BASE_REF" "$HEAD_REF")"

echo "Changed files:"
echo "$CHANGED_FILES"

if echo "$CHANGED_FILES" | grep -Eq \
'^(astro\.config\.mjs|keystatic\.config\.ts|netlify\.toml|netlify-ignore\.sh|package\.json|package-lock\.json|src/middleware(\..*)?)$'
then
  echo "Netlify or Keystatic infrastructure changed — build."
  exit 1
fi

echo "No Netlify or Keystatic infrastructure changes — skip build."
exit 0