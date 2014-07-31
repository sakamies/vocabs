//TODO: possibility to translate all strings in the app for each translation?

// Get token DOM elements that match the given array of token objects
app.getTokenElements = function (tokens) {
  var selector = $.map(tokens, function (token) {
    return token.name;
  }).join(', .');

  selector = '.' + selector;
  return $(selector);
};

// Get an array that has all token names that apply to a DOM element
app.getTokenNames = function (element) {
  var className = element.className;
  var tokenNames = className
    .replace('vocab-hover', '')
    .replace('vocab-hilite', '')
    .replace('vocab-selected', '')
    .replace('vocab-token', '')
    .replace('  ', '')
    .trim();
  return tokenNames.split(' ');
};

// Highlight token DOM elements that match the given array of token names
app.hiliteTokens = function (tokenNames) {
  var codePals = '.vocab-code .' + tokenNames.join('.');
  var vocabPals = '.vocab-tokens-list .' + tokenNames.join(', .vocab-tokens-list .');
  $('.vocab-hilite').removeClass('vocab-hilite');
  $(codePals).addClass('vocab-hilite');
  $(vocabPals).addClass('vocab-hilite');
};

// Highlight token DOM elements according to URL hash
app.hiliteHash = function (hash) {
  var tokenNames;
  if (hash) {
    tokenNames = hash.substr(1).split('+');
  }
  if (tokenNames) {
    app.hiliteTokens(tokenNames);
  }
};

app.showHelp = function (argument) {
  $('.vocab-help').show();
  $.cookie('showHelp', 'true', { expires: 999, path: '/' });
};
app.hideHelp = function () {
  $('.vocab-help').hide();
  $.cookie('showHelp', 'false', { expires: 999, path: '/' });
};

app.partyTime = function (vocab) {
  var supportsHashChange = 'onhashchange' in window;

  app.hiliteHash(location.hash);

  // Give all vocab-token elements in the code and sidebar a tabindex so they can be tabbed through
  app.getTokenElements(vocab.tokens)
   .addClass('vocab-token')
   .attr('tabindex', '0');


  // Wire events
  $(window).on('hashchange', function () {
    app.hiliteHash(location.hash);
  });

  $(document).on('focus click', '.vocab-token', function(event) {
    var tokenNames = app.getTokenNames(this);
    var panel = $(this).closest('.vocab-content, .vocab-sidebar');
    event.preventDefault();
    event.stopPropagation();


    $('.vocab-focus').removeClass('vocab-focus');
    panel.addClass('vocab-focus');

    $('.vocab-selected').removeClass('vocab-selected');
    $(this).addClass('vocab-selected');

    //Change hash to highlight the appropriate tokens automatically via hashchange event
    location.hash = '#' + tokenNames.join('+');
    if (!supportsHashChange) {
      $(window).trigger('hashchange');
    }

    /*
      TODO:
      - If there's something selected, but no hilites showing in a panels, scroll that panel so at least something highlighted is visible
    */
  });

  // Key bindings
  key('up', function(event){
    var vocabFocus = $('.vocab-tokens-list :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.parent().prev().find('.vocab-token').focus();
    }
  });
  key('down', function(event){
    var vocabFocus = $('.vocab-tokens-list :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.parent().next().find('.vocab-token').focus();
    }
  });

  $('.vocab-help-hide').on('click', function(event) {
    event.preventDefault();
    app.hideHelp();
    $('.vocab-help-show').focus();
  });
  $('.vocab-help-show').on('click', function(event) {
    event.preventDefault();
    if ($('.vocab-help').css('display') === 'block') {
      app.hideHelp();
    } else {
      app.showHelp();
      $('.vocab-help-hide').focus();
    }
  });
};

$(document).ready(function() {

  app.partyTime(app.vocab);

});
