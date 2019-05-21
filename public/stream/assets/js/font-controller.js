(function ($) {
  $(document).on('ready', function () {
    var $fontController = $('.js-font-controller');

    if ($fontController.length) {
      $fontController.each(function () {
        var $this = $(this),
          $target = $($this.data('target'));

        $this.on('change', function () {
          var value = $this.val();

          $target.css('font-family', value);
        });
      });
    }
  });
})(jQuery);