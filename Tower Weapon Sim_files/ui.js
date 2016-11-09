// JavaScript Document



var __wps = {};

$(function(){
  //for FF
  var temp = document.createElement("div");
  if (temp.innerText == undefined) {
      Object.defineProperty(HTMLElement.prototype, "innerText", {
          get: function()  { return this.textContent },
          set: function(v) { this.textContent = v; }
      });
  }
  
  var _l = ['atk', 'atr', 'pls', 'psn', 'slp', 'crt', 'bmb', 'relo', 'reco', 'snk1', 'snk2', 'snk3', 'snk4'];
  for (var k in _dat['types']) {
    switch(_dat['types'][k]){
      case 'k'://剣士武器
        __wps[k] = new Kenshi(k);
        break;
      case 'g'://ボウガン
        __wps[k] = new Bowgun(k);
        break;
      case 'b'://弓
        __wps[k] = new Bow(k);
        break;
      default:
        continue;
    }
    for (var di=0;di<_l.length;di++) {
      if (__wps[k][_l[di]]) {
        __wps[k].setVal(_l[di], 0);
      }
    }
  }
  
  $('table,th,td,tr,img,div,p,h2,ul,li').each(function(index, element) {
    $(element).attr('unselectable', 'on');
    $(element).attr('onSelectStart', 'return false;');
  });
});

function trace(msg){
	try{console.dir(msg);}catch(e){}
}