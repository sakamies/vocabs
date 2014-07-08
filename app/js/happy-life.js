// The app structure lives here

// All css classes that are related to the app should be prefixed with vocab- to minimize possibble conflicts with vocab definitions conflicting with app class names

$(document).ready(function() {

  function partyTime (vocabs) {
    var supportsHashChange = 'onhashchange' in window;

    /*TODO:
      - Should do url support, so /css/en/#statement+at-rule+import would load the css bundle, english language and highlight the tokens defined in the hash
      - Needs some server side code to initially route all those paths to the js app, for it to read those /css/en, right?
      - Add htaccess to load /index.html with any /bundle/language combo, language optional
      - Read path with javascript and handle loading the appropriate bundle & language
      - Implement url changing dynamically via html5 history api when changing vocabs & bundles
    */

    var initialVocab = $.cookie('vocabName');
    console.log('read vocab from cookie:', initialVocab);
    if (initialVocab === undefined) {
      // If the cookie is not set, get the first vocab that's defined in vocabs
      console.log('vocab not saved, set to first of vocabs');
      initialVocab = Object.keys(vocabs)[0];
    }
    var initialLocale = $.cookie('locale');
    console.log('read locale from cookie:', initialLocale);
    if (initialLocale === undefined) {
      console.log('locale not saved, set to first of translations');
      initialLocale = vocabs[initialVocab].translations;
      initialLocale = Object.keys(initialLocale)[0];
    }

    buildBundleChooser(vocabs, initialVocab);
    buildLanguageChooser(vocabs, initialVocab, initialLocale);
    loadVocabBundle(initialVocab, initialLocale);


    // Give all token elements in the code and sidebar a tabindex so they can be tabbed through in order
    $('.vocab-token').attr('tabindex', '0');


    // Wire events
    $(window).on('hashchange', function () {
      hiliteHash(location.hash);
    });

    $(document).on('focus click', '.vocab-token', function(event) {
      var tokenNames = getTokenNames(this);

      event.preventDefault();

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

      /*
        TODO:
        - if there's nothing selected showing in either panel, scroll that panel so at least something selected is visible
        - There's probably a plugin for this, check out how it's done
      */
    });

    $('#vocab-bundle-name').on('change', function(event) {
      event.preventDefault();

      var vocabName = $('#vocab-bundle-name').val();
      var locale = $('#vocab-language').val();
      buildLanguageChooser(vocabs, vocabName);

      if (vocabs[vocabName].translations.hasOwnProperty(locale)) {
        locale = $('#vocab-language').val(locale).val();
      } else {
        locale = $('#vocab-language').find(':first-child').prop('value');
      }

      $.cookie('vocabName', vocabName, { expires: 999, path: '/' });
      $.cookie('locale', locale, { expires: 999, path: '/' });

      loadVocabBundle(vocabName, locale);
    });
    $('#vocab-language').on('change', function(event) {
      event.preventDefault();

      var vocabName = $('#vocab-bundle-name').val();
      var locale = $('#vocab-language').val();

      $.cookie('locale', locale, { expires: 999, path: '/' });

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

    // Help dialog
    var initialShowHelp = $.cookie('showHelp');
    console.log('show help? ', initialShowHelp);
    if (initialShowHelp === 'false') {
      $('.vocab-help').hide();
      $.cookie('showHelp', 'false', { expires: 999, path: '/' });
    }
    $('.vocab-help-hide').on('click', function(event) {
      event.preventDefault();
      $('.vocab-help').hide();
      $.cookie('showHelp', 'false', { expires: 999, path: '/' });
    });
    $('.vocab-help-show').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $('.vocab-help').show();
      $.cookie('showHelp', 'true', { expires: 999, path: '/' });
    });
    $(document).on('click', function(event) {
      event.preventDefault();
      $('.vocab-help').hide();
      $.cookie('showHelp', 'false', { expires: 999, path: '/' });
    });
  }

  $.get('vocabs/vocabs.json', partyTime);


});
