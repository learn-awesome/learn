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
//= require cocoon
//= require_tree .

function copyToClipboard(link) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(link).select();
  document.execCommand("copy");
  $temp.remove();
}

function autosuggest(){
	var topicResults = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  remote: {
	    url: '/search.json?q=%QUERY',
	    wildcard: '%QUERY'
	  }
	});

	var itemResults = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  remote: {
	    url: '/search.json?q=%QUERY',
	    wildcard: '%QUERY'
	  }
	});

	var personResults = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  remote: {
	    url: '/search.json?q=%QUERY',
	    wildcard: '%QUERY'
	  }
	});

	$('.typeahead').bind('typeahead:select', function(ev, entityType, data) {
		window.location = getPath(entityType, data)
	});

	function getPath(entityType, data){
		switch(entityType) {
			case 'Topic':
					return '/topics/' + data.to_param;
			case 'Item':
					return '/items/' + data.to_param;
			case 'Person':
					return '/people/' + data.to_param;
			default:
			console.error('unhandled entity: ' + data.type);
		}
	}

	function filter(suggestions, entityType){
		const result = suggestions && suggestions.filter((item) => item[0] === entityType)
		return result
	}

	$('#topsearch').typeahead({
		highlight: true,
		minLength: 3,
		autoselect: true
	}, 
	{
	  name: 'best-items',
	  display: function (data) {
			return data[1].name
		},
		limit: 5,
		async: true,
	  source: function(query, sync, async) {
			return topicResults.search(query,
				function(suggestions) {
					return sync(filter(suggestions, 'Topic'));
				},
				function(suggestions) {
					return async(filter(suggestions, 'Topic'));
			});
	},
	  templates: {
	    header: '<h1>Topic</h1>',
	    suggestion: function(option) {
				let [entityType, data] = option;
        return '<a href="' + getPath(entityType, data) + '"><div><strong>' + data.name + '</strong></div></a>';
	    }
	  }
	}, 
	{
	  name: 'best-items',
	  display: function (data) {
			return data[1].name
		},
		limit: 5,
		async: true,
	  source: function(query, sync, async) {
			return itemResults.search(query,
				function(suggestions) {
					return sync(filter(suggestions, 'Item'));
				},
				function(suggestions) {
					return async(filter(suggestions, 'Item'));
			});
	},
	  templates: {
	    header: '<h1>Item</h1>',
	    suggestion: function(option) {
				let [entityType, data] = option;
        var itemType = data.item_type_id;
				if(data.creators) {
						itemType += ' by ' + data.creators;
				}
				return '<a href="' + getPath(entityType, data) + '"><div><strong>' + data.name + '</strong><br/>' + itemType + '</div></a>';
	    }
	  }
	},
	{
	  name: 'best-items',
	  display: function (data) {
			return data[1].name
		},
		limit: 5,
		async: true,
	  source: function(query, sync, async) {
			return personResults.search(query,
				function(suggestions) {
					return sync(filter(suggestions, 'Person'));
				},
				function(suggestions) {
					return async(filter(suggestions, 'Person'));
			});
	},
	  templates: {
	    header: '<h1>Person</h1>',
	    suggestion: function(option) {
				let [entityType, data] = option;
        return '<a href="' + getPath(entityType, data) + '"><div><strong>' + data.name + '</strong><br/>' + 'Person' + '</div></div></a>';
	    }
	  }
	}
	);
}

document.addEventListener('DOMContentLoaded', function(){
  setTimeout(autosuggest, 1000);
});
