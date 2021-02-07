export var showAlert  = function(){
    alert('WOW')
}
export var createpdf417 = function(id, textToEncode, cb){
    // var textToEncode = document.getElementById("textToEncode");
    PDF417.init(textToEncode);
    var barcode = PDF417.getBarcodeArray();
    // block sizes (width and height) in pixels
    var bw = 4;
    var bh = 2;
    // create canvas element based on number of columns and rows in barcode
    var container = document.getElementById(id);
    if(!container) return cb()
    var canvas = document.createElement('canvas');
    canvas.width = bw * barcode['num_cols'];
    canvas.height = bh * barcode['num_rows'];
    container.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    // graph barcode elements
    var y = 0;
    // for each row
    for (var r = 0; r < barcode['num_rows']; ++r) {
        var x = 0;
        // for each column
        for (var c = 0; c < barcode['num_cols']; ++c) {
            if (barcode['bcode'][r][c] == 1) {
                ctx.fillRect(x, y, bw, bh);
            }
            x += bw;
        }
        y += bh;
    }
    cb();
}
