# TinyMCE JavaScript Accordion

TinyMCE plugin that replicates the functionality of the [CKEditor Accordion](https://backdropcms.org/project/ckeditor_accordion)
plugin for this alternative editor. To make switching easier.

It's possible to toggle on the fly between the two plugins without any
changes to content, as this plugin re-uses the same CSS class
(ckeditor-accordion).

It's also possible to have both modules on in parallel, as they don't
conflict.

![Screenshot of the open editor](https://raw.githubusercontent.com/backdrop-contrib/tinymce_js_accordion/1.x-1.x/screenshots/tinymce-js-accordion.webp)

To avoid confusion: TinyMCE already ships with an accordion plugin out of the
box. That one works with different HTML tags (details, summary) and doesn't need
any JavaScript for toggling.

This plugin here works with dl, dt, dd tags and does need JavaScript. This
module's purpose is to faciliate the transition from deprecated and unsupported
CKEditor4 to a supported and up-to-date editor.

## Installation

- Install this module using the official [Backdrop CMS instructions](https://docs.backdropcms.org/documentation/extend-with-modules)
- Edit your custom TinyMCE profile on admin/config/content/tinymce-builder to
  add this plugin's toolbar button

## Dependencies

- TinyMCE

## Issues

Bugs and feature requests should be reported in the [Issue Queue](https://github.com/backdrop-contrib/tinymce_js_accordion/issues)

## Known issues

When the *lists* plugin's also enabled, the tab key gets captured by it for list
indent/outdent - also for DL. That leads to all sorts of weird behavior with tab
key inside description lists.

There's not much we can do about that. Simply avoid using the tab key inside
definition lists. Or disable list indent/outdent behavior by setting the
`lists_indent_on_tab` option to false in your editor profile (in JSON code).
See the [related issue](https://github.com/backdrop-contrib/tinymce_js_accordion/issues/1)
in the queue.

## Current Maintainers

- [Indigoxela](https://github.com/indigoxela)
- Additional maintainers welcome!

## License

This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.
