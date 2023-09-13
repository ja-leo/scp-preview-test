// only really have a custom version of this so that i can easily change tooltip and window title text
// will get rid of this if i work out the proper way to do it
tinymce.PluginManager.add('jobadder_code', function (editor) {

  function showDialog() {
    editor.windowManager.open({
      title: "Edit HTML",
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: editor.getParam("code_dialog_width", 600),
        minHeight: editor.getParam("code_dialog_height", Math.min(tinymce.DOM.getViewPort().h - 200, 500)),
        value: editor.getContent({ source_view: true }),
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        // We get a lovely "Wrong document" error in IE 11 if we
        // don't move the focus to the editor before creating an undo
        // transation since it tries to make a bookmark for the current selection
        editor.focus();

        editor.undoManager.transact(function () {
          editor.setContent(e.data.code);
        });

        editor.selection.setCursorLocation();
        editor.nodeChanged();
      }
    });
  }

  editor.addCommand("mceCodeEditor", showDialog);

  editor.addButton('jobadder_code', {
    icon: 'code',
    tooltip: 'Edit HTML',
    onclick: showDialog
  });

  editor.addMenuItem('jobadder_code', {
    icon: 'code',
    text: 'Edit HTML',
    context: 'tools',
    onclick: showDialog
  });

});
