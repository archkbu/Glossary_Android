/*
DDJS v7.9
Copyright by David FUNG
Developed by David FUNG
*/



// Also can add this into your webpages:
// <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

function ddjs_checkBrowserKernel(){
var ddjsv_b=navigator.userAgent.toLowerCase();
if(ddjsv_b.indexOf('webkit')!=-1)return 'webkit';
else if(ddjsv_b.indexOf('firefox')!=-1)return 'moz';
else if(ddjsv_b.indexOf('msie')!=-1)return 'ms';
else if(ddjsv_b.indexOf('opera')!=-1)return 'o';
return 'none';
}

function ddjs_checkBrowserIsMobile(){
var ddjsv_b=navigator.userAgent.toLowerCase();
return ((ddjsv_b.indexOf('iphone')!=-1 && ddjsv_b.indexOf('ipad')==-1)||(ddjsv_b.indexOf('mobile')!=-1 && ddjsv_b.indexOf('ipad')==-1)||(ddjsv_b.indexOf('mobile')!=-1 && ddjsv_b.indexOf('android')!=-1)||ddjsv_b.indexOf('blackberry')!=-1 || ddjsv_b.indexOf('iemobile')!=-1);
return true;
}

function ddjs_checkBrowserIsTablet(){
var ddjsv_b=navigator.userAgent.toLowerCase();
return (ddjsv_b.indexOf('ipad')!=-1);
}

function ddjs_checkBrowserTouchSupported(){
return (((ddjs_checkBrowserIsMobile()==true)||(ddjs_checkBrowserIsTablet()==true))&&(navigator.userAgent.toLowerCase().indexOf('iemobile')==-1));
}

function ddjs_checkBrowserName(){
var ddjsv_b=navigator.userAgent.toLowerCase();
if(ddjsv_b.indexOf('chrome')!=-1)return 'chrome';
else if(ddjsv_b.indexOf('safari')!=-1)return 'safari';
else if(ddjsv_b.indexOf('firefox')!=-1)return 'firefox';
else if(ddjsv_b.indexOf('msie')!=-1)return 'ie';
else if(ddjsv_b.indexOf('opera')!=-1)return 'opera';
return 'none';
}

function ddjs_getBrowserWidthHeight(){
return {width:window.innerWidth,height:window.innerHeight};
}

function ddjs_showObjWhenOnlyDocumentLoaded(ddjsv_objs){
for(var ddjsv_i in ddjsv_objs){
try{
document.getElementById(ddjsv_objs[ddjsv_i]).style.display='none';
if(document.body.getAttribute('onLoad')!=null){
document.body.setAttribute('onLoad','ddjs_findObject(\''+ddjsv_objs[ddjsv_i]+'\').style.display=\'\';'+document.body.getAttribute('onLoad'));
}else{
document.body.setAttribute('onLoad','ddjs_findObject(\''+ddjsv_objs[ddjsv_i]+'\').style.display=\'\';');
}
}catch(e){}
}
}

function ddjs_checkOrientation(){
var ddjsv_o;
if((window.orientation==90)||(window.orientation==-90))ddjsv_o='portrait';
else ddjsv_o='landscape';
return ddjsv_o;
}

function ddjs_getLocationSearchJSON(){
if((location.search)||(location.search!='')){
var ddjsv_allValues=location.search.substring(1);
var ddjsv_valuesJSON={};
var ddjsv_valuesArr=ddjsv_allValues.split("&");
for(var ddjsv_i in ddjsv_valuesArr){
var ddjsv_valueArr=ddjsv_valuesArr[ddjsv_i].split("=");
ddjsv_valuesJSON[ddjsv_valueArr[0]]=ddjsv_valueArr[1];
}
return ddjsv_valuesJSON;
}
return 'none';
}

function ddjs_findObject(ddjsv_obj){
if(ddjsv_obj=='document'){return document;}
else if(ddjsv_obj=='document.body'){return document.body;}
else if(ddjsv_obj=='window'){return window;}
else if(typeof ddjsv_obj==='object'){return ddjsv_obj;}
else if(document.getElementById(ddjsv_obj)){return document.getElementById(ddjsv_obj);}
else{return null;}
}

function ddjs_setNonSelectable(ddjsv_obj,ddjsv_isCursorDefault){
var ddjsv_theObj=document.body;
if((ddjsv_obj!='document.body')&&(ddjsv_obj!=document.body))ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.setAttribute('onselectstart','return false');
ddjsv_theObj.style.webkitTouchCallout='none';
ddjsv_theObj.style.webkitUserSelect='none';
if(ddjsv_isCursorDefault==true)ddjsv_theObj.style.cursor='default';
}else{return false;}
}

function ddjs_setNonSelectableWithArray(ddjsv_obj){
for(var ddjsv_i in ddjsv_obj)ddjs_setNonSelectable(ddjsv_obj[ddjsv_i],true);
}

function ddjs_setCursorDefault(ddjsv_obj){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.cursor='default';
}else{return false;}
}

function ddjs_setCursorPointer(ddjsv_obj){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.cursor='pointer';
}else{return false;}
}

ddjs_LangSupport=['en'];
function ddjs_setLanguageSupport(ddjsv_langSupport){
if(ddjsv_langSupport)ddjs_LangSupport=ddjsv_langSupport;
else ddjs_LangSupport=['en'];
}

function ddjs_getLanguageSupport(){
return ddjs_LangSupport;
}

function ddjs_getLanguageSetting(){
var ddjsv_l=ddjs_LangSupport[0];
if(ddjs_getLocationSearchJSON()['lang']){
for(var ddjsv_i in ddjs_LangSupport){
if(ddjs_getLocationSearchJSON()['lang']==ddjs_LangSupport[ddjsv_i])return ddjs_getLocationSearchJSON()['lang'];
}
}
return ddjsv_l;
}

function ddjs_getLanguageWithSetLanguageSupport(ddjsv_langSupport){
ddjs_setLanguageSupport(ddjsv_langSupport);
return ddjs_getLanguageSetting();
}

function ddjs_getLinkWithLanguage(ddjsv_link){
if(ddjsv_link.indexOf('lang=')!=-1)return ddjsv_link;
if((ddjsv_link.indexOf('?')!=-1)&&(ddjsv_link.indexOf('=')!=-1))return ddjsv_link+'&lang='+ddjs_getLanguageSetting();
return ddjsv_link+'?lang='+ddjs_getLanguageSetting();;
}


ddjsv_LanguagePackageJSON=null;
function ddjs_setLanguagePackage(ddjsv_id,ddjsv_text,ddjsv_lang){
if(ddjsv_LanguagePackageJSON==null){
ddjsv_LanguagePackageJSON={};
ddjsv_LanguagePackageJSON[ddjsv_lang]=[{}];
ddjsv_LanguagePackageJSON[ddjsv_lang][0]['id']=ddjsv_id;
ddjsv_LanguagePackageJSON[ddjsv_lang][0]['text']=ddjsv_text;
}else{
if(ddjsv_LanguagePackageJSON[ddjsv_lang]){
ddjsv_LanguagePackageJSON[ddjsv_lang].push({id:ddjsv_id,text:ddjsv_text});
}else{
ddjsv_LanguagePackageJSON[ddjsv_lang]=[{}];
ddjsv_LanguagePackageJSON[ddjsv_lang][0]['id']=ddjsv_id;
ddjsv_LanguagePackageJSON[ddjsv_lang][0]['text']=ddjsv_text;
}
}
}

function ddjs_setTextToLanguagePackageWithDefault(){
ddjs_setTextToLanguagePackageWithJSON(ddjsv_LanguagePackageJSON);
}

function ddjs_setTextToLanguagePackageWithJSON(ddjsv_lp){
var ddjsv_lang=ddjs_getLanguageSetting();
for(var i in ddjsv_lp[ddjsv_lang]){
try{
if(ddjsv_lp[ddjsv_lang][i]['id']=='document.title')document.title=ddjsv_lp[ddjsv_lang][i]['text'];
else ddjs_findObject(ddjsv_lp[ddjsv_lang][i]['id']).innerHTML=ddjsv_lp[ddjsv_lang][i]['text'];
}catch(err){}
}
}

function ddjs_datesComparing(ddjsv_startDate,ddjsv_endDate){
ddjsv_startDate=ddjsv_startDate.split('-');
ddjsv_endDate=ddjsv_endDate.split('-');
return Math.ceil(new Date(ddjsv_startDate[2],ddjsv_startDate[1],ddjsv_startDate[0]).getTime()-new Date(ddjsv_endDate[2],ddjsv_endDate[1],ddjsv_endDate[0]).getTime())/(24*60*60*1000);
}

function ddjs_toTimeHM(ddjsv_theDate){
ddjsv_theDate=ddjsv_theDate.substr(0,5);
return ddjsv_theDate;
}

function ddjs_toTimeHMS(ddjsv_theDate){
ddjsv_theDate=ddjsv_theDate.substr(0,8);
return ddjsv_theDate;
}

function ddjs_getTheDateDayNum(ddjsv_d){
return ddjs_getTheDayStr(new Date(ddjsv_d).getDay());
}

function ddjs_getTodayDayNum(){
return new Date().getDay();
}

function ddjs_getTheDayNum(ddjsv_d){
return new Date(ddjsv_d).getDay();
}

function ddjs_getTodayDayStr(){
return ddjs_getTheDayStr(ddjs_getTodayDayNum());
}

function ddjs_getTodayYM(){
return (new Date().getFullYear())+'-'+((new Date().getMonth())+1);
}

function ddjs_getDateYByDropYear(ddjsv_d,ddjsv_y){
return (new Date(ddjsv_d).getFullYear())-ddjsv_y;
}

function ddjs_getDateYMByDropMonth(ddjsv_d,ddjsv_m){
var ddjsv_nM=(new Date(ddjsv_d).getMonth())+1;
var ddjsv_y=new Date(ddjsv_d).getFullYear();
for(var ddjsv_i=0;ddjsv_i<ddjsv_m;ddjsv_i++){
ddjsv_nM--;
if(ddjsv_nM==0){
ddjsv_nM=12;
ddjsv_y--;
}
}
if(ddjsv_nM<10)ddjsv_nM='0'+ddjsv_nM;
return (ddjsv_y+'-'+ddjsv_nM);
}

function ddjs_getTheDayStr(ddjsv_s){
if(ddjsv_s==1)return 'mon';
else if(ddjsv_s==2)return 'tue';
else if(ddjsv_s==3)return 'wed';
else if(ddjsv_s==4)return 'thu';
else if(ddjsv_s==5)return 'fri';
else if(ddjsv_s==6)return 'sat';
else if(ddjsv_s==0)return 'sun';
}

function ddjs_getTheDayZhStr(ddjsv_s){
if(ddjsv_s=='mon')return '星期一';
else if(ddjsv_s=='tue')return '星期二';
else if(ddjsv_s=='wed')return '星期三';
else if(ddjsv_s=='thu')return '星期四';
else if(ddjsv_s=='fri')return '星期五';
else if(ddjsv_s=='sat')return '星期六';
else if(ddjsv_s=='sun')return '星期日';
}

function ddjs_getTodayDateString(){
var ddjsv_todayTodayString=new Date();
var ddjsv_todayMonthString=ddjsv_todayTodayString.getMonth()+1;
if(ddjsv_todayMonthString<10)ddjsv_todayMonthString='0'+ddjsv_todayMonthString;
var ddjsv_todayDateString=ddjsv_todayTodayString.getDate();
if(ddjsv_todayDateString<10)ddjsv_todayDateString='0'+ddjsv_todayDateString;
ddjsv_todayTodayString=ddjsv_todayTodayString.getFullYear()+'-'+ddjsv_todayMonthString+'-'+ddjsv_todayDateString;
return ddjsv_todayTodayString;
}

function ddjs_getNowTime(){
var ddjsv_nowt=new Date();
var ddjsv_mi=ddjsv_nowt.getMinutes();
var ddjsv_se=ddjsv_nowt.getSeconds();
var ddjsv_ms=ddjsv_nowt.getMilliseconds();
if(ddjsv_mi<10)ddjsv_mi='0'+ddjsv_mi;
if(ddjsv_se<10)ddjsv_se='0'+ddjsv_se;
if(ddjsv_ms<10)ddjsv_ms='0'+ddjsv_ms;
return ddjsv_nowt.getHours()+':'+ddjsv_mi+':'+ddjsv_se+'.'+ddjsv_ms;
}

ddjsv_debugWindowData={isHide:false};
function ddjs_createDebugWindow(ddjsv_isMoveable){
ddjsv_debugwindow_down=false;
var ddjsv_w=document.createElement('div');
ddjsv_w.style.position='absolute';
ddjsv_w.style.left=10+'px';
ddjsv_w.style.top=10+'px';
ddjsv_w.style.width=430+'px';
ddjsv_w.style.height=250+'px';
ddjsv_w.style.border=5+'px';
ddjsv_w.style.backgroundColor='black';
ddjsv_w.style.overflow='auto';
ddjsv_w.style.color='greenyellow';
ddjsv_w.style.zIndex=1000;
document.body.appendChild(ddjsv_w);
ddjsv_debugWindowData['dwObj']=ddjsv_w;
ddjsv_w.setAttribute('id','ddjs_debugWindow');
if(ddjsv_isMoveable){
ddjsv_w.style.cursor='move';
ddjs_setObjMoveable('ddjs_debugWindow');
}else{
ddjsv_w.style.cursor='default';
ddjsv_w.style.fontSize='30px';
}
}

