# frozen_string_literal: true

module ActiveForm
    # This module adds methods available on AR classes used by simple_form to
    # infer the input types
    #
    # Rails Attributes supports type casting so we can utilise this to display
    # the correct type, unfortunately, AR uses database typecasting for this
    # method so it's not available on active model yet, this module is a
    # work-around.
    module SimpleFormHelpers
      extend ActiveSupport::Concern
  
      included do
        # AR also delegates to class and uses the class method for lookup from
        # instances
        delegate :type_for_attribute, to: :class
      end
  
      def has_attribute?(attr_name) # rubocop:disable Naming/PredicateName
        @attributes.key?(attr_name.to_s)
      end
  
      class_methods do
        def type_for_attribute(attr_name, &block)
          attr_name = attr_name.to_s
          if block
            # attribute_types is included with AM::Attributes module
            attribute_types.fetch(attr_name, &block)
          else
            attribute_types[attr_name]
          end
        end
  
        def has_attribute?(attr_name) # rubocop:disable Naming/PredicateName
          attribute_types.key?(attr_name.to_s)
        end
      end
    end
end
  