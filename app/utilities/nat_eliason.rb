# frozen_string_literal: true

require 'uri'
require 'nokogiri'
require 'open-uri'

class NatEliason
  BASE_URL  = 'https://www.nateliason.com'
  NOTES_URL = BASE_URL + '/notes'


  def self.extract
    notes.map do |note|
      sections = note_sections(note[:href])
      title    = sections[:top].search('h1.notes-title').first

      {
        book_title:        title.text.split(' by').first,
        book_author_name:  title.text.split('by ').last,
        book_cover_image:  sections[:top].search('img').attribute('src').value,
        book_link:         is_a_book?(sections[:top]) ? get_book_link(sections[:top]) : get_article_link(sections[:top]),
        note_author_name:  'Nat Eliason',
        note_content:      sections[:notes].map { |e| e.text }.join(' ').gsub(/\s{2,}/, ' '),
        note_category:     note[:category]
      }
    end
  end

  private

    def self.notes_list
      doc = Nokogiri::HTML(URI.open(NOTES_URL))
      doc.search '//div[@class="notes-category"]//div[2]//div[@role="listitem"]'
    end

    def self.notes
      notes_list.map do |element|
        category = element.text[/\.(\w+)$/, 1]
        href     = BASE_URL + element.at('a').attribute('href').value

        Hash[category: category, href: href]
      end
    end

    def self.note_sections(url)
      doc = Nokogiri::HTML(URI.open(url))

      {
        top:     doc.search('div.notes-top-section'),
        # summary: doc.search('div.notes-summary-section'),
        # video:   doc.search('div.notes-video-section'),
        # podcast: doc.search('div.notes-podcast-section'),
        notes:   doc.search('div.notes-notes-section')
      }
    end

    def self.is_a_book?(section)
      section.search('//a[@class="notes-link-book"]').any?
    end

    def self.get_book_link(section)
      section.search('a.notes-link-book').attribute('href').value
    end

    def self.get_article_link(section)
      section.search('a.notes-link-article').attribute('href').value
    end
end
