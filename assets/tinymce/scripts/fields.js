tinymce.PluginManager.add('jobadder_fields', function (editor) {
   
  var fields = editor.settings.jobadder_fields; // array of strings

  if (fields && fields.length) {
    editor.addButton('jobadder_fields', {
      type: 'menubutton',
      text: 'Insert Field',
      tooltip: 'Insert Field',
      classes: 'widget btn fieldlist',
      menu: $.map(fields, function (field) {
        return {
          text: field,
          field: '{' + field + '}'
        };
      }),
      onclick: function (e) {
        if (e.control.settings.field) {
          // spellcheck gets inherited, need to work out how to stop that before adding it back in
          editor.insertContent('<span>' + e.control.settings.field + '</span>');
          //editor.insertContent('<span spellcheck="false">' + e.control.settings.field + '</span>');
        }
      }
    });
  }
});
