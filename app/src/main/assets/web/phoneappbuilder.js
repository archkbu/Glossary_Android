function PhoneAppBuilderHelper(){}

PhoneAppBuilderHelper.movingFunctionArray=[];
PhoneAppBuilderHelper.objectList=[];
PhoneAppBuilderHelper.ieTouches=[];
PhoneAppBuilderHelper.runtimeLoopInterval=10;
PhoneAppBuilderHelper.runtimeLoopFunctionArray=[];
PhoneAppBuilderHelper.appInAnimation=false;
PhoneAppBuilderHelper.pagesArray=[];
PhoneAppBuilderHelper.pagesPushPopArray=[];

PhoneAppBuilderHelper.getBrowserWidthHeight=function(){
return {width:window.innerWidth,height:window.innerHeight};
}

PhoneAppBuilderHelper.pushObject=function(_obj){
var canAdd=true;
for(var i=0; i<PhoneAppBuilderHelper.objectList.length; i++){
if(PhoneAppBuilderHelper.objectList[i]==_obj){
canAdd=false;
break;
}
}
if(canAdd==true){PhoneAppBuilderHelper.objectList.push(_obj);}
}

PhoneAppBuilderHelper.releaseObject=function(_obj){
for(var i=0; i<PhoneAppBuilderHelper.objectList.length; i++){
if(PhoneAppBuilderHelper.objectList[i]==_obj){
PhoneAppBuilderHelper.objectList.splice(i,1);
_obj.htmlObject.parentNode.removeChild(_obj.htmlObject);
_obj=null;
break;
}
}
}

PhoneAppBuilderHelper.quickInitGame=function(){
document.body.addEventListener("selectstart",function(e){e.preventDefault();},false);
PhoneAppBuilderHelper.setAllowDragMoving();
PhoneAppBuilderHelper.enableRuntimeLoop(10);
}

PhoneAppBuilderHelper.getCursorPercent=function(event,_area,_t){
if(Object.prototype.toString.call(_area)=='[object String]'){
if(_area=='document.body')_area=document.body;
else _area=document.getElementById(_area);
}
if(_area!=document.body){
if(PhoneAppBuilderHelper.checkBrowserTouchSupported()==true) return {x:((t.pageX)-(parseInt(_area.style.left)/100)-((parseInt(_area.style.left)+parseInt(_area.style.width))/100))/((PhoneAppBuilderHelper.getBrowserWidthHeight().width*(parseInt(_area.style.width)/100))/100),y:((t.pageY)-(parseInt(_area.style.top)/100)-((parseInt(_area.style.top)+parseInt(_area.style.height))/100))/((PhoneAppBuilderHelper.getBrowserWidthHeight().height*(parseInt(_area.style.height)/100))/100)};
return {x:((event.pageX)-(parseInt(_area.style.left)/100)-((parseInt(_area.style.left)+parseInt(_area.style.width))/100))/((PhoneAppBuilderHelper.getBrowserWidthHeight().width*(parseInt(_area.style.width)/100))/100),y:((event.pageY)-(parseInt(_area.style.top)/100)-((parseInt(_area.style.top)+parseInt(_area.style.height))/100))/((PhoneAppBuilderHelper.getBrowserWidthHeight().height*(parseInt(_area.style.height)/100))/100)};
}else{
if(PhoneAppBuilderHelper.checkBrowserTouchSupported()==true) return {x:event.touches[event.touches.length-1].pageX/(PhoneAppBuilderHelper.getBrowserWidthHeight().width/100),y:event.touches[event.touches.length-1].pageY/(PhoneAppBuilderHelper.getBrowserWidthHeight().height/100)};
return {x:event.pageX/(PhoneAppBuilderHelper.getBrowserWidthHeight().width/100),y:event.pageY/(PhoneAppBuilderHelper.getBrowserWidthHeight().height/100)};
}
}

PhoneAppBuilderHelper.checkBrowserTouchSupported=function(){
return (((PhoneAppBuilderHelper.checkBrowserIsMobile()==true)||(PhoneAppBuilderHelper.checkBrowserIsTablet()==true))&&(navigator.userAgent.toLowerCase().indexOf('iemobile')==-1));
}

PhoneAppBuilderHelper.checkBrowserIsMobileIE=function(){
var b=navigator.userAgent.toLowerCase();
return (b.indexOf('iemobile')!=-1);
}

PhoneAppBuilderHelper.checkBrowserIsMobile=function(){
var b=navigator.userAgent.toLowerCase();
if(b.indexOf('iemobile')!=-1)return false;
return ((b.indexOf('iphone')!=-1 && b.indexOf('ipad')==-1)||(b.indexOf('mobile')!=-1 && b.indexOf('ipad')==-1)||(b.indexOf('mobile')!=-1 && b.indexOf('android')!=-1)||b.indexOf('blackberry')!=-1);
}

PhoneAppBuilderHelper.checkBrowserIsTablet=function(){
var b=navigator.userAgent.toLowerCase();
return (b.indexOf('ipad')!=-1);
}

PhoneAppBuilderHelper.setAllowDragMoving=function(){
var fun=function(e){
for(var i=0; i<PhoneAppBuilderHelper.movingFunctionArray.length; i++){
PhoneAppBuilderHelper.movingFunctionArray[i](e);
}
};
if(PhoneAppBuilderHelper.checkBrowserTouchSupported()){
document.ontouchstart=function(){
PhoneAppBuilderHelper.onStart(e);
}
document.ontouchmove=fun;
}
else document.onmousemove=fun;
}

PhoneAppBuilderHelper.addMovingFunction=function(_fun){
PhoneAppBuilderHelper.movingFunctionArray.push(_fun);
}

PhoneAppBuilderHelper.removeMovingFunction=function(_fun){
for(var i=0; i<PhoneAppBuilderHelper.movingFunctionArray.length; i++){
if(PhoneAppBuilderHelper.movingFunctionArray[i]==_fun)PhoneAppBuilderHelper.movingFunctionArray.splice(i,1);
}
}

PhoneAppBuilderHelper.onStart=function(_touchEvent){
if(navigator.userAgent.match(/Android/i)){
_touchEvent.preventDefault();
}
}

PhoneAppBuilderHelper.getNewZIndex=function(){
return PhoneAppBuilderHelper.objectList.length;
}

PhoneAppBuilderHelper.getIsCollision=function(_obj){
var collisionObjects=[];
if(_obj.htmlObject!=null){
var objX1=parseInt(_obj.htmlObject.style.left);
var objX2=objX1+parseInt(_obj.htmlObject.width);
var objY1=parseInt(_obj.htmlObject.style.top);
var objY2=objY1+parseInt(_obj.htmlObject.height);
for(var i=0; i<PhoneAppBuilderHelper.objectList.length; i++){
var checkingObj=PhoneAppBuilderHelper.objectList[i];
if(checkingObj==_obj || checkingObj.htmlObject==null || checkingObj instanceof PABBackground==true)continue;
var cobjX1=parseInt(checkingObj.htmlObject.style.left);
var cobjX2=cobjX1+parseInt(checkingObj.htmlObject.width);
var cobjY1=parseInt(checkingObj.htmlObject.style.top);
var cobjY2=cobjY1+parseInt(checkingObj.htmlObject.height);
if((objX2>=cobjX1 && objX1<cobjX2) && (objY2>=cobjY1 && objY1<cobjY2))collisionObjects.push(checkingObj);
}
}
return collisionObjects;
}

