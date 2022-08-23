function w2p_checkBrowserName(){
var w2pv_b=navigator.userAgent.toLowerCase();
if(w2pv_b.indexOf('chrome')!=-1)return 'chrome';
else if(w2pv_b.indexOf('safari')!=-1 || w2pv_b.indexOf('iphone')!=-1 || w2pv_b.indexOf('ipad')!=-1)return 'safari';
else if(w2pv_b.indexOf('firefox')!=-1)return 'firefox';
else if(w2pv_b.indexOf('msie')!=-1)return 'ie';
else if(w2pv_b.indexOf('opera')!=-1)return 'opera';
return 'none';
}
var browserName=w2p_checkBrowserName();


function Phone(){}

Phone.w2p=function(){
var argArr=[];
for(var i in arguments){argArr.push(arguments[i]);}
if(argArr.length<1)return;
var methodName=arguments[0];
argArr.splice(0,1);
//alert(navigator.userAgent.toLowerCase()+'\n'+browserName);
if(browserName=='safari'){
var passingData={"message":methodName,"parameters":argArr};
location.href="toios://"+escape(JSON.stringify(passingData));
}else{
var argsString=JSON.stringify(argArr);
argsString=argsString.substring(1);
argsString=argsString.substring(0,argsString.length-1);
var funcCallStrart=methodName+"(";
var funcCallBody='';
for(var i=0; i<argArr.length; i++){
if(typeof argArr[i]=='string'){
if(i==0)funcCallBody=funcCallBody+"'"+argArr[i]+"'";
else funcCallBody=funcCallBody+",'"+argArr[i]+"'";
}else{
if(i==0)funcCallBody=funcCallBody+""+argArr[i];
else funcCallBody=funcCallBody+","+argArr[i];
}
}
var funcCallFull='Android.'+funcCallStrart+funcCallBody+");";
try{eval(funcCallFull);}catch(e){}
}
}

Phone.next=function(){
if(browserName=='safari')Phone.w2p('next');
else{try{Android.next();}catch(e){}}
}

Phone.back=function(){
if(browserName=='safari')Phone.w2p('back');
else{try{Android.back();}catch(e){}}
}