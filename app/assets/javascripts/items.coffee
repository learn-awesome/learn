# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

autosuggestTopics = ->
	topicsResults = new Bloodhound(
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
		source: topicsResults
		templates:
			empty: [
				'<div class="empty-message">'
				'No such topic'
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
	$('#topics_input').val('')

addNewTopic = (topic_id, topic_name) ->
	if !topic_already_exists(topic_id)
		$('#search_topic .input-group-append').append(topic_btn_template(topic_id, topic_name))

topic_already_exists = (topic_id) ->
	return $('#search_topic').find('.topic[data-id=' + topic_id + ']').length > 0

topic_btn_template = (topic_id, topic_name) ->
	return '<div class="btn-group topic" data-id="' + topic_id + '">
		<input type="hidden" name="item[topics][]" value="' + topic_id + '">
		<div class= "btn btn-sm grey-btn">' + topic_name + '</div>
		<div class="btn btn-sm remove_topic">
			<i class="fa fa-times" aria-hidden="true"></i>
		</div>
		</div>'

$(document).on 'click', '#saveItemBtn', ->
	$(this).addClass('disabled')
	if validate_item_name_input() && validate_topics_count() && validate_links()
		saveTheItem()
	else
		$(this).removeClass('disabled')

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

validate_links = ->
	is_valid = true
	$('.item_links').find('input').each ->
		is_valid = false if (!is_url($(this).val()) && $(this).val() != '')
	return is_valid

is_url = (str) ->
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  if regexp.test(str)
    true
  else
    false

$(document).on 'change paste keyup', '.link_input', ->
	if is_url($(this).val())
		$(this).addClass('is-valid')
		$(this).removeClass('is-invalid')
		$('.item_links_error').addClass('hidden')
	else
		$('.item_links_error').removeClass('hidden')
		$(this).addClass('is-invalid')
		$(this).removeClass('is-valid')

$(document).on 'click', '.remove_topic, .item_links .fa-trash', ->
	$(this).parent().remove()

saveTheItem = ->
	itemJson = {
		name: $('#item_name_input').val(),
		item_type_id: $('#item_type').val(),
		topics: [],
		links: [],
		estimated_time: $('#item_estimated_time').val(),
		estimated_time_unit: $('#item_time_unit').val(),
		typical_age_range: $('#item_typical_age_range').val(),
		year: $('#item_year_of_publication').val()
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

$(document).on 'click', '#addNewLink', ->
	$('.item_links').append('<div class="input-group input-group-sm mb-3">
		<span>&#8599; </span> &nbsp;
		<input class="link_input form-control form-control-sm" data-id="" type="text">
		<i class="fa fa-trash" aria-hidden="true"></i>
		</div>')
	$('.item_links .input-group:last-child input').focus()
