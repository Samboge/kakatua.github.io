// JavaScript Document

function select_weapon(targetID){
  var i;
  var _opts = '';
  for (i=0;i<_dat['select'].length;i++) {
    var _t = _dat['select'][i];
    if (String(_t).indexOf(targetID) != -1) {
      _opts += '<option value="'+_t+'" >'+_dat[_t]['label']+'</option>';
    }
  }
  $('#weapon_select').html(_opts);
  
  var elements = document.getElementById('weapons').getElementsByTagName("li");
  var tabs = document.getElementById('weapon_tab').getElementsByTagName("a");
  for (i=0;i<elements.length;i++) {
    if (elements[i].id == targetID) {
      elements[i].style.display = 'block';
    } else {
      elements[i].style.display = 'none';
    }
  }
  
  for (i=0;i<tabs.length;i++) {
    if (tabs[i].className == "tab_" + targetID) {
      tabs[i].style.display = 'none';
    } else {
      tabs[i].style.display = 'block';
    }
  }
  
  var selectObj = document.getElementById('weapon_select');
  for (var i=0;i<selectObj.options.length;i++) {
    if(selectObj.options[i].value==targetID) {
      selectObj.options[i].selected = true;
      break;
    }
  }
  
  _gaq.push(['_trackEvent', 'weapon_sim', 'click', targetID, ,true]);
}

function select_weaponName(){
  var selectObj = document.getElementById('weapon_select');
  var targetID = selectObj.options[selectObj.selectedIndex].value;
  var elements = document.getElementById('weapons').getElementsByTagName("li");
  for (i=0;i<elements.length;i++) {
    if (elements[i].id == targetID) {
      elements[i].style.display = 'block';
    } else {
      elements[i].style.display = 'none';
    }
  }
  selectObj.blur();
  
  var targetCategory = targetID.substring(0,3);
  var tabs = document.getElementById('weapon_tab').getElementsByTagName("a");
  for (i=0;i<tabs.length;i++) {
    if (tabs[i].className == "tab_" + targetCategory) {
      tabs[i].style.display = 'none';
    } else {
      tabs[i].style.display = 'block';
    }
  }
  
  _gaq.push(['_trackEvent', 'weapon_sim', 'click', targetID, ,true]);
}

function sliderElement(lbl, def){
  def = def || 0;
  var _l2k = {'Raw':'atk', 'Element':'atr', 'Paralysis':'pls', 'Poison':'psn', 'Sleep':'slp', 'Affinity':'crt', 'Shelling':'bmb', 'Reload':'relo', 'Recoil':'reco', 'Charge1':'snk1', 'Charge2':'snk2', 'Charge3':'snk3', 'Charge4':'snk4'};
  var _elm = '';
  _elm += '<tr class="'+_l2k[lbl]+'">';
  _elm += '<th>'+lbl+'</th>';
  _elm += '<td class="value">';
  _elm += '<div class="slider"><div class="bar"></div><div class="grip"></div><div class="minus"></div><div class="plus"></div></div>';
  _elm += '<div class="text">'+def+'</div>';
  _elm += '</td>';
  _elm += '<td class="cost"><div class="text">0</div></td>';
  _elm += '</tr>';
  
  return _elm;
}

function lefBoxElement(fig){
  var _elm = '';
  _elm += '<div class="left_box">';
  _elm += '<div class="fig"><img src="img/'+fig+'"></div>';
  _elm += '<table>';
  _elm += '<caption>■Butuh Material</caption>';
  _elm += '<tr class="output_i"><th>勇氣的寶玉<br/>Gem Merah</th><td class="cost"><div class="text">0</div></td></tr>';
  _elm += '<tr class="output_h"><th>閃光的寶玉<br/>Gem Biru</th><td class="cost"><div class="text">0</div></td></tr>';
  _elm += '<tr class="output_k"><th>加護的寶玉<br/>Gem Hijau</th><td class="cost"><div class="text">0</div></td></tr>';
  _elm += '</table>';
  _elm += '</div>';
  return _elm;
}

function costElement(){
  var _elm = '';
  _elm += '<tfoot>';
  _elm += '<tr>';
  _elm += '<td colspan="3"><div class="slot">';
  //天封印＆天廊石スロット予定地
  _elm += '</div><div class="ttlCost">合計コスト <div class="text">0</div></div></td>';
  _elm += '</tr>';
  _elm += '</tfoot>';
  return _elm;
}

