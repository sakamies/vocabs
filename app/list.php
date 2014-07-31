<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>
    Vocabs
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, minimal-ui">
  <link rel="icon" href="assets/img/vocabs-icon.png">

  <?php //Include assets in the index already so they'll be cached when the app launches ?>
  <link href="assets/css/happy.css" rel="stylesheet">
  <script src="assets/lib/jquery-2.0.3.min.js"></script>
  <script src="assets/lib/jquery.cookie.js"></script>
  <script src="assets/lib/keymaster.js"></script>

  <script src="assets/js/happy-fun.js"></script>

</head>
<body class="vocab-index">

  <div class="vocab-help">
    <h1>Vocabs</h1>
    <hr>

    <?php echoVocabsLinkList($vocabs); ?>

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