function ddjs_setDebugWindowDeafultShow(isShow){
ddjsv_debugWindowData.isHide=(!isShow);
}

function ddjs_setDebugWindowShow(){
if(ddjsv_debugWindowData.dwObj)ddjsv_debugWindowData.dwObj.style.display='';
}

function ddjs_setDebugWindowHide(){
if(ddjsv_debugWindowData.dwObj)ddjsv_debugWindowData.dwObj.style.display='none';
}

function ddjs_setDebugWindowSizeFullScreen(){
if(ddjsv_debugWindowData.dwObj==null){
ddjs_createDebugWindow(false);
ddjsv_debugWindowData.dwObj.style.left=0+'px';
ddjsv_debugWindowData.dwObj.style.top=0+'px';
ddjsv_debugWindowData.dwObj.style.width=document.body.clientWidth+'px';
ddjsv_debugWindowData.dwObj.style.height=document.body.clientHeight+'px';
}
}

function ddjs_getDebugWindow(){
return ddjsv_debugWindowData.dwObj;
}

function ddjs_log(ddjsv_l){
var ddjsv_debugWindow=ddjsv_debugWindowData.dwObj;
var ddjsv_dw;
if(ddjsv_debugWindow!=null){
ddjsv_dw=ddjsv_debugWindow;
}else{
ddjs_createDebugWindow(true);
ddjsv_dw=ddjsv_debugWindowData.dwObj;
}
if(ddjsv_debugWindowData.isHide==true)ddjs_setDebugWindowHide();
else ddjs_setDebugWindowShow();
ddjsv_dw.innerHTML='&nbsp;'+ddjs_toTimeHMS(ddjs_getNowTime())+'#&nbsp;'+ddjsv_l+'<br />'+ddjsv_dw.innerHTML;
}

function ddjs_fileToBaseString(ddjsv_obj,ddjsv_rM){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
var ddjsv_oFReader=new FileReader();
ddjsv_oFReader.onload=function(ddjsv_oFREvent){
ddjsv_rM(ddjsv_oFREvent.target.result);
};
if(ddjsv_theObj.files.length===0){return;}
var ddjsv_oFile=ddjsv_theObj.files[0];
ddjsv_oFReader.readAsDataURL(ddjsv_oFile);
}else{return false;}
}

function ddjs_previewFileToObject(ddjsv_obj,ddjsv_file){
var ddjsv_oFReader=new FileReader();
ddjsv_oFReader.onload=function(ddjsv_oFREvent){
ddjs_findObject(ddjsv_obj).src=ddjsv_oFREvent.target.result;
};
ddjsv_oFReader.readAsDataURL(ddjsv_file);
}

function ddjs_createXMLHttpRequest(ddjsv_theLink,ddjsv_sendMethod,ddjsv_isSynchronization,ddjsv_postData,ddjsv_resultType,ddjsv_theFun){
ddjsv_sendMethod=ddjsv_sendMethod.toUpperCase();
var ddjsv_xmlhttp=null;
if(window.XMLHttpRequest)ddjsv_xmlhttp=new XMLHttpRequest();
else if(window.ActiveXObject){
try{ddjsv_xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){
try{ddjsv_xmlhttp=new ActiveXObject("Mircosoft.XMLHTTP");}catch(e){}
}
}
if(ddjsv_xmlhttp){
ddjsv_xmlhttp.onreadystatechange=function(){
if((ddjsv_xmlhttp.readyState==4)&&(ddjsv_xmlhttp.status==200)){
try{
if(ddjsv_resultType.toUpperCase()=='JSON')ddjsv_theFun(eval('('+ddjsv_xmlhttp.responseText+')'));
else ddjsv_theFun(ddjsv_xmlhttp.responseText);
}catch(e){}
}
}
try{
ddjsv_xmlhttp.open(ddjsv_sendMethod,ddjsv_theLink,ddjsv_isSynchronization);
if(((ddjsv_postData=='')||(ddjsv_postData==null))||(ddjsv_sendMethod.toUpperCase()=='GET')){
ddjsv_xmlhttp.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
ddjsv_xmlhttp.send(null);
}else{
ddjsv_xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
var ddjsv_ss='';
try{
for(var ddjsv_j in ddjsv_postData)ddjsv_ss+=ddjsv_j+'='+ddjsv_postData[ddjsv_j]+'&';
}catch(e){}
ddjsv_xmlhttp.send(ddjsv_ss.substring(0,ddjsv_ss.length-1));
}
}catch(e){}
}
}

function ddjs_createXMLHttpRequest2(ddjsv_link,ddjsv_dataJSON,ddjsv_returnType,ddjsv_endFunction,ddjsv_progressFunction,_index){
var ddjsv_formData=new FormData();
for(var ddjsv_i in ddjsv_dataJSON)ddjsv_formData.append(ddjsv_i,ddjsv_dataJSON[ddjsv_i]);
var ddjsv_xhr=new XMLHttpRequest();
ddjsv_xhr.open('POST',ddjsv_link,true);
ddjsv_xhr.onload=function(ddjsv_e){
};
ddjsv_xhr.onreadystatechange=function(){
if((ddjsv_xhr.readyState==4)&&(ddjsv_xhr.status==200)){
try{
if(ddjsv_endFunction!=null){
if(ddjsv_returnType.toUpperCase()=='JSON')ddjsv_endFunction(eval('('+ddjsv_xhr.responseText+')'),_index);
else ddjsv_endFunction(ddjsv_xhr.responseText,_index);
}
}catch(ddjsv_e){}
}
};
ddjsv_xhr.upload.onprogress=function(ddjsv_e){
if(ddjsv_e.lengthComputable){
if(ddjsv_progressFunction!=null)ddjsv_progressFunction(ddjsv_e);
}
};
ddjsv_xhr.send(ddjsv_formData);
}

function ddjs_setFileOnDragListener(ddjsv_obj,ddjsv_cusFunction){
if(ddjsv_obj!='document.body')ddjsv_obj=document.getElementById(ddjsv_obj);
else ddjsv_obj=document.body;
ddjsv_obj.ondragover=function(ddjsv_event){
ddjsv_event.preventDefault();
}
ddjsv_obj.ondrop=function(ddjsv_event){
ddjsv_event.preventDefault(ddjsv_event);
var ddjsv_files=ddjsv_event.dataTransfer.files;
if(ddjsv_files.length>0){
if(ddjsv_cusFunction!=null)ddjsv_cusFunction(ddjsv_files);
}
ddjsv_event.stopPropagation();
return false;
}
}

function ddjs_setDocumentBackgroundImage(ddjsv_img,ddjsv_opacity){
var ddjsv_bg=document.createElement('img');
ddjsv_bg.src=ddjsv_img;
ddjsv_bg.style.position='fixed';
ddjsv_bg.style.top='0%';
ddjsv_bg.style.left='0%';
ddjsv_bg.style.width='100%';
ddjsv_bg.style.height='100%';
ddjsv_bg.setAttribute('id','documentBackgroundImage');
if(ddjsv_opacity==0 || ddjsv_opacity!=null)ddjsv_bg.style.opacity=ddjsv_opacity;
document.body.appendChild(ddjsv_bg);
}

function ddjs_getCursorPercent(event,ddjsv_inObj,ddjsv_t){
if(ddjsv_inObj!='document.body'){
if(ddjs_checkBrowserTouchSupported()==true) return {x:((ddjsv_t.pageX)-(parseInt(document.getElementById(ddjsv_inObj).style.left)/100)-((parseInt(document.getElementById(ddjsv_inObj).style.left)+parseInt(document.getElementById(ddjsv_inObj).style.width))/100))/((ddjs_getBrowserWidthHeight().width*(parseInt(document.getElementById(ddjsv_inObj).style.width)/100))/100),y:((ddjsv_t.pageY)-(parseInt(document.getElementById(ddjsv_inObj).style.top)/100)-((parseInt(document.getElementById(ddjsv_inObj).style.top)+parseInt(document.getElementById(ddjsv_inObj).style.height))/100))/((ddjs_getBrowserWidthHeight().height*(parseInt(document.getElementById(ddjsv_inObj).style.height)/100))/100)};
return {x:((event.pageX)-(parseInt(document.getElementById(ddjsv_inObj).style.left)/100)-((parseInt(document.getElementById(ddjsv_inObj).style.left)+parseInt(document.getElementById(ddjsv_inObj).style.width))/100))/((ddjs_getBrowserWidthHeight().width*(parseInt(document.getElementById(ddjsv_inObj).style.width)/100))/100),y:((event.pageY)-(parseInt(document.getElementById(ddjsv_inObj).style.top)/100)-((parseInt(document.getElementById(ddjsv_inObj).style.top)+parseInt(document.getElementById(ddjsv_inObj).style.height))/100))/((ddjs_getBrowserWidthHeight().height*(parseInt(document.getElementById(ddjsv_inObj).style.height)/100))/100)};
}else{
if(ddjs_checkBrowserTouchSupported()==true) return {x:event.touches[event.touches.length-1].pageX/(ddjs_getBrowserWidthHeight().width/100),y:event.touches[event.touches.length-1].pageY/(ddjs_getBrowserWidthHeight().height/100)};
return {x:event.pageX/(ddjs_getBrowserWidthHeight().width/100),y:event.pageY/(ddjs_getBrowserWidthHeight().height/100)};
}
}

function ddjs_getMouseEvent(){
var ddjsv_onMouseOver='onMouseOver';
var ddjsv_onMouseDown='onMouseDown';
var ddjsv_onMouseMove='onMouseMove';
var ddjsv_onMouseUp='onMouseUp';
var ddjsv_onMouseOut='onMouseOut';
var ddjsv_onClick='onClick';
if(ddjs_checkBrowserTouchSupported()==true){
ddjsv_onMouseOver='ontouchstart';
ddjsv_onMouseDown='ontouchstart';
ddjsv_onMouseMove='ontouchmove';
ddjsv_onMouseUp='ontouchend';
ddjsv_onMouseOut='ontouchend';
ddjsv_onClick='ontouchend';
}
return {over:ddjsv_onMouseOver,down:ddjsv_onMouseDown,move:ddjsv_onMouseMove,up:ddjsv_onMouseUp,out:ddjsv_onMouseOut,click:ddjsv_onClick};
}

