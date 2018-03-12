// gruntfile.js
module.exports = function(grunt){
	grunt.initConfig({
		htmlmin: {
			dist: { 
      			options: {
			        removeComments: true,
			        collapseWhitespace: true
			    },
			    files: {
        			'HTML/index.html': 'index.html'
        		}
      		}
		}


	});

	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-csslint');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask("default", ["htmlmin"]);
	// grunt.registerTask("debug", ["csslint"]);
	// grunt.registerTask("js", ["jshint","uglify"]);
	// grunt.registerTask("sassy", ["sass"]);
	// grunt.registerTask("checkcss", ["csslint"]);
	// grunt.registerTask("html", ["htmlmin"]);
	// grunt.registerTask("watchy",['watch']);
	// grunt.registerTask("dothing",["htmlmin"]);
};