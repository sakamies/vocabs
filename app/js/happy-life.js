// The app structure lives here

// All css classes that are related to the app should be prefixed with vocab- to minimize possibble conflicts with vocab definitions conflicting with app class names

$(document).ready(function() {

  function birthday (vocabs) {
    var supportsHashChange = 'onhashchange' in window;

    //TODO: load list of vocabs from vocabs.json or somehow parse this information server side from existing bundles in /vocabs. Could build it with grunt?


    buildBundleChooser(vocabs);
    buildLanguageChooser(vocabs, 'css'); //TODO: read default language from a cookie
    loadVocabBundle('css', 'en');

    //TODO: hiliteHash doesn't work on page load because loadVocabBundle is async, so this function fires before it has ever loaded anything.
    hiliteHash(location.hash);

    //TODO: Should do url support, so /css/en/#statement+at-rule+import would load the css bundle, english language and highlight the tokens defined in the hash. Needs some server side code to get the js to read those /css/en, right?


    // Give all token elements in the code and sidebar a tabindex so they can be tabbed through in order
    $('.vocab-token').attr('tabindex', '0');


    // Wire events
    $(window).on('hashchange', function () {
      hiliteHash(location.hash);
    });

    $(document).on('focus click', '.vocab-token', function(event) {
      var tokenNames = getTokenNames(this);

      event.preventDefault();
      event.stopPropagation();

      $(this)
        .closest('.content, .sidebar')
        .addClass('vocab-focus')
        .siblings()
        .removeClass('vocab-focus');

      $('.vocab-selected').removeClass('vocab-selected');
      $(this).addClass('vocab-selected');

      location.hash = '#' + tokenNames.join('+');

      if (!supportsHashChange) {
        $(window).trigger('hashchange');
      }
      //TODO: Save hash to a cookie

      /*
        TODO:
        - if there's nothing selected showing in either panel, scroll that panel so at least something selected is visible
        - There's probably a plugin for this, check out how it's done
      */
    });

    $('#vocab-bundle-name').on('change', function(event) {
      event.preventDefault();

      //TODO: Save selected bundle name to a cookie
      var vocabName = $('#vocab-bundle-name').val();
      var locale = $('#vocab-language').val();
      buildLanguageChooser(vocabs, vocabName);

      if (vocabs[vocabName].translations.hasOwnProperty(locale)) {
        //console.log('language exists');
        locale = $('#vocab-language').val(locale).val();
      } else {
        //console.log('language doesnt exist');
        locale = $('#vocab-language').find(':first-child').prop('value');
      }
      //console.log('locale set to:', locale);


      loadVocabBundle(vocabName, locale);
    });
    $('#vocab-language').on('change', function(event) {
      event.preventDefault();

      var vocabName = $('#vocab-bundle-name').val();
      var locale = $('#vocab-language').val();
      //TODO: Save selected language name to a cookie
      loadVocabBundle(vocabName, locale);
    });

    // Key bindings
    key('up', function(event){
      var vocabFocus = $('.vocab-list :focus');
      if (vocabFocus.length > 0) {
        event.preventDefault();
        vocabFocus.parent().prev().find('.vocab-token').focus();
      }
    });
    key('down', function(event){
      var vocabFocus = $('.vocab-list :focus');
      if (vocabFocus.length > 0) {
        event.preventDefault();
        vocabFocus.parent().next().find('.vocab-token').focus();
      }
    });

    $('.vocab-help-hide').on('click', function(event) {
      event.preventDefault();
      $('.vocab-help').hide();
    });
    $('.vocab-help-show').on('click', function(event) {
      event.preventDefault();
      $('.vocab-help').show();
    });

    /*
      TODO:
      - Show help dialog initially
      - Dismiss help dialog when the user starts clicking around
      - Add a button somewhere to show help
      - Save help state to a cookie
    */
  }

  $.get('vocabs/vocabs.json', birthday);


});
