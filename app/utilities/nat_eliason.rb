# frozen_string_literal: true

require 'uri'
require 'nokogiri'
require 'open-uri'

class NatEliason
  BASE_URL  = 'https://www.nateliason.com'
  NOTES_URL = BASE_URL + '/notes'

  def self.extract
    notes_list_items_href_values.map do |note_href|
      note_note_content(note_href)
    end
  end

  private

    def self.notes_list_doc
      @notes_list_doc ||= Nokogiri::HTML(URI.open(NOTES_URL))
    end

    def self.notes_list_items
      notes_list_doc.search '//div[@class="notes-category"]//div[2]//div[@role="listitem"]//p'
    end
    
    def self.notes_list_items_href_values
      notes_list_items.map { |element| BASE_URL + element.children.attribute('href').value }
    end

    def self.note_doc(url)
      Nokogiri::HTML(URI.open(url))
    end

    def self.note_top_section(url)
      note_doc(url).search 'div.notes-top-section'
    end

    def self.is_a_book?(url)
      note_top_section(url).search('//a[@class="notes-link-book"]').any?
    end

    def self.get_book_link(url)
      note_top_section(url).search('a.notes-link-book').attribute('href').value
    end

    def self.is_an_article?(url)
      note_top_section(url).search('//a[@class="notes-link-article"]').any?
    end

    def self.get_article_link(url)
      note_top_section(url).search('a.notes-link-article').attribute('href').value
    end

    def self.note_note_title(url)
      note_doc(url).search('h1.notes-title').first
    end

    def self.note_note_elements(url)
      note_doc(url).search 'div.notes-notes-section'
    end

    def self.note_note_content(url)
      elements = note_note_elements(url)

      {
        book_title:        note_note_title(url).text.split(' by').first,
        book_author_name:  note_note_title(url).text.split('by ').last,
        book_cover_image:  note_top_section(url).search('img').attribute('src').value,
        book_link:         is_a_book?(url) ? get_book_link(url) : get_article_link(url),
        note_author_name:  'Nat Eliason',
      }
    end
end
