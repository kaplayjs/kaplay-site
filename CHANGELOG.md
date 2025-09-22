# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

## [1.5.4] - 2025-09-22

### Added

- Now installation guide shows the correct cli command for `create-kaplay`
  depending on docs version - @lajbel

## [1.5.3] - 2025-09-19

### Fixed

- Crew outlined font dimensions in the KAPLAYGROUND import instructions were incorrect - @imaginarny

## [1.5.2] - 2025-09-12

### Changed

- Docs version select is now replaced with a custom dropdown that navigates in the same tab - @imaginarny

## [1.5.1] - 2025-08-27

### Changed

- Blog posts have a new centered layout with a header image navigation - @imaginarny
- SOK blog post badges are now made in html instead of drawn in featured image - @imaginarny
- Improved blog page responsive - @imaginarny

### Fixed

- Various grammar and formatting errors - @imaginarny, @lajbel

## [1.5.0] - 2025-08-25

### Added

- Many new Crew sprites, sounds and animated emojis that comes with Crew v2 - @lajbel, @imaginarny
- Many new Crew facts and details like:
  - Aliases / Known as - @imaginarny
  - Origin - @lajbel
  - Birthday - @lajbel, @imaginarny
  - Appearances (links to where sprite was used) - @lajbel, @imaginarny
  - Releated sound/sprite - @imaginarny
  - KAPLAYGROUND import code instructions - @imaginarny
- New additions to Crew page UI:
  - Filter by Crew Origin (Official, Commission, Community) - @lajbel, @imaginarny
  - Tabs to browse by Type (All, Sprites, UI, Sounds) - @imaginarny
  - Toggle minimize for Crew filters - @imaginarny
  - Copy to Clipboard for import codes - @lajbel, @imaginarny
  - No items found message when there are no search results - @imaginarny

### Changed

- Crew page now includes:
  - Improved Search with more search terms besides item name - @imaginarny
  - Improved Tags UI - @imaginarny
  - Design and layout improvents of page, modal, and its content - @imaginarny
  - Improved responsive and accessibility - @imaginarny
- Updated a lot of Crew details, secrets, and descriptions - @lajbel, @imaginarny

### Fixed

- Pointer cursor over interactive elements not showing or blinking - @imaginarny

## [1.4.5] - 2025-08-24

### Added

- Now you can access the changelog on the website - @lajbel, @imaginarny

### Fixed

- Fixed `add()` link on API Reference page leading to 404 - @imaginarny

## [1.4.4] - 2025-08-21

### Fixed

- Table style is now responsive and spacing issues were fixed - @imaginarny

## [1.4.3] - 2025-08-21

### Added

- Added playable examples - @lajbel, @imaginarny

## [1.4.2] - 2025-08-19

### Added

- Now Documentation Guides and all markdown generated code can parse type links from
  \`backticks\` syntax - @lajbel

## [1.4.1] - 2025-08-11

### Fixed

- Fixed **Next** and **Previous** buttons that linked to incorrect guides - @lajbel
- Hide some pages that was just v4000 docs exclusive - @lajbel

## [1.4.0] - 2025-08-06

### Added

- New preview side panel for API Reference types - @imaginarny

## [1.3.1] - 2025-08-04

### Changed

- Docs button on landing page was extended with a dropdown menu including both Guides and API Reference links - @imaginarny
- Improved spacing and alignment of mobile menu items on landing page - @imaginarny

## [1.3.0] - 2025-08-01

### Added

- New API Reference index page at /docs/api - @imaginarny

### Changed

- All links that are part of docs are now prefixed with /docs - @imaginarny
- Notably, API Reference /doc/* links now redirect to /docs/api/* - @imaginarny

## [1.2.0] - 2025-07-26

### Added

- Major improvements in API Docs experience and style - @lajbel, @imaginarny
- Heading anchors, now clicking on docs headings and API members will give you a link to that section - @lajbel, @imaginarny

### Fixed

- Many "type kinds" that wasn't being rendered now are - @lajbel, @imaginarny

## [1.1.9] - 2025-07-24

### Fixed

- Sidebar back to top button is now better reachable on phones - @imaginarny

## [1.1.8] - 2025-07-23

### Added

- Back to top button was added to the sidebar when scrolled - @imaginarny
- Clear button was added to the sidebar search input - @imaginarny

### Changed

- Search input in sidebar is now sticky on scroll - @imaginarny
- Sidebar is slightly wider and menu items have more room to grow - @imaginarny

## [1.1.7] - 2025-07-11

### Fixed

- Layout shift on load mitigated - @imaginarny
- Preloaded, removed or deferred resources by the priority - @imaginarny
- Accessibility and markup issues fixes - @imaginarny
- Blocks example game now works on navigating back and forth - @imaginarny

## [1.1.6] - 2025-07-05

### Added

- New navigation interface - @lajbel
- New design elements to match the overal website redesign - @imaginarny

## [1.1.5] - 2025-06-25

### Added

- Now the navigation select is auto-updated with scroll - @lajbel

### Fixed

- Duplicated elements in API sidebar - @lajbel

## [1.1.4] - 2025-06-05

### Added

- New JSON API in `/api/doc/Type.json` and `/api/doc/ctx.func.json` -
  @lajbel
- All Type names are avaible in JSON in `/api/doc/names.json` -
  @lajbel

## [1.1.3] - 2025-05-20

### Added

- Now you can click on blog post thumbnails to navigate to the blog post -
  @imaginarny

### Changed

- Updated images for SOK blog posts - @imaginarny
- Updated meta title for Blog page - @imaginarny

## [1.1.2] - 2025-05-17

### Added

- A Game Object guide with improved examples - @lajbel
- A Basics guide that showcases the options for `kaplay()` - @lajbel

## [1.1.1] - 2025-05-16

### Added

- Now you can see website version in the footer
- Now the version in version selector is the same as the one in NPM

### Fixed

- Fixed a bug that made non current version guides being shown

## [1.1.0] - 2025-3-11

### Added

- Now `/crew` it's more like an app, using modals
- Now in `/crew` you can select between outlined/original for downloading
- Now imports appear `/crew` entries, as a new feature of crew package

## [1.0.1] - 2025-2-18

### Added

- Now /docs and /doc redirect to installation guide
- A badge in sidebar's Discord entry showing the quanitity of members

### Changed

- Now nav titles are UPPERCASE

### Fixed

- Content no longer gets cut off by the navbar when navigating within the docs
