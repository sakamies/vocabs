<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>
    <?php echo $title ?>
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, minimal-ui">

  <link rel="icon" href="img/favicon.png">
  <link href="assets/css/happy.css" rel="stylesheet">

  <style id="syntax-style">
    <?php readfile('vocabs/'.$vocabName.'.vocab/syntax.css'); ?>
  </style>

  <script src="assets/lib/jquery-2.0.3.min.js"></script>
  <script src="assets/lib/jquery.cookie.js"></script>
  <script src="assets/lib/keymaster.js"></script>

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

  <script src="assets/js/happy.js"></script>

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
          <?php echo $title ?>
        </h1>
        <?php echo $helpText ?>
        <br>
        <button class="vocab-help-hide" title="Close help"></button>
        <br>
        <hr>

        <?php echoVocabsLinkList($vocabs); ?>

        <hr>
        <br>
        <a href="<php echo $github; >/issues/new">
          Report an issue
        </a>
        <br>
        <a href="<php echo $github; >/fork">Create a vocab or translation</a>
        <br>
        <br>
        Vocabs by <a href="http://twitter.com/sakamies">@sakamies</a>
        <br>
      </div>
    </div>
    <div class="vocab-sidebar">
      <div class="vocab-tokens-list-header">
        <h1 class="vocab-title">
          <?php echo $title ?>
        </h1>
      </div>
      <button class="vocab-help-show">?</button>

      <?php
        $vocabFile = 'vocabs/'.$vocabName.'.vocab/vocab-'.$locale.'.json';
        $vocab = json_decode(file_get_contents($vocabFile),true);
        echoVocabTokensList($vocab);
      ?>

    </div>
    <div class="vocab-content">
      <code class="vocab-code"><?php readfile('vocabs/'.$vocabName.'.vocab/sample.html'); ?></code>
    </div>
  </div>
</body>
</html>
