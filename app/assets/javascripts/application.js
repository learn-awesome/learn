// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// require turbolinks
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage

//= require_tree .

function animateHeadline(){

	var querylink = document.getElementById("querylink");

	var versions = [
	  {
	  	msg: "Show me <u>podcasts</u> about <u>machine learning</u> which are <u>30 to 60 minutes</u> long and are <u>challenging</u>.",
	  	link: "item_type=audio&length=30-60&quality=challenging&topic_name=machine+learning"
	  },
	  {
	  	msg: "Show me <u>books</u> about <u>group theory</u> which are <u>3 to 8 hours</u> long and are <u>visual</u>.",
	  	link: "item_type=book&length=180-480&quality=visual&topic_name=abstract+algebra"
	  },
	  {
	  	msg: "Show me <u>group chats</u> about <u>cooking</u>.",
	  	link: "item_type=chat&topic_name=cooking"
	  },
	  {
	  	msg: "Show me <u>MOOCs</u> about <u>learning</u> which are <u>20 to 60 hours</u> long and are <u>inspirational</u>.",
	  	link: "item_type=course&length=1200-3600&quality=inspirational&topic_name=learning"
	  }
	];
	
	new Typed("#queryheadline", {
		strings: versions.map((o) => o.msg),
		typeSpeed: 10,
		loop: true,
		backDelay: 4000,
		backSpeed: 10,
		showCursor: false,
		onStringTyped: function(arrayPos, self){
			querylink.href = "/items/query?" + versions[arrayPos].link;
		}
	});
}