function KenElement(cname, fig, kire, bom){
  var _elm = '';
  _elm += lefBoxElement(fig);


  _elm += '<div class="right_box">';
  _elm += '<table>';
  _elm += '<thead><tr><th class="item"></th><th class="value">Stats</th><th class="cost">コスト</th></tr></thead>';
  _elm += '<tbody>';
  
  _elm += sliderElement('Raw');
  _elm += sliderElement('Element');
  _elm += sliderElement('Paralysis');
  _elm += sliderElement('Poison');
  _elm += sliderElement('Sleep');
  _elm += sliderElement('Affinity');
  
  _elm += '<tr class="slc">';
  _elm += '<th>Sharpness</th>';
  _elm += '<td class="value">';
  _elm += '<div class="selectLV">';
  _elm += '<input type="radio" name="'+cname+'_kire" id="'+cname+'_kire_LV0" value="LV0" checked="checked"><label for="bas_kire_LV0">LV0</label>／';
  _elm += '<input type="radio" name="'+cname+'_kire" id="'+cname+'_kire_LV1" value="LV1"><label for="bas_kire_LV1">LV1</label>／';
  _elm += '<input type="radio" name="'+cname+'_kire" id="'+cname+'_kire_LV2" value="LV2"><label for="bas_kire_LV2">LV2</label>／';
  _elm += '<input type="radio" name="'+cname+'_kire" id="'+cname+'_kire_LV3" value="LV3"><label for="bas_kire_LV3">LV3</label>／';
  _elm += '<input type="radio" name="'+cname+'_kire" id="'+cname+'_kire_LV4" value="LV4"><label for="bas_kire_LV4">LV4</label>／';
  _elm += '<input type="radio" name="'+cname+'_kire" id="'+cname+'_kire_LV5" value="LV5"><label for="bas_kire_LV5">LV5</label>';
  _elm += '<div class="kireLV"><img src="img/'+kire+'"></div>';
  _elm += '</div>';
  _elm += '</td>';
  _elm += '<td class="cost"><div class="text">0</div></td>';
  _elm += '</tr>';
  
  if (bom) {
    _elm += sliderElement('Shelling');
  }
  
  _elm += '</tbody>';
  
  _elm += costElement();
  
  _elm += '</table>';
  _elm += '</div>';
  
  return _elm;
}

function GunElement(fig){
  var _elm = '';
  _elm += lefBoxElement(fig);
  
  _elm += '<div class="right_box">';
  _elm += '<table>';
  _elm += '<thead><tr><th class="item"></th><th class="value">Stats</th><th class="cost">コスト</th></tr></thead>';
  
  _elm += '<tbody>';
  
  _elm += sliderElement('Raw');
  _elm += sliderElement('Reload', 'Slow');
  _elm += sliderElement('Recoil', 'Maximum');
  _elm += sliderElement('Affinity');
  
  _elm += '</tbody>';
  
  _elm += costElement();
  
  _elm += '</table>';
  _elm += '</div>';
  
  return _elm;
}

function BowElement(fig){
  var _elm = '';
  _elm += lefBoxElement(fig);
  
  _elm += '<div class="right_box">';
  _elm += '<table>';
  _elm += '<thead><tr><th class="item"></th><th class="value">Stats</th><th class="cost">コスト</th></tr></thead>';
  
  _elm += '<tbody>';
  
  _elm += sliderElement('Raw');
  _elm += sliderElement('Element');
  _elm += sliderElement('Charge1', 'LV1');
  _elm += sliderElement('Charge2', 'LV1');
  _elm += sliderElement('Charge3', 'LV1');
  _elm += sliderElement('Charge4', 'LV1');
  _elm += sliderElement('Affinity');
  
  _elm += '</tbody>';
  
  _elm += costElement();
  
  _elm += '</table>';
  _elm += '</div>';
  
  return _elm;
}

//テーブル生成
$(function(){
  var _tables = '';
  for (var i=0;i<_dat['select'].length;i++) {
    var _cat = _dat['select'][i];
    switch (_dat['types'][_cat]) {
      case 'k':
        _tables += '<li id="'+_cat+'">'+KenElement(_cat, _dat[_cat].fig, _dat[_cat].kire, _dat[_cat].bmb)+'</li>'
        break;
      case 'g':
        _tables += '<li id="'+_cat+'">'+GunElement(_dat[_cat].fig)+'</li>'
        break;
      case 'b':
        _tables += '<li id="'+_cat+'">'+BowElement(_dat[_cat].fig)+'</li>'
        break;
    }
  }
  $('#weapons').html(_tables);
  
  select_weapon('bas');
});


