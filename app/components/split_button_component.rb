class SplitButtonComponent < ViewComponent::Base
    def initialize(item:, user:, isopen:)
      # item.id acts as the container id for split buttonsbecause review may not exist when we're showing the splitbutton
      @item = item

      # We currently allow users to modify only their own reviews. So, user will be same as current_user.
      # However, it can be nil if user is not logged-in but we want to show a disabled button for review status.
      # Ideally, if the user is not logged in, SplitButtonComponent should not be invoked in the first place.
      @user = user 

      # this is needed because when user toggles the collection within the dropdown, we want to keep it open while
      # replacing a DOM element after the server update
      @isopen = isopen

      if @user
        # Which collection has this item already been added in?
        @lists_added = CollectionItem.where(item: @item).where(collection_id: @user.collections.pluck(:id)).pluck(:collection_id)

        # Fetch or build a review object which can be created or update by this splitbutton
        @review = Review.where(item: @item, user: @user).first || Review.new(item: @item, user: @user)
      end
    end
end