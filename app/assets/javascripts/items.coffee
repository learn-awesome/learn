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
	if !topic_already_exists(topic_id)
		$('#search_topic .input-group-append').append(topic_btn_template(topic_id, topic_name))

topic_already_exists = (topic_id) ->
	return $('#search_topic').find('.topic[data-id=' + topic_id + ']').length > 0

topic_btn_template = (topic_id, topic_name) ->
	return '<div class="btn-group topic" data-id="' + topic_id + '">
		<div class= "btn btn-sm grey-btn">' + topic_name + '</div>
		<div class="btn btn-sm remove_topic">
			<i class="fa fa-times" aria-hidden="true"></i>
		</div>
		</div>'

$(document).on 'click', '#saveItemBtn', ->
	if validate_item_name_input() && validate_topics_count()
		saveTheItem()

validate_item_name_input = ->
	item_name = $('#item_name_input').val()
	if item_name == '' || item_name.length < 3
		$('.item_name_error').removeClass('hidden')
		return false
	else
		$('.item_name_error').addClass('hidden')
		return true

validate_topics_count = ->
	if $('#search_topic').find('.topic').length == 0
		$('.topic_count_error').removeClass('hidden')
		return false
	else
		$('.topic_count_error').addClass('hidden')
		return true

$(document).on 'click', '.remove_topic', ->
	$(this).parent().remove()

saveTheItem = ->
	itemJson = {
		name: $('#item_name_input').val(),
		item_type_id: $('#item_type').val(),
		topics: [],
		links: []
	}
	$('#search_topic').find('.topic').each ->
		itemJson.topics.push($(this).attr('data-id'))

	$('.item_links').find('input').each ->
		itemJson.links.push({id: $(this).attr('data-id'), url: $(this).val()})

	# now make an api call that will save the data
	$.ajax {
		url: '/items/' + item_id,
		type: 'put',
		data: itemJson,
		json: true,
		beforeSend: (xhr) ->
			xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
		success: ->
			window.location.href = '/items/' + item_id
	}