ddjsv_movingobjJSON={};
function ddjs_setObjMoveable(ddjsv_obj,ddjsv_inObj){
if(ddjsv_inObj==null)ddjsv_inObj='document.body';
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if((ddjsv_theObj.style.position!='absolute')&&(ddjsv_theObj.style.position!='fixed'))ddjsv_theObj.style.position='absolute';
if((ddjsv_theObj.style.top.indexOf('px')==-1)&&(ddjsv_theObj.style.top.indexOf('%')==-1))ddjsv_theObj.style.top='0px';
if((ddjsv_theObj.style.left.indexOf('px')==-1)&&(ddjsv_theObj.style.left.indexOf('%')==-1))ddjsv_theObj.style.left='0px';
ddjsv_movingobjJSON[ddjsv_obj]={down:false,t:0,x:0,y:0};
var ddjsv_s1='';var ddjsv_s2='';var ddjsv_s3='';
if(ddjs_getObjPositionWay(ddjsv_obj)=='%'){
if(ddjs_checkBrowserTouchSupported()==true){
ddjsv_s1="ddjsv_movingobjJSON['"+ddjsv_obj+"']['t']=event.touches[event.touches.length-1];ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']=true;ddjsv_movingobjJSON['"+ddjsv_obj+"']['x']=ddjs_getCursorPercent(event,'"+ddjsv_inObj+"',ddjsv_movingobjJSON['"+ddjsv_obj+"']['t']).x-parseInt(ddjs_findObject('"+ddjsv_obj+"').style.left);ddjsv_movingobjJSON['"+ddjsv_obj+"']['y']=ddjs_getCursorPercent(event,'"+ddjsv_inObj+"',ddjsv_movingobjJSON['"+ddjsv_obj+"']['t']).y-parseInt(ddjs_findObject('"+ddjsv_obj+"').style.top);";
ddjsv_s2="if(ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']){ddjs_findObject('"+ddjsv_obj+"').style.left=ddjs_getCursorPercent(event,'"+ddjsv_inObj+"',ddjsv_movingobjJSON['"+ddjsv_obj+"']['t']).x-ddjsv_movingobjJSON['"+ddjsv_obj+"']['x']+'%';ddjs_findObject('"+ddjsv_obj+"').style.top=ddjs_getCursorPercent(event,'"+ddjsv_inObj+"',ddjsv_movingobjJSON['"+ddjsv_obj+"']['t']).y-ddjsv_movingobjJSON['"+ddjsv_obj+"']['y']+'%';}";
ddjsv_s3="ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']=false;";
}else{
ddjsv_s1="ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']=true;ddjsv_movingobjJSON['"+ddjsv_obj+"']['x']=ddjs_getCursorPercent(event,'"+ddjsv_inObj+"',null).x-parseInt(ddjs_findObject('"+ddjsv_obj+"').style.left);ddjsv_movingobjJSON['"+ddjsv_obj+"']['y']=ddjs_getCursorPercent(event,'"+ddjsv_inObj+"',null).y-parseInt(ddjs_findObject('"+ddjsv_obj+"').style.top);";
ddjsv_s2="if(ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']){ddjs_findObject('"+ddjsv_obj+"').style.left=ddjs_getCursorPercent(event,'"+ddjsv_inObj+"',null).x-ddjsv_movingobjJSON['"+ddjsv_obj+"']['x']+'%';ddjs_findObject('"+ddjsv_obj+"').style.top=ddjs_getCursorPercent(event,'"+ddjsv_inObj+"',null).y-ddjsv_movingobjJSON['"+ddjsv_obj+"']['y']+'%';}";
ddjsv_s3="ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']=false;";
}
}else{
if(ddjs_checkBrowserTouchSupported()==false){
ddjsv_s1="ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']=true;ddjsv_movingobjJSON['"+ddjsv_obj+"']['x']=event.pageX-parseInt(ddjs_findObject('"+ddjsv_obj+"').style.left);ddjsv_movingobjJSON['"+ddjsv_obj+"']['y']=event.pageY-parseInt(ddjs_findObject('"+ddjsv_obj+"').style.top);";
ddjsv_s2="if(ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']){ddjs_findObject('"+ddjsv_obj+"').style.left=event.pageX-ddjsv_movingobjJSON['"+ddjsv_obj+"']['x']+'px';ddjs_findObject('"+ddjsv_obj+"').style.top=event.pageY-ddjsv_movingobjJSON['"+ddjsv_obj+"']['y']+'px';}";
ddjsv_s3="ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']=false;";
}else{
ddjsv_s1="ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']=true;ddjsv_movingobjJSON['"+ddjsv_obj+"']['t']=event.touches[event.touches.length-1];ddjsv_movingobjJSON['"+ddjsv_obj+"']['x']=ddjsv_movingobjJSON['"+ddjsv_obj+"']['t'].pageX-parseInt(ddjs_findObject('"+ddjsv_obj+"').style.left);ddjsv_movingobjJSON['"+ddjsv_obj+"']['y']=ddjsv_movingobjJSON['"+ddjsv_obj+"']['t'].pageY-parseInt(ddjs_findObject('"+ddjsv_obj+"').style.top);";
ddjsv_s2="if(ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']){ddjs_findObject('"+ddjsv_obj+"').style.left=ddjsv_movingobjJSON['"+ddjsv_obj+"']['t'].pageX-ddjsv_movingobjJSON['"+ddjsv_obj+"']['x']+'px';ddjs_findObject('"+ddjsv_obj+"').style.top=ddjsv_movingobjJSON['"+ddjsv_obj+"']['t'].pageY-ddjsv_movingobjJSON['"+ddjsv_obj+"']['y']+'px';}";
ddjsv_s3="ddjsv_movingobjJSON['"+ddjsv_obj+"']['down']=false;";
}
}

if((ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['down'])!=null)&&(ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['down']).indexOf(ddjsv_s1)!=-1))ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['down'],ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['down'])+ddjsv_s1);
else ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['down'],ddjsv_s1);
if((document.body.getAttribute(ddjs_getMouseEvent()['move'])!=null))document.body.setAttribute(ddjs_getMouseEvent()['move'],document.body.getAttribute(ddjs_getMouseEvent()['move'])+ddjsv_s2);
else document.body.setAttribute(ddjs_getMouseEvent()['move'],ddjsv_s2);
if((ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['up'])!=null)&&(ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['up']).indexOf(ddjsv_s3)!=-1))ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['up'],ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['up'])+ddjsv_s3);
else ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['up'],ddjsv_s3);
}else{return false;}
}

function ddjs_setMover(ddjsv_obj,ddjsv_f_over){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['over'],ddjsv_f_over);
}else{return false;}
}

function ddjs_setMout(ddjsv_obj,ddjsv_f_out){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['out'],ddjsv_f_out);
}else{return false;}
}

function ddjs_setClick(ddjsv_obj,ddjsv_f_click,ddjsv_plus){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjsv_plus==true){
if(ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['click'])!=null)ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['click'],ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['click'])+ddjsv_f_click);
else ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['click'],ddjsv_f_click);
}else{
ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['click'],ddjsv_f_click);
}
}else{return false;}
}

function ddjs_setHover(ddjsv_obj,ddjsv_f_over,ddjsv_f_out,ddjsv_plus){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjsv_plus==true){
if(ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['over'])!=null)ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['over'],ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['over'])+ddjsv_f_over);
else ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['over'],ddjsv_f_over);
if(ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['out'])!=null)ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['out'],ddjsv_theObj.getAttribute(ddjs_getMouseEvent()['out'])+ddjsv_f_out);
else ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['out'],ddjsv_f_out);
}else{
ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['over'],ddjsv_f_over);
ddjsv_theObj.setAttribute(ddjs_getMouseEvent()['out'],ddjsv_f_out);
}
}else{return false;}
}

function ddjs_setObjRadius(ddjsv_obj,ddjsv_radius){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null && ddjsv_radius!=null){
if(((typeof ddjsv_radius)=='object')&&(ddjsv_radius.constructor===Array)){
switch(ddjsv_radius.length){
case 1:
ddjsv_theObj.style.borderTopLeftRadius=ddjsv_radius[0]+'px';
ddjsv_theObj.style.borderTopRightRadius=ddjsv_radius[0]+'px';
ddjsv_theObj.style.borderBottomLeftRadius=ddjsv_radius[0]+'px';
ddjsv_theObj.style.borderBottomRightRadius=ddjsv_radius[0]+'px';
break;
case 2:
ddjsv_theObj.style.borderTopLeftRadius=ddjsv_radius[0]+'px';
ddjsv_theObj.style.borderTopRightRadius=ddjsv_radius[1]+'px';
break;
case 3:
ddjsv_theObj.style.borderTopLeftRadius=ddjsv_radius[0]+'px';
ddjsv_theObj.style.borderTopRightRadius=ddjsv_radius[1]+'px';
ddjsv_theObj.style.borderBottomLeftRadius=ddjsv_radius[2]+'px';
break;
case 4:
ddjsv_theObj.style.borderTopLeftRadius=ddjsv_radius[0]+'px';
ddjsv_theObj.style.borderTopRightRadius=ddjsv_radius[1]+'px';
ddjsv_theObj.style.borderBottomLeftRadius=ddjsv_radius[2]+'px';
ddjsv_theObj.style.borderBottomRightRadius=ddjsv_radius[2]+'px';
break;
}
}else{
ddjsv_theObj.style.borderTopLeftRadius=ddjsv_radius+'px';
ddjsv_theObj.style.borderTopRightRadius=ddjsv_radius+'px';
ddjsv_theObj.style.borderBottomLeftRadius=ddjsv_radius+'px';
ddjsv_theObj.style.borderBottomRightRadius=ddjsv_radius+'px';
}
}else{return false;}
}

ddjsv_objectSizePX=[];
function ddjs_setObjSizeWay(ddjsv_obj,ddjsv_sizeWay){
if(ddjsv_sizeWay=='px')ddjsv_objectSizePX.push(ddjsv_obj);
}

function ddjs_setObjSizePX(ddjsv_obj){
ddjs_setObjSizeWay(ddjsv_obj,'px');
}

function ddjs_setObjSizePXWithArray(ddjsv_obj){
for(var ddjsv_i in ddjsv_obj)ddjs_setObjSizePX(ddjsv_obj[ddjsv_i]);
}

function ddjs_setObjSizePercent(ddjsv_obj){
ddjs_setObjSizeWay(ddjsv_obj,'%');
}

function ddjs_setObjSizePercentWithArray(ddjsv_obj){
for(var ddjsv_i in ddjsv_obj)ddjs_setObjSizePercent(ddjsv_obj[ddjsv_i]);
}

function ddjs_getObjSizeWay(ddjsv_obj){
for(var ddjsv_i in ddjsv_objectSizePX){
if(ddjsv_objectSizePX[ddjsv_i]==ddjsv_obj)return 'px';
}
return '%';
}

ddjsv_objectPositionFAPX=[];
function ddjs_setObjPositionWay(ddjsv_obj,ddjsv_positionWay){
if(ddjsv_positionWay=='px')ddjsv_objectPositionFAPX.push(ddjsv_obj);
}

function ddjs_setObjPositionPX(ddjsv_obj){
ddjs_setObjPositionWay(ddjsv_obj,'px');
}

function ddjs_setObjPositionPXWithArray(ddjsv_obj){
for(var ddjsv_i in ddjsv_obj)ddjs_setObjPositionPX(ddjsv_obj[ddjsv_i]);
}

function ddjs_setObjPositionPercent(ddjsv_obj){
ddjs_setObjPositionWay(ddjsv_obj,'%');
}

function ddjs_setObjPositionPercentWithArray(ddjsv_obj){
for(var ddjsv_i in ddjsv_obj)ddjs_setObjPositionPercent(ddjsv_obj[ddjsv_i]);
}

function ddjs_getObjPositionWay(ddjsv_obj){
for(var ddjsv_i in ddjsv_objectPositionFAPX){
if(ddjsv_objectPositionFAPX[ddjsv_i]==ddjsv_obj)return 'px';
}
return '%';
}

ddjsv_objectPositionFA={};
function ddjs_setObjPositionFA(ddjsv_obj,ddjsv_position){
if((ddjsv_position=='fixed')||(ddjsv_position==false)){
ddjs_findObject(ddjsv_obj).style.position='fixed';
ddjsv_objectPositionFA[ddjsv_obj]=ddjsv_position;
}else{
ddjs_findObject(ddjsv_obj).style.position='absolute';
ddjsv_objectPositionFA[ddjsv_obj]=ddjsv_position;
}
}

function ddjs_setObjPositionWithValue(ddjsv_obj){
if(!ddjsv_objectPositionFA[ddjsv_obj])ddjsv_objectPositionFA[ddjsv_obj]='absolute';
ddjs_findObject(ddjsv_obj).style.position=ddjsv_objectPositionFA[ddjsv_obj];
}

function ddjs_setObjSizeEqualToAnotherWithCSS(ddjsv_obj,ddjsv_b){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
var ddjsv_theB=ddjs_findObject(ddjsv_b);
if((ddjsv_theObj!=null)&&(ddjsv_theB!=null)){
if(ddjsv_theB.style.width)ddjsv_theObj.style.width=parseInt(ddjsv_theB.style.width);
if(ddjsv_theB.style.height)ddjsv_theObj.style.height=parseInt(ddjsv_theB.style.height);
else{
ddjsv_theObj.style.width=ddjsv_theB.width;
ddjsv_theObj.style.height=ddjsv_theB.height;
}
}else{return false;}
}

function ddjs_setObjSize(ddjsv_obj,ddjsv_withCSS,ddjsv_w,ddjsv_h){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjsv_withCSS==true){
if((ddjsv_w!=null)&&(ddjsv_w!=''))ddjsv_theObj.style.width=ddjsv_w+ddjs_getObjSizeWay(ddjsv_obj);
if((ddjsv_h!=null)&&(ddjsv_h!=''))ddjsv_theObj.style.height=ddjsv_h+ddjs_getObjSizeWay(ddjsv_obj);
}else{
if((ddjsv_w!=null)&&(ddjsv_w!=''))ddjsv_theObj.width=ddjsv_w;
if((ddjsv_h!=null)&&(ddjsv_h!=''))ddjsv_theObj.height=ddjsv_h;
}
}else{return false;}
}

function ddjs_setObjWidth(ddjsv_obj,ddjsv_w){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null)ddjsv_theObj.style.width=ddjsv_w+ddjs_getObjSizeWay(ddjsv_obj);
else{return false;}
}

function ddjs_setObjHeight(ddjsv_obj,ddjsv_h){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null)ddjsv_theObj.style.height=ddjsv_h+ddjs_getObjSizeWay(ddjsv_obj);
else{return false;}
}

