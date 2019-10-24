class FiveStarComponent < ActionView::Component::Base
    validates :id_prefix, :name, presence: true

    def initialize(id_prefix:, name:, value:, onchange: "", label: "Rate it", color: "yellow", size: 1.0)
      @label = label
      @color = color
      @size  = size
      @id_prefix = id_prefix
      @name = name
      @value = value
      @onchange = onchange
    end

    private
  
    attr_reader :label, :color, :size, :id_prefix, :name, :value, :onchange


  end