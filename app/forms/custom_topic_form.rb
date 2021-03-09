class CustomTopicForm
    include ActiveForm::Base
    include ActiveForm::SimpleFormHelpers
  
    attr_accessor :topic
  
    attribute :age
    attribute :email
  
    validates :age, presence: true, numericality: { only_integer: true, greater_than: 50 }
    validates :email, format: { with: /yahoo/, allow_blank: true }
    
    def process
      return false unless valid?
      true
    end
end