function ddjs_setObjCenterX(ddjsv_obj,ddjsv_w,ddjsv_withCSS){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjs_getObjPositionWay(ddjsv_obj)=='%' && ddjsv_withCSS==true)ddjsv_w=100;
ddjs_setObjPositionWithValue(ddjsv_obj);
if(ddjsv_withCSS)ddjsv_theObj.style.left=((ddjsv_w/2)-(parseInt(ddjsv_theObj.style.width)/2))+ddjs_getObjPositionWay(ddjsv_obj);
else ddjsv_theObj.style.left=((ddjsv_w/2)-(ddjsv_theObj.width/2))+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_setObjCenterXPlusValue(ddjsv_obj,ddjsv_w,ddjsv_withCSS,ddjsv_addValue){
ddjs_setObjCenterX(ddjsv_obj,ddjsv_w,ddjsv_withCSS);
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.left=(parseInt(ddjsv_theObj.style.left)+ddjsv_addValue)+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_setObjCenterY(ddjsv_obj,ddjsv_h,ddjsv_withCSS){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjs_getObjPositionWay(ddjsv_obj)=='%' && ddjsv_withCSS==true)ddjsv_h=100;
ddjs_setObjPositionWithValue(ddjsv_obj);
if(ddjsv_withCSS)ddjsv_theObj.style.top=((ddjsv_h/2)-(parseInt(ddjsv_theObj.style.height)/2))+ddjs_getObjPositionWay(ddjsv_obj);
else ddjsv_theObj.style.top=((ddjsv_h/2)-(ddjsv_theObj.height/2))+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_setObjCenterYPlusValue(ddjsv_obj,ddjsv_h,ddjsv_withCSS,ddjsv_addValue){
ddjs_setObjCenterY(ddjsv_obj,ddjsv_h,ddjsv_withCSS);
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.top=(parseInt(ddjsv_theObj.style.top)+ddjsv_addValue)+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_setObjCenterXY(ddjsv_obj,ddjsv_w,ddjsv_h,ddjsv_withCSS){
ddjs_setObjCenterX(ddjsv_obj,ddjsv_w,ddjsv_withCSS);
ddjs_setObjCenterY(ddjsv_obj,ddjsv_h,ddjsv_withCSS);
}

function ddjs_setObjYAddValue(ddjsv_obj,ddjsv_v){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjsv_theObj.style.top)ddjsv_theObj.style.top=(parseInt(ddjsv_theObj.style.top)+ddjsv_v)+ddjs_getObjPositionWay(ddjsv_obj);
else ddjsv_theObj.style.top=(0+ddjsv_v)+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_placeObjTopCenterAddValue(ddjsv_obj,ddjsv_decreaseTopValue,ddjsv_placeW,ddjsv_xAdd){
ddjs_placeObjTopLeft(ddjsv_obj,ddjsv_decreaseTopValue,0);
ddjs_setObjCenterXPlusValue(ddjsv_obj,ddjsv_placeW,true,ddjsv_xAdd);
}

function ddjs_placeObjTopLeft(ddjsv_obj,ddjsv_decreaseTopValue,ddjsv_decreaseLeftValue){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
var ddjsv_dt=0;
var ddjsv_dl=0;
if((ddjsv_decreaseTopValue==0)||(ddjsv_decreaseTopValue==null))ddjsv_dt=0;
else ddjsv_dt=ddjsv_decreaseTopValue;
if((ddjsv_decreaseLeftValue==0)||(ddjsv_decreaseLeftValue==null))ddjsv_dl=0;
else ddjsv_dl=ddjsv_decreaseLeftValue;
ddjs_setObjPositionWithValue(ddjsv_obj);
ddjsv_theObj.style.top=(0+ddjsv_dt)+ddjs_getObjPositionWay(ddjsv_obj);
ddjsv_theObj.style.left=(0+ddjsv_dl)+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_placeObjTopRight(ddjsv_obj,ddjsv_decreaseTopValue,ddjsv_decreaseRightValue){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
var ddjsv_dt=0;
var ddjsv_dr=0;
if((ddjsv_decreaseTopValue==0)||(ddjsv_decreaseTopValue==null))ddjsv_dt=0;
else ddjsv_dt=ddjsv_decreaseTopValue;
if((ddjsv_decreaseRightValue==0)||(ddjsv_decreaseRightValue==null))ddjsv_dr=0;
else ddjsv_dr=ddjsv_decreaseRightValue;
ddjs_setObjPositionWithValue(ddjsv_obj);
ddjsv_theObj.style.top=(0+ddjsv_dt)+ddjs_getObjPositionWay(ddjsv_obj);
ddjsv_theObj.style.right=(0+ddjsv_dr)+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_placeObjBottomCenterAddValue(ddjsv_obj,ddjsv_decreaseBottomValue,ddjsv_placeW,ddjsv_xAdd){
ddjs_placeObjBottomLeft(ddjsv_obj,ddjsv_decreaseBottomValue,0);
ddjs_setObjCenterXPlusValue(ddjsv_obj,ddjsv_placeW,true,ddjsv_xAdd);
}

function ddjs_placeObjBottomLeft(ddjsv_obj,ddjsv_decreaseBottomValue,ddjsv_decreaseLeftValue){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
var ddjsv_db=0;
var ddjsv_dl=0;
if((ddjsv_decreaseBottomValue==0)||(ddjsv_decreaseBottomValue==null))ddjsv_db=0;
else ddjsv_db=ddjsv_decreaseBottomValue;
if((ddjsv_decreaseLeftValue==0)||(ddjsv_decreaseLeftValue==null))ddjsv_dl=0;
else ddjsv_dl=ddjsv_decreaseLeftValue;
ddjs_setObjPositionWithValue(ddjsv_obj);
ddjsv_theObj.style.bottom=(0+ddjsv_db)+ddjs_getObjPositionWay(ddjsv_obj);
ddjsv_theObj.style.left=(0+ddjsv_dl)+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_placeObjBottomRight(ddjsv_obj,ddjsv_decreaseBottomValue,ddjsv_decreaseRightValue){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
var ddjsv_db=0;
var ddjsv_dr=0;
if((ddjsv_decreaseBottomValue==0)||(ddjsv_decreaseBottomValue==null))ddjsv_db=0;
else ddjsv_db=ddjsv_decreaseBottomValue;
if((ddjsv_decreaseRightValue==0)||(ddjsv_decreaseRightValue==null))ddjsv_dr=0;
else ddjsv_dr=ddjsv_decreaseRightValue;
ddjs_setObjPositionWithValue(ddjsv_obj);
ddjsv_theObj.style.bottom=(0+ddjsv_db)+ddjs_getObjPositionWay(ddjsv_obj);
ddjsv_theObj.style.right=(0+ddjsv_dr)+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_setObjPosition(ddjsv_obj,ddjsv_isTopLeft,ddjsv_x,ddjsv_y){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_setObjPositionWithValue(ddjsv_obj);
if(ddjsv_isTopLeft){
ddjsv_theObj.style.left=ddjsv_x+ddjs_getObjPositionWay(ddjsv_obj);
ddjsv_theObj.style.top=ddjsv_y+ddjs_getObjPositionWay(ddjsv_obj);
}else{
ddjsv_theObj.style.right=ddjsv_x+ddjs_getObjPositionWay(ddjsv_obj);
ddjsv_theObj.style.bottom=ddjsv_y+ddjs_getObjPositionWay(ddjsv_obj);
}
}else{return false;}
}

function ddjs_setObjFrame(ddjsv_obj,ddjsv_x,ddjsv_y,ddjsv_w,ddjsv_h){
ddjs_setObjSize(ddjsv_obj,true,ddjsv_w,ddjsv_h);
ddjs_setObjPosition(ddjsv_obj,true,ddjsv_x,ddjsv_y);
}

function ddjs_setObjFrameWithCenterAdd(ddjsv_obj,ddjsv_placeW,ddjsv_xAdd,ddjsv_y,ddjsv_w,ddjsv_h){
ddjs_setObjSize(ddjsv_obj,true,ddjsv_w,ddjsv_h);
ddjs_findObject(ddjsv_obj).style.top=ddjsv_y+ddjs_getObjPositionWay(ddjsv_obj);
ddjs_setObjCenterXPlusValue(ddjsv_obj,ddjsv_placeW,true,ddjsv_xAdd);
}

function ddjs_setXUnderObj(ddjsv_obj,ddjsv_leftObj,ddjsv_addValue){
var ddjsv_theAObj=ddjs_findObject(ddjsv_obj);
var ddjsv_theBObj=ddjs_findObject(ddjsv_leftObj);
if((ddjsv_theAObj!=null)&&(ddjsv_theBObj!=null)){
if(ddjs_getObjPositionWay(ddjsv_obj)!='%'){
ddjs_setObjPositionWithValue(ddjsv_obj);
if((ddjsv_addValue==0)||(ddjsv_addValue==null))ddjsv_theAObj.style.left=parseInt(ddjsv_theBObj.style.width)+'px';
else ddjsv_theAObj.style.left=(parseInt(ddjsv_theBObj.style.width)+ddjsv_addValue)+'px';
}else{
if((ddjsv_addValue==0)||(ddjsv_addValue==null))ddjsv_theAObj.style.left=(parseInt(ddjsv_theBObj.style.left)+parseInt(ddjsv_theBObj.style.width))+ddjs_getObjPositionWay(ddjsv_obj);
else ddjsv_theAObj.style.left=(parseInt(ddjsv_theBObj.style.left)+parseInt(ddjsv_theBObj.style.width)+ddjsv_addValue)+ddjs_getObjPositionWay(ddjsv_obj);
}
}else{return false;}
}

function ddjs_setYUnderObj(ddjsv_obj,ddjsv_topObj,ddjsv_addValue){
var ddjsv_theAObj=ddjs_findObject(ddjsv_obj);
var ddjsv_theBObj=ddjs_findObject(ddjsv_topObj);
if((ddjsv_theAObj!=null)&&(ddjsv_theBObj!=null)){
if(ddjs_getObjPositionWay(ddjsv_obj)!='%'){
ddjs_setObjPositionWithValue(ddjsv_obj);
if((ddjsv_addValue==0)||(ddjsv_addValue==null))ddjsv_theAObj.style.top=(parseInt(ddjsv_theBObj.style.height)+parseInt(ddjsv_theBObj.style.top))+'px';
else ddjsv_theAObj.style.top=((parseInt(ddjsv_theBObj.style.height)+parseInt(ddjsv_theBObj.style.top))+ddjsv_addValue)+'px';
}else{
if((ddjsv_addValue==0)||(ddjsv_addValue==null))ddjsv_theAObj.style.top=(parseInt(ddjsv_theBObj.style.top)+parseInt(ddjsv_theBObj.style.height))+ddjs_getObjPositionWay(ddjsv_obj);
else ddjsv_theAObj.style.top=(parseInt(ddjsv_theBObj.style.top)+parseInt(ddjsv_theBObj.style.height)+ddjsv_addValue)+ddjs_getObjPositionWay(ddjsv_obj);
}
}else{return false;}
}

function ddjs_setObjX(ddjsv_obj,ddjsv_X,ddjsv_isLeft){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_setObjPositionWithValue(ddjsv_obj);
if((ddjsv_isLeft==false)&&(ddjsv_isLeft!=null))ddjsv_theObj.style.right=ddjsv_X+ddjs_getObjPositionWay(ddjsv_obj);
else ddjsv_theObj.style.left=ddjsv_X+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_setObjY(ddjsv_obj,ddjsv_Y,ddjsv_isTop){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_setObjPositionWithValue(ddjsv_obj);
if((ddjsv_isTop==false)&&(ddjsv_isTop!=null))ddjsv_theObj.style.bottom=ddjsv_Y+ddjs_getObjPositionWay(ddjsv_obj);
else ddjsv_theObj.style.top=ddjsv_Y+ddjs_getObjPositionWay(ddjsv_obj);
}else{return false;}
}

function ddjs_setScrollEventKernal(ddjsv_SObj,ddjsv_s){
var ddjsv_theSObj=document.body;
if((ddjsv_SObj!='document.body')&&(ddjsv_SObj!=document.body))ddjsv_theSObj=ddjs_findObject(ddjsv_SObj);
if(ddjsv_theSObj.getAttribute('onScroll')!=null)ddjsv_theSObj.setAttribute('onScroll',ddjsv_theSObj.getAttribute('onScroll')+ddjsv_s);
else ddjsv_theSObj.setAttribute('onScroll',ddjsv_s);
}

function ddjs_setObjPositionRelativedToScrollY(ddjsv_obj,ddjsv_SObj,ddjsv_isTop){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_setObjPositionWithValue(ddjsv_obj);
var ddjsv_oTop=0;
if(ddjsv_theObj.style.top)ddjsv_oTop=parseInt(ddjsv_theObj.style.top);
if(ddjsv_theObj.style.bottom)ddjsv_oTop=parseInt(ddjsv_theObj.style.bottom);
if(ddjsv_isTop==true)ddjsv_isTop='top';
else ddjsv_isTop='bottom';
var ddjsv_s="ddjs_findObject('"+ddjsv_obj+"').style."+ddjsv_isTop+"=("+ddjsv_oTop+"+parseInt("+ddjsv_SObj+".scrollTop))+'px';";
ddjs_setScrollEventKernal(ddjsv_SObj,ddjsv_s);
}else{return false;}
}

function ddjs_setObjPositionRelativedToScrollX(ddjsv_obj,ddjsv_SObj,ddjsv_isLeft){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_setObjPositionWithValue(ddjsv_obj);
var ddjsv_oLeft=0;
if(ddjsv_theObj.style.left)ddjsv_oLeft=parseInt(ddjsv_theObj.style.left);
if(ddjsv_theObj.style.right)ddjsv_oLeft=parseInt(ddjsv_theObj.style.right);
if(ddjsv_isLeft==true)ddjsv_isLeft='left';
else ddjsv_isLeft='right';
var ddjsv_s="ddjs_findObject('"+ddjsv_obj+"').style."+ddjsv_isLeft+"=("+ddjsv_oLeft+"+parseInt("+ddjsv_SObj+".scrollLeft))+'px';";
ddjs_setScrollEventKernal(ddjsv_SObj,ddjsv_s);
}else{return false;}
}


ddjsv_wScrollTimer={wScrollTopTimer:null,wScrollLeftTimer:null,wScrollSpeed:10,wScrollWay:'down'};
function ddjs_setMEventScrollObj(ddjsv_obj,ddjsv_way,ddjsv_speedLevel,ddjsv_targetObj){
if(ddjsv_speedLevel=='high')ddjsv_wScrollTimer.wScrollSpeed=5;
else if(ddjsv_speedLevel=='middjsle')ddjsv_wScrollTimer.wScrollSpeed=10;
else if(ddjsv_speedLevel=='low')ddjsv_wScrollTimer.wScrollSpeed=15;
else {try{ddjsv_wScrollTimer.wScrollSpeed=parseInt(ddjsv_speedLevel)}catch(e){}}
ddjs_setHover(ddjsv_obj,'ddjsv_wScrollTimer.wScrollWay=\''+ddjsv_way+'\';ddjs_scrollStart(\''+ddjsv_targetObj+'\');','ddjs_scrollStop();',true);
}

function ddjs_setMEventScrollWindow(ddjsv_obj,ddjsv_way,ddjsv_speedLevel){
setMEventScrollObj(ddjsv_obj,ddjsv_way,ddjsv_speedLevel,'window')
}

function ddjs_scrollStart(ddjsv_obj){
ddjsv_wScrollTimer.wScrollTopTimer=setInterval('ddjs_scrolling(\''+ddjsv_obj+'\')',ddjsv_wScrollTimer.wScrollSpeed);
}
function ddjs_scrolling(ddjsv_obj){
var ddjsv_theObj=null;
if(ddjsv_obj=='window')ddjsv_theObj=window;
else ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjsv_theObj==window){
if(ddjsv_wScrollTimer.wScrollWay=='up')ddjsv_theObj.scrollBy(0,-1);
else if(ddjsv_wScrollTimer.wScrollWay=='down')ddjsv_theObj.scrollBy(0,1);
else if(ddjsv_wScrollTimer.wScrollWay=='left')ddjsv_theObj.scrollBy(-1,0);
else if(ddjsv_wScrollTimer.wScrollWay=='right')ddjsv_theObj.scrollBy(1,0);
}else{
if(ddjsv_wScrollTimer.wScrollWay=='up')ddjsv_theObj.scrollTop=parseInt(ddjsv_theObj.scrollTop)-1;
else if(ddjsv_wScrollTimer.wScrollWay=='down')ddjsv_theObj.scrollTop=parseInt(ddjsv_theObj.scrollTop)+1;
else if(ddjsv_wScrollTimer.wScrollWay=='left')ddjsv_theObj.scrollLeft=parseInt(ddjsv_theObj.scrollLeft)-1;
else if(ddjsv_wScrollTimer.wScrollWay=='right')ddjsv_theObj.scrollLeft=parseInt(ddjsv_theObj.scrollLeft)+1;
}
}else{return false;}
}
function ddjs_scrollStop(){
clearInterval(ddjsv_wScrollTimer.wScrollTopTimer);
}

ddjsv_objNeedHide={};
function ddjs_setObjectHiddjsenWhenScrollTo(ddjsv_SObj,ddjsv_SPx,ddjsv_obj,ddjsv_delayHide){
ddjsv_objNeedHide[ddjsv_obj]=false;
var ddjsv_s="if("+ddjsv_SObj+".scrollTop>="+ddjsv_SPx+"){ddjsv_objNeedHide["+ddjsv_obj+"]=true;setTimeout(\"if(ddjsv_objNeedHide["+ddjsv_obj+"]==true){ddjs_findObject('"+ddjsv_obj+"').style.display='none';}\","+(ddjsv_delayHide+1)+")}if("+ddjsv_SObj+".scrollTop<="+ddjsv_SPx+"){ddjsv_objNeedHide["+ddjsv_obj+"]=false;ddjs_findObject('"+ddjsv_obj+"').style.display='';}";
ddjs_setScrollEventKernal(ddjsv_SObj,ddjsv_s);
}

function ddjs_doWhenScrolledLargerThan(ddjsv_SObj,ddjsv_SPx,ddjsv_deviation,ddjsv_event){
var ddjsv_s="if(("+ddjsv_SObj+".scrollTop>="+ddjsv_SPx+")&&("+ddjsv_SObj+".scrollTop<"+(ddjsv_deviation+ddjsv_SPx)+")){"+ddjsv_event+"}";
if((ddjsv_deviation==0)||((ddjsv_deviation==false)))ddjsv_s="if("+ddjsv_SObj+".scrollTop>="+ddjsv_SPx+"){"+ddjsv_event+"}";
ddjs_setScrollEventKernal(ddjsv_SObj,ddjsv_s);
}

function ddjs_doWhenScrolledLessThan(ddjsv_SObj,ddjsv_SPx,ddjsv_deviation,ddjsv_event){
var ddjsv_s="if(("+ddjsv_SObj+".scrollTop<"+ddjsv_SPx+")&&("+ddjsv_SObj+".scrollTop>="+(ddjsv_deviation+ddjsv_SPx)+")){"+ddjsv_event+"}";
if((ddjsv_deviation==0)||((ddjsv_deviation==false)))ddjsv_s="if("+ddjsv_SObj+".scrollTop>="+ddjsv_SPx+"){"+ddjsv_event+"}";
ddjs_setScrollEventKernal(ddjsv_SObj,ddjsv_s);
}

function ddjs_setObjectMoveWithScrollTop(ddjsv_obj,ddjsv_SObj,ddjsv_top,ddjsv_isTop){
var ddjsv_s="ddjs_findObject('"+ddjsv_obj+"').style.top="+ddjsv_SObj+".scrollTop+"+ddjsv_top+";";
if(ddjsv_isTop==false)ddjsv_s="ddjs_findObject('"+ddjsv_obj+"').style.bottom="+ddjsv_top+"-"+ddjsv_SObj+".scrollTop;";
ddjs_setScrollEventKernal(ddjsv_SObj,ddjsv_s);
}

ddjsv_checkScrollValues={theSY:0,scrolled:0,scrollHistory:[]};
function ddjs_checkIsScrollWithDirection(ddjsv_SObj,ddjsv_checkSValue,ddjsv_downFunction,ddjsv_upFunction,ddjsv_topestFunction){
ddjsv_checkScrollValues.scrolled++;
if(ddjsv_checkScrollValues.scrolled>=ddjsv_checkSValue){
var ddjsv_theSObj=null;
if(ddjsv_SObj=='document.body')ddjsv_theSObj=document.body;
else if(ddjsv_SObj=='window')ddjsv_theSObj=window;
else ddjsv_theSObj=ddjs_findObject(ddjsv_SObj);
if(parseInt(ddjsv_theSObj.scrollTop)>parseInt(ddjsv_checkScrollValues.theSY)&&ddjsv_theSObj.scrollTop>0){ddjsv_checkScrollValues.scrollHistory.push('down');ddjsv_downFunction();}
else if(parseInt(ddjsv_theSObj.scrollTop)<parseInt(ddjsv_checkScrollValues.theSY)){
if(ddjsv_theSObj.scrollTop>0){ddjsv_checkScrollValues.scrollHistory.push('up');ddjsv_upFunction();}
else ddjsv_topestFunction();
}
ddjsv_checkScrollValues.scrolled=0;
ddjsv_checkScrollValues.theSY=ddjsv_theSObj.scrollTop;
}
}

function ddjs_setCheckIsScrollWithDirection(ddjsv_SObj,ddjsv_checkSValue,ddjsv_downFunction,ddjsv_upFunction,ddjsv_topestFunction){
ddjs_setScrollEventKernal(ddjsv_SObj,'ddjs_checkIsScrollWithDirection(\''+ddjsv_SObj+'\','+ddjsv_checkSValue+','+ddjsv_downFunction+','+ddjsv_upFunction+','+ddjsv_topestFunction+');');
}

function ddjs_getScrollWithDirectionHistory(){
return ddjsv_checkScrollValues.scrollHistory;
}

function ddjs_getLastestScrolledDirectionHistory(){
return ddjsv_checkScrollValues.scrollHistory[ddjsv_checkScrollValues.scrollHistory.length-1];
}

var ddjsv_scrolledteData=[];
function ddjs_addScrolledToEvent(ddjsv_target,ddjsv_scrollTop,ddjsv_funA,ddjsv_funB){
var ddjsv_theFun=null;
var ddjsv_nowNum=ddjsv_scrolledteData.length;
var ddjsv_rtarget=ddjsv_target;
var tHeight=0;
if(ddjsv_target==window){
ddjsv_rtarget=document.body;
tHeight=window.innerHeight;
}else tHeight=ddjsv_target.style.height;
var ddjsv_theFun=function(){
if(ddjsv_rtarget.scrollTop>=parseInt(ddjsv_scrollTop)){
if(ddjsv_scrolledteData[ddjsv_nowNum][1]==false){
ddjsv_scrolledteData[ddjsv_nowNum][1]=true;
if(ddjsv_funA!=null && ddjsv_funA!='')ddjsv_funA();
}
}else{
if(ddjsv_scrolledteData[ddjsv_nowNum][1]==true){
ddjsv_scrolledteData[ddjsv_nowNum][1]=false;
if(ddjsv_funB!=null && ddjsv_funB!='')ddjsv_funB();
}
}
}
ddjsv_scrolledteData.push([ddjsv_nowNum,false,ddjsv_target,ddjsv_theFun]);
ddjsv_target.onscroll=function(){
for(var i=0; i<ddjsv_scrolledteData.length; i++){
if(ddjsv_target==ddjsv_scrolledteData[i][2])ddjsv_scrolledteData[i][3]();
}
}
}

function ddjs_initStateful(ddjsv_stateCount,ddjsv_needScroll,ddjsv_blockTime,ddjsv_theFunctionArray){
document.body.innerHTML='<div id="ddjso_statefulScv" style="position:absolute;top:0px;left:0px;width:1px;"></div>'+document.body.innerHTML;
ddjs_initStatefulWithScv('ddjso_statefulScv',ddjsv_stateCount,ddjsv_needScroll,ddjsv_blockTime,ddjsv_theFunctionArray);
}

function ddjs_initStatefulWithScv(ddjsv_scv,ddjsv_stateCount,ddjsv_needScroll,ddjsv_blockTime,ddjsv_theFunctionArray){
ddjsv_statefulData={lastScrollTop:0,changedState:true,inState:1,oldState:1,thCNum:ddjsv_needScroll,mustScroll:false};
setTimeout('ddjsv_statefulData.changedState=false;',ddjsv_blockTime);
var ddjsv_scv=ddjs_findObject(ddjsv_scv);
if(ddjsv_scv!=null){
ddjsv_scv.style.height=(ddjsv_statefulData.thCNum*(ddjsv_stateCount+2))+'px';
window.onscroll=function(){
for(var ddjsv_i=1;ddjsv_i<(1+ddjsv_stateCount);ddjsv_i++){
if(document.body.scrollTop>=ddjsv_statefulData.thCNum*(ddjsv_i-1) && document.body.scrollTop<ddjsv_statefulData.thCNum*ddjsv_i && ddjsv_statefulData.inState!=ddjsv_i){
if(ddjsv_statefulData.changedState==false)ddjs_toState(ddjsv_i);
else window.scrollTo(0,ddjsv_statefulData.lastScrollTop);
}
}
}
function ddjs_toState(ddjsv_s){
//ddjs_log('a'+ddjsv_s);
ddjsv_statefulData.changedState=true;
if(ddjsv_statefulData.mustScroll==false){
if(ddjsv_s>ddjsv_statefulData.inState && ddjsv_s-ddjsv_statefulData.inState>1)ddjsv_s=ddjsv_statefulData.inState+1;
else if(ddjsv_s<ddjsv_statefulData.inState && ddjsv_statefulData.inState-ddjsv_s>1)ddjsv_s=ddjsv_statefulData.inState-1;
}else ddjsv_statefulData.mustScroll=false;
//ddjs_log('b'+ddjsv_s);
ddjsv_theFunctionArray[ddjsv_s-1]();
ddjsv_statefulData.oldState=ddjsv_statefulData.inState;
ddjsv_statefulData.inState=ddjsv_s;
var ddjsv_tempA=0;
if(ddjsv_s==1){
ddjsv_tempA=0;
}else if(ddjsv_s==ddjsv_stateCount){
ddjsv_tempA=ddjsv_statefulData.thCNum*(ddjsv_stateCount+1);
}else{
if(ddjsv_statefulData.oldState<ddjsv_statefulData.inState){
ddjsv_tempA=ddjsv_statefulData.thCNum*(ddjsv_statefulData.inState-1);
}else{
ddjsv_tempA=ddjsv_statefulData.thCNum*(ddjsv_statefulData.inState)-2;
}
}
window.scrollTo(0,ddjsv_tempA);
ddjsv_statefulData.lastScrollTop=ddjsv_tempA;
if(ddjsv_s>ddjsv_statefulData.oldState)setTimeout('window.scrollTo(0,ddjsv_statefulData.lastScrollTop+2);ddjsv_statefulData.changedState=false;',ddjsv_blockTime);
else setTimeout('window.scrollTo(0,ddjsv_statefulData.lastScrollTop-2);ddjsv_statefulData.changedState=false;',ddjsv_blockTime);
}
}else{return null;}
}

function ddjs_manualToState(ddjsv_toState){
if(ddjsv_statefulData!=null){
ddjsv_statefulData.mustScroll=true;
window.scrollTo(0,((ddjsv_statefulData.thCNum)*(ddjsv_toState-1))+10);
}
}

function ddjs_getInState(){
if(ddjsv_statefulData!=null){
return ddjsv_statefulData.inState;
}else{return null;}
}

function ddjs_setObjectPerspective(ddjsv_obj,ddjsv_value){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.webkitPerspective=ddjsv_value+'px';
ddjsv_theObj.style.mozPerspective=ddjsv_value+'px';
ddjsv_theObj.style.msPerspective=ddjsv_value+'px';
ddjsv_theObj.style.oPerspective=ddjsv_value+'px';
ddjsv_theObj.style.perspective=ddjsv_value+'px';
}else{return false;}
}

