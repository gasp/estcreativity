module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';',
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			dist: {
				src: [
					'js/app.js',
					'js/parallax.js',
					'js/home.js',
					'js/menu.js',
					'js/fil.js',
					'js/howwework.js',
					'js/life.js',
					'js/team.js',
					'js/clients.js',
					'js/contacts.js'
				],
				dest: 'js/est.js',
			},
			vendors: {
				src: [
					'js/vendor/jquery-1.10.1.js',
					'js/vendor/waypoints.js',
					'js/vendor/jquery.easing-1.3.js',
					'js/vendor/jquery.grabscroll.js',
					'js/vendor/jquery.stellar.js'
				],
				dest: 'js/vendors.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: 'js/est.js',
				dest: 'js/est.min.js'
			},
			vendors: {
				src: 'js/vendors.js',
				dest: 'js/vendors.min.js'
			}
		},
		watch: {
			custom : {
				files: ['js/*', '!js/vendo/**','!js/est.**'],
				tasks: ['concat:dist','uglify:dist']
			},
		}
	}); // /initConfig


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('vendors', ['concat:vendors','uglify:vendors']);

	grunt.registerTask('dry', ['concat:dist','uglify:dist']);

	grunt.registerTask('default', ['dry','watch:custom']);

};


