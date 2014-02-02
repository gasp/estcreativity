module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			images: ['images/*'],
			builds: {
				src: [
					'js/est.min.js',
					'js/est-mobile.min.js',
					'js/vendors.min.js'
				]
			},
			concats: {
				src: [
					'js/est.js',
					'js/est-mobile.js',
					'js/vendors.js',
				]
			},
			css: {
				src: [
					'css/*.css'
				]
			}
		},
		concat: {
			options: {
				separator: ';',
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			desktop: {
				src: [
					'js/app.js',
					'js/parallax.js',
					'js/home.js',
					'js/menu.js',
					'js/howwework.js',
					'js/life.js',
					'js/team.js',
					'js/clients.js',
					'js/contacts.js',
					'js/fil.js',
					'js/emails.js',
					'js/analytics.js',
				],
				dest: 'js/est.js',
			},
			mobile: {
				src: [
					'js/app-mobile.js',
					'js/emails.js'
				],
				dest: 'js/est-mobile.js',
			},
			vendors: {
				src: [
					'js/vendor/jquery-1.10.1.js',
					'js/vendor/waypoints.js',
//					'js/vendor/jquery.easing-1.3.js',
					'js/vendor/jquery.grabscroll.js'
				],
				dest: 'js/vendors.js'
			}
		},
		// copying svg files from original images to optimizes images
		copy: {
			images: {
				files: [
					{ // includes files within path
						expand: true, 
						cwd: 'images_raw/',
						src: ['**/*.svg'], 
						dest: 'images/', 
						filter: 'isFile'
					}
				]
			}
		},
		imagemin: {
			main: {
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: 'images_raw/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/'
				}]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			desktop: {
				src: 'js/est.js',
				dest: 'js/est.min.js'
			},
			mobile: {
				src: 'js/est-mobile.js',
				dest: 'js/est-mobile.min.js'
			},
			vendors: {
				src: 'js/vendors.js',
				dest: 'js/vendors.min.js'
			}
		},
		less: {
			dev: {
				files: {
					"css/404.css": "less/404.less",
					"css/est.css": "less/est.less",
					"css/bootstrap.css": "less/bootstrap.less",
					"css/mobile.css": "less/mobile.less",
					"css/responsive.css": "less/responsive.less"
					
				}
			},
			prod: {
				options: {
					cleancss: true,
					compress: true,
					report: 'min'
				},
				files: {
					"css/404.css": "less/404.less",
					"css/est.css": "less/est.less",
					"css/bootstrap.css": "less/bootstrap.less",
					"css/mobile.css": "less/mobile.less",
					"css/responsive.css": "less/responsive.less"
				}
			}
		},
		watch: {
			scripts : {
				files: ['js/*', '!js/vendo/**','!js/est**'],
				tasks: ['concat:desktop','uglify:desktop','concat:mobile','uglify:mobile']
			},
			less : {
				files: ['less/**'],
				tasks: ['less:development']
			}
		}
	}); // /initConfig

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('vendors', ['concat:vendors','uglify:vendors', 'clean:concats']);
	grunt.registerTask('scripts', ['concat:desktop','uglify:desktop','concat:mobile','uglify:mobile','clean:concats']);

	grunt.registerTask('dry', ['scripts','less:dev']);

	grunt.registerTask('images', ['clean:images','copy:images','imagemin']);

	grunt.registerTask('default', ['dry','watch']);
	grunt.registerTask('fullpatate', ['clean:builds','clean:concats','clean:css','scripts','vendors','less:prod','images']);

};