function ddjs_setObjTransform(ddjsv_obj,ddjsv_s){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
try{
var ddjsv_webkit_nowTr=ddjsv_theObj.style.webkitTransform;
var ddjsv_webkit_inTr=ddjsv_s.substring(0,ddjsv_s.indexOf('('));
if(ddjsv_webkit_nowTr.indexOf(ddjsv_webkit_inTr)!=-1){
var ddjsv_webkit_matchedTr=ddjsv_webkit_nowTr.substring(ddjsv_webkit_nowTr.indexOf(ddjsv_webkit_inTr),1+ddjsv_webkit_nowTr.indexOf(')',ddjsv_webkit_nowTr.indexOf(ddjsv_webkit_inTr)));
var ddjsv_webkit_newTr=ddjsv_theObj.style.webkitTransform.split(ddjsv_webkit_matchedTr);
ddjsv_theObj.style.webkitTransform=ddjsv_webkit_newTr[0]+ddjsv_s+ddjsv_webkit_newTr[1];
}else{
ddjsv_theObj.style.webkitTransform=ddjsv_theObj.style.webkitTransform+ddjsv_s;
}
}catch(err){}
try{
var ddjsv_moz_nowTr=ddjsv_theObj.style.mozTransform;
var ddjsv_moz_inTr=ddjsv_s.substring(0,ddjsv_s.indexOf('('));
if(ddjsv_moz_nowTr.indexOf(ddjsv_moz_inTr)!=-1){
var ddjsv_moz_matchedTr=ddjsv_moz_nowTr.substring(ddjsv_moz_nowTr.indexOf(ddjsv_moz_inTr),1+ddjsv_moz_nowTr.indexOf(')',ddjsv_moz_nowTr.indexOf(ddjsv_moz_inTr)));
var ddjsv_moz_newTr=ddjsv_theObj.style.mozTransform.split(ddjsv_moz_matchedTr);
ddjsv_theObj.style.mozTransform=ddjsv_moz_newTr[0]+ddjsv_s+ddjsv_moz_newTr[1];
}else{
ddjsv_theObj.style.mozTransform=ddjsv_theObj.style.mozTransform+ddjsv_s;
}
}catch(err){}
try{
var ddjsv_ms_nowTr=ddjsv_theObj.style.msTransform;
var ddjsv_ms_inTr=ddjsv_s.substring(0,ddjsv_s.indexOf('('));
if(ddjsv_ms_nowTr.indexOf(ddjsv_ms_inTr)!=-1){
var ddjsv_ms_matchedTr=ddjsv_ms_nowTr.substring(ddjsv_ms_nowTr.indexOf(ddjsv_ms_inTr),1+ddjsv_ms_nowTr.indexOf(')',ddjsv_ms_nowTr.indexOf(ddjsv_ms_inTr)));
var ddjsv_ms_newTr=ddjsv_theObj.style.msTransform.split(ddjsv_ms_matchedTr);
ddjsv_theObj.style.msTransform=ddjsv_ms_newTr[0]+ddjsv_s+ddjsv_ms_newTr[1];
}else{
ddjsv_theObj.style.msTransform=ddjsv_theObj.style.msTransform+ddjsv_s;
}
}catch(err){}
try{
var ddjsv_o_nowTr=ddjsv_theObj.style.oTransform;
var ddjsv_o_inTr=ddjsv_s.substring(0,ddjsv_s.indexOf('('));
if(ddjsv_o_nowTr.indexOf(ddjsv_o_inTr)!=-1){
var ddjsv_o_matchedTr=ddjsv_o_nowTr.substring(ddjsv_o_nowTr.indexOf(ddjsv_o_inTr),1+ddjsv_o_nowTr.indexOf(')',ddjsv_o_nowTr.indexOf(ddjsv_o_inTr)));
var ddjsv_o_newTr=ddjsv_theObj.style.oTransform.split(ddjsv_o_matchedTr);
ddjsv_theObj.style.oTransform=ddjsv_o_newTr[0]+ddjsv_s+ddjsv_o_newTr[1];
}else{
ddjsv_theObj.style.oTransform=ddjsv_theObj.style.oTransform+ddjsv_s;
}
}catch(err){}
try{
var ddjsv__nowTr=ddjsv_theObj.style.transform;
var ddjsv__inTr=ddjsv_s.substring(0,ddjsv_s.indexOf('('));
if(ddjsv__nowTr.indexOf(ddjsv__inTr)!=-1){
var ddjsv__matchedTr=ddjsv__nowTr.substring(ddjsv__nowTr.indexOf(ddjsv__inTr),1+ddjsv__nowTr.indexOf(')',ddjsv__nowTr.indexOf(ddjsv__inTr)));
var ddjsv__newTr=ddjsv_theObj.style.transform.split(ddjsv__matchedTr);
ddjsv_theObj.style.transform=ddjsv__newTr[0]+ddjsv_s+ddjsv__newTr[1];
}else{
ddjsv_theObj.style.transform=ddjsv_theObj.style.transform+ddjsv_s;
}
}catch(err){}
}else{return false;}
}

