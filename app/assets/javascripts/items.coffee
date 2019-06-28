# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

autosuggestTopics = ->
	topcisResults = new Bloodhound(
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value')
		queryTokenizer: Bloodhound.tokenizers.whitespace
		remote:
			url: '/topics/search.json?q=%QUERY'
			wildcard: '%QUERY')
	$('#search_topic .typehead').typeahead {
		highlight: true
		minLength: 2
		autoselect: true
	},
		name: 'best-items'
		display: 'name'
		limit: 10
		source: topcisResults
		templates:
			empty: [
				'<div class="empty-message">'
				'No such topcis'
				'</div>'
			].join('\n')
			suggestion: (data) ->
				name = '<strong>' + data.name + '</strong>'
				'<a class="topic_result"><div data-id="' + data.id + '">' + name + '<br/></div></a>'
	return

document.addEventListener 'DOMContentLoaded', ->
	setTimeout autosuggestTopics, 1000
	return
