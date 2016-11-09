// JavaScript Document


var __DRAGGER_LEFT, __DRAGGER_RANGE, supportTouch, touchStartEvent, touchMoveEvent, touchEndEvent;

(function(){
  supportTouch = 'ontouchstart' in window;
  touchStartEvent = supportTouch ? 'touchstart' : 'mousedown';
  touchMoveEvent = supportTouch ? 'touchmove' : 'mousemove';
  touchEndEvent = supportTouch ? 'touchend' : 'mouseup';
  
  var ua = navigator.userAgent.toLowerCase();
  if ((ua.indexOf('iphone') >= 0) || (ua.indexOf('ipad') >= 0) || (ua.indexOf('ipod') >= 0) || (ua.indexOf('android') >= 0)) {
    __DRAGGER_LEFT = 28;
    __DRAGGER_RANGE = 64;
  } else {
    __DRAGGER_LEFT = 27;
    __DRAGGER_RANGE = 160;
  }
})();

function Weapon(id){
  this.id = id;
  this.config = _dat[id];
  this.category = this.config.cat;
  this.type = _dat.types[id];
  this.costs = {};
  this.cnt_i = {};
  this.cnt_h = {};
  this.cnt_k = {};
  //this.wp_elm = $('#'+id);
  
  //必要素材数表示用要素抽出
  this.output_i = $('#'+id + ' .left_box tr.output_i div.text')[0];
  this.output_h = $('#'+id + ' .left_box tr.output_h div.text')[0];
  this.output_k = $('#'+id + ' .left_box tr.output_k div.text')[0];
  
  //編集用要素抽出
  var _cat = ['atk', 'atr', 'pls', 'psn', 'slp', 'crt', 'bmb', 'relo', 'reco', 'snk1', 'snk2', 'snk3', 'snk4'];
  var i;
  for (i=0;i<_cat.length;i++) {
    this.parseEditBoxElementUnit(_cat[i]);
  }
  this.parseEditBoxSliceUnit();
  //コスト表示要素抽出
  this.ttl = $('#'+id + ' .right_box tfoot td')[0];
  this.ttlCost = $('#'+id + ' .right_box tfoot td .ttlCost')[0];
  //天封印＆天廊石スロット表示要素抽出
  this.sealSlot = $('#'+id + ' .right_box tfoot td .slot')[0];
  //空スロット追加
  var _slotElm = '';
  for (i=0;i<this.config.seal;i++) {
    _slotElm += '<div class="seal"></div>';
  }
  for (i=0;i<this.config.stone;i++) {
    _slotElm += '<div class="stone"></div>';
  }
  $(this.sealSlot).html(_slotElm);
  //conflictチェック用データ整形
  this.initConflictCheck();
}

//conflictチェック用データ整形
Weapon.prototype.initConflictCheck = function(){
  if ((!this.conflict instanceof Array)) {
    this.conflict = [];
  }
  this.conflictTrg = [];
  this.conflictIdx = {};
  for (var i=0;i<this.conflict.length;i++) {
    var _cate = this.conflict[i];
    for (var ci=0;ci<_cate.length;ci++) {
      this.conflictTrg.push(_cate[ci]);
      this.conflictIdx[_cate[ci]] = [i, ci];
    }
  }
};

//同一カテゴリ内のコンフリクト対象を抽出
Weapon.prototype.getConflictList = function(_idxs){
  var _ret = [];
  if (this.conflict[_idxs[0]].length > 1) {
    for (var i=0;i<this.conflict[_idxs[0]].length; i++) {
      if (_idxs[1] !== i) {
        var _trg = this.conflict[_idxs[0]][i];
        _ret.push(_trg);
        var _ti = this.conflictTrgTmp.indexOf(_trg);
        if (_ti !== -1) {
          this.conflictTrgTmp.splice(_ti, 1);
        }
      }
    }
  }
  return _ret;
};