function ddjs_scaleObj(ddjsv_obj,ddjsv_scaleNum){
var ddjsv_s='scale('+ddjsv_scaleNum+')';
ddjs_setObjTransform(ddjsv_obj,ddjsv_s);
}

function ddjs_scaleXObj(ddjsv_obj,ddjsv_scaleNum){
var ddjsv_s='scaleX('+ddjsv_scaleNum+')';
ddjs_setObjTransform(ddjsv_obj,ddjsv_s);
}

function ddjs_scaleYObj(ddjsv_obj,ddjsv_scaleNum){
var ddjsv_s='scaleY('+ddjsv_scaleNum+')';
ddjs_setObjTransform(ddjsv_obj,ddjsv_s);
}

function ddjs_rotateObj(ddjsv_obj,ddjsv_rotateAngle){
var ddjsv_s='rotate('+ddjsv_rotateAngle+'deg)';
ddjs_setObjTransform(ddjsv_obj,ddjsv_s);
}

function ddjs_rotateXObj(ddjsv_obj,ddjsv_rotateAngle){
var ddjsv_s='rotateX('+ddjsv_rotateAngle+'deg)';
ddjs_setObjTransform(ddjsv_obj,ddjsv_s);
}

function ddjs_rotateYObj(ddjsv_obj,ddjsv_rotateAngle){
var ddjsv_s='rotateY('+ddjsv_rotateAngle+'deg)';
ddjs_setObjTransform(ddjsv_obj,ddjsv_s);
}

function ddjs_skewObj(ddjsv_obj,ddjsv_xAngle,ddjsv_yAngle){
var ddjsv_s='skew('+ddjsv_xAngle+'deg,'+ddjsv_yAngle+'deg)';
ddjs_setObjTransform(ddjsv_obj,ddjsv_s);
}

function ddjs_opacityObj(ddjsv_obj,ddjsv_o){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.opacity=ddjsv_o;
}else{return false;}
}

function ddjs_fontsizeObj(ddjsv_obj,ddjsv_s){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.fontSize=ddjsv_s;
}else{return false;}
}

function ddjs_colorObj(ddjsv_obj,ddjsv_s){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.color=ddjsv_s;
}else{return false;}
}

function ddjs_backgroundcolorObj(ddjsv_obj,ddjsv_s){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.backgroundColor=ddjsv_s;
}else{return false;}
}

function ddjs_backgroundimageObj(ddjsv_obj,ddjsv_s){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.backgroundImage='url(\''+ddjsv_s+'\')';
}else{return false;}
}

function ddjs_animation_clearAll(ddjsv_obj){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.webkitTransform='';
ddjsv_theObj.style.mozTransform='';
ddjsv_theObj.style.msTransform='';
ddjsv_theObj.style.oTransform='';
ddjsv_theObj.style.transform='';
ddjsv_theObj.style.webkitTransition='';
ddjsv_theObj.style.mozTransition='';
ddjsv_theObj.style.msTransition='';
ddjsv_theObj.style.oTransition='';
ddjsv_theObj.style.transition='';
}else{return false;}
}

function ddjs_animation_setObjTransition(ddjsv_obj,ddjsv_s){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
try{
if(ddjsv_theObj.style.webkitTransition){
var ddjsv_webkit_nowTr=ddjsv_theObj.style.webkitTransition;
if(ddjsv_webkit_nowTr.indexOf(ddjsv_s)!=-1){
var ddjsv_webkit_newTr=ddjsv_webkit_nowTr.split(ddjsv_s);
if(ddjsv_webkit_newTr[0] && ddjsv_webkit_newTr[1])ddjsv_theObj.style.webkitTransition=ddjsv_webkit_newTr[0]+', '+ddjsv_s+', '+ddjsv_webkit_newTr[1];
else if(ddjsv_webkit_newTr[0])ddjsv_theObj.style.webkitTransition=ddjsv_webkit_newTr[0]+', '+s;
else if(ddjsv_webkit_newTr[1])ddjsv_theObj.style.webkitTransition=ddjsv_s+', '+ddjsv_webkit_newTr[1];
}else ddjsv_theObj.style.webkitTransition=ddjsv_theObj.style.webkitTransition+', '+ddjsv_s;
}else ddjsv_theObj.style.webkitTransition=ddjsv_s;
}catch(err){}
try{
if(ddjsv_theObj.style.mozTransition){
var ddjsv_moz_nowTr=ddjsv_theObj.style.mozTransition;
if(ddjsv_moz_nowTr.indexOf(ddjsv_s)!=-1){
var ddjsv_moz_newTr=ddjsv_moz_nowTr.split(ddjsv_s);
if(ddjsv_moz_newTr[0] && ddjsv_moz_newTr[1])ddjsv_theObj.style.mozTransition=ddjsv_moz_newTr[0]+', '+ddjsv_s+', '+ddjsv_moz_newTr[1];
else if(ddjsv_moz_newTr[0])ddjsv_theObj.style.mozTransition=ddjsv_moz_newTr[0]+', '+s;
else if(ddjsv_moz_newTr[1])ddjsv_theObj.style.mozTransition=ddjsv_s+', '+ddjsv_moz_newTr[1];
}else ddjsv_theObj.style.mozTransition=ddjsv_theObj.style.mozTransition+', '+ddjsv_s;
}else ddjsv_theObj.style.mozTransition=ddjsv_s;
}catch(err){}
try{
if(ddjsv_theObj.style.msTransition){
var ddjsv_ms_nowTr=ddjsv_theObj.style.msTransition;
if(ddjsv_ms_nowTr.indexOf(ddjsv_s)!=-1){
var ddjsv_ms_newTr=ddjsv_ms_nowTr.split(ddjsv_s);
if(ddjsv_ms_newTr[0] && ddjsv_ms_newTr[1])ddjsv_theObj.style.msTransition=ddjsv_ms_newTr[0]+', '+ddjsv_s+', '+ddjsv_ms_newTr[1];
else if(ddjsv_ms_newTr[0])ddjsv_theObj.style.msTransition=ddjsv_ms_newTr[0]+', '+s;
else if(ddjsv_ms_newTr[1])ddjsv_theObj.style.msTransition=ddjsv_s+', '+ddjsv_ms_newTr[1];
}else ddjsv_theObj.style.msTransition=ddjsv_theObj.style.msTransition+', '+ddjsv_s;
}else ddjsv_theObj.style.msTransition=ddjsv_s;
}catch(err){}
try{
if(ddjsv_theObj.style.oTransition){
var ddjsv_o_nowTr=ddjsv_theObj.style.oTransition;
if(ddjsv_o_nowTr.indexOf(ddjsv_s)!=-1){
var ddjsv_o_newTr=ddjsv_o_nowTr.split(ddjsv_s);
if(ddjsv_o_newTr[0] && ddjsv_o_newTr[1])ddjsv_theObj.style.oTransition=ddjsv_o_newTr[0]+', '+ddjsv_s+', '+ddjsv_o_newTr[1];
else if(ddjsv_o_newTr[0])ddjsv_theObj.style.oTransition=ddjsv_o_newTr[0]+', '+s;
else if(ddjsv_o_newTr[1])ddjsv_theObj.style.oTransition=ddjsv_s+', '+ddjsv_o_newTr[1];
}else ddjsv_theObj.style.oTransition=ddjsv_theObj.style.oTransition+', '+ddjsv_s;
}else ddjsv_theObj.style.oTransition=ddjsv_s;
}catch(err){}
try{
if(ddjsv_theObj.style.transition){
var ddjsv__nowTr=ddjsv_theObj.style.transition;
if(ddjsv__nowTr.indexOf(ddjsv_s)!=-1){
var ddjsv__newTr=ddjsv__nowTr.split(ddjsv_s);
if(ddjsv__newTr[0] && ddjsv__newTr[1])ddjsv_theObj.style.transition=ddjsv__newTr[0]+', '+ddjsv_s+', '+ddjsv__newTr[1];
else if(ddjsv__newTr[0])ddjsv_theObj.style.transition=ddjsv__newTr[0]+', '+ddjsv_s;
else if(ddjsv__newTr[1])ddjsv_theObj.style.transition=ddjsv_s+', '+ddjsv__newTr[1];
}else ddjsv_theObj.style.transition=ddjsv_theObj.style.transition+', '+ddjsv_s;
}else ddjsv_theObj.style.transition=ddjsv_s;
}catch(err){}
}else{return false;}
}

