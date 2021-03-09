# frozen_string_literal: true

module ActiveForm
    #
    ##### What is this?
    #
    # This model can be included to a form object to setup the required modules
    # that allow us to add attributes and validations to the form object
    #
    # This allows us to have complete control
    # over the contextual validation rules and potentially presenting the
    # attributes.
    #
    # This can be useful in cases like multistep registration. Previously in
    # rails we used to stick all of the validations in the class and then we're
    # stuck validating them all everytime or weilding the axe and validate:
    # false. Some developers found work arounds by using virtual attributes to
    # skip validators
    #
    # e.g.
    #   attr_accessor :skip_email_validation
    #
    #   with_options unless: :skip_email_validation do
    #     validates :email, presence: true
    #     validates :email, uniqueness: true
    #   end
    #
    # This can get messy quickly and requires us to pass contextual attributes to
    # the class. With form objects we only include the attributes we want to
    # validate and update.
    #
    # An additional usecase is where we would like to update multiple records
    #
    # e.g.
    #
    #   class EditAccountForm
    #     include ActiveForm::Base
    #
    #     attr_accessor :user, :account
    #     attribute :email, :string
    #     attribute :office_number, :string
    #
    #     def save
    #       return false unless valid?
    #
    #       ActiveRecord::Base.transaction do
    #         user.update(email: email) if email
    #         account.update(office_number: office_number) if office_number
    #       end
    #     end
    #   end
    #
    ##### When can Form objects be used?
    #
    # Form objects can be used in APIs or as rendered views.
    #
    # When rendering in a view, we can initialize one in a new action and use the
    # same form in the create action.
    #
    ##### Available Callbacks
    #
    # We include all of the default ActiveModel::Model callbacks and define two
    # additional callbacks here
    #
    #   *before_initialization*
    #   *after_initialization*
    #
    # *after_initialization* is useful for editing records where you need to
    # populate the form with the original attributes
    #
    # e.g.
    #
    #   class User::EditForm
    #     include ActiveForm::Base
    #     attr_accessor :user
    #     attribute :email, :string
    #
    #     after_initialization do
    #      self.email = user.email
    #     end
    #   end
    #
    ##### Passing parameters
    #
    # I built this with the intention of passing params from controllers or
    # hashes. The hashify method will convert the respective types into a hash
    # before calling assign_attributes
    #
    # *initialize* accepts a params hash and will allow-list based on
    # the attributes defined on a class
    #
    # e.g.
    #
    #   class EmailForm
    #     include ActiveForm::Base
    #
    #     attribute :email, :string
    #   end
    #
    #   params = ActionController::Parameters.new(
    #     email: 'mail@example.com', malicious: :foo
    #   )
    #
    #   form = EmailForm.new(params: params)
    #
    # In this situation the form will ignore the malicious parameter. It's up to
    # you to sanitize allowed params for security issues, e.g. SQL injection is
    # still possible if using an allowed parameter and the code is not safe
    #
    ##### Resources
    #
    # *initialize* also supports passing resources (also attributes if you would
    # like to) manually. Rails does not support any attribute type for models so
    # it's common to use an attr_accessor for classes. If you need to modify a
    # resource it's up to you how to manage it, if the resource will be available
    # on the controller level I recommend passing it manually, if it's only
    # available as an id in the params then you can use after_initialization to
    # fetch it using the attribute
    #
    # e.g.
    #
    #   class UserForm
    #     include ActiveForm::Base
    #
    #     attr_accessor :user
    #
    #     attribute :user_id, :integer # could also be :string, :uuid etc
    #
    #     after_initialization -> do
    #       self.user = User.find(user_id) if user_id
    #     end
    #   end
    #
    # given the above form you could inistantiate by passing params[:user_id] or
    # user: current_user
    #
    # e.g.
    #
    #   UserForm.new(params: { user_id: User.first.id })
    #   UserForm.new(user: User.first)
    #
    # both of the above methods would result in the same outcome
    #
    # because resources are passed by the developer we do not block any resource
    # keys being passed in, it's your responsibility to pass the correct
    # arguments
    #
    ##### Validating Uniqueness
    #
    # You can use most of the default validators, however, validate_uniqueness_of
    # is not supported as we are using a form object not the actual record we
    # wish to save.
    # If you need to validate uniqueness you should use a query to do so.
    #
    # e.g.
    #
    # For new records
    #
    #   class User::RegistrationForm
    #     include ActiveForm::Base
    #
    #     attribute :email, :string
    #
    #     validates :email, presence: true
    #     validate :email_unique?, if: :email
    #
    #     private def email_unique?
    #       return true unless User.exists?(email: email)
    #
    #       errors.add(email: :taken)
    #       false
    #     end
    #
    # For persisted records
    #
    #   class User::EditEmailForm
    #     include ActiveForm::Base
    #
    #     attr_accessor :user
    #     attribute :email, :string
    #
    #     validates :email, presence: true
    #     validates :user, presence: true
    #     validate :email_unique?, if: :email_changed?
    #
    #     private def email_changed?
    #       return false unless user && email
    #
    #       email != user.email
    #     end
    #
    #     private def email_unique?
    #       return true unless User.where.not(id: user.id).exists?(email: email)
    #
    #       errors.add(email: :taken)
    #       false
    #     end
    #
    module Base
      extend ActiveSupport::Concern
      include ActiveModel::Model
      include ActiveModel::Attributes
      extend ActiveModel::Callbacks
      include ActiveModel::Validations::Callbacks
      DATE_TYPES = [ActiveModel::Type::DateTime, ActiveModel::Type::Date].freeze
  
      included do
        define_model_callbacks :initialization, only: %i[before after]
        class_attribute :param_aliases, default: {}
        class_attribute :date_attributes, default: []
  
        # Allow incoming param under a different name to set another attribute
        #
        # If both param names exist, attribute_key will be accepted over the alias
        # If more than one alias exists the last one set would be accepted
        #
        # e.g.
        # attribute :form_id
        # alias_param :id, :form_id
        # alias_param :_id, :form_id
        #
        # Form.new(params: { form_id: 1, id: 2 }) => form_id == 1
        # Form.new(params: { id: 1, _id: 2 }) => form_id == 2
        # Form.new(params: { _id: 1, id: 2 }) => form_id == 1
        #
        def self.alias_param(alias_key, attribute_key)
          param_aliases[alias_key] = attribute_key
        end
  
        def self.attribute(name, type = ActiveModel::Type::Value.new, **options)
          super
          attribute_type = attribute_types[name.to_s]
          # Add the ? method for boolean attributes
          alias_boolean(name) if attribute_type.is_a?(ActiveModel::Type::Boolean)
          # store date attribute names so we can merge the params during
          # initialization
          date_attributes << name if attribute_type.class.in?(DATE_TYPES)
        end
  
        def self.alias_boolean(name)
          alias_method :"#{name}?", name
        end
      end
  
      def initialize(params: {}, **resources)
        run_callbacks :initialization do
          params_hash = hashify(params)
          processed_params_hash = process_params_hash(params_hash)
          form_attributes = sanitize_params(processed_params_hash)
          super(form_attributes)
          resources.each { |key, value| public_send("#{key}=", value) }
        end
      end
  
      private def process_params_hash(params_hash)
        dealiased_params_hash = dealias_params(params_hash)
        merge_date_and_time_params(dealiased_params_hash)
      end
  
      private def sanitize_params(params_hash)
        params_hash.slice(*self.class.attribute_types.keys)
      end
  
      # Sometimes we need to pass params with different naming to the form
      # attribute so we create a param_alias for the attribute. We then dealias
      # the parameter here
      private def dealias_params(params_hash)
        self.class.param_aliases.each do |alias_key, attribute_key|
          next unless (merged_values = params_hash[alias_key]).present?
  
          params_hash.reverse_merge!(attribute_key => merged_values)
        end
        params_hash
      end
  
      # Rails submits date fields as attr_name(1i) attr_name(2i) attr_name(3i)
      # and datetime fields as attr_name(1i) .. attr_name(4i) attr_name(5i)
      #
      # We merge those values here so that they will correctly be assigned to
      # the form
      private def merge_date_and_time_params(params_hash)
        self.class.date_attributes.each do |attribute_key|
          merged_values = 5.times.map do |i|
            v = params_hash["#{attribute_key}(#{i}i)"]
            v.present? && v.is_a?(String) ? v.rjust(2, '0') : v
          end.join
          next unless merged_values.present?
  
          params_hash.reverse_merge!(attribute_key => merged_values)
        end
        params_hash
      end
  
      private def hashify(params)
        case params
        when ActionController::Parameters then params.to_unsafe_h
        when NilClass then {}
        else params
        end.with_indifferent_access
      end
  
      # Convert the ActiveModel::Attributes so we can access keys with symbols or
      # string keys
      def attributes
        super.with_indifferent_access
      end
    end
end
  