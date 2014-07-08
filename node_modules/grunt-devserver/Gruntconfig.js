
module.exports = { devserver: getDevServerOptions()
                 , mochaTest: getMochaTestOptions()
                 , jshint: getJshintOptions()
                 , cucumberjs : getCucumberOptions()
                 }

function getDevServerOptions() {
    return { options: { type : 'https'     // the server protocol (default http)
                      , port : 443         // the server port to listen on
                      , base : '.'         // the base folder to serve files
                      , cache : 'no-store' // http caching method (defaults to 'no-cache')
                      , file : './test/assets/options/rootOptions.json' // loads additional option parameters
                      , async : true      // holds a grunt session open
                      }
           , http: { options: { type: 'http'
                              , port: 8888
                              , async: false
                              }
                   }
           , https: { options: { port: 8443 } }
           , e2e: { options: { type: 'http'
                             , port: 8443
                             , async: false
                             }
                  }
    }
}

function getMochaTestOptions() {
    return { options: { ui: 'bdd'
        , reporter: 'spec'
        , noColors: true
        , require: 'test/common'
    },
        unit: ['./test/unit/**/*Test.js']
           , integration: ['./test/integration/**/*Test.js']
           }
}

function getJshintOptions() {
    var src = ['Gruntfile.js', 'lib/**/*.js', 'test/unit/**/*.js', 'test/integration/**/*.js']
    return { options: { jshintrc: '.jshintrc' }
           , all: { src: src}
           }
}

function getCucumberOptions() {
    return { files: './test/features'
           , options: { steps: "./test/features/step_definitions"
                      , format: 'pretty'
                      }
           }
}