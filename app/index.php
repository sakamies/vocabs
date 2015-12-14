<?php

  function vocabsLinkList($vocabs, $path, $uglyUrls) {
    $html = '';
    foreach ($vocabs as $vocabName => $vocab) {
      $html .= '<h2 class="vocab-links-title" id="' . $vocabName . '-vocabulary">' . $vocabName . '</h2>';
      $html .= '<table class="vocab-links">';

      foreach ($vocab as $locale => $translation) {
        if($uglyUrls == true) {
          $url = './?name=' . $vocabName . '&lang=' . $locale;
        } else {
          $url = $path . $vocabName . '/' . $locale;
        };

        $title = $translation['title'];
        $language = $translation['language'];
        $html .= '<tr class="language-'.$locale.'">';

        $html .= '<td class="vocab-link-link"><a href="'.$url.'">'.$title.'</a></td>';
        $html .= '<td class="vocab-link-language">'.$language.'</td>';

        $html .= '<td class="vocab-link-authors">';
        $html .= creditsLinks($translation['credits']);
        $html .= '</td>';

        $html .= '</tr>';
      }

      $html .= '</table><br>';
    }
    return $html;
  }

  function vocabTokensList($vocab) {
    $html = '';
    $html .= '<ul class="vocab-tokens-list">';

    foreach ($vocab[tokens] as $token) {
    $html .= '<li><a class="vocab-token '.$token['name'].'" href="'.$token['url'].'">'.$token['text'].'</a></li>';
    }

    $html .= '</ul>';
    return $html;
  }

  function creditsLinks($credits) {
    $links = '';
    foreach ($credits as $name => $url) {
      $links .= '<a href="'.$url.'">'.$name.'</a> ';
    }
    return $links;
  }

  function specsLinks($links) {
    $html = '';
    $html .= '<ul>';
    foreach ($links as $text => $url) {
      $html .= '<li>';
      $html .= '<a href="'.$url.'">'.$text.'</a>';
      $html .= '</li>';
    }
    $html .= '</ul>';
    return $html;
  }




  // Start the show

  // Use ugly urls for local dev
  $localhosts = array('localhost:3000');
  $uglyUrls = in_array($_SERVER['HTTP_HOST'], $localhosts);
  if ($uglyUrls == true) {
    //echo '<h1>localhost</h1>';
    $path = '/';
  } else {
    $path = 'http://apps.workflower.fi/vocabs/';
  };

  $vocabs = json_decode(file_get_contents('vocabs/vocabs.json'),true);
  $github = 'https://github.com/sakamies/vocabs';
  $appCredits = '<a href="http://twitter.com/sakamies">@sakamies</a> / <a href="http://twitter.com/workflower">@workflower</a>';
  $reportIssue = '<a href="'.$github.'/issues/new">Report an issue</a>';
  $createVocab = '<a href="'.$github.'/fork">Create a vocab or translation</a>';

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
    $language = $vocab['language'];
    $credits = creditsLinks($vocab['credits']);
    $specs = specsLinks($vocab['specs']);
    $helpText = $vocab['help-text'];
    include('app.php');
  }

?>
