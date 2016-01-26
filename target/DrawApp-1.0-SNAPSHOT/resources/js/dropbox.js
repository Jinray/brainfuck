/**
 * Created by Alex on 23.01.2016.
 */
var client = new Dropbox.Client({ token: "sp9wqpVb6TAAAAAAAAAAB_8IejOP2BKXhqNamrYboj2WzBVA7r5tW9ItyNOdNG0-" });

function _base64forImage(base64) {
    base64 = base64.split('data:image/png;base64,').join('');
    var binary_string =  window.atob(base64)

    var len = binary_string.length,
        bytes = new Uint8Array( len ),
        i;

    for (i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
};

function _base64forJson(base64) {
    var binary_string =  base64,
        len = binary_string.length,
        bytes = new Uint8Array( len ),
        i;

    for (i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
};
function saveCanvas (canvas,callback) {
    //Get data from canvas

    canvas.includeDefaultValues=false;
    var jsn = canvas.toJSON(['selectable', 'evented','animationtype']);
    var canvasData = JSON.stringify(jsn);
    var jsondata = _base64forJson(canvasData);
    client.writeFile('/Public/'+window.mail+'.txt', jsondata, function(error, stat) {
        if (error) {
            console.log('Error: ' + error);
        } else {
            callback(stat.path)
        }
    });

};
function getCanvas (canvas,callback){

    var path="/Public/"+window.mail+".txt";
    client.readFile(path,{binary: true}, function (error, data) {
        callback(canvas.loadFromJSON(data));
    });
};


function savePicture (canvas,callback) {
    //Get data from canvas

    var imageSringData = canvas.toDataURL('image/png', 0.5);
    //Convert it to an arraybuffer
    var imageData = _base64forImage(imageSringData);

    client.writeFile('/Public/'+window.mail+'.png', imageData, function(error, stat) {
        if (error) {
            console.log('Error: ' + error);
        } else {
            callback(stat.path)
        }

    })}

