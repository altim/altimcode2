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
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.min.css',
                    'node_modules/backgrid-paginator/backgrid-paginator.min.css',
                    'node_modules/x3dom/x3dom.css',
                    'css/font-awesome.css',
                    'node_modules/intl-tel-input/build/css/intlTelInput.css',
                    'node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css',
                    'node_modules/backgrid-filter/backgrid-filter.min.css',
                    'node_modules/quill/dist/quill.snow.css',
                    'static/style.css'
                ],
                dest: 'static/style.css'
            }

        },

        'watch': {
            sass: {
                files: ['css/*.scss'],
                tasks: ['sass'],
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
                    cwd: 'img',
                    src: ['**/*.{png,jpg,jpeg,gif,ico,svg}'],
                    dest: 'build/img'
                }]
            }
        },

        'copy': {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'fonts/**',
                            'static/**',
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
                    expand: true,
                    cwd: 'build/static',
                    src: 'community.js',
                    dest: 'build/static'
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



    grunt.registerTask('default', ['sass', 'watch']);
    // grunt.registerTask('build', ['browserify:app', 'sass', 'concat:css', 'imagemin', 'copy', 'uglify', 'asset_cachebuster']);



};
