module.exports = function( grunt )
{
var root = './';
var dest = './release/<%= pkg.name %> <%= pkg.version %>/';
var temp = './temp/';


grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        clean: {
                // delete the destination folder
            previousBuild: [
                dest,
            ],
                // remove temporary files
            afterBuild: [
                    temp,
                    '.tscache',
                ]
        },

            // compile to javascript
        ts: {
            release: {
                src: [ root + 'scripts/*.ts' ],
                dest: temp + 'code.js',
                options: {
                    "noImplicitAny": true,
                    "noImplicitReturns": true,
                    "noImplicitThis": true,
                    "noUnusedLocals": true,
                    "strictNullChecks": true,
                    "target": "es5"
                }
            }
        },

            // copy the audio and libraries files
        copy: {
            release: {
                expand: true,
                cwd: root,
                src: [
                    'images/**',
                    'libraries/**',
                    'sounds/**',
                ],
                dest: dest
            }
        },

        uglify: {
            release: {
                files: [{
                    src: temp + 'code.js',
                    dest: dest + 'min.js'
                }]
            }
        },

        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: root,
                    src: 'style.css',
                    dest: dest
                }]
            },
            options: {
                advanced: false
            }
        },

        processhtml: {
            release: {
                files: [{
                    expand: true,
                    cwd: root,
                    src: 'index.html',
                    dest: dest
                }]
            }
        }
    });

    // load the plugins
grunt.loadNpmTasks( 'grunt-contrib-copy' );
grunt.loadNpmTasks( 'grunt-contrib-uglify' );
grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
grunt.loadNpmTasks( 'grunt-contrib-clean' );
grunt.loadNpmTasks( 'grunt-processhtml' );
grunt.loadNpmTasks( 'grunt-ts' );

    // tasks
grunt.registerTask( 'default', [ 'clean:previousBuild', 'ts', 'copy', 'uglify', 'cssmin', 'processhtml', 'clean:afterBuild' ] );
};
