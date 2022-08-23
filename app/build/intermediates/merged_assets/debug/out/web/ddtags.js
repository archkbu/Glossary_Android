function ddtags_checkBrowserTouchSupported(){
return (((ddtags_checkBrowserIsMobile()==true)||(ddtags_checkBrowserIsTablet()==true))&&(navigator.userAgent.toLowerCase().indexOf('iemobile')==-1));
}

function ddtags_checkBrowserIsMobileIE(){
var b=navigator.userAgent.toLowerCase();
return (b.indexOf('iemobile')!=-1);
}

function ddtags_checkBrowserIsMobile(){
var b=navigator.userAgent.toLowerCase();
if(b.indexOf('iemobile')!=-1)return false;
return ((b.indexOf('iphone')!=-1 && b.indexOf('ipad')==-1)||(b.indexOf('mobile')!=-1 && b.indexOf('ipad')==-1)||(b.indexOf('mobile')!=-1 && b.indexOf('android')!=-1)||b.indexOf('blackberry')!=-1);
}

function ddtags_checkBrowserIsTablet(){
var b=navigator.userAgent.toLowerCase();
return (b.indexOf('ipad')!=-1);
}

function ddtags_doMouseEvent(_obj,_event,_fun){
if(ddtags_checkBrowserTouchSupported()()){
if(ddtags_checkBrowserIsMobileIE()==true){
if(_event=='mouseover')_obj.addEventListener("MSPointerDown",_fun);
else if(_event=='mousedown')_obj.addEventListener("MSPointerDown",_fun);
else if(_event=='mousemove')_obj.addEventListener("MSPointerMove",_fun);
else if(_event=='mouseup')_obj.addEventListener("MSPointerUp",_fun);
else if(_event=='mouseout')_obj.addEventListener("MSPointerUp",_fun);
else if(_event=='click')_obj.addEventListener("MSPointerUp",_fun);
}else{
if(_event=='mouseover')_obj.ontouchstart=_fun;
else if(_event=='mousedown')_obj.ontouchstart=_fun;
else if(_event=='mousemove')_obj.ontouchmove=_fun;
else if(_event=='mouseup')_obj.ontouchend=_fun;
else if(_event=='mouseout')_obj.ontouchend=_fun;
else if(_event=='click')_obj.ontouchend=_fun;
}
}else{
if(_event=='mouseover')_obj.onmouseover=_fun;
else if(_event=='mousedown')_obj.onmousedown=_fun;
else if(_event=='mousemove')_obj.onmousemove=_fun;
else if(_event=='mouseup')_obj.onmouseup=_fun;
else if(_event=='mouseout')_obj.onmouseout=_fun;
else if(_event=='click')_obj.onclick=_fun;
}
}


function DDTagsSVCHelper(){
this.svc={"top":0,"left":0};
}
DDTagsSVCHelper.prototype.onclick=function(_obj,_scrview,_endfun,_tsfun,_mdfun){
var self=this;
if(ddtags_checkBrowserTouchSupported()){
var praseV=_endfun.substr(_endfun.indexOf('(')+1);
praseV=praseV.substr(0,praseV.lastIndexOf(')'));
if(praseV.substr(0,1)=='"' || praseV.substr(0,1)=='\''){
praseV=praseV.substr(1);
praseV=praseV.substr(0,praseV.length-1);
}
_endfun=_endfun.replace(';','');
_endfun=_endfun.substr(0,_endfun.indexOf('('));

var tsV=_tsfun.substr(_tsfun.indexOf('(')+1);
tsV=tsV.substr(0,tsV.lastIndexOf(')'));
if(tsV.substr(0,1)=='"' || tsV.substr(0,1)=='\''){
tsV=tsV.substr(1);
tsV=tsV.substr(0,tsV.length-1);
}
_tsfun=_tsfun.replace(';','');
_tsfun=_tsfun.substr(0,_tsfun.indexOf('('));
var mdV=_mdfun.substr(_mdfun.indexOf('(')+1);
mdV=mdV.substr(0,mdV.lastIndexOf(')'));
if(mdV.substr(0,1)=='"' || mdV.substr(0,1)=='\''){
mdV=mdV.substr(1);
mdV=mdV.substr(0,mdV.length-1);
}
_mdfun=_mdfun.replace(';','');
_mdfun=_mdfun.substr(0,_mdfun.indexOf('('));

_obj.ontouchstart=function(){
self.svc.top=parseInt(_scrview.scrollTop);
var tn=window[_tsfun];
if(typeof tn==='function'){tn(tsV);}
}
_obj.ontouchend=function(){
if(parseInt(_scrview.scrollTop)==self.svc.top){
var fn=window[_endfun];
if(typeof fn==='function'){fn(praseV);}
}
var mn=window[_mdfun];
if(typeof mn==='function'){mn(mdV);}
}
}else{
_obj.setAttribute('onclick',_endfun);
}
}



