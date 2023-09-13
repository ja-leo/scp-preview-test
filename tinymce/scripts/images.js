tinymce.PluginManager.add('jobadder_images', function (editor) {

  // jobadder_images: [ { name: 'logo.jpg', url: '/images/logo.jpg', thumbUrl: '/images/logo-thumb.jpg'}, .... etc ];
  var images = editor.settings.jobadder_images;

  if (images && images.length) {

    editor.addButton('jobadder_images', {
      type: 'menubutton',
      text: 'Insert Image',
      tooltip: 'Insert Image',
      classes: 'widget btn imagelist',
      menu: $.map(images, function (image) {
        return {
          text: image.thumbUrl,
          tooltip: image.name,
          imageUrl: image.url
        };
      }),
      onclick: function (e) {
        if (e.control.settings.imageUrl) {
          // legacy support for 'rms-content-image'
          editor.insertContent('<img class="ja-content-image rms-content-image" src="' + e.control.settings.imageUrl + '"/>');
          window.setTimeout(function () {
            editor.nodeChanged();
          });
        }
      },
      oncreatemenu: function (e) {
        $(e.control.menu.getEl()).find('.mce-menu-item .mce-text').each(function () {
          var menuItem = $(this);
          if (!menuItem.is('.ja-image-done')) {
            var txt = menuItem.text(),
              img = $('<img />').attr({ src: txt });
            //menuItem.html(img.html()).addClass('ja-image-done');
            menuItem.addClass('ja-image-done').empty().append(img);
          }
        });
      }
    });

  }

});
