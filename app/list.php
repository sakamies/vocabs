<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>
    Vocabs
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, minimal-ui">
  <link href="assets/img/vocabs-icon.png" rel="icon">

  <!--<link href="assets/css/happy.css" rel="stylesheet">-->
  <link href="assets/css/pop-pop.css" rel="stylesheet">

</head>
<body>

  <div class="vocab-index">
    <div>
      <h1 class="vocab-title">
        Vocabs
      </h1>
      <p>by <?php echo $appCredits ?></p>
      <br>
      <?php echo vocabsLinkList($vocabs, $path, $uglyUrls); ?>
      <br>
      <?php echo $reportIssue ?>
      <br>
      <?php echo $createVocab ?>
      <br>
      <br>
      <br>
    </div>
  </div>

</body>
</html>
