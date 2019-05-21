(function ($) {
  var target = '.u-sidebar',
    $sidebarInvoker = $('.js-sidebar-invoker'),
    $body = $('body'),
    closeAllExceptThis = Boolean($sidebarInvoker.data('is-close-all-except-this')),
    windowWidth = window.innerWidth,
    closedItems = [];

  function closeEffect(target, closedItems) {
    var windowWidth = window.innerWidth;

    $(target).addClass('toggled');

    if (closedItems.length > 0 && windowWidth >= 768) {
      var items = closedItems.toString();

      $(items).slideUp(400, function () {
        $(target + '.toggled').addClass('action mini');
        $body.addClass('side-nav-on-action');
        $(items).parent().removeClass('u-sidebar-nav--opened');
      });
    } else {
      $(target + '.toggled').addClass('action mini');
      $body.addClass('side-nav-on-action');
    }
  }

  function openEffect(target, closedItems) {
    var windowWidth = window.innerWidth;

    $(target).removeClass('mini action toggled');
    $body.removeClass('side-nav-on-action');

    if (closedItems.length > 0 && windowWidth >= 768) {
      setTimeout(function () {
        $(closedItems.toString()).parent().addClass('u-sidebar-nav--opened');
        $('body:not(.sidebar-tablet-closed) ' + closedItems.toString()).slideDown(400);
      }, 300);
    }
  }

  $(window).on('load', function () {
    // Sidebar
    if ($('.u-sidebar-nav--opened').length) {
      $('.u-sidebar-nav--opened > .u-sidebar-nav-menu__link[data-target]').each(function() {
        closedItems.push($(this).data('target'));
      });
    }

    $sidebarInvoker.on('click', function (e) {
      e.preventDefault();

      $body.removeClass('sidebar-tablet-closed sidebar-mobile-closed');

      if ($(target).hasClass('toggled')) {
        openEffect(target, closedItems);
      } else {
        closeEffect(target, closedItems);
      }
    });

    $('.u-sidebar-nav-menu__link[data-target]').on('click', function (e) {
      e.preventDefault();

      var itemTarget = $(this).data('target');

      if (closeAllExceptThis) {
        closedItems = [];
        $('.u-sidebar-nav-menu--top-level ul:not("' + itemTarget + '")').slideUp(400).parent().removeClass('u-sidebar-nav--opened');
        $(itemTarget).slideToggle(400).parent().toggleClass('u-sidebar-nav--opened');
        if ($(this).parent().hasClass('u-sidebar-nav--opened')) {
          closedItems.push(itemTarget);
        }

        if($body.hasClass('tablet-mode')) {
          $body.toggleClass('has-tablet-opened-items');
        }
      } else {
        closedItems.push(itemTarget);
        $(itemTarget).slideToggle(400).parent().toggleClass('u-sidebar-nav--opened');

        if($body.hasClass('tablet-mode')) {
          $body.toggleClass('has-tablet-opened-items');
        }
      }
    });

    $(window).on('resize', function () {
      var windowWidth = window.innerWidth;

      if (windowWidth < 768) {
        $body.removeClass('tablet-mode desktop-mode side-nav-on-action sidebar-tablet-closed').addClass('mobile-mode sidebar-mobile-closed');
      } else if (windowWidth >= 768 && windowWidth <= 992) {
        $body.removeClass('mobile-mode sidebar-mobile-closed desktop-mode side-nav-on-action').addClass('tablet-mode sidebar-tablet-closed');
      } else {
        $body.removeClass('tablet-mode mobile-mode sidebar-mobile-closed sidebar-tablet-closed has-tablet-opened-items').addClass('desktop-mode');
      }

      if (windowWidth < 768) {
        $(target + '.toggled').removeClass('mini');
      } else if (windowWidth >= 768 && windowWidth <= 992) {
        $(target + '.toggled').addClass('mini');
      } else {
        $(target + '.toggled').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          $(target + '.toggled').addClass('mini');
        });
      }

      if (windowWidth >= 768 && windowWidth <= 992) {
        $(target).addClass('tablet');

        if(!$body.hasClass('has-tablet-opened-items')) {
          closeEffect(target, closedItems);
        }
      } else {
        $(target).removeClass('tablet');

        if (!$body.hasClass('side-nav-on-action')) {
          openEffect(target, closedItems);
        } else if ($body.hasClass('side-nav-on-action desktop-mode')) {
          openEffect(target, closedItems);
        }
      }
    }).resize();
  });
})(jQuery);