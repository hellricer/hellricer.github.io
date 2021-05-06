document.addEventListener("DOMContentLoaded", function(event) {

  var print_cuepoints = function(output, frame, level) {
    const names = ["CUE", "IN", "OUT", "LOAD", "GRID", "LOOP"];

    var spacing = " ".repeat(level * 4)
    console.log(frame);
    for (var i = 0; i < frame.cuepointCount; i++) {
      var cp = frame.cuepoint[i];

      var textnode = document.createTextNode(spacing + i +
        ": name: " + cp.name.value + 
        ", display_order: " + cp.displayOrder +
        ", type: " + names[cp.type] +
        ", start: " + cp.start.toFixed(3) +
        ", length: " + cp.length.toFixed(3) +
        ", repeats: " + cp.repeats +
        ", hot cue: " + cp.hotCue +
        "\n");
      output.appendChild(textnode);
    }
  }

  var pretty_print = function(output, frame, level) {
    var spacing = " ".repeat(level * 4)
    var ID = frame.id.split("").reverse().join("").trim(); // reverse and trim
    var textnode = document.createTextNode(spacing + ID + " ");

    if (frame.childrenCount > 0) {
      var textnode = document.createTextNode(spacing + ID + "\n");
      output.appendChild(textnode);

      for (var i = 0; i < frame.childrenCount; i++) {
        pretty_print(output, frame.children[i], level + 1);
      }
    } else if (ID === "CUEP") {
      var textnode = document.createTextNode(spacing + ID + " " + frame.data.cuepointCount + "\n");
      output.appendChild(textnode);
      print_cuepoints(output, frame.data, level + 1);
    } else {
      var textnode = document.createTextNode(spacing + ID + " " + frame.data.value + "\n");
      output.appendChild(textnode);
    }
  };

  const input = document.getElementById('input');
  const output = document.getElementById('output');

  input.onchange = function () {
    const reader = new FileReader()
    reader.onload = function () {
      var buffer = this.result;
      output.innerHTML = '';

      // read ID3
      const mp3tag = new MP3Tag(buffer);
      mp3tag.read();
      var id3 = mp3tag.tags.v2;
      if (id3 && id3['PRIV'] && id3['PRIV'][0].ownerId == "TRAKTOR4") {
        var data = id3['PRIV'][0].data;

        // convert the byte array to arraybuffer
        var length = data.length;
        buffer = new ArrayBuffer(length);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < length; i++) {
          view[i] = data[i];
        }

        // print it
        var mainFrame = new Traktor4(new KaitaiStream(buffer)).main;
        console.log(mainFrame);
        pretty_print(output, mainFrame, 0);
      } else {
        output.innerHTML = "TRAKTOR4 field not found.";
      }
    };

    if (this.files.length > 0) {
      reader.readAsArrayBuffer(this.files[0]);
    }
  }
});
