// JavaScript Document
/**
攻撃 'atk'
属性 'atr'
麻痺 'pls'
毒   'psn'
睡眠 'slp'
会心 'crt'
斬れ 'kire'
砲撃 'bmb'
溜１ 'snk1'
溜２ 'snk2'
溜３ 'snk3'
溜４ 'snk4'
**/

_dat = {};
//セレクトフォーム用
_dat['select'] = [
'bas', 'bas2', 'bas3', 'bas4',
'twn', 'twn2', 'twn3',
'bld', 'bld2', 'bld3', 'bld4',
'sam', 'sam2', 'sam3',
'hmm', 'hmm2', 'hmm3', 'hmm4',
'hrn', 'hrn2',
'lnc', 'lnc2', 'lnc3', 'lnc4',
'gnc', 'gnc2',
'srk', 'srk2',
'lgn',
'hgn',
'bow', 'bow2'
];
//武器種
_dat['types'] = {
'bas':'k', 'bas2':'k', 'bas3':'k', 'bas4':'k',
'twn':'k', 'twn2':'k', 'twn3':'k',
'bld':'k', 'bld2':'k', 'bld3':'k', 'bld4':'k',
'sam':'k', 'sam2':'k', 'sam3':'k',
'hmm':'k', 'hmm2':'k', 'hmm3':'k', 'hmm4':'k',
'hrn':'k', 'hrn2':'k',
'lnc':'k', 'lnc2':'k', 'lnc3':'k', 'lnc4':'k',
'gnc':'k', 'gnc2':'k',
'srk':'k', 'srk2':'k',
'hgn':'g',
'lgn':'g',
'bow':'b', 'bow2':'b'
};
//斬れ味
_dat['kire'] = {};
_dat['kire']['a'] = [[0,0],[20,10],[40,30],[70,60],[100,100],[120,120]];
//リロード
_dat['relo'] = {};
_dat['relo']['a'] = [['V. Slow',0,0],['Slow',10,10],['Medium',20,20],['Fast',30,30],['Fastest',50,50]];
//反動
_dat['reco'] = {};
_dat['reco']['a']  = [['V. High',0,0],['High',10,10],['Medium',30,30],['Low',50,60],['Lowest',100,100]];
//素材
_dat['mate'] = {};
_dat['mate']['a']  = {};
_dat['mate']['a']['atk']  = '勇ましき宝玉';
_dat['mate']['a']['atr']  = '閃きの宝玉';
_dat['mate']['a']['pls']  = '閃きの宝玉';
_dat['mate']['a']['psn']  = '閃きの宝玉';
_dat['mate']['a']['slp']  = '閃きの宝玉';
_dat['mate']['a']['crt']  = '勇ましき宝玉';
//_dat['mate']['a']['kire'] = '加護の宝玉';
_dat['mate']['a']['slc'] = '加護の宝玉';
_dat['mate']['a']['relo']  = '加護の宝玉';
_dat['mate']['a']['reco']  = '加護の宝玉';
_dat['mate']['a']['bmb']  = '加護の宝玉';
_dat['mate']['a']['snk1'] = '加護の宝玉';
_dat['mate']['a']['snk2'] = '加護の宝玉';
_dat['mate']['a']['snk3'] = '加護の宝玉';
_dat['mate']['a']['snk4'] = '加護の宝玉';
