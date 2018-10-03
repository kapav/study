var _ = require('lodash');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['src/js/app/*.js', 'src/js/app/**/*.js'],
				// the location of the resulting JS file
				dest: 'dist/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
				  'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		less: {
			build: {
				files: {
					'dist/css/pretty.css': 'src/css/pretty.less'
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/app/*.js', 'src/app/**/*.js'],
			options: {
				globals: {
					jQuery: true
				}
			},
			build: ['Gruntfile.js', 'src/app/*.js', 'src/app/**/*.js'],
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
