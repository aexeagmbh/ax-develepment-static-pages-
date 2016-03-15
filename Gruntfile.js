module.exports = function(grunt){
    grunt.initConfig({

        app: grunt.file.readJSON('app.json'),
      pkg: grunt.file.readJSON('package.json'),

      watch:{
          sass:{
            files: ['templates/Private/sass/*.scss'],
            tasks: ['sass','concat','cssmin'],
               options: {
                    livereload: true,
            },
          },
          scirpts:{
            files: ['templates/Private/js/*.js'],
            tasks: ['uglify','concat','cssmin'],
              options: {
                    livereload: true,
            },
          }
        },
         connect: {
            server: {
              options: {
                port: 9001,
                base: '.',
              }
            }
          },
      sass:{
        dist:{
          files:{
            'templates/Private/css/style.css' : 'templates/Private/sass/style.scss'
          }
        }
      }
        ,
        'gh-pages': {
        options: {
          base: ''
        },
        src: ['index.html','templates/Private/img/*','templates/Public/css/*','templates/Public/js/*']
      },
      concat:{
        options:{
          seperator: ";",
          stripBanners: true,
          banner:'/*! <%= pkg.name %> -v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
        },
        js:{
          src: ['<%= app.assets.js %>'],
          dest: 'templates/Private/js/temp.js',
        },
        css:{
          src: ['<%= app.assets.css %>'],
         dest: 'templates/Private/css/temp.css',
       }
      },
      uglify:{
        options:{
          manage: false,
        },
        my_target:{
            files:{
              'templates/Public/js/main.min.js':['templates/Private/js/temp.js']
         }
        }
      },
      cssmin: {
         my_target:{
            files:{
              'templates/Public/css/style.min.css':['templates/Private/css/temp.css']
              }
            }
        }
      });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.registerTask('build',["connect","watch"]);
};