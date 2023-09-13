tinymce.PluginManager.add('jobadder_linkcolorfix', function (editor) {

  editor.on('BeforeExecCommand', function (e) {

    switch (e.command) {
      case "ForeColor":
        // override the behavior when the user clicks the ForeColor button to change the text color
        var elm = $(editor.selection.isCollapsed() ? editor.selection.getNode() : editor.selection.getStart()).closest('a');
        if (elm.length) {
          elm.css('color', e.value);
          editor.nodeChanged();
          e.preventDefault();
        }
        break;
    }

  });

});
