-- clean-all.lua
-- Safely remove unwanted attributes, flatten divs, remove images, strip raw HTML

-- Helper: safely remove attributes if they exist
function safe_remove_attrs(elem)
  if elem.attr then
    elem.attr = {"", {}, {}}
  end
  return elem
end

-- Remove attributes and empty links
function Link(elem)
  if elem.content and #elem.content == 0 then
    return {} -- Delete empty links
  end
  return safe_remove_attrs(elem)
end

function Span(elem)
  return safe_remove_attrs(elem)
end

function Code(elem)
  return safe_remove_attrs(elem)
end

-- Flatten Divs: keep only their inner content
function Div(elem)
  return elem.content
end

-- Remove all images
function Image(elem)
  return {}
end

-- Remove raw HTML blocks
function RawBlock(elem)
  return {}
end

-- Remove raw HTML inlines
function RawInline(elem)
  return {}
end

function Header(elem)
  return safe_remove_attrs(elem)
end

-- Try to find data-language attribute for code blocks
function CodeBlock(elem)
  local classes = elem.attr.classes or {}
  local attrs = elem.attr.attributes or {}

  local language = nil
  for _, pair in ipairs(attrs) do
    local key, value = pair[1], pair[2]
    if key == "data-language" then
      language = value
    end
  end

  if language then
    -- Rebuild the attr to only have the correct language
    elem.attr = {"", {language}, {}}
  else
    -- No language, just clean attributes
    elem.attr = {"", {"js"}, {}}
  end

  return elem
end


