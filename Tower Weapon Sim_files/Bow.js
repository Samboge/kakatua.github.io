// JavaScript Document

//弓
function Bow(id){
  this.conflict = [['atr'], ['crt']];
  Weapon.apply(this, [id]);
}
Bow.prototype = Object.create(Weapon.prototype);
Bow.prototype.constructor = Bow;

Bow.prototype.updateLvVal = function(cat, skipGrip){
	var _tmp = this.config[cat][this[cat + '_lv']];
	$(this[cat]['value']['text']).text('LV' + _tmp[0]);
	if (!skipGrip) this[cat]['value']['grip'].style.left = (__DRAGGER_RANGE * (this[cat + '_lv'] / (this.config[cat].length-1))) + __DRAGGER_LEFT + 'px';
	this.costs[cat] = _tmp[1];
	$(this[cat]['cost']['text']).text(_tmp[1]);
	this.setMatCnt(cat, _tmp[2]);
};

//スライダー値更新
Bow.prototype.updateVal = function(cat, skipGrip){
  var _tmp = this.config[cat][this[cat + '_lv']];
  $(this[cat]['value']['text']).text(_tmp[0] * (((cat == 'atk') || (cat == 'crt'))?1:10));
  if (!skipGrip) this[cat]['value']['grip'].style.left = ((__DRAGGER_RANGE * (this[cat + '_lv'] / (this.config[cat].length-1))) + __DRAGGER_LEFT) + 'px';
  this.costs[cat] = _tmp[1];
  $(this[cat]['cost']['text']).text(_tmp[1]);
  this.setMatCnt(cat, _tmp[2]);
};