//コンフリクトチェック（有効と無効のリストをそれぞれ返す）
Weapon.prototype.conflictCheck = function(cats){
  var i;
  if ((!cats instanceof Array)) {
    cats = [];
  }
  //チェック対象以外を除外
  for (i=cats.length;i>-1;i--) {
    if (this.conflictTrg.indexOf(cats[i]) === -1) {
      cats.splice(i, 1);
    }
  }
  
  this.conflictTrgTmp = this.conflictTrg.concat();
  var _enables = [];
  var _disables = [];
  //有効項目に追加＆サブコンフリクトを抽出
  for (i=0;i<cats.length;i++) {
    var _ti = this.conflictTrgTmp.indexOf(cats[i]);
    if (_ti !== -1) {
      this.conflictTrgTmp.splice(_ti, 1);
    }
    _enables.push(cats[i]);
    var _idxs = this.conflictIdx[cats[i]];
    if (_idxs) {
      _disables = _disables.concat(this.getConflictList(_idxs));
    }
  }
  //スロット数比較
  if (this.config.seal > cats.length) {
    //残りも有効
    _enables = _enables.concat(this.conflictTrgTmp);
  } else {
    //残りは無効
    _disables = _disables.concat(this.conflictTrgTmp);
  }
  //表示に反映
  for (i=0;i<_enables.length;i++) {
    $(this[_enables[i]].tr).removeClass('disabled');
  }
  for (i=0;i<_disables.length;i++) {
    $(this[_disables[i]].tr).addClass('disabled');
  }
  //使用スロット数反映
  //cats.length; 
  $(this.sealSlot).find('.seal').each(function(index, element) {
    if (index < cats.length) {
      $(element).addClass('on');
    } else {
      $(element).removeClass('on');
    }
  });
};

//コスト＆使用スロット数チェック
Weapon.prototype.postProccess = function(){
  var _cats = []; //コストが0以上の項目リスト
  var _cost = 0; //合計コスト
  
  for (var k in this.costs) {
    if (this.costs[k]) {
      _cats.push(k);
    }
    _cost += this.costs[k];
  }
  this.conflictCheck(_cats);
  this.outputCost(_cost);
};


//必要素材数更新
Weapon.prototype.setMatCnt = function(cat, v){
  var mat = _dat.mate[this.category][cat];
  switch(mat){
    case '勇ましき宝玉':
      this.cnt_i[cat] = v;
      break;
    case '閃きの宝玉':
      this.cnt_h[cat] = v;
      break;
    case '加護の宝玉':
      this.cnt_k[cat] = v;
      break;
  }
};

//コスト＆必要素材数出力
Weapon.prototype.outputCost = function(cost){
  if (cost <= 300) {
    $(this.ttl).removeClass('costover');
    $(this.ttlCost).html('Cost <div class="text">'+cost+'</div>');
  } else {
    $(this.ttl).addClass('costover');
    $(this.ttlCost).html('Over Cost Limit <div class="text">'+cost+'</div>');
  }
  var _tmp = 0;
  for (var ki in this.cnt_i) {
    _tmp += this.cnt_i[ki];
    $(this.output_i).text(_tmp);
  }
  _tmp = 0;
  for (var kh in this.cnt_h) {
    _tmp += this.cnt_h[kh];
    $(this.output_h).text(_tmp);
  }
  _tmp = 0;
  for (var kk in this.cnt_k) {
    _tmp += this.cnt_k[kk];
    $(this.output_k).text(_tmp);
  }
};

//項目の強化レベルを更新
Weapon.prototype.setVal = function(cat, per){
  this[cat + '_lv'] = this[cat + '_lv'] || 0;
  switch(cat){
    case 'relo':
    case 'reco':
      this[cat + '_lv'] = Math.round((_dat[cat][this.category].length - 1) * per);
      this.updateReVal(cat);
      break;
    case 'atk':
    case 'crt':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * per);
      this.updateVal(cat);
      break;
    case 'atr':
    case 'pls':
    case 'psn':
    case 'slp':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * per);
      this.updateAttrVal(cat);
      break;
    case 'snk1':
    case 'snk2':
    case 'snk3':
    case 'snk4':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * per);
      this.updateLvVal(cat);
      break;
    case 'bmb':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * per);
      this.updateLvVal(cat);
      break;
  }
  this.postProccess();
};

//属性値更新
Weapon.prototype.updateAttrVal = function(cat, skipGrip){
  var _tmp = this.config[cat][this[cat + '_lv']];
  $(this[cat].value.text).text(_tmp[0] * 10);
  if (!skipGrip) {
    this[cat].value.grip.style.left = ((__DRAGGER_RANGE * (this[cat + '_lv'] / (this.config[cat].length-1))) + __DRAGGER_LEFT) + 'px';
  }
  this.costs[cat] = _tmp[1];
  $(this[cat].cost.text).text(_tmp[1]);
  this.setMatCnt(cat, _tmp[2]);
};

//スライダードラッグ開始
Weapon.prototype.beginDrag = function(cat, e){
  var _owner = this;
  var _key = cat;
  /**/
  $(window).unbind(touchEndEvent);
  $(window).bind(touchEndEvent, function(e){
    _owner.endDrag(_key, e);
  });
  /**/
  $(window).unbind(touchMoveEvent);
  $(window).bind(touchMoveEvent, function(e){
    e.preventDefault();
    return _owner.onDrag(_key, e);
  });
};

