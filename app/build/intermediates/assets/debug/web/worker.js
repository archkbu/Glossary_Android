worker={}

worker.onmessage=function(e){
var maindata=e[0];
var langlist=e[1];
var _in=e[2];
var searchV=e[3];
var ii=e[4];
var inSubfield=e[5];
var isTouch=e[6];

var content='';


var getContentById=function(_id){
for(var i=_id; i<maindata.content.length; i++){
if(maindata.content[i].id==_id)return maindata.content[i];
}
return null;
}

var makeMainListContent=function(_content,_langlist,_i,_p,_ii,_sf){
var str1='MainlistDivEven';
if(_ii%2==0)str1='MainlistDivOdd';
var funname='onclick';
if(isTouch)funname='ontouchstart="mainlistonts(this);" ontouchend';
var sf='';
for(var d in _sf){
if(d>0)sf=sf+','+_sf[d];
else sf=_sf[d];
}
if(sf!='')sf='['+sf+'] ';
if(inSubfield=='all' || inSubfield=='bookmarked')_content=_content+'<div class="MainlistDiv '+str1+'"><div style="display:table-row;"><div class="MainListTd" '+funname+'="mainlistRowSelected('+_i+','+_p+',this);">'+sf+maindata[_langlist][_p].data[_i].name+'</div></div></div>';
else _content=_content+'<div class="MainlistDiv '+str1+'"><div style="display:table-row;"><div class="MainListTd" '+funname+'="mainlistRowSelected('+_i+','+_p+',this);">'+maindata[_langlist][_p].data[_i].name+'</div></div></div>';
return _content;
}


for(var p=0; p<maindata[langlist].length; p++){
content=content+'<div id="title_'+p+'" style="height:0px;"></div>';
for(var i=0; i<maindata[langlist][p].data.length; i++){
if(_in!='all'){
var needAdd=false;
for(var k in maindata[langlist][p].data[i].refers){
var con=getContentById(maindata[langlist][p].data[i].refers[k]);
if(con.Subfield_1.toLowerCase()==_in){needAdd=true;}
}
if(needAdd){
if(maindata[langlist][p].data[i].name.indexOf(searchV)!=-1){
content=makeMainListContent(content,langlist,i,p,ii);
ii++;
}
}
}else{
if(maindata[langlist][p].data[i].name.indexOf(searchV)!=-1){
var subfieldsabc=[];
for(var k in maindata[langlist][p].data[i].refers){
var con=getContentById(maindata[langlist][p].data[i].refers[k]);
var ttt=true;for(var jjj in subfieldsabc){if(subfieldsabc[jjj]==con.Subfield_1 || con.Subfield_1=='')ttt=false;}
if(ttt && con.Subfield_1!='')subfieldsabc.push(con.Subfield_1);
}
content=makeMainListContent(content,langlist,i,p,ii,subfieldsabc);
ii++;
}
}
}
}
worker_onmessage(content);
}