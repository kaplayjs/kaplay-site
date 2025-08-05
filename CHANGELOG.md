# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-08-05

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
