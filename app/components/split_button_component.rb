class SplitButtonComponent < ViewComponent::Base
    def initialize(item:, user:)
      @item = item
      @user = user
      if @user
        @lists_added = CollectionItem.where(item: @item).where(collection_id: @user.collections.pluck(:id)).pluck(:collection_id)
        @review = Review.where(item: @item, user: @user).first || Review.new
      end
    end
end