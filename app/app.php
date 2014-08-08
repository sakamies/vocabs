<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, minimal-ui">
  <title>
    <?php echo $title ?>
  </title>
  <link href="assets/img/vocabs-icon.png" rel="icon">

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
        <p class="vocab-credits"><?php echo $credits ?></p>
        <br>
        <p class="vocab-help-text"><?php echo $helpText ?></p>
        <br>
        <?php echo $specs ?>
        <button class="vocab-help-hide" title="Close help"></button>
        <br>
        <hr>
        <br>
        <?php echo $reportIssue ?>
        <br>
        <?php echo $createVocab ?>
        <br>
        <br>
        <?php echo $appCredits ?>
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
        echo vocabTokensList($vocab);
      ?>

    </div>
    <div class="vocab-content">
      <code class="vocab-code"><?php readfile('vocabs/'.$vocabName.'.vocab/sample.html'); ?></code>
    </div>
  </div>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-21435402-3', 'auto');
    ga('send', 'pageview');
  </script>

</body>
</html>