//スライダードラッグ中
Weapon.prototype.onDrag = function(cat, e){
  var _locX;
  var _orign = e.srcElement || e.originalTarget;
  var _offsetX = e.offsetX || e.layerX;
  //if (_orign === __wps[this.id][cat].value.bar) {
  if (_orign === this[cat].value.bar) {
    _locX = Math.max(0, Math.min(__DRAGGER_RANGE, _offsetX));
  //} else if (_orign === __wps[this.id][cat].value.slider) {
  } else if (_orign === this[cat].value.slider) {
    _locX = Math.max(0, Math.min(__DRAGGER_RANGE, (_offsetX - __DRAGGER_LEFT)));
  //} else if (_orign === __wps[this.id][cat].value.grip) {
  } else if (_orign === this[cat].value.grip) {
    if (this[cat].value.grip.style.left) {
      _locX = parseInt(this[cat].value.grip.style.left, 10);
    } else {
      _locX = __DRAGGER_LEFT;
    }
    _locX = Math.max(0, Math.min(__DRAGGER_RANGE, (_locX - 5 + _offsetX - __DRAGGER_LEFT)));
  } else {
    return true;
  }
  this[cat].value.grip.style.left = (_locX + __DRAGGER_LEFT) + 'px';
  var _unit = _locX / __DRAGGER_RANGE;
  
  switch(cat){
    case 'atk':
    case 'crt':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * _unit);
      this.updateVal(cat, true);
      break;
    case 'atr':
    case 'pls':
    case 'psn':
    case 'slp':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * _unit);
      this.updateAttrVal(cat, true);
      break;
    case 'snk1':
    case 'snk2':
    case 'snk3':
    case 'snk4':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * _unit);
      this.updateLvVal(cat, true);
      break;
    case 'relo':
    case 'reco':
      this[cat + '_lv'] = Math.round((_dat[cat][this.category].length - 1) * _unit);
      this.updateReVal(cat, true);
      break;
    case 'bmb':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * _unit);
      this.updateLvVal(cat, true);
      break;
  }
  this.postProccess();
  return true;
};

//スライダードラッグ終了
Weapon.prototype.endDrag = function(cat, e){
  $(window).unbind(touchMoveEvent);
  $(window).unbind(touchEndEvent);
  this[cat + '_lv'] = this[cat + '_lv'] || 0;
  switch(cat){
    case 'atk':
    case 'crt':
      this.updateVal(cat);
      break;
    case 'atr':
    case 'pls':
    case 'psn':
    case 'slp':
      this.updateAttrVal(cat);
      break;
    case 'snk1':
    case 'snk2':
    case 'snk3':
    case 'snk4':
      this.updateLvVal(cat);
      break;
    case 'relo':
    case 'reco':
      this.updateReVal(cat);
      break;
    case 'bmb':
      this.updateLvVal(cat);
      break;
  }
  this.postProccess();
};

//斬れ味input値変換
Weapon.prototype.kirelv2v = function(lv){
  var _lv = {'LV1':1, 'LV2':2, 'LV3':3, 'LV4':4, 'LV5':5};
  var _ret = _lv[lv];
  return (_ret)?_ret:0;
};

//プラマイボタン動作（※斬れ味はinputのvalue）
Weapon.prototype.stepValue = function(cat, val){
  this[cat + '_lv'] = this[cat + '_lv'] || 0;
  var _int = this[cat + '_lv'] + ((val==='plus')?1:((val==='minus')?-1:0));
  switch(cat){
    case 'atk':
    case 'crt':
      this[cat + '_lv'] = Math.max(0, Math.min(_int, (this.config[cat].length-1)));
      this.updateVal(cat);
      break;
    case 'atr':
    case 'pls':
    case 'psn':
    case 'slp':
      this[cat + '_lv'] = Math.max(0, Math.min(_int, (this.config[cat].length-1)));
      this.updateAttrVal(cat);
      break;
    case 'snk1':
    case 'snk2':
    case 'snk3':
    case 'snk4':
      this[cat + '_lv'] = Math.max(0, Math.min(_int, (this.config[cat].length-1)));
      this.updateLvVal(cat);
      break;
    case 'relo':
    case 'reco':
      this[cat + '_lv'] = Math.max(0, Math.min(_int, (_dat[cat][this.category].length-1)));
      this.updateReVal(cat);
      break;
    case 'bmb':
      this[cat + '_lv'] = Math.max(0, Math.min(_int, (this.config[cat].length-1)));
      this.updateLvVal(cat);
      break;
    case 'slc':
      var _v = this.kirelv2v(val);
      this[cat].value.kireLV.style.top = (_v * -9) + 'px';
      var _tmp = _dat.kire[this.category][_v];
      this.costs[cat] = _tmp[0];
      $(this[cat].cost.text).text(_tmp[0]);
      this.setMatCnt(cat, _tmp[1]);
      break;
  }
  this.postProccess();
};

