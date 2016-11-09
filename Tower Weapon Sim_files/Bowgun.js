// JavaScript Document

//ボウガン
function Bowgun(id){
  this.conflict = [['crt']];
  Weapon.apply(this, [id]);
}
Bowgun.prototype = Object.create(Weapon.prototype);
Bowgun.prototype.constructor = Bowgun;

Bowgun.prototype.updateReVal = function(cat, skipGrip){
	var _tmp = _dat[cat][this.category][this[cat + '_lv']];
	$(this[cat]['value']['text']).text(_tmp[0]);
	if (!skipGrip) this[cat]['value']['grip'].style.left = ((__DRAGGER_RANGE * (this[cat + '_lv'] / (_dat[cat][this.category].length-1))) + __DRAGGER_LEFT) + 'px';
	this.costs[cat] = _tmp[1];
	$(this[cat]['cost']['text']).text(_tmp[1]);
	this.setMatCnt(cat, _tmp[2]);
};

//スライダー値更新
Weapon.prototype.updateVal = function(cat, skipGrip){
  var _tmp = this.config[cat][this[cat + '_lv']];
  $(this[cat]['value']['text']).text(_tmp[0] * (((cat == 'atk') || (cat == 'crt'))?1:10));
  if (!skipGrip) this[cat]['value']['grip'].style.left = ((__DRAGGER_RANGE * (this[cat + '_lv'] / (this.config[cat].length-1))) + __DRAGGER_LEFT) + 'px';
  this.costs[cat] = _tmp[1];
  $(this[cat]['cost']['text']).text(_tmp[1]);
  this.setMatCnt(cat, _tmp[2]);
};