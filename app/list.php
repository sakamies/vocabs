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
    <?php echo vocabsLinkList($vocabs); ?>
    <hr>
    <br>
    <?php echo $reportIssue ?>
    <br>
    <?php echo $createVocab ?>
    <br>
    <br>
    <?php echo $appCredits; ?>
    <br>
  </div>

</body>
</html>