//スライダーバークリック
Weapon.prototype.clickBar = function(cat, bar, e){
  this[cat + '_lv'] = this[cat + '_lv'] || 0;
  var _unit = e.offsetX / __DRAGGER_RANGE;
  switch(cat){
    case 'atk':
    case 'crt':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * _unit);
      this.updateVal(cat);
      break;
    case 'atr':
    case 'pls':
    case 'psn':
    case 'slp':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * _unit);
      this.updateAttrVal(cat);
      break;
    case 'snk1':
    case 'snk2':
    case 'snk3':
    case 'snk4':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * _unit);
      this.updateLvVal(cat);
      break;
    case 'relo':
    case 'reco':
      this[cat + '_lv'] = Math.round((_dat[cat][this.category].length - 1) * _unit);
      this.updateReVal(cat);
      break;
    case 'bmb':
      this[cat + '_lv'] = Math.round((this.config[cat].length - 1) * _unit);
      this.updateLvVal(cat);
      break;
  }
  this.postProccess();
};

//スライダータイプ編集領域の各パーツを抽出（＆マウスイベント適用）
Weapon.prototype.parseEditBoxElementUnit = function(key){
  var elm = $('#'+this.id + ' .right_box tr.' + key)[0];
  if (elm) {
    this[key] = {};
    this[key].tr = elm;
    this[key].value = {};
    var _owner = this;
    var _key = key;
    
    $('#'+this.id + ' .right_box tr.' + key + ' td.value div').each(function(index, elm) {
      if($(elm).hasClass('bar')) {
        //スライダーバー
        $(elm).bind('click', function(e){
          //_owner.endDrag(_key, e);
          _owner.clickBar(_key, this, e);
        });
      
      //} else if($(elm).hasClass('slider')) {
      } else if($(elm).hasClass('grip')) {
        //スライダーハンドル
        $(elm).bind(touchStartEvent, function(e){
          _owner.beginDrag(_key, e);
        });
      
      } else if($(elm).hasClass('minus') || $(elm).hasClass('plus')) {
        //+ボタン | -ボタン
        $(elm).bind(touchStartEvent, function(e){
          var _cn = this.className;
          _owner.auto_step_to = setTimeout(function(){
            _owner.auto_step_to = null;
            _owner.auto_step_int = setInterval(function(){
              _owner.stepValue(_key, _cn);
            }, 66);
          }, 500);
        });
        $(elm).bind(touchEndEvent, function(e){
          var _cn = this.className;
          try {
            clearTimeout(_owner.auto_step_to);
            _owner.auto_step_to = null;
            clearInterval(_owner.auto_step_int);
          } catch(err){}
          if (e.ctrlKey || e.shiftKey) {
            if (_cn==='plus') {
              _owner.setVal(_key, 1);
            } else if (_cn==='minus') {
              _owner.setVal(_key, 0);
            }
          } else {
            _owner.stepValue(_key, _cn);
          }
        });
        $(elm).bind('mouseout', function(){
          try {
            clearTimeout(_owner.auto_step_to);
            _owner.auto_step_to = null;
            clearInterval(_owner.auto_step_int);
          } catch(e){}
        });
      
      }
      
      _owner[_key].value[elm.className] = elm;
    });
      
    //コスト表示エリア
    this[key].cost = {};
    $('#'+this.id + ' .right_box tr.' + key + ' td.cost div').each(function(index, element) {
      _owner[_key].cost[element.className] = element;
    });
  }
};

//斬れ味ゲージ用編集領域パーツ抽出（＆クリックイベント適用）
Weapon.prototype.parseEditBoxSliceUnit = function(){
  this.slc = {};
  this.slc.tr = $('#'+this.id + ' .right_box tr.slc')[0];
  if (this.slc.tr) {
    this.slc.value = {};
    var _owner = this;
    //ゲージ画像
    this.slc.value.kireLV = $('#'+this.id + ' .right_box tr.slc td.value div.kireLV img')[0];
    //LV選択要素
    $('#'+this.id + ' .right_box tr.slc td.value div.selectLV input').each(function(index, element) {
      var _val = $(element).attr('value');
      $(element).bind('click', function(e){
        _owner.stepValue('slc', this.value);
      });
      _owner.slc.value[_val] = element;
    });
    //コスト表示エリア
    this.slc.cost = {};
    $('#'+this.id + ' .right_box tr.slc td.cost div').each(function(index, element) {
      _owner.slc.cost[element.className] = element;
    });
  }
};

