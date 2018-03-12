module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			files: ["*.js", "js/scripts.js"],
			options: {
				globals:{
					jQuery:true
				}
			}
		},
		csslint: {
			strict: {
				options: {
					import:2
				},
				src: ['css/styles.css']

			}
		},
		uglify: {
    		my_target: {
		      files: {'FINAL/js/scripts.min.js': ['js/scripts.js']}
	    	}
	  	},
	  	cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      // cwd: 'css',
		      src: ['css/*.css', '!*.min.css'],
		      dest: 'FINAL',
		      ext: '.min.css'
		    }]
		  }
		},
		watch: {
			scss:{
				files:['sass/styles.scss'],
				tasks:['sass','cssmin']
			},
			js:{
				files:['js/scripts.js'],
				tasks:['jshint','uglify']
			},
			html:{
				files:['index.html'],
				tasks:['htmlmin']
			}
		},
		sass: {                              // Task
		    dist: {                            // Target
		      options: {                       // Target options
		        style: 'expanded'
		      },
		      files: {                         // Dictionary of files
		        'css/styles.css': 'sass/styles.scss'
		      }
		    }
		  },
		htmlmin: {
			dist: { 
      			options: {
			        removeComments: true,
			        collapseWhitespace: true
			    },
			    files: {
        			'FINAL/index.html': 'index.html'
        		}
      		}
		}


	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask("default", ["jshint","csslint"]);
	grunt.registerTask("debug", ["csslint"]);
	grunt.registerTask("js", ["jshint","uglify"]);
	grunt.registerTask("sassy", ["sass"]);
	grunt.registerTask("checkcss", ["csslint"]);
	grunt.registerTask("html", ["htmlmin"]);
	grunt.registerTask("watchy",['watch']);
};