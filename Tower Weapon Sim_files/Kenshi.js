// JavaScript Document


//剣士武器
function Kenshi(id){
  this.conflict = [['atr'], ['crt'], ['pls', 'psn', 'slp']];
  Weapon.apply(this, [id]);
}
Kenshi.prototype = Object.create(Weapon.prototype);
Kenshi.prototype.constructor = Kenshi;

Kenshi.prototype.updateLvVal = function(cat, skipGrip){
	var _tmp = this.config[cat][this[cat + '_lv']];
	$(this[cat]['value']['text']).text('LV' + _tmp[0]);
	if (!skipGrip) this[cat]['value']['grip'].style.left = ((__DRAGGER_RANGE * (this[cat + '_lv'] / (this.config[cat].length-1))) + __DRAGGER_LEFT) + 'px';
	this.costs[cat] = _tmp[1];
	$(this[cat]['cost']['text']).text(_tmp[1]);
	this.setMatCnt(cat, _tmp[2]);
};



//スライダー値更新
Weapon.prototype.updateVal = function(cat, skipGrip){
  var _tmp = this.config[cat][this[cat + '_lv']];
   $(this[cat]['value']['text']).text(_tmp[0]);
  if (!skipGrip) this[cat]['value']['grip'].style.left = ((__DRAGGER_RANGE * (this[cat + '_lv'] / (this.config[cat].length-1))) + __DRAGGER_LEFT) + 'px';
  this.costs[cat] = _tmp[1];
  $(this[cat]['cost']['text']).text(_tmp[1]);
  this.setMatCnt(cat, _tmp[2]);
};