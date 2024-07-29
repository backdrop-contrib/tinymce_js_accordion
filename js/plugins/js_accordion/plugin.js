/**
 * @file
 * TinyMCE Javascript Accordion plugin.
 */
(function () {

  "use strict";

  const dlInsertBefore = function (editor) {
    let node = editor.selection.getNode();
    let targetDt;
    if (node.nodeName === 'DT') {
      targetDt = node;
    }
    else if (node.nodeName === 'DD' && node.previousSibling.nodeName === 'DT') {
      targetDt = node.previousSibling;
    }
    else {
      while ((node = node.parentNode)) {
        if (node.nodeName === 'DL') {
          break;
        }
        if (node.nodeName === 'DT') {
          targetDt = node;
          break;
        }
        if (node.nodeName === 'DD' && node.previousSibling.nodeName === 'DT') {
          targetDt = node.previousSibling;
          break;
        }
      }
    }
    if (targetDt) {
      editor.undoManager.transact( function () {
        let dt = editor.dom.create('dt', {}, 'New accordion title');
        let dd = editor.dom.create('dd');
        dd.innerHTML = '<p>New accordion content.</p>';
        targetDt.parentNode.insertBefore(dt, targetDt);
        targetDt.parentNode.insertBefore(dd, targetDt);
      });
    }
  };

  const dlInsertAfter = function (editor) {
    let node = editor.selection.getNode();
    let targetDd;
    if (node.nodeName === 'DD') {
      targetDd = node;
    }
    else if (node.nodeName === 'DT' && node.nextSibling.nodeName === 'DD') {
      targetDd = node.nextSibling;
    }
    else {
      while ((node = node.parentNode)) {
        if (node.nodeName === 'DL') {
          break;
        }
        if (node.nodeName === 'DD') {
          targetDd = node;
          break;
        }
        if (node.nodeName === 'DT' && node.nextSibling.nodeName === 'DD') {
          targetDd = node.nextSibling;
          break;
        }
      }
    }

    if (targetDd) {
      editor.undoManager.transact( function () {
        let dt = editor.dom.create('dt', {}, 'New accordion title');
        let dd = editor.dom.create('dd');
        dd.innerHTML = '<p>New accordion content.</p>';
        targetDd.parentNode.insertBefore(dd, targetDd.nextSibling);
        targetDd.parentNode.insertBefore(dt, targetDd.nextSibling);
      });
    }
  };

  const dlDelItem = function (editor) {
    let node = editor.selection.getNode();
    let targetNode;
    if (node.nodeName === 'DT' || node.nodeName === 'DD') {
      targetNode = node;
    }
    else {
      while ((node = node.parentNode)) {
        if (node.nodeName === 'DL') {
          break;
        }
        if (node.nodeName === 'DT' || node.nodeName === 'DD') {
          targetNode = node;
          break;
        }
      }
    }

    if (targetNode) {
      let delNodes = [];
      delNodes.push(targetNode);
      if (targetNode.nodeName === 'DT' && targetNode.nextSibling.nodeName === 'DD') {
        delNodes.push(targetNode.nextSibling);
      }
      else if (targetNode.nodeName === 'DD' && targetNode.previousSibling.nodeName === 'DT') {
        delNodes.push(targetNode.previousSibling);
      }
      editor.undoManager.transact( function () {
        delNodes.forEach(function (element) {
          editor.dom.remove(element);
        });
      });
    }
  };

  tinymce.PluginManager.add('js_accordion', function (editor, url) {
    editor.ui.registry.addButton('js_accordion', {
      icon: 'js-accordion',
      tooltip: editor.options.get('tinyJsAccToolbarButtonText'),
      onAction: function () {
        let node = editor.selection.getNode();
        if (node.closest('dl.ckeditor-accordion')) {
          editor.notificationManager.open({
            text: editor.options.get('tinyJsAccWarnMessageText'),
            timeout: 5000,
            type: 'warning'
          });
          return;
        }
        let content = '<dl class="ckeditor-accordion">';
        content += '<dt>Accordion title 1</dt><dd><p>Accordion content 1.</p></dd>';
        content += '<dt>Accordion title 2</dt><dd><p>Accordion content 2.</p></dd>';
        content += '</dl><p><br data-mce-bogus="1"></p>';
        editor.insertContent(content);
      },
      onSetup: function (api) {
        editor.on('keydown', function (event) {
          if (event.keyCode !== 13) {
            return;
          }
          if (event.target.nodeName === 'DT') {
            event.preventDefault();
          }
        });
        editor.on('NewBlock', function (event) {
          if (event.newBlock.nodeName === 'DT') {
            let prevContent = event.newBlock.previousSibling.innerHTML;
            let thisContent = event.newBlock.innerHTML;
            event.newBlock.previousSibling.innerHTML = prevContent + thisContent;
            editor.selection.setCursorLocation(event.newBlock.previousSibling, 1);
            editor.dom.remove(event.newBlock);
          }
        });
      }
    });

    editor.ui.registry.addButton('desclistInsertBefore', {
      icon: 'dd-add-before',
      tooltip: editor.options.get('tinyJsAccInsertBeforeButtonText'),
      onAction: function () {
        dlInsertBefore(editor);
      }
    });

    editor.ui.registry.addButton('desclistInsertAfter', {
      icon: 'dd-add-after',
      tooltip: editor.options.get('tinyJsAccInsertAfterButtonText'),
      onAction: function () {
        dlInsertAfter(editor);
      }
    });

    editor.ui.registry.addButton('desclistDelItem', {
      icon: 'remove',
      tooltip: editor.options.get('tinyJsAccDeleteButtonText'),
      onAction: function () {
        dlDelItem(editor);
      }
    });

    editor.ui.registry.addContextToolbar('desclistbar', {
      predicate: function (node) {
        return (node.nodeName === 'DT' || node.nodeName === 'DD');
      },
      items: 'desclistInsertBefore desclistInsertAfter desclistDelItem',
      scope: 'node',
      position: 'node'
    });
  });

})();