PhoneAppBuilderHelper.enableRuntimeLoop=function(_interval){
PhoneAppBuilderHelper.runtimeLoopInterval=_interval;
setInterval(function(){
for(var i=0; i<PhoneAppBuilderHelper.runtimeLoopFunctionArray.length; i++){
PhoneAppBuilderHelper.runtimeLoopFunctionArray[i]();
}
},PhoneAppBuilderHelper.runtimeLoopInterval);
}

PhoneAppBuilderHelper.addRuntimeLoopFunction=function(_fun){
PhoneAppBuilderHelper.runtimeLoopFunctionArray.push(_fun);
}

PhoneAppBuilderHelper.removeRuntimeLoopFunction=function(_fun){
for(var i=0; i<PhoneAppBuilderHelper.runtimeLoopFunctionArray.length; i++){
if(PhoneAppBuilderHelper.runtimeLoopFunctionArray[i]==_fun || (String(PhoneAppBuilderHelper.runtimeLoopFunctionArray[i])==String(_fun))){PhoneAppBuilderHelper.runtimeLoopFunctionArray.splice(i,1);}
}
}

PhoneAppBuilderHelper.createXMLHttpRequestLevel2=function(_link,_isAsync,_dataJSON,_returnType,_progressFunction,_endFunction){
var xhr=new XMLHttpRequest();
xhr.open('POST',_link,_isAsync);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
var ss='';
try{
for(var j in _dataJSON)ss+=j+'='+_dataJSON[j]+'&';
}catch(e){}
xhr.send(ss.substring(0,ss.length-1));
xhr.onload=function(e){
};
xhr.onreadystatechange=function(){
if((xhr.readyState==4)&&(xhr.status==200)){
try{
if(_endFunction!=null){
if(_returnType.toUpperCase()=='JSON')_endFunction(eval('('+xhr.responseText+')'));
else _endFunction(xhr.responseText);
}
}catch(e){}
}
};
xhr.upload.onprogress=function(e){
if(e.lengthComputable){
if(_progressFunction!=null)_progressFunction(e);
}
};
}

PhoneAppBuilderHelper.checkOrientation=function(){
if((window.orientation==90)||(window.orientation==-90))return 'portrait';
return 'landscape';
}

PhoneAppBuilderHelper.setOrientationChangeDelegate=function(_function){
window.onorientationchange=function(){
_function(PhoneAppBuilderHelper.checkOrientation());
}
}

PhoneAppBuilderHelper.getObjectHTMLElement=function(_obj){
if(_obj instanceof PABPage)return _obj.contentView;
return _obj.htmlObject;
}

PhoneAppBuilderHelper.drawRandom=function(_from,_to){
return Math.floor((Math.random()*_to)+_from);
}

PhoneAppBuilderHelper.containedInArray=function(_obj,_arr){
for(var i=0; i<_arr.length; i++){
if(_obj==_arr[i])return true;
}
return false;
}

PhoneAppBuilderHelper.containedIndexInArray=function(_obj,_arr){
for(var i=0; i<_arr.length; i++){
if(_obj==_arr[i])return i;
}
return -1;
}

PhoneAppBuilderHelper.datesComparing=function(_startDate,_endDate){
_startDate=_startDate.split('-');
_endDate=_endDate.split('-');
return Math.ceil(new Date(_startDate[2],_startDate[1],_startDate[0]).getTime()-new Date(_endDate[2],_endDate[1],_endDate[0]).getTime())/(24*60*60*1000);
}

PhoneAppBuilderHelper.toTimeHM=function(_date){
return _date.substr(0,5);
}

PhoneAppBuilderHelper.toTimeHMS=function(_date){
return _date.substr(0,8);
}

PhoneAppBuilderHelper.getTheDateDayNum=function(_d){
return getTheDayStr(new Date(_d).getDay());
}

PhoneAppBuilderHelper.getTodayDayNum=function(){
return new Date().getDay();
}

PhoneAppBuilderHelper.getTheDayNum=function(_d){
return new Date(_d).getDay();
}

PhoneAppBuilderHelper.getTodayDayStr=function(){
return getTheDayStr(getTodayDayNum());
}

PhoneAppBuilderHelper.getTodayYM=function(){
return (new Date().getFullYear())+'-'+((new Date().getMonth())+1);
}

PhoneAppBuilderHelper.getDateYByDropYear=function(_d,_y){
return (new Date(_d).getFullYear())-_y;
}

PhoneAppBuilderHelper.getDateYMByDropMonth=function(_d,_m){
var nM=(new Date(_d).getMonth())+1;
var y=new Date(_d).getFullYear();
for(var i=0;i<_m;i++){
nM--;
if(nM==0){
nM=12;
y--;
}
}
if(nM<10)nM='0'+nM;
return (y+'-'+nM);
}

PhoneAppBuilderHelper.getTheDayStr=function(_s){
if(_s==1)return 'mon';
else if(_s==2)return 'tue';
else if(_s==3)return 'wed';
else if(_s==4)return 'thu';
else if(_s==5)return 'fri';
else if(_s==6)return 'sat';
else if(_s==0)return 'sun';
}

PhoneAppBuilderHelper.getTheDayZhStr=function(_s){
if(_s=='mon')return '星期一';
else if(_s=='tue')return '星期二';
else if(_s=='wed')return '星期三';
else if(_s=='thu')return '星期四';
else if(_s=='fri')return '星期五';
else if(_s=='sat')return '星期六';
else if(_s=='sun')return '星期日';
}

PhoneAppBuilderHelper.getTodayDateString=function(){
var todayTodayString=new Date();
var todayMonthString=todayTodayString.getMonth()+1;
if(todayMonthString<10)todayMonthString='0'+todayMonthString;
var todayDateString=todayTodayString.getDate();
if(todayDateString<10)todayDateString='0'+todayDateString;
todayTodayString=todayTodayString.getFullYear()+'-'+todayMonthString+'-'+todayDateString;
return todayTodayString;
}

PhoneAppBuilderHelper.getNowTimeString=function(){
var nowt=new Date();
var mi=nowt.getMinutes();
var se=nowt.getSeconds();
var ms=nowt.getMilliseconds();
if(mi<10)mi='0'+mi;
if(se<10)se='0'+se;
if(ms<10)ms='0'+ms;
return nowt.getHours()+':'+mi+':'+se+'.'+ms;
}

