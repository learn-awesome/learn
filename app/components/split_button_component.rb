class SplitButtonComponent < ViewComponent::Base
    # To use
    # <%= render SplitButtonComponent, id_prefix: "sbc", name: "sbc", labels: [["Learned", "learned"], ["Currently learning","learning"], ["Want to learm", "want_to_learn"]], value: @my_review.status %>
    validates :id_prefix, :name, :labels, presence: true

    def initialize(id_prefix:, name:, value: nil, labels:, onchange: "", color: "yellow", size: 1.0)
      @labels = labels
      @color = color
      @size  = size
      @id_prefix = id_prefix
      @name = name
      @value = value
      @onchange = onchange
    end

    private
  
    attr_reader :labels, :color, :size, :id_prefix, :name, :value, :onchange


  end