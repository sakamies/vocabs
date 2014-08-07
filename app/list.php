<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>
    Vocabs
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, minimal-ui">
  <link href="assets/img/vocabs-icon.png" rel="icon">

  <link href="assets/css/happy.css" rel="stylesheet">

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