function ddjs_animation_rotateObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromRotateAngle,ddjsv_toRotateAngle){
ddjs_animation_transformObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,{rotate:{fromRotateAngle:ddjsv_fromRotateAngle,toRotateAngle:ddjsv_toRotateAngle}});
}

function ddjs_animation_rotateXObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromRotateAngle,ddjsv_toRotateAngle){
ddjs_animation_transformObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,{rotateX:{fromRotateAngle:ddjsv_fromRotateAngle,toRotateAngle:ddjsv_toRotateAngle}});
}

function ddjs_animation_rotateYObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromRotateAngle,ddjsv_toRotateAngle){
ddjs_animation_transformObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,{rotateY:{fromRotateAngle:ddjsv_fromRotateAngle,toRotateAngle:ddjsv_toRotateAngle}});
}

function ddjs_animation_scaleObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromScale,ddjsv_toScale){
ddjs_animation_transformObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,{scale:{fromScale:ddjsv_fromScale,toScale:ddjsv_toScale}});
}

function ddjs_animation_skewObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_formXAngle,ddjsv_toXAngle,ddjsv_formYAngle,ddjsv_toYAngle){
ddjs_animation_transformObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,{skew:{formXAngle:ddjsv_formXAngle,toXAngle:ddjsv_toXAngle,formYAngle:ddjsv_formYAngle,toYAngle:ddjsv_toYAngle}});
}

function ddjs_animation_transformObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_transformJSON){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjsv_transformJSON['rotate'])ddjs_rotateObj(ddjsv_obj,ddjsv_transformJSON['rotate']['fromRotateAngle']);
if(ddjsv_transformJSON['rotateX'])ddjs_rotateXObj(ddjsv_obj,ddjsv_transformJSON['rotateX']['fromRotateAngle']);
if(ddjsv_transformJSON['rotateY'])ddjs_rotateYObj(ddjsv_obj,ddjsv_transformJSON['rotateY']['fromRotateAngle']);
if(ddjsv_transformJSON['scale'])ddjs_scaleObj(ddjsv_obj,ddjsv_transformJSON['scale']['fromScale']);
if(ddjsv_transformJSON['skew'])ddjs_skewObj(ddjsv_obj,ddjsv_transformJSON['skew']['formXAngle'],ddjsv_transformJSON['skew']['fromYAngle']);
setTimeout(function(){
// Can add more start.
var ddjsv_s='';
if(ddjs_checkBrowserKernel()!='none')ddjsv_s='-'+ddjs_checkBrowserKernel()+'-transform '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s';
else ddjsv_s='transform '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s';
// Can add more end.
ddjs_animation_setObjTransition(ddjsv_obj,ddjsv_s);
setTimeout(function(){
if(ddjsv_transformJSON['rotate'])ddjs_rotateObj(ddjsv_obj,ddjsv_transformJSON['rotate']['toRotateAngle']);
if(ddjsv_transformJSON['rotateX'])ddjs_rotateXObj(ddjsv_obj,ddjsv_transformJSON['rotateX']['toRotateAngle']);
if(ddjsv_transformJSON['rotateY'])ddjs_rotateYObj(ddjsv_obj,ddjsv_transformJSON['rotateY']['toRotateAngle']);
if(ddjsv_transformJSON['scale'])ddjs_scaleObj(ddjsv_obj,ddjsv_transformJSON['scale']['toScale']);
if(ddjsv_transformJSON['skew'])ddjs_skewObj(ddjsv_obj,ddjsv_transformJSON['skew']['toXAngle'],ddjsv_transformJSON['skew']['toYAngle']);
},0);
},0.1);
}else{return false;}
}

function ddjs_animation_moveObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromX,ddjsv_toX,ddjsv_fromY,ddjsv_toY){
ddjs_animation_moveObjWithTLWay(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromX,ddjsv_toX,ddjsv_fromY,ddjsv_toY,true,true);
}

function ddjs_animation_moveObjFromBottomToTop(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromY,ddjsv_toY,ddjsv_TWay){
ddjs_animation_moveObjWithTLWay(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,parseInt(document.getElementById(ddjsv_obj).style.left),parseInt(document.getElementById(ddjsv_obj).style.left),ddjsv_fromY,ddjsv_toY,ddjsv_TWay,true);
}

function ddjs_animation_moveObjWithTLWay(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromX,ddjsv_toX,ddjsv_fromY,ddjsv_toY,ddjsv_TWay,ddjsv_LWay){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
if(ddjsv_fromX==null)ddjsv_fromX=0;
if(ddjsv_toX==null)ddjsv_toX=0;
if(ddjsv_fromY==null)ddjsv_fromY=0;
if(ddjsv_toY==null)ddjsv_toY=0;
if(ddjsv_TWay==false){
ddjs_setObjY(ddjsv_obj,ddjsv_fromY,false);
}else{
ddjs_setObjY(ddjsv_obj,ddjsv_fromY,true);
}
if(ddjsv_LWay==false){
ddjs_setObjX(ddjsv_obj,ddjsv_fromX,false);
}else{
ddjs_setObjX(ddjsv_obj,ddjsv_fromX,true);
}
setTimeout(function(){
if(ddjsv_TWay==false)ddjsv_TWay='bottom ';
else ddjsv_TWay='top ';
if(ddjsv_LWay==false)ddjsv_LWay='right ';
else ddjsv_LWay='left ';
var ddjsv_s=ddjsv_LWay+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s, '+ddjsv_TWay+' '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s';
ddjs_animation_setObjTransition(ddjsv_obj,ddjsv_s);
setTimeout(function(){
if(ddjsv_TWay=='bottom '){
ddjs_setObjY(ddjsv_obj,ddjsv_toY,false);
}else{
ddjs_setObjY(ddjsv_obj,ddjsv_toY,true);
}
if(ddjsv_LWay=='right '){
ddjs_setObjX(ddjsv_obj,ddjsv_toX,false);
}else{
ddjs_setObjX(ddjsv_obj,ddjsv_toX,true);
}
},0);
},0.1);
}else{return false;}
}

function ddjs_animation_opacityObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromOpacity,ddjsv_toOpacity){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_opacityObj(ddjsv_obj,ddjsv_fromOpacity);
setTimeout(function(){
var ddjsv_s='opacity '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s';
ddjs_animation_setObjTransition(ddjsv_obj,ddjsv_s);
setTimeout(function(){
ddjs_opacityObj(ddjsv_obj,ddjsv_toOpacity);
},0);
},0.1);
}else{return false;}
}

function ddjs_animation_fontsizeObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromSize,ddjsv_toSize){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_fontsizeObj(ddjsv_obj,ddjsv_fromSize);
setTimeout(function(){
var ddjsv_s='font-size '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s';
ddjs_animation_setObjTransition(ddjsv_obj,ddjsv_s);
setTimeout(function(){
ddjs_fontsizeObj(ddjsv_obj,ddjsv_toSize);
},0);
},0.1);
}else{return false;}
}

function ddjs_animation_colorObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromColor,ddjsv_toColor){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_colorObj(ddjsv_obj,ddjsv_fromColor);
setTimeout(function(){
var ddjsv_s='color '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s';
ddjs_animation_setObjTransition(ddjsv_obj,ddjsv_s);
setTimeout(function(){
ddjs_colorObj(ddjsv_obj,ddjsv_toColor);
},0);
},0.1);
}else{return false;}
}

function ddjs_animation_backgroundcolorObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromColor,ddjsv_toColor){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_backgroundcolorObj(ddjsv_obj,ddjsv_fromColor);
setTimeout(function(){
var ddjsv_s='background-Color '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s';
ddjs_animation_setObjTransition(ddjsv_obj,ddjsv_s);
setTimeout(function(){
ddjs_backgroundcolorObj(ddjsv_obj,ddjsv_toColor);
},0);
},0.1);
}else{return false;}
}

function ddjs_animation_backgroundimageObj(ddjsv_obj,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_fromImage,ddjsv_toImage){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjs_backgroundimageObj(ddjsv_obj,ddjsv_fromImage);
setTimeout(function(){
var ddjsv_s='background-Image '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s';
ddjs_animation_setObjTransition(ddjsv_obj,ddjsv_s);
setTimeout(function(){
ddjs_backgroundimageObj(ddjsv_obj,ddjsv_toImage);
},0);
},0.1);
}else{return false;}
}

function ddjs_animation_twinklingObj(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromOpacity,ddjsv_toOpacity){
ddjs_animation_twinklingJSON={};
ddjs_animation_twinklingJSON[ddjsv_obj+'_mode']=0;
ddjs_animation_twinklingJSON[ddjsv_obj+'_timer']=setInterval("ddjs_animation_objTwinkling('"+ddjsv_obj+"',"+ddjsv_duration+","+ddjsv_delay+","+ddjsv_fromOpacity+","+ddjsv_toOpacity+")",(ddjsv_duration*1000)+1);
ddjs_animation_opacityObj(ddjsv_obj,ddjsv_duration,'ease',ddjsv_delay,ddjsv_toOpacity,ddjsv_fromOpacity);
}

function ddjs_animation_objTwinkling(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromOpacity,ddjsv_toOpacity){
if(ddjs_animation_twinklingJSON[ddjsv_obj+'_mode']==0){
ddjs_animation_twinklingJSON[ddjsv_obj+'_mode']=1;
ddjs_animation_opacityObj(ddjsv_obj,ddjsv_duration,'ease',ddjsv_delay,ddjsv_fromOpacity,ddjsv_toOpacity);
}else{
ddjs_animation_twinklingJSON[ddjsv_obj+'_mode']=0;
ddjs_animation_opacityObj(ddjsv_obj,ddjsv_duration,'ease',ddjsv_delay,ddjsv_toOpacity,ddjsv_fromOpacity);
}
}

function ddjs_animation_untwinklingObj(ddjsv_obj){
clearInterval(ddjs_animation_twinklingJSON[ddjsv_obj+'_timer']);
ddjs_animation_twinklingJSON[ddjsv_obj+'_mode']=0;
ddjs_opacityObj(ddjsv_obj,1);
}

function ddjs_animation_setMEventTwinklingObj(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromOpacity,ddjsv_toOpacity,ddjsv_arouser){
var ddjsv_bObj=null;
try{
if((ddjsv_arouser)&&(ddjsv_arouser!=null)&&(ddjsv_arouser!=''))ddjsv_bObj=ddjsv_arouser;
else ddjsv_bObj=ddjsv_obj;
}catch(e){}
ddjs_setHover(ddjsv_bObj,"ddjs_animation_twinklingObj('"+ddjsv_obj+"',"+ddjsv_duration+","+ddjsv_delay+","+ddjsv_fromOpacity+","+ddjsv_toOpacity+");","ddjs_animation_untwinklingObj('"+ddjsv_obj+"');",true);
}

function ddjs_animation_setMEventRotatingObj(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromRotateAngle,ddjsv_toRotateAngle,ddjsv_arouser){
var ddjsv_bObj=null;
try{
if((ddjsv_arouser)&&(ddjsv_arouser!=null)&&(ddjsv_arouser!=''))ddjsv_bObj=ddjsv_arouser;
else ddjsv_bObj=ddjsv_obj;
}catch(e){}
ddjs_setHover(ddjsv_bObj,"ddjs_animation_transformObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+",{rotate:{fromRotateAngle:"+ddjsv_fromRotateAngle+",toRotateAngle:"+ddjsv_toRotateAngle+"}});","ddjs_animation_transformObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+",{rotate:{fromRotateAngle:"+ddjsv_toRotateAngle+",toRotateAngle:"+ddjsv_fromRotateAngle+"}});",true);
}

