tinymce.PluginManager.add('tinymoji', function (editor, url) {

  var pluginVersion = "1.0";

  editor.target.DOM.loadCSS(url + '/styles.css');

  var panelHtml = null;

  if (localStorage && localStorage.getItem("tinymce.plugins.tinymoji.version") == pluginVersion) {
    panelHtml = localStorage.getItem("tinymce.plugins.tinymoji.html")
  }

  if (panelHtml == null) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url + '/emoji.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {

        var groups = JSON.parse(xobj.responseText).groups;

        panelHtml = '<div class="tinymoji-body">';

        groups.forEach(function (group) {

          panelHtml += '<table role="list" title="' + group.name + '"><tbody>';
          var width = Math.min(group.emoji.length, 9);
          var height = Math.ceil(group.emoji.length / width);

          for (y = 0; y < height; y++) {
            panelHtml += '<tr>';

            for (x = 0; x < width; x++) {
              var index = y * width + x;

              if (index < group.emoji.length) {
                var emoji = group.emoji[index];

                panelHtml +=
                  '<td title="' + emoji.name + '">' +
                  '<a href="#" aria-label="' + emoji.name + '" data-mce-alt="' + emoji.name + '"data-mce-emoji="' + emoji.icon + '">' + emoji.icon + '</a>' +
                  '</td>';
              }
              else {
                panelHtml += '<td />';
              }
            }

            panelHtml += "</tr>";
          }

          panelHtml += "</tbody></table>"
        });

        panelHtml += "</div>"
        if (localStorage) {
          localStorage.setItem("tinymce.plugins.tinymoji.version", pluginVersion);
          localStorage.setItem("tinymce.plugins.tinymoji.html", panelHtml);
        }
      }
    };

    xobj.send(null);
  }

  function getPanel() {
    return panelHtml; // TODO: probably should display some loading in case the emoji list hasn't loaded yet
  }

  editor.addButton('tinymoji', {
    type: 'panelbutton',
    icon: 'tinymoji-button',
    panel: {
      role: 'application',
      autohide: true,
      html: getPanel,
      onclick: function (e) {
        var emoji = editor.dom.getParent(e.target, 'a');

        if (emoji) {
          editor.insertContent(emoji.getAttribute('data-mce-emoji'));
          this.hide();
        }
      }
    },
    tooltip: 'Emoji'
  });

  return { getMetadata: function () { return { name: "TinyMoji" }; } };

});