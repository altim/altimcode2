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
                    src: ['img/**/*.{png,jpg,jpeg,gif,ico}','css/**/*.{png,jpg,jpeg,gif,ico}'],
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
                            'index.html',
                            'favicon.ico',
                            'img/**/*.svg',
                            'css/**/*.svg'
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
                    'build/js/altimcode.min.js': ['js/jquery-3.1.1.min.js','js/particles.js', 'js/uikit.min.js', 'js/custom.js']
                }]
            }
        },

        'env' : {
            options : {
                //Shared Options Hash
            },
            dev : {
                NODE_ENV : 'development'
            },
            prod : {
                NODE_ENV : 'production'
            }
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: 'altimcode.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'build/',
                dest: '/public_html/',
                exclusions: ['']
            }
        },

        'preprocess' : {
            options: {
                context : {
                    DEBUG: true
                }
            },
            html : {
                src : 'index.html',
                dest : 'build/index.html'
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
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-ftp-deploy');



    grunt.registerTask('default', ['sass', 'concat:css', 'watch']);
    // grunt.registerTask('build', ['env:prod', 'sass', 'concat:css', 'uglify', 'imagemin', 'copy', 'preprocess']);
    grunt.registerTask('build', ['env:prod', 'sass', 'uglify', 'imagemin', 'copy', 'preprocess']);
    grunt.registerTask('upload', ['ftp-deploy']);



};
