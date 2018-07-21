define(['backbone.marionette', 
	'tpl!templates/about.html'], 
	function(Marionette, template) {


	return Marionette.View.extend({
		className: 'page-panel',
		template: template
	})
	
})
