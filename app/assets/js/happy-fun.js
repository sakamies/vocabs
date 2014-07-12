// Function definitions for the app (ready to party)

//TODO: Oh golly the joy of globals, they're like candy. I know they're bad but they just taste so good.

//TODO: Combine buildBundleChooser buildLanguageChooser, buildCredits to a buildVocabLinkList or something instead, vocab is now selected just from a list of links
//Build select elements in the sidebar that choose wich vocab bundle and language to use
//TODO: vocabs object structure changed, need to redo all parsing
function buildBundleChooser (vocabs, vocabName) {
  var codeLangs = [];
  $.each(vocabs, function (value, props) {
    var selected = '';
    if (value === vocabName) {
      selected = 'selected';
    }
    codeLangs.push('<option value="'+value+'" '+selected+'>'+props.title+'</option>');
  });
  $('#vocab-bundle-name').html(codeLangs.join(''));
}
function buildLanguageChooser (vocabs, vocabName, locale) {
  var languages = [];
  $.each(vocabs[vocabName].translations, function (value, language) {
    var selected = '';
    if (value === locale) {
      selected = 'selected';
    }
    languages.push('<option value="'+value+'" '+selected+'>'+language+'</option>');
  });
  $('#vocab-language').html(languages.join(''));
}
function buildCredits (credits) {
  var creditLinks = [];

  $.each(credits, function (i, credit) {
    creditLinks.push('<a href="'+credit.url+'">'+credit.name+'</a>');
  });

  $('#vocab-credits').html(creditLinks.join(', '));
}

// Build vocab list in the sidebar
function buildVocabList (tokens) {
  //console.log('buildVocabList');
  var vocabListItems = [];

  $.each(tokens, function (i, token) {
    vocabListItems.push('<li><a class="vocab-token '+token.name+'" href="'+token.url+'">'+token.text+'</a></li>');
  });

  $('.vocab-list').html(vocabListItems.join(''));
}

function setWindowTitle (title, language) {
  window.document.title = title + ' vocabulary in ' + language;
}

function getTokenElements (tokens) {
  //console.log('getTokenElements', tokens);
  var selector = $.map(tokens, function (token) {
    return token.name;
  }).join(', .');

  selector = '.' + selector;
  return $(selector);
}

// Get all tokens that apply to a DOM element as an array
function getTokenNames (element) {
  var className = element.className;
  var tokenNames = className
    .replace('vocab-hover', '')
    .replace('vocab-hilite', '')
    .replace('vocab-selected', '')
    .replace('vocab-token', '')
    .replace('  ', '')
    .trim();
  return tokenNames.split(' ');
}

// Highlight DOM elements that match given token array
function hiliteTokens (tokenNames) {
  var codePals = '.vocab-code .' + tokenNames.join('.');
  var vocabPals = '.vocab-list .' + tokenNames.join(', .vocab-list .');
  $('.vocab-hilite').removeClass('vocab-hilite');
  $(codePals).addClass('vocab-hilite');
  $(vocabPals).addClass('vocab-hilite');
}

// Highlight DOM elements according to URL hash
function hiliteHash (hash) {
  var tokenNames;
  if (hash) {
    tokenNames = hash.substr(1).split('+');
  }
  if (tokenNames) {
    hiliteTokens(tokenNames);
  }
}


function loadVocabBundle (vocabName, locale) {
  //console.log('loadVocabBundle');
  //Start loading spinner
  var path = '/vocabs/' + vocabName + '.vocab/';
  var vocabUrl = path + 'vocab-' + locale + '.json';
  var syntaxUrl = path + 'syntax.css';
  var sampleUrl = path + 'sample.html';
  var vocab = {};
  var sample = '';

  //console.log('syntax.css');
  $('#syntax-style').prop('href', syntaxUrl);

  //console.log('sample.html');
  $.get(sampleUrl, function(sample, status) {
    //console.log(sample);
    $('.vocab-code').html(sample);
    //console.log('status:', status);
  });

  //console.log('vocab-x.json');
  $.get(vocabUrl, function(vocab) {
    //console.log('loading tokens to sidebar:', vocab.tokens);
    buildVocabList(vocab.tokens);
    getTokenElements(vocab.tokens)
      .addClass('vocab-token')
      .attr('tabindex', '0');

    //console.log('building credits');

    setWindowTitle(vocab.title, vocab.language);
    hiliteHash(location.hash);
  });

  //add tabindex=0 to all items in vocabList and parse the vocab so that you can give tabindex=0 to all tokens in the sample code too
  //Stop loading spinner
}
