<?php
  //TODO: these are the same as in app.php, remove redundancy and make something something fix optimize
  $path = '';
  $vocabsJSON = file_get_contents('vocabs/vocabs.json');
  $vocabs = json_decode($vocabsJSON,true);

  function echoVocabsList($vocabs) {
    foreach ($vocabs as $vocabName => $vocab) {
      echo '<h2 class="vocab-links-title" id="' . $vocabName . '-vocabulary">' . $vocabName . '</h2>';
      echo '<table class="vocab-links">';

      foreach ($vocab as $locale => $translation) {
        $url = $path . '/' . $vocabName . '/' . $locale;
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

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>
    Vocabs
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, minimal-ui">
  <link rel="icon" href="/assets/img/vocabs-icon.png">
  <link href="/assets/css/happy.css" rel="stylesheet">
  <script src="/assets/lib/jquery-2.0.3.min.js"></script>
  <script src="/assets/lib/jquery.cookie.js"></script>
  <script src="/assets/lib/keymaster.js"></script>

  <script src="/assets/js/happy-fun.js"></script>

</head>
<body class="vocab-index">

  <div class="vocab-help">
    <h1>Vocabs</h1>
    <hr>

    <?php echoVocabsList($vocabs); ?>

    <hr>
    <br>
    <a href="https://github.com/sakamies/css-vocabulary/issues/new">
      Report an issue
    </a>
    <br>
    <a href="https://github.com/sakamies/css-vocabulary/fork">
      Create a vocab or translation
    </a>
    <br>
    <br>
    <a href="/">
      Vocabs
    </a>
    app by
    <a href="http://twitter.com/sakamies">
      @sakamies
    </a>
    <br>
  </div>

</body>
</html>
