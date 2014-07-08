Feature: Command line usage
  As a user I want to be able to run grunt-devserver
  from the command-line using different command-line arguments
  and expect a server to be started using those options

  Background:
    Given I am using the command line

  Scenario: default behavior
    When I run devserver
    Then I expect a http server is started on port "8888"
    And I expect cache-control to be "no-cache"

  Scenario: port configuration
    When I run devserver with the configuration:
    """
      --port 8001
    """
    Then I expect a http server is started on port "8001"

  Scenario: default https server
    When I run devserver with the configuration:
    """
      --type https
    """
    Then I expect a https server is started on port "8443"

  Scenario: configuring cache-control
    When I run devserver with the configuration:
    """
      --cache no-store
    """
    Then I expect a http server is started on port "8888"
    And I expect cache-control to be "no-store"

  Scenario: configuring a different folder
    When I run devserver with the configuration:
    """
      --folder ./test/assets
    """
    Then I expect the url "/options/" to exist
    And I expect the url "/useIndex/" to exist
    And I expect the url "/test.html" to exist

  Scenario: loading configuration from an external file
    Given an external configuration file named "configuration.json" with contents:
    """
    { "options" : { "type" : "https"
                  , "port" : 8888
                  , "base" : "."
                  , "cache" : "no-cache"
                  }
    }
    """
    When I run devserver with the configuration:
    """
      --file configuration.json
    """
    Then I expect a https server is started on port "8888"
    And I expect cache-control to be "no-cache"

  Scenario: custom middleware
    Given an external configuration file named "configuration.js" with contents:
    """
    var path = require('path')
    var middlewarePath = path.join(process.cwd(), 'test/features/support/customMiddleware')
    console.log(middlewarePath)
    var options = { "type" : "http"
                  , "port" : 8889
                  , "base" : "."
                  , "middleware" : [ require(middlewarePath)() ]
                  }
    exports.options = options
    """
    When I run devserver with the configuration:
    """
      --file configuration.js
    """
    Then I expect a http server is started on port "8889"
    And I expect the url "/" to exist

  Scenario: loading configuration from an external file
    Given an external configuration file named "configuration.json" with contents:
    """
    { "options" : { "type" : "https"
                  , "port" : 8882
                  , "base" : "."
                  , "cache" : "no-cache"
                  }
    , "debug" : { "type" : "http"
                , "cache" : "public"
                }
    , "production" : { "port" : 80 }
    }
    """
    When I run devserver with the configuration:
    """
      --file configuration.json --server debug
    """
    Then I expect a http server is started on port "8882"
    And I expect cache-control to be "public"