module.exports = function (grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        'sass': {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/style.css': 'css/style.scss'
                }

            }
        },

        'concat': {
            options: {
                separator: ''
            },

            'css': {
                src: [
                    'css/uikit.min.css',
                    'css/style.css'
                ],
                dest: 'build/css/style.css'
            }

        },

        'watch': {
            sass: {
                files: ['css/*.scss'],
                tasks: ['sass','concat:css'],
                options: {
                    interrupt: false
                }
            },
            js: {
                files: ['js/**/*.js'],
                tasks: [],
                options: {
                    interrupt: false
                }
            }

        },

        'jshint': {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                sub:true,
                globals: {
                    jQuery: true
                }
            },
            uses_defaults: ['js/**/*.js']
            // with_overrides: {
            //     options: {
            //         curly: false,
            //         undef: true
            //     },
            //     files: {
            //         src: ['js/**/*.js']
            //     }
            // }
        },




        'imagemin': {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['img/**/*.{png,jpg,jpeg,gif,ico,svg}','css/**/*.{png,jpg,jpeg,gif,ico,svg}'],
                    dest: 'build/'
                }]
            }
        },

        'copy': {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'js/components/**',
                            'js/particles.json',
                            'js/uikit.min.js',
                            'index.html'
                        ],
                        dest: 'build/',
                        options: {}
                    }

                ]

            }
        },

        'asset_cachebuster': {
            options: {
                //buster: '0.1.0',
                buster: '<%= ((new Date()).valueOf().toString()) + (Math.floor((Math.random()*1000)+1).toString()) %>'
            },
            build: {
                files: {
                    'build/index.html': ['build/index.html'],
                    'build/static/style.css': ['build/static/style.css']
                }
            }
        },

        'uglify': {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: [{
                    'build/js/altimcode.min.js': ['js/jquery-3.1.1.min.js','particles.js', 'uikit.min.js', 'custom,js']
                }]
            }
        }


    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-asset-cachebuster');
    grunt.loadNpmTasks('grunt-contrib-uglify');



    grunt.registerTask('default', ['sass', 'concat:css', 'watch']);
    grunt.registerTask('build', ['sass', 'concat:css', 'uglify', 'imagemin', 'copy']);



};
