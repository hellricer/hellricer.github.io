// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Traktor4 = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var Traktor4 = (function() {
  function Traktor4(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Traktor4.prototype._read = function() {
    this.main = new Frame(this._io, this, this._root);
  }

  var Float = Traktor4.Float = (function() {
    function Float(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Float.prototype._read = function() {
      this.value = this._io.readF4le();
    }

    return Float;
  })();

  var Data = Traktor4.Data = (function() {
    function Data(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Data.prototype._read = function() {
      this.value = this._io.readBytes(this._parent.length);
    }

    return Data;
  })();

  var String = Traktor4.String = (function() {
    function String(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    String.prototype._read = function() {
      this.length = this._io.readU4le();
      this.bytes = this._io.readBytes(this.length * 2);
      var odd = new Uint8Array(this.length);
      for (var i = 0; i < this.length; i++) {
        odd.set([this.bytes[i * 2]], i);
      }
      this.value = KaitaiStream.bytesToStr(odd, "utf8");
    }

    return String;
  })();

  var Frame = Traktor4.Frame = (function() {
    function Frame(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Frame.prototype._read = function() {
      this.id = KaitaiStream.bytesToStr(this._io.readBytes(4), "ascii");
      this.length = this._io.readU4le();
      this.childrenCount = this._io.readU4le();
      if (this.childrenCount > 0) {
        this.children = new Array(this.childrenCount);
        for (var i = 0; i < this.childrenCount; i++) {
          this.children[i] = new Frame(this._io, this, this._root);
        }
      }
      if (this.childrenCount == 0) {
        switch (this.id) {
        case "PEUC":
          this.data = new Cuepoints(this._io, this, this._root);
          break;
        case "MOCT":
          this.data = new String(this._io, this, this._root);
          break;
        case "DOMF":
          this.data = new Date(this._io, this, this._root);
          break;
        case "KCRT":
          this.data = new Long(this._io, this, this._root);
          break;
        case "TDLR":
          this.data = new Date(this._io, this, this._root);
          break;
        case "DORP":
          this.data = new String(this._io, this, this._root);
          break;
        case "2TIT":
          this.data = new String(this._io, this, this._root);
          break;
        case "SGLF":
          this.data = new Long(this._io, this, this._root);
          break;
        case "XIMT":
          this.data = new String(this._io, this, this._root);
          break;
        case "GLTC":
          this.data = new String(this._io, this, this._root);
          break;
        case "TLSU":
          this.data = new String(this._io, this, this._root);
          break;
        case "RTIB":
          this.data = new Long(this._io, this, this._root);
          break;
        case "YTAM":
          this.data = new Long(this._io, this, this._root);
          break;
        case "BDCP":
          this.data = new Float(this._io, this, this._root);
          break;
        case "1TIT":
          this.data = new String(this._io, this, this._root);
          break;
        case "MMOC":
          this.data = new String(this._io, this, this._root);
          break;
        case "TMPB":
          this.data = new Float(this._io, this, this._root);
          break;
        case "TDPL":
          this.data = new Date(this._io, this, this._root);
          break;
        case "MPBH":
          this.data = new Float(this._io, this, this._root);
          break;
        case "NSRV":
          this.data = new Long(this._io, this, this._root);
          break;
        case "BDKP":
          this.data = new Float(this._io, this, this._root);
          break;
        case "2MOC":
          this.data = new String(this._io, this, this._root);
          break;
        case "4EPT":
          this.data = new String(this._io, this, this._root);
          break;
        case "TDPI":
          this.data = new Date(this._io, this, this._root);
          break;
        case "NOCT":
          this.data = new String(this._io, this, this._root);
          break;
        case "LBAL":
          this.data = new String(this._io, this, this._root);
          break;
        case "KNAR":
          this.data = new Long(this._io, this, this._root);
          break;
        case "1EPT":
          this.data = new String(this._io, this, this._root);
          break;
        case "BLAT":
          this.data = new String(this._io, this, this._root);
          break;
        case "TNCP":
          this.data = new Long(this._io, this, this._root);
          break;
        case "QMPB":
          this.data = new Float(this._io, this, this._root);
          break;
        case "OMNT":
          this.data = new Long(this._io, this, this._root);
          break;
        case "YEKM":
          this.data = new Long(this._io, this, this._root);
          break;
        case "NELT":
          this.data = new Long(this._io, this, this._root);
          break;
        case "SKHC":
          this.data = new Long(this._io, this, this._root);
          break;
        case "YEKT":
          this.data = new String(this._io, this, this._root);
          break;
        default:
          this.data = new Data(this._io, this, this._root);
          break;
        }
      }
    }

    return Frame;
  })();

  var Long = Traktor4.Long = (function() {
    function Long(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Long.prototype._read = function() {
      this.value = this._io.readU4le();
    }

    return Long;
  })();

  var Date = Traktor4.Date = (function() {
    function Date(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Date.prototype._read = function() {
      this.day = this._io.readU1();
      this.month = this._io.readU1();
      this.year = this._io.readU2le();
    }
    Object.defineProperty(Date.prototype, 'value', {
      get: function() {
        if (this._m_value !== undefined)
          return this._m_value;
        this._m_value = (this.year).toString(10) + "-" + (this.month).toString(10) + "-" + (this.day).toString(10);
        return this._m_value;
      }
    });

    return Date;
  })();

  var Cuepoint = Traktor4.Cuepoint = (function() {
    function Cuepoint(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Cuepoint.prototype._read = function() {
      this.unknown = this._io.readU4le();
      this.name = new String(this._io, this, this._root);
      this.displayOrder = this._io.readU4le();
      this.type = this._io.readU4le();
      this.start = this._io.readF8le();
      this.length = this._io.readF8le();
      this.repeats = this._io.readS4le();
      this.hotCue = this._io.readU4le();
    }

    return Cuepoint;
  })();

  var Cuepoints = Traktor4.Cuepoints = (function() {
    function Cuepoints(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Cuepoints.prototype._read = function() {
      this.cuepointCount = this._io.readU4le();
      this.cuepoint = new Array(this.cuepointCount);
      for (var i = 0; i < this.cuepointCount; i++) {
        this.cuepoint[i] = new Cuepoint(this._io, this, this._root);
      }
    }

    return Cuepoints;
  })();

  return Traktor4;
})();
return Traktor4;
}));
