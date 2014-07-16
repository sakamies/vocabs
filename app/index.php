<?php
  $path = '';
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>
    Vocabs for Devs
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, minimal-ui">
  <link rel="icon" href="img/favicon.png">
  <link href="/assets/css/happy.css" rel="stylesheet">
  <script src="/assets/lib/jquery-2.0.3.min.js"></script>
  <script src="/assets/lib/jquery.cookie.js"></script>
  <script src="/assets/lib/keymaster.js"></script>

  <script src="/assets/js/happy-fun.js"></script>
  <script src="/assets/js/happy-life.js"></script>

  <link id="syntax-style" href="" rel="stylesheet">

</head>
<body class="">
  <div class="vocab-layout">
    <div class="vocab-modal">
      <div class="vocab-help">
        <h1 class="vocab-title">CSS Vocabulary</h1>
        Click on the code or the sidebar to see which is what.
        <br>
        Use the Tab key to browse via keyboard.
        <br>
        <br>
        <button class="vocab-help-hide">Close help</button>
        <br>
        <br>
        <hr>
        <?php
          //TODO parse vocabs.json for the list of vocabs
          $vocabsJSON = file_get_contents("vocabs/vocabs.json");
          $vocabs = json_decode($vocabsJSON,true);

          foreach ($vocabs as $vocabName => $vocab) {
            echo '<h2 class="vocab-links-title" id="' . $vocabName . '-vocabulary">' . $vocabName . '</h2>';
            echo '<table class="vocab-links">';

            foreach ($vocab as $locale => $bundle) {
              $url = $path . '/' . $vocabName . '/' . $locale;
              $title = $bundle['title'];
              $language = $bundle['language'];
              echo '<tr>';
              echo '<td class="vocab-link-link"><a href="'.$url.'">'.$title.'</a></td>';
              echo '<td class="vocab-link-language">'.$language.'</td>';

              echo '<td class="vocab-link-authors">';
              foreach ($bundle['credits'] as $authorName => $authorURL) {
                echo '<a href="'.$authorURL.'">'.$authorName.'</a> ';
              }
              echo '</td>';

              echo '</tr>';
            }

            echo '</table>';
          }
        ?>
        <hr>
        <br>
        <a href="https://github.com/sakamies/css-vocabulary/issues/new">
          Report an issue
        </a>
        <br>
        <a href="https://github.com/sakamies/css-vocabulary/fork">Create a vocab or translation</a>
        <br>
        <br>
        Vocab spy by <a href="http://twitter.com/sakamies">@sakamies</a>
        <br>
      </div>
    </div>
    <div class="vocab-sidebar">
      <div class="vocab-list-header">
        <h1 class="vocab-title">
          CSS Vocabulary
        </h1>
      </div>
      <button class="vocab-help-show">?</button>
      <ul class="vocab-list"></ul>
    </div>
    <div class="vocab-content">
      <code class="vocab-code">
        <span class="vocab-token fallback-bundle" tabindex="0">Fallback</span>
        <br>
        <span class="vocab-token token-name" tabindex="0">content</span>
      </code>
    </div>
  </div>
</body>
</html>