function ddjs_animation_setMEventRotatingXTObj(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromRotateAngle,ddjsv_toRotateAngle,ddjsv_arouser){
var ddjsv_bObj=null;
try{
if((ddjsv_arouser)&&(ddjsv_arouser!=null)&&(ddjsv_arouser!=''))ddjsv_bObj=ddjsv_arouser;
else ddjsv_bObj=ddjsv_obj;
}catch(e){}
ddjs_setHover(ddjsv_bObj,"ddjs_animation_transformObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+",{rotateX:{fromRotateAngle:"+ddjsv_fromRotateAngle+",toRotateAngle:"+ddjsv_toRotateAngle+"}});","ddjs_animation_transformObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+",{rotateX:{fromRotateAngle:"+ddjsv_toRotateAngle+",toRotateAngle:"+ddjsv_fromRotateAngle+"}});",true);
}

function ddjs_animation_setMEventRotatingYTObj(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromRotateAngle,ddjsv_toRotateAngle,ddjsv_arouser){
var ddjsv_bObj=null;
try{
if((ddjsv_arouser)&&(ddjsv_arouser!=null)&&(ddjsv_arouser!=''))ddjsv_bObj=ddjsv_arouser;
else ddjsv_bObj=ddjsv_obj;
}catch(e){}
ddjs_setHover(ddjsv_bObj,"ddjs_animation_transformObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+",{rotateY:{fromRotateAngle:"+ddjsv_fromRotateAngle+",toRotateAngle:"+ddjsv_toRotateAngle+"}});","ddjs_animation_transformObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+",{rotateY:{fromRotateAngle:"+ddjsv_toRotateAngle+",toRotateAngle:"+ddjsv_fromRotateAngle+"}});",true);
}

function ddjs_startScaleAnimation(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromScale,ddjsv_toScale,isStart){
if(isStart)ddjs_animation_transformObj(ddjsv_obj,ddjsv_duration,'ease',ddjsv_delay,{scale:{fromScale:ddjsv_fromScale,toScale:ddjsv_toScale}});
else ddjs_animation_transformObj(ddjsv_obj,ddjsv_duration,'ease',ddjsv_delay,{scale:{fromScale:ddjsv_toScale,toScale:ddjsv_fromScale}});
}

function ddjs_animation_setMEventScaleObj(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromScale,ddjsv_toScale,ddjsv_arouser){
var ddjsv_bObj=null;
try{
if((ddjsv_arouser)&&(ddjsv_arouser!=null)&&(ddjsv_arouser!=''))ddjsv_bObj=ddjsv_arouser;
else ddjsv_bObj=ddjsv_obj;
}catch(e){}
ddjs_setHover(ddjsv_bObj,"ddjs_startScaleAnimation('"+ddjsv_obj+"',"+ddjsv_duration+","+ddjsv_delay+","+ddjsv_fromScale+","+ddjsv_toScale+",true);","ddjs_startScaleAnimation('"+ddjsv_obj+"',"+ddjsv_duration+","+ddjsv_delay+","+ddjsv_fromScale+","+ddjsv_toScale+",false);");
}

function ddjs_animation_setMEventMoveObj(ddjsv_obj,ddjsv_duration,ddjsv_delay,ddjsv_fromX,ddjsv_toX,ddjsv_fromY,ddjsv_toY,ddjsv_arouser){
var ddjsv_bObj=null;
try{
if((ddjsv_arouser)&&(ddjsv_arouser!=null)&&(ddjsv_arouser!=''))ddjsv_bObj=ddjsv_arouser;
else ddjsv_bObj=ddjsv_obj;
}catch(e){}
ddjs_setHover(ddjsv_bObj,"ddjs_animation_moveObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+","+ddjsv_fromX+","+ddjsv_toX+","+ddjsv_fromY+","+ddjsv_toY+");","ddjs_animation_moveObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+","+ddjsv_toX+","+ddjsv_fromX+","+ddjsv_toY+","+ddjsv_fromY+");");
}

function ddjs_animation_setMEventBackgroundColorObj(ddjsv_obj,ddjsv_duration,ddjsv_delay,fromColor,toColor,ddjsv_arouser){
var ddjsv_bObj=null;
try{
if((ddjsv_arouser)&&(ddjsv_arouser!=null)&&(ddjsv_arouser!=''))ddjsv_bObj=ddjsv_arouser;
else ddjsv_bObj=ddjsv_obj;
}catch(e){}
ddjs_setHover(ddjsv_bObj,"ddjs_animation_clearAll('"+ddjsv_obj+"');ddjs_animation_backgroundcolorObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+",'"+fromColor+"','"+toColor+"');","ddjs_animation_backgroundcolorObj('"+ddjsv_obj+"',"+ddjsv_duration+",'ease',"+ddjsv_delay+",'"+toColor+"','"+fromColor+"');");
}

var ddjsv_sseoShew={};
function ddjs_animation_setSEventOpacityObj(ddjsv_SObj,ddjsv_SPx,ddjsv_obj,ddjsv_duration,ddjsv_fromOpacity,ddjsv_toOpacity){
ddjs_opacityObj(ddjsv_obj,ddjsv_fromOpacity);
var ddjsv_theSObj=document.body;
if((ddjsv_SObj!='document.body')&&(ddjsv_SObj!=document.body))ddjsv_theSObj=ddjs_findObject(ddjsv_SObj);
if(ddjsv_theSObj!=null){ddjs_opacityObj(ddjsv_obj,0);
ddjsv_sseoShew[ddjsv_obj]=false;
var ddjsv_s="ddjs_animation_setScrollingOpacityEvent('"+ddjsv_SObj+"',"+ddjsv_SPx+",'"+ddjsv_obj+"',"+ddjsv_duration+","+ddjsv_fromOpacity+","+ddjsv_toOpacity+");";
if(ddjsv_theSObj.getAttribute('onScroll')!=null)ddjsv_theSObj.setAttribute("onScroll",ddjsv_theSObj.getAttribute('onScroll')+ddjsv_s);
else ddjsv_theSObj.setAttribute("onScroll",ddjsv_s);
}else{return false;}
}
function ddjs_animation_setScrollingOpacityEvent(ddjsv_SObj,ddjsv_SPx,ddjsv_obj,ddjsv_duration,ddjsv_fromOpacity,ddjsv_toOpacity){
var ddjsv_theSObj=null;
if(ddjsv_SObj=='document.body')ddjsv_theSObj=document.body;
else if(ddjsv_SObj=='window')ddjsv_theSObj=window;
else ddjsv_theSObj=ddjs_findObject(ddjsv_SObj);
if(ddjsv_theSObj!=null){
if(ddjsv_theSObj.scrollTop>=ddjsv_SPx){
if(!ddjsv_sseoShew[ddjsv_obj]){ddjsv_sseoShew[ddjsv_obj]=!ddjsv_sseoShew[ddjsv_obj];ddjs_animation_opacityObj(ddjsv_obj,ddjsv_duration,'ease',0,ddjsv_fromOpacity,ddjsv_toOpacity);}
}
if(ddjsv_theSObj.scrollTop<=ddjsv_SPx){
if(ddjsv_sseoShew[ddjsv_obj]){ddjsv_sseoShew[ddjsv_obj]=!ddjsv_sseoShew[ddjsv_obj];ddjs_animation_opacityObj(ddjsv_obj,ddjsv_duration,'ease',0,ddjsv_toOpacity,ddjsv_fromOpacity);}
}
}else{return false;}
}

function ddjs_animation_setSEventScaleObj(ddjsv_SObj,ddjsv_SPx,ddjsv_obj,ddjsv_duration,ddjsv_fromScale,ddjsv_toScale){
ddjs_scaleObj(ddjsv_obj,ddjsv_fromScale);
var ddjsv_theSObj=document.body;
if((ddjsv_SObj!='document.body')&&(ddjsv_SObj!=document.body))ddjsv_theSObj=ddjs_findObject(ddjsv_SObj);
if(ddjsv_theSObj!=null){ddjs_scaleObj(ddjsv_obj,0);
ddjsv_sseoShew[ddjsv_obj]=false;
var ddjsv_s="ddjs_animation_setScrollingScaleEvent('"+ddjsv_SObj+"',"+ddjsv_SPx+",'"+ddjsv_obj+"',"+ddjsv_duration+","+ddjsv_fromScale+","+ddjsv_toScale+");";
if(ddjsv_theSObj.getAttribute('onScroll')!=null)ddjsv_theSObj.setAttribute("onScroll",ddjsv_theSObj.getAttribute('onScroll')+ddjsv_s);
else ddjsv_theSObj.setAttribute("onScroll",ddjsv_s);
}else{return false;}
}
function ddjs_animation_setScrollingScaleEvent(ddjsv_SObj,ddjsv_SPx,ddjsv_obj,ddjsv_duration,ddjsv_fromScale,ddjsv_toScale){
var ddjsv_theSObj=null;
if(ddjsv_SObj=='document.body')ddjsv_theSObj=document.body;
else if(ddjsv_SObj=='window')ddjsv_theSObj=window;
else ddjsv_theSObj=ddjs_findObject(ddjsv_SObj);
if(ddjsv_theSObj!=null){
if(ddjsv_theSObj.scrollTop>=ddjsv_SPx){
if(!ddjsv_sseoShew[ddjsv_obj]){ddjsv_sseoShew[ddjsv_obj]=!ddjsv_sseoShew[ddjsv_obj];ddjs_startScaleAnimation(ddjsv_obj,ddjsv_duration,0,ddjsv_fromScale,ddjsv_toScale,true);}
}
if(ddjsv_theSObj.scrollTop<=ddjsv_SPx){
if(ddjsv_sseoShew[ddjsv_obj]){ddjsv_sseoShew[ddjsv_obj]=!ddjsv_sseoShew[ddjsv_obj];ddjs_startScaleAnimation(ddjsv_obj,ddjsv_duration,0,ddjsv_toScale,ddjsv_fromScale,true);}
}
}else{return false;}
}

function ddjs_animation_clearKeyframesAnimation(ddjsv_obj){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
ddjsv_theObj.style.webkitAnimation='';
ddjsv_theObj.style.mozAnimation='';
ddjsv_theObj.style.msAnimation='';
ddjsv_theObj.style.oAnimation='';
ddjsv_theObj.style.animation='';
}else{return null;}
}

function ddjs_animation_clearKeyframesAnimationWithArray(ddjsv_obj){
for(var ddjsv_i in ddjsv_obj)ddjs_animation_clearKeyframesAnimation(ddjsv_obj[ddjsv_i]);
}

function ddjs_animation_setKeyframesAnimationKernal(ddjsv_obj,ddjsv_animationRules,ddjsv_animationScript){
var ddjsv_theObj=ddjs_findObject(ddjsv_obj);
if(ddjsv_theObj!=null){
var ddjsv_animation=document.createElement('style');
ddjsv_animation.type='text/css';
var ddjsv_rules=document.createTextNode(ddjsv_animationScript);
ddjsv_animation.appendChild(ddjsv_rules);
document.getElementsByTagName('head')[0].appendChild(ddjsv_animation);
ddjsv_theObj.style.webkitAnimation=ddjsv_animationRules;
ddjsv_theObj.style.mozAnimation=ddjsv_animationRules;
ddjsv_theObj.style.msAnimation=ddjsv_animationRules;
ddjsv_theObj.style.oAnimation=ddjsv_animationRules;
ddjsv_theObj.style.animation=ddjsv_animationRules;
}else{return null;}
}

function ddjs_animation_setKeyframesAnimationLite(ddjsv_obj,ddjsv_animationName,ddjsv_animationScript,ddjsv_duration,ddjsv_loop){
ddjs_animation_setKeyframesAnimation(ddjsv_obj,ddjsv_animationName,ddjsv_animationScript,ddjsv_duration,'ease',0,ddjsv_loop,'normal');
}

function ddjs_animation_setKeyframesAnimation(ddjsv_obj,ddjsv_animationName,ddjsv_animationScript,ddjsv_duration,ddjsv_showMethod,ddjsv_delay,ddjsv_loop,ddjsv_mode){
var ddjsv_browserSupport=['@-webkit-keyframes ','@-moz-keyframes ','@-ms-keyframes ','@-o-keyframes ','@keyframes '];
var ddjsv_as='';
for(var ddjsv_i in ddjsv_browserSupport){
ddjsv_as+=ddjsv_browserSupport[ddjsv_i]+ddjsv_animationName+'{'+ddjsv_animationScript+'}';
}
if(ddjsv_loop=='infinite' || ddjsv_loop==true)ddjsv_loop='infinite';
else if(ddjsv_loop==false)ddjsv_loop='1';
if(ddjsv_mode!='alertnate')ddjsv_mode='normal';
ddjs_animation_setKeyframesAnimationKernal(ddjsv_obj,ddjsv_animationName+' '+ddjsv_duration+'s '+ddjsv_showMethod+' '+ddjsv_delay+'s '+ddjsv_loop+' '+ddjsv_mode,ddjsv_as);
}

function ddjs_animation_setDocumentBackgroundImageInitWithOpacity(ddjsv_img,ddjsv_duration){
ddjs_setDocumentBackgroundImage(ddjsv_img,0);
if(ddjsv_duration)ddjs_animation_opacityObj('documentBackgroundImage',ddjsv_duration,'ease',0,0,1);
else ddjs_animation_opacityObj('documentBackgroundImage',1.5,'ease',0,0,1);
}