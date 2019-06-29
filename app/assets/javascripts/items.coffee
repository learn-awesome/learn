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
				'<a class="topic_result" data-id="' + data.id + '" data-name="' + data.name + '"><div>' + name + '<br/></div></a>'
	return

document.addEventListener 'DOMContentLoaded', ->
	setTimeout autosuggestTopics, 1000
	return

$(document).on 'click', '.topic_result', ->
	addNewTopic($(this).attr('data-id'), $(this).attr('data-name'))
	$('#search_topic input').val('')

addNewTopic = (topic_id, topic_name) ->
	$('#search_topic .input-group-append').append(topic_btn_template(topic_id, topic_name))

topic_btn_template = (topic_id, topic_name) ->
	return '<div class="btn-group">
		<div class= "btn btn-sm grey-btn">' + topic_name + '</div>
		<div class="btn btn-sm remove_item" data-id="' + topic_id + '">
			<i class="fa fa-times" aria-hidden="true"></i>
		</div>
		</div>'
