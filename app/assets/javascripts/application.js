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
//= require jquery
//= require rails-ujs
//= require activestorage
//= require trix
//= require_tree .

function animateHeadline(){

	var querylink = document.getElementById("querylink");

	var versions = [
	  {
	  	msg: "Show me <u>podcasts</u> about <u>machine learning</u> which are <u>30 to 60 minutes</u> long and are <u>challenging</u>.",
	  	link: "item_type=audio&length=30-60&quality=challenging&topic=machine-learning&commit=Search"
	  },
	  {
	  	msg: "Show me <u>books</u> about <u>abstract algebra</u> which are <u>more than 3 hours</u> long and are <u>visual</u>.",
	  	link: "item_type=book&length=180-9999&quality=visual&topic=abstract-algebra&commit=Search"
	  },
	  {
	  	msg: "Show me <u>group chats</u> about <u>cooking</u>.",
	  	link: "item_type=chat&topic=cooking&commit=Search"
	  },
	  {
	  	msg: "Show me <u>courses</u> about <u>learning</u> which are <u>10 to 20 hours</u> long and are <u>inspirational</u>.",
	  	link: "item_type=course&length=180-9999&quality=inspirational&topic=learning&commit=Search"
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

function autosuggest(){
	var bestResults = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  remote: {
	    url: '/search.json?q=%QUERY',
	    wildcard: '%QUERY'
	  }
	});

	$('#topsearch').typeahead({
		highlight: true,
		minLength: 3,
		autoselect: true
	}, {
	  name: 'best-items',
	  display: 'name',
	  limit: 10,
	  source: bestResults,
	  templates: {
	    empty: [
	      '<div class="empty-message">',
	        'No such things',
	      '</div>'
	    ].join('\n'),
	    suggestion: function(data) { 
	    	var item_type = data.item_type_id;
	    	var type = (item_type != undefined ? "item" : "topic"); //topics don't have item_type
	    	if(type == "item"){
		    	if(data.creators)
		    		item_type += ' by ' + data.creators;
		    	return '<a href="/items/' + data.id + '"><div><strong>' + data.name + '</strong><br/>' + item_type + '</div></a>';
		    } else { // topic
		    	return '<a href="/topics/' + data.id + '"><div><strong>' + data.name + '</strong></div></a>';
		    }
	    }
	  }
	});
}

document.addEventListener('DOMContentLoaded', function(){
  setTimeout(autosuggest, 1000);
});