function ddtags_doMouseEventNonObj(_obj,_event,_fun){
if(ddtags_checkBrowserTouchSupported()){
if(ddtags_checkBrowserIsMobileIE()==true){
if(_event=='mouseover')_obj.setAttribute("onmspointerdown",_fun);
else if(_event=='mousedown')_obj.setAttribute("onmspointerdown",_fun);
else if(_event=='mousemove')_obj.setAttribute("onmspointermove",_fun);
else if(_event=='mouseup')_obj.setAttribute("onmspointerup",_fun);
else if(_event=='mouseout')_obj.setAttribute("onmspointerup",_fun);
else if(_event=='click')_obj.setAttribute("onmspointerup",_fun);
}else{
if(_event=='mouseover')_obj.setAttribute('ontouchstart',_fun);
else if(_event=='mousedown')_obj.setAttribute('ontouchstart',_fun);
else if(_event=='mousemove')_obj.setAttribute('ontouchmove',_fun);
else if(_event=='mouseup')_obj.setAttribute('ontouchend',_fun);
else if(_event=='mouseout')_obj.setAttribute('ontouchend',_fun);
else if(_event=='click')_obj.setAttribute('ontouchend',_fun);
}
}else{
if(_event=='mouseover')_obj.setAttribute('onmouseover',_fun);
else if(_event=='mousedown')_obj.setAttribute('onmousedown',_fun);
else if(_event=='mousemove')_obj.setAttribute('onmousemove',_fun);
else if(_event=='mouseup')_obj.setAttribute('onmouseup',_fun);
else if(_event=='mouseout')_obj.setAttribute('onmouseout',_fun);
else if(_event=='click')_obj.setAttribute('onclick',_fun);
}
}


function appendAttributes(_oobj,_nobj,_type){
var nv=[];
try{
for(var att, i=0, atts=_oobj.attributes, n=atts.length; i<n; i++){
nv.push({"n":atts[i].nodeName, "v":atts[i].nodeValue});
}
}catch(e){}
for(var i in nv){
// for btn Start
if(_type=='btn'){
if(nv[i].n=='center' && nv[i].v=='true')_nobj.style.margin='0 auto';
if(nv[i].n=='class')_nobj.setAttribute('class',_nobj.getAttribute('class')+' '+nv[i].v);
if(nv[i].n=='id')_nobj.setAttribute('id',nv[i].v);
if(nv[i].n.toLowerCase()=='onclick')ddtags_doMouseEventNonObj(_nobj,'click',nv[i].v);
if(nv[i].n.toLowerCase()=='onsvcclick'){
var scvh=new DDTagsSVCHelper();
var _svc=_oobj.getAttribute('svcobj');
if(_svc==null || _svc=='' || _svc=='document.body')_svc=document.body;
else _svc=document.getElementById(_svc);
var _svctsfun=_oobj.getAttribute('svctsfun');
if(_svctsfun==null || _svctsfun=='')_svctsfun='ddtagNullFun();';
var _svcmdfun=_oobj.getAttribute('svcmdfun');
if(_svcmdfun==null || _svcmdfun=='')_svcmdfun='ddtagNullFun();';
scvh.onclick(_nobj,_svc,nv[i].v,_svctsfun,_svcmdfun);
}
if(nv[i].n=='style'){
var sArr=nv[i].v.split(';');
for(var k in sArr){
var aS=sArr[k].split(':');
_nobj.style[aS[0]]=aS[1];
}
}
if(nv[i].n=='inner-style'){
var sArr=nv[i].v.split(';');
for(var k in sArr){
var aS=sArr[k].split(':');
for(var i=0;i<_nobj.rows.length;i++) {
var trs=_nobj.getElementsByTagName("tr")[i];
var td=trs.cells[0];
td.style[aS[0]]=aS[1];
}
}
}
}
// for btn end
}
}



function ddtags_action(){

// Button
var ddtagsBtnArr=document.getElementsByTagName('ddtag:btn');
var dbal=ddtagsBtnArr.length;
for(i=0; i<dbal; i++){
var displayName=ddtagsBtnArr[0].innerHTML;
var newBtn=document.createElement('table');
newBtn.setAttribute('class','DDTag_Button_Class');
var newBtnTr=document.createElement('tr');
var newBtnTd=document.createElement('td');
newBtnTd.innerHTML=displayName;
newBtnTr.appendChild(newBtnTd);
newBtn.appendChild(newBtnTr);
appendAttributes(ddtagsBtnArr[0],newBtn,'btn');
var pNode=ddtagsBtnArr[0].parentNode;
pNode.removeChild(ddtagsBtnArr[0]);
pNode.appendChild(newBtn);
}

}



function ddtagNullFun(_in){}