PhoneAppBuilderHelper.getTodayNowDateTimeString=function(){
return getTodayDateString()+' '+getNowTimeString();
}

PhoneAppBuilderHelper.upperFirstChar=function(_string){
return _string.substr(0,1).toUpperCase()+_string.substr(1);
}

PhoneAppBuilderHelper.fileToBase64String=function(_obj,_rM){
if(_obj!=null){
var oFReader=new FileReader();
oFReader.onload=function(oFREvent){
_rM(oFREvent.target.result);
};
if(_obj.files.length===0){return;}
var oFile=_obj.files[0];
oFReader.readAsDataURL(oFile);
}else{return false;}
}

PhoneAppBuilderHelper.doMouseEventRaw=function(_obj,_event,_fun){
if((typeof _obj)=='string')_obj=document.getElementById(_obj);
if(PhoneAppBuilderHelper.checkBrowserTouchSupported()){
if(PhoneAppBuilderHelper.checkBrowserIsMobileIE==true){
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

PhoneAppBuilderHelper.setNonSelectable=function(_obj){
PhoneAppBuilderHelper.getObjectHTMLElement(_obj).setAttribute('onselectstart','return false');
PhoneAppBuilderHelper.getObjectHTMLElement(_obj).style.webkitTouchCallout='none';
PhoneAppBuilderHelper.getObjectHTMLElement(_obj).style.webkitUserSelect='none';
}

PhoneAppBuilderHelper.setNonSelectableRaw=function(_obj){
_obj.setAttribute('onselectstart','return false');
_obj.style.webkitTouchCallout='none';
_obj.style.webkitUserSelect='none';
}

PhoneAppBuilderHelper.onclickRaw=function(_obj,_fun){
PhoneAppBuilderHelper.doMouseEventRaw(_obj,'click',_fun);
}

PhoneAppBuilderHelper.ontouchupRaw=function(_obj,_fun){
PhoneAppBuilderHelper.doMouseEventRaw(_obj,'mouseup',_fun);
}

PhoneAppBuilderHelper.addPage=function(_page){
PhoneAppBuilderHelper.pagesArray.push(_page);
}

PhoneAppBuilderHelper.removePage=function(_page){
for(var i in PhoneAppBuilderHelper.pagesArray){
if(PhoneAppBuilderHelper.pagesArray[i]==_page){
PhoneAppBuilderHelper.pagesArray[i].parentNode.removeChild(PhoneAppBuilderHelper.pagesArray[i].htmlObject);
PhoneAppBuilderHelper.pagesArray.slice(i,1);
}
}
}

PhoneAppBuilderHelper.removePageWithName=function(_pageName){
for(var i in PhoneAppBuilderHelper.pagesArray){
if(PhoneAppBuilderHelper.pagesArray[i].name==_pageName){
PhoneAppBuilderHelper.pagesArray[i].parentNode.removeChild(PhoneAppBuilderHelper.pagesArray[i].htmlObject);
PhoneAppBuilderHelper.pagesArray.slice(i,1);
}
}
}

PhoneAppBuilderHelper.toPage=function(_fromPage,_toPage,_method){
var fp=_fromPage.htmlObject;
var tp=_toPage.htmlObject;
var trRole='left 0.5s ease 0s';
if(_method=='push'){
tp.style.left='100%';
tp.style.transition=trRole;
tp.style.webkitTransition=trRole;
fp.style.transition=trRole;
fp.style.webkitTransition=trRole;
_toPage.show();
PhoneAppBuilderHelper.appInAnimation=true;
setTimeout(function(){
tp.style.left='0%';
fp.style.left='-100%';
},1);
setTimeout(function(){
fp.style.transition='';
fp.style.webkitTransition='';
fp.style.left='0%';
_fromPage.hide();
},501);
setTimeout(function(){PhoneAppBuilderHelper.appInAnimation=false;},600);
}else if(_method=='pop'){
tp.style.left='-100%';
tp.style.transition=trRole;
tp.style.webkitTransition=trRole;
fp.style.transition=trRole;
fp.style.webkitTransition=trRole;
_toPage.show();
PhoneAppBuilderHelper.appInAnimation=true;
setTimeout(function(){
fp.style.left='100%';
tp.style.left='0%';
},1);
setTimeout(function(){
fp.style.transition='';
fp.style.webkitTransition='';
fp.style.left='0%';
_fromPage.hide();
},501);
setTimeout(function(){PhoneAppBuilderHelper.appInAnimation=false;},600);
}
}





function PABPage(_name){
if(_name!=null)this.name=_name;
else this.name='PABPage_'+PhoneAppBuilderHelper.pagesArray.length;
this.initValue={"abc":"haha"};
var tdbtn_w='15%';
var tdbtn_ts=(window.innerWidth/23)+'px';
var tdtitle_w='40%';
var tdtitle_ts=(window.innerWidth/18)+'px';
var tdbtn_tc='rgb(220,220,220)';
this.htmlObject=document.createElement('div');
this.htmlObject.style.position='absolute';
this.htmlObject.style.width='100%';
this.htmlObject.style.height='100%';
this.htmlObject.style.top='0%';
this.htmlObject.style.left='0%';
document.body.appendChild(this.htmlObject);
this.titleViewTable=document.createElement('div');
this.titleViewTable.style.display='table';
this.titleViewTable.style.position='absolute';
this.titleViewTable.style.width='100%';
this.titleViewTable.style.height='9%';
this.titleViewTable.style.top='0%';
this.titleViewTable.style.left='0%';
this.setTitleBackgroundColor('black');
this.setTitleOpacity(1);
this.titleViewTr=document.createElement('div');
this.titleViewTr.style.display='table-row';
this.titleViewTable.appendChild(this.titleViewTr);
this.titleViewTds=[];
for(var i=0; i<2; i++){
this.titleViewTds[i]=document.createElement('div');
this.titleViewTds[i].style.display='table-cell';
this.titleViewTds[i].style.width=tdbtn_w;
this.titleViewTds[i].style.verticalAlign='middle';
this.titleViewTds[i].style.textAlign='center';
this.titleViewTds[i].style.color=tdbtn_tc;
this.titleViewTds[i].style.fontSize=tdbtn_ts;
this.titleViewTr.appendChild(this.titleViewTds[i]);
}
this.titleViewTd_title=document.createElement('div');
this.titleViewTd_title.style.display='table-cell';
this.titleViewTd_title.style.width=tdtitle_w;
this.titleViewTd_title.style.verticalAlign='middle';
this.titleViewTd_title.style.textAlign='center';
this.titleViewTd_title.style.color='white';
this.titleViewTd_title.style.fontSize=tdtitle_ts;
this.titleViewTr.appendChild(this.titleViewTd_title);
for(var i=2; i<4; i++){
this.titleViewTds[i]=document.createElement('div');
this.titleViewTds[i].style.display='table-cell';
this.titleViewTds[i].style.width=tdbtn_w;
this.titleViewTds[i].style.verticalAlign='middle';
this.titleViewTds[i].style.textAlign='center';
this.titleViewTds[i].style.color=tdbtn_tc;
this.titleViewTds[i].style.fontSize=tdbtn_ts;
this.titleViewTr.appendChild(this.titleViewTds[i]);
}
this.titleViewEnabled=false;
this.contentView=document.createElement('div');
this.contentView.style.overflowY='auto';
this.contentView.style.webkitOverflowScrolling='touch';
this.contentView.style.position='absolute';
this.contentView.style.width='100%';
this.contentView.style.height='100%';
this.contentView.style.top='0%';
this.contentView.style.left='0%';
this.htmlObject.appendChild(this.contentView);
PhoneAppBuilderHelper.setNonSelectableRaw(this.htmlObject);
PhoneAppBuilderHelper.setNonSelectable(this);
PhoneAppBuilderHelper.setNonSelectableRaw(this.titleViewTds[0]);
PhoneAppBuilderHelper.setNonSelectableRaw(this.titleViewTds[1]);
PhoneAppBuilderHelper.setNonSelectableRaw(this.titleViewTds[2]);
PhoneAppBuilderHelper.setNonSelectableRaw(this.titleViewTds[3]);
PhoneAppBuilderHelper.setNonSelectableRaw(this.titleViewTd_title);
this.appendedList=[];
if(PhoneAppBuilderHelper.pagesArray.length>0)this.hide();
PhoneAppBuilderHelper.addPage(this);
}
PABPage.prototype.show=function(){
this.htmlObject.style.display='';
}
PABPage.prototype.hide=function(){
this.htmlObject.style.display='none';
}
PABPage.prototype.isShowed=function(){
return (this.htmlObject.style.display=='');
}
PABPage.prototype.setBackgroundColor=function(_color){
this.htmlObject.style.backgroundColor=_color;
}
PABPage.prototype.setBackgroundImage=function(_image){
this.htmlObject.style.backgroundImage='url(\''+_image+'\')';
}
PABPage.prototype.appendChild=function(_obj){
this.contentView.appendChild(_obj.htmlObject);
this.appendedList.push(_obj);
}
PABPage.prototype.removeChild=function(_obj){
_obj.htmlObject.parentNode.removeChild(_obj.htmlObject);
for(var i in this.appendedList){
if(this.appendedList[i]==_obj)this.appendedList.splice(i,1);
}
}
PABPage.prototype.removeAllChild=function(){
for(var i in this.appendedList){
this.appendedList[i].htmlObject.parentNode.removeChild(this.appendedList[i].htmlObject);
}
this.appendedList=[];
}
PABPage.prototype.enableTitleView=function(_title,_isOver){
if(this.titleViewEnabled==false){
this.htmlObject.appendChild(this.titleViewTable);
this.titleViewEnabled=true;
if(_title)this.setTitleText(_title);
if(_isOver!=null)this.setTitleOverStyle(_isOver);
}
}
PABPage.prototype.disableTitleView=function(){
if(this.titleViewEnabled==true){
this.htmlObject.removeChild(this.titleViewTable);
this.titleViewEnabled=false;
}
}
PABPage.prototype.disableTwoTitleButtons=function(){
try{
this.titleViewTds[1].parentNode.removeChild(this.titleViewTds[1]);
this.titleViewTds[2].parentNode.removeChild(this.titleViewTds[2]);
this.titleViewTd_title.style.width='70%';
}catch(err){}
}
PABPage.prototype.setTitleText=function(_title){
this.titleViewTd_title.innerHTML=_title;
}
PABPage.prototype.setTitleOverStyle=function(_isOver){
if(_isOver){
this.contentView.style.height='100%';
this.contentView.style.top='0%';
}else{
this.contentView.style.height='91%';
this.contentView.style.top='9%';
}
}
PABPage.prototype.setTitleBackgroundColor=function(_color){
this.titleViewTable.style.backgroundColor=_color;
}
PABPage.prototype.setTitleOpacity=function(_level){
this.titleViewTable.style.opacity=_level;
}
PABPage.prototype.getTitleContentView=function(){
return this.titleViewTd_title;
}
PABPage.prototype.setTitleButton=function(_bIndex,_title,_function){
this.titleViewTds[_bIndex].innerHTML=_title;
PhoneAppBuilderHelper.doMouseEventRaw(this.titleViewTds[_bIndex],'click',_function);
}
PABPage.prototype.setTitleLeftLeftButton=function(_title,_function){
this.setTitleButton(0,_title,_function);
}
PABPage.prototype.setTitleLeftRightButton=function(_title,_function){
this.setTitleButton(1,_title,_function);
}
PABPage.prototype.setTitleRightLeftButton=function(_title,_function){
this.setTitleButton(2,_title,_function);
}
PABPage.prototype.setTitleRightRightButton=function(_title,_function){
this.setTitleButton(3,_title,_function);
}
PABPage.prototype.getTitleButton=function(_bIndex){
return this.titleViewTds[_bIndex];
}
PABPage.prototype.toPage=function(_toPage,_initValue,_method){
if(_initValue!=null){this.initValue=_initValue;}
if(this.pageOnLoad!=null)this.pageOnLoad();
if(PhoneAppBuilderHelper.appInAnimation==false){
if(_method==null)_method='push';
PhoneAppBuilderHelper.toPage(this,_toPage,_method);
PhoneAppBuilderHelper.pagesPushPopArray.push(_toPage);
}
}
PABPage.prototype.backPage=function(_method){
if(this.pageOnUnload!=null)this.pageOnUnload();
if(PhoneAppBuilderHelper.appInAnimation==false){
if(_method==null)_method='pop';
if(PhoneAppBuilderHelper.pagesPushPopArray.length>1){
PhoneAppBuilderHelper.toPage(this,PhoneAppBuilderHelper.pagesPushPopArray[PhoneAppBuilderHelper.pagesPushPopArray.length-2],_method);
}else{
PhoneAppBuilderHelper.toPage(this,PhoneAppBuilderHelper.pagesArray[0],_method);
}
PhoneAppBuilderHelper.pagesPushPopArray.pop();
}
}
PABPage.prototype.addBackButton=function(_name){
if(_name==null)_name='&lt; Back';
var self=this;
this.setTitleLeftLeftButton(_name,function(){
self.backPage();
});
}
PABPage.prototype.appendHTML=function(_htmlObject){
if((typeof _htmlObject)=='string')_htmlObject=document.getElementById(_htmlObject);
_htmlObject.parentNode.removeChild(_htmlObject);
var theObj=toPABObject(_htmlObject);
this.appendChild(theObj);
return theObj;
}





function PABObject(){
this.htmlObject=null;
this.movingobjJSON={"isMoving":false,"touchPoint":0,"xDif":0,"yDif":0};
this.movingFunction=null;
this.movesFunctions=[];
this.dragMovingData={"mouseupFun":null,"mousedownFun":null};
this.svc={"top":0,"left":0};
}
PABObject.prototype.setId=function(_id){
this.htmlObject.setAttribute('id',_id);
}
PABObject.prototype.setClass=function(_class){
this.htmlObject.setAttribute('class',_class);
}
PABObject.prototype.setHTMLObject=function(_obj){
this.htmlObject=_obj;
}
PABObject.prototype.getX=function(){
return parseInt(this.htmlObject.style.left);
}
PABObject.prototype.getY=function(){
return parseInt(this.htmlObject.style.top);
}
PABObject.prototype.getWidth=function(){
if(this.htmlObject.tagName.toLowerCase()=='canvas')return parseInt(this.htmlObject.width);
return parseInt(this.htmlObject.style.width);
}
PABObject.prototype.getHeight=function(){
if(this.htmlObject.tagName.toLowerCase()=='canvas')return parseInt(this.htmlObject.height);
return parseInt(this.htmlObject.style.height);
}
PABObject.prototype.setWidth=function(_w){
if(_w.toString().indexOf('%')==-1)_w=_w+'px';
this.htmlObject.style.width=_w;
}
PABObject.prototype.setHeight=function(_h){
if(_h.toString().indexOf('%')==-1)_h=_h+'px';
this.htmlObject.style.height=_h;
}
PABObject.prototype.setSize=function(_w,_h){
this.setWidth(_w);
this.setHeight(_h);
}
PABObject.prototype.setLeft=function(_l){
this.htmlObject.style.position='absolute';
if(_l.toString().indexOf('%')==-1)_l=_l+'px';
this.htmlObject.style.left=_l;
}
PABObject.prototype.setTop=function(_t){
this.htmlObject.style.position='absolute';
if(_t.toString().indexOf('%')==-1)_t=_t+'px';
this.htmlObject.style.top=_t;
}
PABObject.prototype.setPosition=function(_l,_t){
this.setLeft(_l);
this.setTop(_t);
}
PABObject.prototype.fitCenter=function(_isPixel){
if(_isPixel!=true){
this.setLeft((((100/2)-(this.getWidth()/2)))+'%');
}else{
this.setLeft(((window.innerWidth/2)-(this.getWidth()/2)));
}
}
PABObject.prototype.appendTo=function(_obj){
if(this.htmlObject!=null){
if(_obj instanceof PABPage)_obj.appendChild(this);
else _obj.htmlObject.appendChild(this.htmlObject);
}
}
PABObject.prototype.onScrollViewClick=function(_scrview,_startfun,_endfun,_mustdoendfun){
var self=this;
_scrview=_scrview.htmlObject;
if(PhoneAppBuilderHelper.checkBrowserTouchSupported()){
if(navigator.userAgent.toLowerCase().indexOf('iphone os 7')!=-1){this.htmlObject.onclick=function(){
_endfun();
if(_mustdoendfun!=null)_mustdoendfun();
}}
this.htmlObject.ontouchstart=function(){
self.svc.top=parseInt(_scrview.scrollTop);
if(_startfun!=null)_startfun();
}
this.htmlObject.ontouchend=function(){
if(parseInt(_scrview.scrollTop)==self.svc.top)_endfun();
if(_mustdoendfun!=null)_mustdoendfun();
}
}else{
this.setOnClickListener(_endfun);
}
}
PABObject.prototype.doMouseEvent=function(_event,_fun){
var self=this;
if(PhoneAppBuilderHelper.checkBrowserTouchSupported()){
if(PhoneAppBuilderHelper.checkBrowserIsMobileIE==true){
if(_event=='mouseover')this.htmlObject.addEventListener("MSPointerDown",_fun);
else if(_event=='mousedown')this.htmlObject.addEventListener("MSPointerDown",_fun);
else if(_event=='mousemove')this.htmlObject.addEventListener("MSPointerMove",_fun);
else if(_event=='mouseup')this.htmlObject.addEventListener("MSPointerUp",_fun);
else if(_event=='mouseout')this.htmlObject.addEventListener("MSPointerUp",_fun);
else if(_event=='click')this.htmlObject.addEventListener("MSPointerUp",_fun);
}else{
if(_event=='mouseover')this.htmlObject.ontouchstart=_fun;
else if(_event=='mousedown')this.htmlObject.ontouchstart=_fun;
else if(_event=='mousemove')this.htmlObject.ontouchmove=_fun;
else if(_event=='mouseup')this.htmlObject.ontouchend=_fun;
else if(_event=='mouseout')this.htmlObject.ontouchend=_fun;
else if(_event=='click')this.htmlObject.ontouchend=_fun;
}
}else{
if(_event=='mouseover')this.htmlObject.onmouseover=_fun;
else if(_event=='mousedown')this.htmlObject.onmousedown=_fun;
else if(_event=='mousemove')this.htmlObject.onmousemove=_fun;
else if(_event=='mouseup')this.htmlObject.onmouseup=_fun;
else if(_event=='mouseout')this.htmlObject.onmouseout=_fun;
else if(_event=='click')this.htmlObject.onclick=_fun;
}
}
PABObject.prototype.setOnClickListener=function(_fun){
this.doMouseEvent('click',_fun,true);
}
PABObject.prototype.setMoveable=function(_mdFun){
// Assume pointer is in 'px'.
var self=this;
if(this.htmlObject!=null)this.htmlObject.style.position='absolute';
this.dragMovingData.mousedownFun=function(e){
PhoneAppBuilderHelper.onStart(event);
if(_mdFun)_mdFun();
var pointerX=null;
var pointerY=null;
if(!PhoneAppBuilderHelper.checkBrowserTouchSupported()){
if(PhoneAppBuilderHelper.checkBrowserIsMobileIE()){
pointerX=e.pageX;
pointerY=e.pageY;
}else{
pointerX=e.pageX;
pointerY=e.pageY;
}
}else{
pointerX=e.touches[event.touches.length-1].pageX;
pointerY=e.touches[event.touches.length-1].pageY;
}
self.movingobjJSON.isMoving=true;
self.movingobjJSON.xDif=pointerX-self.getX();
self.movingobjJSON.yDif=pointerY-self.getY();
if(PhoneAppBuilderHelper.checkBrowserTouchSupported())self.movingobjJSON.touchPoint=event.touches.length-1;
self.movingFunction=function(e){
if(self.htmlObject!=null && self.movingobjJSON.isMoving){
var pointerX=null;
var pointerY=null;
if(!PhoneAppBuilderHelper.checkBrowserTouchSupported()){
if(PhoneAppBuilderHelper.checkBrowserIsMobileIE()){
pointerX=e.pageX;
pointerY=e.pageY;
}else{
pointerX=e.pageX;
pointerY=e.pageY;
}
}else{
pointerX=e.touches[self.movingobjJSON.touchPoint].pageX;
pointerY=e.touches[self.movingobjJSON.touchPoint].pageY;
}
self.setX(pointerX-self.movingobjJSON.xDif);
self.setY(pointerY-self.movingobjJSON.yDif);
for(var i=0; i<self.movesFunctions.length; i++){
self.movesFunctions[i]();
}
}
};
PhoneAppBuilderHelper.addMovingFunction(self.movingFunction);
}
this.doMouseEvent('mousedown',this.dragMovingData.mousedownFun,true);
this.dragMovingData.mouseupFun=function(){
self.movingobjJSON.isMoving=false;
PhoneAppBuilderHelper.removeMovingFunction(self.movingFunction);
this.movingFunction=null;
}
this.doMouseEvent('mouseup',this.dragMovingData.mouseupFun,true);
}

PABObject.prototype.setNonMoveable=function(){
if(this.movingFunction!=null)PhoneAppBuilderHelper.removeMovingFunction(this.movingFunction);
if(this.dragMovingData.mousedownFun!=null)this.removeMouseEvent("mousedown",this.dragMovingData.mousedownFun);
if(this.dragMovingData.mouseupFun!=null)this.removeMouseEvent("mouseup",this.dragMovingData.mouseupFun);
}

PABObject.prototype.addMovesFunction=function(_fun){
var canAdd=true;
for(var i=0; i<this.movesFunctions.length; i++){
if(_fun==this.movesFunctions[i]){
canAdd=false;
break;
}
}
if(canAdd)this.movesFunctions.push(_fun);
}
PABObject.prototype.removeMovesFunction=function(_fun){
for(var i=0; i<this.movesFunctions.length; i++){
if(_fun==this.movesFunctions[i]){
this.movesFunctions.splice(i,1);
break;
}
}
}
PABObject.prototype.setAttributes=function(_json){
if(_json.attributes!=null){
for(var i in _json.attributes){
this.htmlObject.setAttribute(i,_json.attributes[i]);
}
}
if(_json.styles!=null){
for(var i in _json.styles){
this.htmlObject.style[i]=_json.styles[i];
}
}
if((this instanceof PABObject) && _json.PABValues!=null){
for(var i in _json.PABValues){
var tv=_json.PABValues[i]
if(i=='appendTo'){try{this.appendTo(tv);}catch(e){}}
else if(i=='onclick'){try{this.setOnClickListener(tv);}catch(e){}}
else if(i=='title'){try{this.setTitle(tv);}catch(e){}}
else if(i=='titleColor'){try{this.setTitleColor(tv);}catch(e){}}
else if(i=='titleFontSize'){try{this.setTitleFontSize(tv);}catch(e){}}
else if(i=='titleFontFamily'){try{this.setTitleFontFamily(tv);}catch(e){}}
else if(i=='padding'){try{this.setPadding(tv);}catch(e){}}
else if(i=='borderSpacing'){try{this.setBorderSpacing(tv);}catch(e){}}
}
}
}
PABObject.prototype.release=function(){
PhoneAppBuilderHelper.releaseObject(this);
}



function PABImageObject(_src,_attributes,_fun){
this.htmlObject=document.createElement('img');
this.htmlObject.src=_src;
if(_attributes!=null)this.setAttributes(_attributes);
if(_fun!=null)this.setOnClickListener(_fun);
}
PABImageObject.prototype=new PABObject();



function PABTextButtonObject(_title,_attributes,_fun){
this.htmlObject=document.createElement('div');
this.htmlObject.style.display='table';
this.htmlObject.style.width='100px';
this.htmlObject.style.height='40px';
this.setBackgroundColor('rgb(250,250,250)');
this.btnTr=document.createElement('div');
this.btnTr.style.display='table-row';
this.btnTd=document.createElement('div');
this.btnTd.style.display='table-cell';
this.btnTd.style.cursor='default';
this.btnTd.style.textAlign='center';
this.btnTd.style.verticalAlign='middle';
this.setTitleColor('black');
this.setTitleFontSize(14);
if(_title!=null && _title!='')this.setTitle(_title);
this.btnTr.appendChild(this.btnTd);
this.htmlObject.appendChild(this.btnTr);
if(_attributes!=null)this.setAttributes(_attributes);
if(_fun!=null)this.setOnClickListener(_fun);
}
PABTextButtonObject.prototype=new PABObject();
PABTextButtonObject.prototype.setBackgroundColor=function(_color){
this.htmlObject.style.backgroundColor=_color;
}
PABTextButtonObject.prototype.setBackgroundImage=function(_img){
this.htmlObject.style.backgroundImage='url(\''+_img+'\')';
}
PABTextButtonObject.prototype.setTitle=function(_title){
this.btnTd.innerHTML=_title;
}
PABTextButtonObject.prototype.setTitleColor=function(_color){
this.btnTd.style.color=_color;
}
PABTextButtonObject.prototype.setTitleFontSize=function(_size){
this.btnTd.style.fontSize=_size+'px';
}
PABTextButtonObject.prototype.setTitleFontFamily=function(_family){
this.btnTd.style.fontFamily=_family;
}



function PABBackground(_src,_xywh){
PABObject.call(this);
this.src=null;
this.canvas=document.createElement('canvas');
this.canvas.style.position='absolute';
this.canvas.style.top='0%';
this.canvas.style.left='0%';
this.canvas.width=PhoneAppBuilderHelper.getBrowserWidthHeight().width;
this.canvas.height=PhoneAppBuilderHelper.getBrowserWidthHeight().height;
this.setHTMLObject(this.canvas);
this.appendTo(document.body);
if(_src!=null)this.setImage(_src,_xywh);
}
PABBackground.prototype=new PABObject();
PABBackground.prototype.setImage=function(_src,_xywh){
var self=this;
this.src=_src;
var img=new Image();
img.src=_src;
img.onload=function(){
var ctx=self.canvas.getContext("2d");
if(_xywh!=null && _xywh.length==4)ctx.drawImage(img,_xywh[0],_xywh[1],_xywh[2],_xywh[3]);
else ctx.drawImage(img,0,0,self.canvas.width,self.canvas.height);
}
PhoneAppBuilderHelper.pushObject(this);
}



function PABVideoObject(_src,_attributes,_poster,_controls,_autoplay){
this.htmlObject=document.createElement('video');
if(_poster!=null)this.htmlObject.setAttribute('poster',_poster);
if(_controls==true)this.htmlObject.setAttribute('controls','');
if(_autoplay==true)this.htmlObject.setAttribute('autoplay','');
this.sourceObj=document.createElement('source');
var tname=_src.split('.')[_src.split('.').length-1];
this.sourceObj.setAttribute('type','video/'+tname);
this.sourceObj.src=_src;
this.htmlObject.appendChild(this.sourceObj);
if(_attributes!=null)this.setAttributes(_attributes);
}
PABVideoObject.prototype=new PABObject();



function PABAudioObject(_src,_attributes,_controls,_autoplay){
this.htmlObject=document.createElement('audio');
if(_controls==true)this.htmlObject.setAttribute('controls','');
if(_autoplay==true)this.htmlObject.setAttribute('autoplay','');
this.sourceObj=document.createElement('source');
if(_src!=null)this.setSrc(_src);
this.htmlObject.appendChild(this.sourceObj);
if(_attributes!=null)this.setAttributes(_attributes);
}
PABAudioObject.prototype=new PABObject();
PABAudioObject.prototype.setSrc=function(_src){
var tname=_src.split('.')[_src.split('.').length-1];
if(tname=='mp3')tname='mpeg';
this.sourceObj.setAttribute('type','audio/'+tname);
this.sourceObj.src=_src;
this.load();
}
PABAudioObject.prototype.setCurrentTime=function(_time){
this.htmlObject.currentTime=_time;
}
PABAudioObject.prototype.load=function(){
this.htmlObject.load();
}
PABAudioObject.prototype.play=function(){
this.htmlObject.play();
}
PABAudioObject.prototype.pause=function(){
this.htmlObject.pause();
}
PABAudioObject.prototype.stop=function(){
this.pause();
this.setCurrentTime(0);
}
PABAudioObject.prototype.setLoop=function(){
var self=this.htmlObject;
self.addEventListener('ended',function(){
self.currentTime=0;
self.play();
},false);
}



function PABDivObject(_content,_attributes){
this.htmlObject=document.createElement('div');
if(_content!=null)this.htmlObject.innerHTML=_content;
if(_attributes!=null)this.setAttributes(_attributes);
}
PABDivObject.prototype=new PABObject();



function PABTableObject(_data,_canMultipleSelect,_attributes){
this.trArray=[];
this.canMultipleSelect=_canMultipleSelect;
this.horizontalAlign='left';
this.verticalAlign='middle';
this.htmlObject=document.createElement('div');
this.htmlObject.style.width='100%';
if(_attributes!=null)this.setAttributes(_attributes);
this.htmlObject.style.display='table';
for(var i in _data){
this.push(_data[i]);
}
}
PABTableObject.prototype=new PABObject();
PABTableObject.prototype.setHorizontalAlign=function(_align){
this.horizontalAlign=_align;
}
PABTableObject.prototype.setVerticalAlign=function(_align){
this.verticalAlign=_align;
}
PABTableObject.prototype.push=function(_data){
var tableTr=document.createElement('div');
tableTr.style.display='table-row';
this.htmlObject.appendChild(tableTr);
if(this.canMultipleSelect){
var tableTd_ms=document.createElement('div');
tableTd_ms.style.display='table-cell';
tableTd_ms.style.width='5%';
tableTd_ms.style.height='50px';
tableTr.appendChild(tableTd_ms);
}
var tableTd_main=document.createElement('div');
tableTd_main.style.display='table-cell';
if(this.canMultipleSelect)tableTd_main.style.width='95%';
else tableTd_main.style.width='100%';
tableTd_main.style.height='50px';
//tableTd_main.style.backgroundColor='white';
tableTd_main.style.textAlign=this.horizontalAlign;
tableTd_main.style.verticalAlign=this.verticalAlign;
if(_data instanceof PABObject)tableTd_main.appendChild(_data.htmlObject);
else tableTd_main.innerHTML=_data;
tableTr.appendChild(tableTd_main);
this.trArray.push([tableTr,tableTd_main]);
}
PABTableObject.prototype.setPadding=function(_padding){
for(var i in trArray){
trArray[i][1].style.padding=_padding+'px';
}
}
PABTableObject.prototype.setBorderSpacing=function(_spacing){
this.htmlObject.style.borderSpacing=_spacing+'px';
}



function PABVector(){
PABObject.call(this);
this.htmlSet=false;
this.src=null;
this.canvas=document.createElement('canvas');
this.isWall=false;
this.collisionTimer=null;
this.movingXFunction=null;
this.movingYFunction=null;
this.onCollisionFunction=null;
this.onCollisionWithVectorFunctions=[];
this.setHTMLObject(this.canvas);
PhoneAppBuilderHelper.pushObject(this);
}
PABVector.prototype=new PABObject();
PABVector.prototype.setImage=function(_src,_xywh){
this.htmlSet=false;
var self=this;
this.src=_src;
this.canvas.width=_xywh[2];
this.canvas.height=_xywh[3];
var img=new Image();
img.src=_src;
img.onload=function(){
var ctx=self.canvas.getContext("2d");
if(_xywh!=null && _xywh.length==4)ctx.drawImage(img,0,0,_xywh[2],_xywh[3]);
}
self.canvas.style.position='absolute';
self.setX(_xywh[0]);
self.setY(_xywh[1]);
self.htmlSet=true;
}
PABVector.prototype.init=function(_src,_xywh,_appendTo){
this.setImage(_src,_xywh);
this.appendTo(_appendTo);
}
PABVector.prototype.getHtmlHasSet=function(){
return this.htmlSet;
}
PABVector.prototype.setX=function(_x){
this.htmlObject.style.left=_x+'px';
// check collision start
var collisionData=PhoneAppBuilderHelper.getIsCollision(this);
if(collisionData.length>0){
var isMe=false;
for(var i=0; i<collisionData.length; i++){
if(collisionData==this)isMe=true;
}
if(isMe==false)collisionData.push(this);
if(this.onCollisionFunction!=null)this.onCollisionFunction(collisionData);
for(var i=0; i<collisionData.length; i++){
if(collisionData[i].onCollisionFunction!=null){
collisionData[i].onCollisionFunction(collisionData);
}
}
if(this.isWall==true){
for(var i=0; i<collisionData.length; i++){
if((collisionData[i].getX()+collisionData[i].getWidth()>=this.getX()) && (collisionData[i].getX()<(this.getX()+this.getWidth())-(this.getWidth()-2))){
collisionData[i].setX(this.getX()-1);
}else if(collisionData[i].getX()<=this.getX()+this.getWidth() && collisionData[i].getX()+collisionData[i].getWidth()>this.getX()){
collisionData[i].setX(this.getX()+this.getWidth()+1);
}
}
}else{
for(var i=0; i<collisionData.length; i++){
if(collisionData[i].isWall==true){
if((this.getX()+this.getWidth()>=collisionData[i].getX()) && (this.getX()<(collisionData[i].getX()+collisionData[i].getWidth())-(collisionData[i].getWidth()-2))){
this.setX(collisionData[i].getX()-this.getWidth()-1);
}else if(this.getX()<=collisionData[i].getX()+collisionData[i].getWidth() && this.getX()+this.getWidth()>collisionData[i].getX()){
this.setX(collisionData[i].getX()+collisionData[i].getWidth()+1);
}
if(this.onCollisionFunction!=null)this.onCollisionFunction(collisionData);
}
}
}
}
// check collision end
}
PABVector.prototype.setY=function(_y){
this.htmlObject.style.top=_y+'px';
// check collision start
var collisionData=PhoneAppBuilderHelper.getIsCollision(this);
if(collisionData.length>0){
var isMe=false;
for(var i=0; i<collisionData.length; i++){
if(collisionData==this)isMe=true;
}
if(isMe==false)collisionData.push(this);
if(this.onCollisionFunction!=null)this.onCollisionFunction(collisionData);
for(var i=0; i<collisionData.length; i++){
if(collisionData[i].onCollisionFunction!=null)collisionData[i].onCollisionFunction(collisionData);
}
if(this.isWall==true){
for(var i=0; i<collisionData.length; i++){
if((collisionData[i].getY()+collisionData[i].getHeight()>=this.getY()) && (collisionData[i].getY()<(this.getY()+this.getHeight())-(this.getHeight()-2))){
collisionData[i].setY(this.getY()-1);
}else if(collisionData[i].getY()<=this.getY()+this.getHeight() && collisionData[i].getY()+collisionData[i].getHeight()>this.getY()){
collisionData[i].setY(this.getY()+this.getHeight()+1);
}
}
}else{
for(var i=0; i<collisionData.length; i++){
if(collisionData[i].isWall==true){
if((this.getY()+this.getHeight()>=collisionData[i].getY()) && (this.getY()<(collisionData[i].getY()+collisionData[i].getHeight())-(collisionData[i].getHeight()-2))){
this.setY(collisionData[i].getY()-this.getHeight()-1);
}else if(this.getY()<=collisionData[i].getY()+collisionData[i].getHeight() && this.getY()+this.getHeight()>collisionData[i].getY()){
this.setY(collisionData[i].getY()+collisionData[i].getHeight()+1);
}
if(this.onCollisionFunction!=null)this.onCollisionFunction(collisionData);
}
}
}
}
// check collision end
}
PABVector.prototype.setAsWall=function(){
this.isWall=true;
}
PABVector.prototype.moveByX=function(_distinct){
this.setX(this.getX()+_distinct);
}
PABVector.prototype.moveByY=function(_distinct){
this.setY(this.getY()+_distinct);
}
PABVector.prototype.moveByXY=function(_distinctX,_distinctY){
this.moveByX(_distinctX);
this.moveByY(_distinctY);
}
PABVector.prototype.moveX=function(_distinct){
var self=this;
this.movingXFunction=function(){
self.setX(self.getX()+_distinct);
}
PhoneAppBuilderHelper.addRuntimeLoopFunction(this.movingXFunction);
}
PABVector.prototype.stopMoveX=function(){
var self=this;
PhoneAppBuilderHelper.removeRuntimeLoopFunction(this.movingXFunction);
this.movingXFunction=null;
}
PABVector.prototype.moveY=function(_distinct){
var self=this;
this.movingYFunction=function(){
self.setY(self.getY()+_distinct);
}
PhoneAppBuilderHelper.addRuntimeLoopFunction(this.movingYFunction);
}
PABVector.prototype.stopMoveY=function(){
var self=this;
PhoneAppBuilderHelper.removeRuntimeLoopFunction(this.movingYFunction);
this.movingYFunction=null;
}
PABVector.prototype.moveXY=function(_distinctX,_distinctY){
this.moveX(_distinctX);
this.moveY(_distinctY);
}
PABVector.prototype.stopMoveXY=function(){
this.stopMoveX();
this.stopMoveY();
}
PABVector.prototype.show=function(){
this.htmlObject.style.display='';
}
PABVector.prototype.hide=function(){
this.htmlObject.style.display='none';
}
PABVector.prototype.hideWithRelease=function(){
this.hide();
this.release();
}
PABVector.prototype.setOnCollisionListener=function(_fun){
this.onCollisionFunction=_fun;
}
PABVector.prototype.clearOnCollisionListener=function(){
this.onCollisionFunction=null;
}
PABVector.prototype.setOnCollisionWithVectorListener=function(_vector,_fun){
this.onCollisionWithVectorFunctions.push([_vector,_fun]);
this.setOnCollisionListener(function(collisionData){
for(var i=0; i<collisionData.length; i++){
for(var k=0; k<this.onCollisionWithVectorFunctions.length; k++){
if(collisionData[i]==this.onCollisionWithVectorFunctions[k][0]){
this.onCollisionWithVectorFunctions[k][1]();
}
}
}
});
}
PABVector.prototype.moveWithPath=function(_pathArray,_doneFun){
var self=this;
var checkFun=function(){
var mfx1=null;
var mfx2=null;
var mfy1=null;
var mfy2=null;
var xWay='r';
var yWay='b';
var isDoneX=false;
var isDoneY=false;
var xyDoneFun=function(){
if(isDoneX==true && isDoneY==true){
if(mfx2!=null)PhoneAppBuilderHelper.removeRuntimeLoopFunction(mfx2);
if(mfy2!=null)PhoneAppBuilderHelper.removeRuntimeLoopFunction(mfy2);
_doneFun();
}
}
if(_pathArray[0]==0)isDoneX=true;
if(_pathArray[1]==0)isDoneY=true;
if(self.getX()<_pathArray[0] || self.getX()>_pathArray[0]){
if(self.getX()>_pathArray[0]){xWay='l';_pathArray[2]=-_pathArray[2];}
mfx1=function(){self.moveByX(_pathArray[2]);}
mfx2=function(){if((self.getX()<=_pathArray[0] && xWay=='l')||(self.getX()>=_pathArray[0] && xWay=='r')){PhoneAppBuilderHelper.removeRuntimeLoopFunction(mfx1);isDoneX=true;xyDoneFun();}}
PhoneAppBuilderHelper.addRuntimeLoopFunction(mfx1);
PhoneAppBuilderHelper.addRuntimeLoopFunction(mfx2);
}
if(self.getY()<_pathArray[1] || self.getY()>_pathArray[1]){
if(self.getY()>_pathArray[1]){yWay='t';_pathArray[3]=-_pathArray[3];}
mfy1=function(){self.moveByY(_pathArray[3]);}
mfy2=function(){if((self.getY()<=_pathArray[1] && yWay=='t')||(self.getY()>=_pathArray[1] && yWay=='b')){PhoneAppBuilderHelper.removeRuntimeLoopFunction(mfy1);isDoneY=true;xyDoneFun();}}
PhoneAppBuilderHelper.addRuntimeLoopFunction(mfy1);
PhoneAppBuilderHelper.addRuntimeLoopFunction(mfy2);
}
}
var checkTimer=setInterval(function(){
if(self.getHtmlHasSet()==true){
checkFun();clearInterval(checkTimer);
}
},10);
}
PABVector.prototype.moveWithPathDelay=function(_pathArray,_doneFun,_delay){
var self=this;
var mwpFun=function(){self.moveWithPath(_pathArray,_doneFun);}
if(_delay>0)setTimeout(mwpFun,_delay);
else mwpFun();
}



function toPABObject(_obj){
var newObj=new PABObject();
newObj.setHTMLObject(_obj);
return newObj;
}