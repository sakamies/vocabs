<?php
  $path = '';
  $vocabsJSON = file_get_contents('vocabs/vocabs.json');
  $vocabs = json_decode($vocabsJSON,true);

  //Read page title and stuff from vocabs.json according to bundle & locale
  $vocabName = filter_input(INPUT_GET, 'vocabBundle', FILTER_SANITIZE_STRING);
  $locale = filter_input(INPUT_GET, 'locale', FILTER_SANITIZE_STRING);

  //Beyond these lines, it should be safe to use $vocabName & $locale in any output
  $vocabExists = array_key_exists($vocabName, $vocabs);
  $hasLocale = array_key_exists($locale, $vocabs[$vocabName]);
  if (!$vocabExists || !$hasLocale) {
    header('HTTP/1.0 404 Not Found');
    readfile('404.html');
    exit();
  }

  $pageVocab = $vocabs[$vocabName][$locale];
  $pageTitle = $pageVocab['title'];
  $pageHelpText = $pageVocab['help-text'];


  function echoVocabsLinkList($vocabs) {
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
    <?php echo $pageTitle ?>
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, minimal-ui">

  <link rel="icon" href="img/favicon.png">
  <link href="/assets/css/happy.css" rel="stylesheet">

  <style id="syntax-style">
    <?php readfile('vocabs/'.$vocabName.'.vocab/syntax.css'); ?>
  </style>

  <script src="/assets/lib/jquery-2.0.3.min.js"></script>
  <script src="/assets/lib/jquery.cookie.js"></script>
  <script src="/assets/lib/keymaster.js"></script>

  <script id="vocab">
    app = {};
    <?php
      echo 'app.vocab =';
      readfile('vocabs/'.$vocabName.'.vocab/vocab-'.$locale.'.json');
      echo ';';
      echo 'app.vocabName = "'.$vocabName.'";';
      echo 'app.locale = "'.$locale.'";';
    ?>
  </script>

  <script src="/assets/js/happy.js"></script>

</head>
<body class="">
  <div class="vocab-layout">
    <div class="vocab-modal">
      <?php
        $showHelp = htmlspecialchars($_COOKIE['showHelp']);
        $helpState = '';
        if ($showHelp == 'false') {
          $helpState = 'display: none;';
        }
      ?>
      <div class="vocab-help" style="<?php echo $helpState ?>">
        <h1 class="vocab-title">
          <?php echo $pageTitle ?>
        </h1>
        <?php echo $pageHelpText ?>
        <br>
        <button class="vocab-help-hide" title="Close help"></button>
        <br>
        <hr>

        <?php echoVocabsLinkList($vocabs); ?>

        <hr>
        <br>
        <a href="https://github.com/sakamies/css-vocabulary/issues/new">
          Report an issue
        </a>
        <br>
        <a href="https://github.com/sakamies/css-vocabulary/fork">Create a vocab or translation</a>
        <br>
        <br>
        Vocabs by <a href="http://twitter.com/sakamies">@sakamies</a>
        <br>
      </div>
    </div>
    <div class="vocab-sidebar">
      <div class="vocab-list-header">
        <h1 class="vocab-title">
          <?php echo $pageTitle ?>
        </h1>
      </div>
      <button class="vocab-help-show">?</button>
      <ul class="vocab-list">
        <?php

          $vocabListPath = 'vocabs/'.$vocabName.'.vocab/vocab-'.$locale.'.json';
          $vocabList = file_get_contents($vocabListPath);
          $vocabList = json_decode($vocabList,true);
          foreach ($vocabList[tokens] as $key => $token) {
            echo '<li><a class="vocab-token '.$token['name'].'" href="'.$token['url'].'">'.$token['text'].'</a></li>';
          }

         ?>
      </ul>
    </div>
    <div class="vocab-content">
      <code class="vocab-code"><?php readfile('vocabs/'.$vocabName.'.vocab/sample.html'); ?></code>
    </div>
  </div>
</body>
</html>
