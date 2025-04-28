#!/bin/bash
set -e

# Wipe any previous output
> llms.txt

echo "🔨 Building llms.txt ..."

# Helper function: convert a single HTML file to Markdown and clean it
convert_html_to_md() {
  pandoc \
    --lua-filter=clean-all.lua \
    --strip-comments \
    --wrap=none \
    -f html \
    -t markdown-simple_tables-multiline_tables-grid_tables \
    "$1" \
  | sed -e "s/\\\'/'/g" -e "s/\`\`\` whitespace-pre-wrap/\`\`\`js/g"
}

# Helper function: process a whole section (optional heading + list of files)
process_section() {
  local heading="$1"
  local directory="$2"
  if [ -n "$heading" ]; then
    echo "## $heading" >> llms.txt
    echo "" >> llms.txt
  fi
  find "$directory" -name "*.html" | sort | while read file; do
    echo "Processing $file"
    convert_html_to_md "$file" >> llms.txt
    echo "" >> llms.txt
  done
}

# Process homepage separately
echo "Processing homepage dist/index.html..."
convert_html_to_md dist/index.html >> llms.txt
echo "" >> llms.txt

# Process sections
process_section "Guides" "dist/guides"
process_section "Books" "dist/books"
process_section "Docs" "dist/docs"
process_section "API Reference" "dist/api"
process_section "Games" "dist/games"
process_section "Reference" "dist/reference"

echo "✅ Done! All files merged into llms.txt"

