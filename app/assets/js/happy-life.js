// The app structure lives here

// All css classes that are related to the app should be prefixed with vocab- to minimize possibble conflicts with vocab definitions conflicting with app class names

//TODO: possibility to translate all strings in the app for each translation?

$(document).ready(function() {

  function partyTime (vocabs, initialVocab, initialLocale) {
    var supportsHashChange = 'onhashchange' in window;

    loadVocabBundle(vocabs, initialVocab, initialLocale);


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
      //TODO: stopPropagation is kinda like !important in css, gets hairy real quick

      $(this)
        .closest('.vocab-content, .vocab-sidebar')
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
      $('.vocab-help').show();
      $.cookie('showHelp', 'true', { expires: 999, path: '/' });
    });
  }

  $.get('/vocabs/vocabs.json', function(vocabs) {
    //params come from the url http://domain/vocabName/locale
    var params = window.location.pathname.split( '/' );

    var paramVocabName = params[1];
    if (paramVocabName == null || paramVocabName == '') {
      paramVocabName = Object.keys(vocabs)[0];
      //TODO: if vocab not set, use html5 history api to put paramVocabName to url path
    }

    var paramLocale = params[2];
    if (paramLocale == null || paramLocale == '') {
      paramLocale = vocabs[paramVocabName];
      paramLocale = Object.keys(paramLocale)[0];
      //TODO: if locale not set, use html5 history api to put paramLocale to url path after paramVocabName
    }

    partyTime(vocabs, paramVocabName, paramLocale);
  });


});
