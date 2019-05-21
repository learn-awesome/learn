(function ($) {
  $(document).on('ready', function () {
    var $fontController = $('.js-custom-select');

    if ($fontController.length) {
      $fontController.each(function () {
        var $this = $(this),
          placeholder = $this.data('placeholder');

        $this.select2({
          placeholder: placeholder,
          containerCssClass: 'u-select-line',
          dropdownCssClass: 'u-select-line__dropdown',
          minimumResultsForSearch: Infinity
        });
      });
    }
  });
})(jQuery);