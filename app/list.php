<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>
    Vocabs
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
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
