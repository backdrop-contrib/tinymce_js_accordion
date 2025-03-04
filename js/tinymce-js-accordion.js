/**
 * @file
 * Backdrop behaviors for animated accordions based on dl/dt/dd.
 *
 * Mostly just a copy of CKEditor Accordion functionality.
 */

(function ($) {
  'use strict';
  Backdrop.behaviors.tinymceJsAccordion = {
    attach: function (context, settings) {

      var $ckeditorAccordion = $('.ckeditor-accordion');
      if (!$ckeditorAccordion.length || typeof Backdrop.behaviors.ckeditorAccordion !== 'undefined') {
        // Either nothing to do, or the CKEditor plugin's already active.
        return;
      }
      if ($ckeditorAccordion.length > 0) {
        // Create simple accordion mechanism for each tab.
        $ckeditorAccordion.each(function () {
          var $accordion = $(this);
          if ($accordion.hasClass('styled')) {
            return;
          }

          // The first one is the correct one.
          if (typeof Backdrop.settings.tinymce_js_accordion === 'undefined' ||
             (typeof Backdrop.settings.tinymce_js_accordion !== 'undefined' && !Backdrop.settings.tinymce_js_accordion.collapseAll)) {
            $accordion.children('dt:first').addClass('active');
            $accordion.children('dd:first').addClass('active');
            $accordion.children('dd:first').css('display', 'block');
          }

          // Turn the accordion tabs to links so that the content is accessible & can be traversed using keyboard.
          $accordion.children('dt').each(function () {
            var $tab = $(this);
            var tabText = $tab.text().trim();
            var toggleClass = $tab.hasClass('active') ? ' active' : '';
            $tab.html('<span class="ckeditor-accordion-toggle' + toggleClass + '"></span><a class="ckeditor-accordion-toggler" href="#">' + tabText + '</a>');
          });

          // Wrap the accordion in a div element so that quick edit function shows the source correctly.
          $accordion.addClass('styled').removeClass('ckeditor-accordion').wrap('<div class="ckeditor-accordion-container"></div>');

          // Fire an event so other modules know when the accordion has been created.
          $accordion.trigger('ckeditorAccordionAttached');
        });

        // Add click event to body once because quick edits & ajax calls might reset the HTML.
        $('body').once('ckeditorAccordionToggleEvent').on('click', '.ckeditor-accordion-toggler', function (e) {
          var $t = $(this).parent();
          var $parent = $t.parent();

          // Clicking on open element, close it.
          if ($t.hasClass('active')) {
            $t.removeClass('active');
            $t.next().slideUp();
          }
          else {
            // Remove active classes.
            $parent.children('dt.active').removeClass('active').children('a').removeClass('active');
            $parent.children('dd.active').slideUp(function () {
              $(this).removeClass('active');
            });

            // Show the selected tab.
            $t.addClass('active');
            $t.next().slideDown(300).addClass('active');
          }

          // Don't add hash to url.
          e.preventDefault();
        });
      }
    }
  };
})(jQuery);
