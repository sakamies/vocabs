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
        <h1>vocabs</h1>
        Click on the code or the sidebar to see which is what.
        <br>
        Use the Tab key to browse via keyboard.
        <br>
        <br>
        <hr>
        <br>
        <a href="https://github.com/sakamies/css-vocabulary/issues/new">Report an issue</a>
        <br>
        <a href="https://github.com/sakamies/css-vocabulary/fork">Create a vocab or translation</a>
        <br>
        <br>
        App created by <a href="http://twitter.com/sakamies">@sakamies</a>
        <br>
        <br>
        <br>
        <button class="vocab-help-hide">Close</button>
      </div>
    </div>
    <div class="vocab-sidebar">
      <div class="vocab-chooser">
        <span style="visibility: hidden;">in</span>
        <select id="vocab-bundle-name"></select>
        Vocabulary
        <br>
        in
        <select id="vocab-language"></select>
        by
        <span id="vocab-credits">
          <a href="http://twitter.com/sakamies">@sakamies</a>
        </span>
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
