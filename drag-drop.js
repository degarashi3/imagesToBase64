(function() {
  var URL_BLANK_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P4////fwAJ+wP9BUNFygAAAABJRU5ErkJggg==';
  var elementDropArea = document.getElementById('dropArea');
  var elementFiles = document.getElementById('files');

  elementDropArea.addEventListener('dragover', function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    showDropping();
  });

  elementDropArea.addEventListener('dragleave', function(event) {
    hideDropping();
  });

  elementDropArea.addEventListener('drop', function(event) {
    event.preventDefault();
    hideDropping();

    var files = event.dataTransfer.files;
    showFiles(files);
  });

  document.addEventListener('click', function(event) {
      var elementTarget = event.target;
    if (elementTarget.tagName === 'IMG') {
      var src = elementTarget.src;
      var w = window.open('about:blank');
      var d = w.document;
      var title = escapeHtml(elementTarget.getAttribute('title'));

      d.open();
      d.write('<title>' + title + '</title>');
      d.write('<img src="' + src + '" />');
      d.close();
    }
  });

  function showDropping() {
    elementDropArea.classList.add('dropover');
  }

  function hideDropping() {
    elementDropArea.classList.remove('dropover');
  }

  function showFiles(files) {
    elementFiles.innerHTML = '';

    for (var i=0, l=files.length; i<l; i++) {
      var file = files[i];
      var elementFile = buildelementFile(file);
      elementFiles.appendChild(elementFile);
    }
  }

  function buildelementFile(file) {
    var elementFile = document.createElement('li');

    if (file.type.indexOf('image/') === 0) {
      var elementImage = document.createElement('img');
      elementImage.src = URL_BLANK_IMAGE;
      elementFile.appendChild(elementImage);

      var elementTextarea = document.createElement('textarea');
      var textNode = document.createTextNode("");
      elementTextarea.appendChild(textNode);

      elementTextarea.onclick = function() {
        elementTextarea.select();
        const clipboard = require('electron').clipboard;
        clipboard.writeText(this.value);
      };
      elementTextarea.value = "";

      elementFile.appendChild(elementTextarea);

      attachImage(file, elementImage, elementTextarea);
    }

    return elementFile;
  }

  function attachImage(file, elementImage, elementTextarea) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var src = event.target.result;
      elementImage.src = src;
      elementImage.setAttribute('title', file.name);
      var base64 = imageToBase64(elementImage, file.type);
      elementTextarea.value = base64;
    };
    reader.readAsDataURL(file);
  }

  function escapeHtml(source) {
    var el = document.createElement('div');
    el.appendChild(document.createTextNode(source));
    var destination = el.innerHTML;
    return destination;
  }

  function imageToBase64(img, mime_type) {
    // New Canvas
    var canvas = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    // Draw Image
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // To Base64
    return canvas.toDataURL(mime_type);
  }
})();
