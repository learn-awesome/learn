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
	  limit: 15,
	  source: bestResults,
	  templates: {
	    empty: [
	      '<div class="empty-message">',
	        'No such things',
	      '</div>'
	    ].join('\n'),
	    suggestion: function(data) {
	        var entityType;
	        entityType = data[0];
            data = data[1];
            switch(entityType) {
                case 'Topic':
                    return '<a href="/topics/' + data.to_param + '"><div><strong>' + data.name + '</strong></div></a>';
                case 'Item':
                    var itemType = data.item_type_id;
                    if(data.creators) {
                        itemType += ' by ' + data.creators;
                    }
                    return '<a href="/items/' + data.to_param + '"><div><strong>' + data.name + '</strong><br/>' + itemType + '</div></a>';
                case 'Person':
                    return '<a href="/people/' + data.to_param + '"><div><strong>' + data.name + '</strong><br/>' + 'Person' + '</div></div></a>';
                default:
                console.error('unhandled entity: ' + data.type);
            }
	    }
	  }
	});
}

document.addEventListener('DOMContentLoaded', function(){
  setTimeout(autosuggest, 1000);
});
