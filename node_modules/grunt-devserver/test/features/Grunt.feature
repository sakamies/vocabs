Feature: Grunt usage
  As a user I want to be able to
  start a server using grunt
  and configure it using grunt

  Background:
    Given I am using grunt

  Scenario: default behavior
    When I run grunt
    Then I expect a http server is started on port "8000"

  Scenario: port configuration
    When I run grunt with the configuration:
      """
      { options: { port: 8001 } }
      """
    Then I expect a http server is started on port "8001"