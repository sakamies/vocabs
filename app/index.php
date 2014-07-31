<?php

  function echoVocabsLinkList($vocabs) {
    foreach ($vocabs as $vocabName => $vocab) {
      echo '<h2 class="vocab-links-title" id="' . $vocabName . '-vocabulary">' . $vocabName . '</h2>';
      echo '<table class="vocab-links">';

      foreach ($vocab as $locale => $translation) {
        $url = './?name=' . $vocabName . '&lang=' . $locale;
        //TODO: .htaccess to enable pretty urls
        //$url = $path . '/' . $vocabName . '/' . $locale;
        $title = $translation['title'];
        $language = $translation['language'];
        echo '<tr>';

        echo '<td class="vocab-link-link"><a href="'.$url.'">'.$title.'</a></td>';
        echo '<td class="vocab-link-language">'.$language.'</td>';

        echo '<td class="vocab-link-authors">';
        foreach ($translation['credits'] as $author => $authorURL) {
          echo '<a href="'.$authorURL.'">'.$author.'</a> ';
        }
        echo '</td>';

        echo '</tr>';
      }

      echo '</table>';
    }
  }

  function echoVocabTokensList($vocab) {
    echo '<ul class="vocab-tokens-list">';

    foreach ($vocab[tokens] as $token) {
    echo '<li><a class="vocab-token '.$token['name'].'" href="'.$token['url'].'">'.$token['text'].'</a></li>';
    }

    echo '</ul>';
  }



  $vocabs = json_decode(file_get_contents('vocabs/vocabs.json'),true);
  $github = 'https://github.com/sakamies/vocabs';

  // If there are no vocabName & locale given, output the index list and die
  $vocabName = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);
  $locale = filter_input(INPUT_GET, 'lang', FILTER_SANITIZE_STRING);
  if(isset($vocabName) == false && isset($locale) == false){
     include('list.php');
     exit();
  }


  // If a vocab name & locale is in the url, make sure they exist in vocabs.json
  // Should be safe to use vocabName & locale after this
  $vocabExists = array_key_exists($vocabName, $vocabs);
  $hasLocale = array_key_exists($locale, $vocabs[$vocabName]);
  if ($vocabExists == false || $hasLocale == false) {
    header('HTTP/1.0 404 Not Found');
    include('error.php');
    exit();
  } else {
    // Ok cool, we have a vocab & locale, time party
    //Read page title and stuff from vocabs.json according to bundle & locale
    $vocab = $vocabs[$vocabName][$locale];
    $title = $vocab['title'];
    $helpText = $vocab['help-text'];
    include('app.php');
  }

?>
