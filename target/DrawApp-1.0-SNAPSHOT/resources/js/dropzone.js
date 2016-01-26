/**
 * Created by User on 23.01.2016.
 */

var images = 0;
function deleteImage(id){
    document.getElementById('list').removeChild(document.getElementById("span-img"+id));
}


function useImage(id){

    currentImage = new Image();
    currentImage.src = document.getElementById('img' + id).src;
    isImageDrawingMode = true;
    canvas.isDrawingMode = false;
    if(!canvas.isDrawingMode) {
        var len = canvas.getObjects().length;
        for (var i = 0; i < len; i++) {
            canvas.item(i).selectable = false;
        }
    }
}

function handleFileSelect(evt) {

    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var span = document.createElement("span");
                var file = e.target;
                var fd = new FormData();
                fd.append("image", theFile);
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://api.imgur.com/3/image/");
                xhr.onload = function () {
                    images++;
                    span.id = 'span-img' + images;

                    span.innerHTML = ['<input class="added-image" onClick="useImage(', images,')" width=100 id="img', images,'" type="image" class="thumb" src="', JSON.parse(xhr.responseText).data.link,
                        '" title="', escape(theFile.name), '"/><input width=10 class="btn-delete" onClick="deleteImage(', images,')" type="image" src="../resources/images/delete.png" id="', images,'" />'].join('');
                    document.getElementById('list').insertBefore(span, null);

                };
                xhr.setRequestHeader('Authorization', 'Client-ID fec5f6d9c3a1a73');
                xhr.send(fd);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}


function onClose(){
    window.localStorage.setItem('myState', document.getElementsByTagName("body")[0]);
}
window.onbeforeunload = onClose;
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}






// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

var dropzon = document.getElementsByClassName("dropzone")[0];

dropzon.ondragover = function() {
    this.classList.add("dropzone__hover");
    return false;
};

dropzon.ondragleave = function() {
    this.classList.remove("dropzone__hover");
    return false;
};

dropzon.ondrop = function(event) {
    this.classList.remove("dropzone__hover");
    event.preventDefault();


        dropzon.style.opacity = '0.5';



    return false;
};