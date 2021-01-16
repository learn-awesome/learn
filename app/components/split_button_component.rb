class SplitButtonComponent < ViewComponent::Base
    def initialize(review:, isopen:)
      @review = review
      # item.id acts as the container id for split buttons because review may not exist when we're showing the splitbutton
      @item = @review.item

      # We currently allow users to modify only their own reviews. So, user will be same as current_user.
      # However, it can be nil if user is not logged-in but we want to show a disabled button for review status.
      # Ideally, if the user is not logged in, SplitButtonComponent should not be invoked in the first place.
      @user = @review.user 

      # this is needed because when user toggles the collection within the dropdown, we want to keep it open while
      # replacing a DOM element after the server update
      @isopen = isopen

      if @user
        # Which collection has this item already been added in?
        @lists_added = CollectionItem.where(item: @item).where(collection_id: @user.collections.map(&:id)).pluck(:collection_id)
      end
    end
end