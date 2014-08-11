var soundfiles = new Array("2SAD4ME.mp3","AIRHORN.mp3","Darude - Dankstorm.mp3","HITMARKER.mp3","MOM GET THE CAMERA.mp3","Oh Baby A Triple.mp3","OMG TRICKSHOT CHILD.mp3","OOOOOOOOHMYGOOOOD.mp3","SANIC.mp3","SKRILLEX Scary.mp3","SMOKE WEEK EVERYDAY.mp3","WOMBO COMBO.mp3","DAMN SON WHERED YOU FIND THIS.mp3","Whatcha Say.mp3","2SED4AIRHORN.mp3","tactical nuke.mp3","intervention 420.mp3","AIRPORN.mp3","DEDOTADED WAM.mp3","DAMN SON WOW.mp3","GET NOSCOPED.mp3","AIRHORN SONATA.mp3","wow ;).mp3","SHOTS FIRED.mp3","NEVER DONE THAT.mp3","SPOOKY.mp3");
var editer = CKEDITOR.replace('msg');
var user = ""
var socket = io();

socket.on('chat message', function(msg){
  msg = msg.split(",");
  avatar = get_gravatar(msg[0],100);
  if (msg[0] == user) {
    $('#messages').append(
      "<div id='messages' class='container'><div class='row'> <div class='col-md-2'><img src='"+ avatar + "' class='img-circle'></div><div class='col-md-10 well'><div class='"+ msg[2] +"'>"+ msg[1] +"</div></div></div><br style='clear:both;'>"
     ); 
  }
  else 
  {
    $('#messages').append(
      "<div class='row '><div class='col-md-10 well'><div class=' alert alert-"+ msg[2] +"'>"+ msg[1] +"</div></div><div class='col-md-2'><img src='"+ avatar + "' class='img-circle'></div></div><br style='clear:both;'>"
    );
  };
  $("body").scrollTop($("body")[0].scrollHeight);
});

function sub(){
  user = $('#n').val();
  socket.emit('chat message', $('#n').val()+","+ cleanSnapshot(editer) +","+$('#c').val());
  $('#msg').val('');
  return false;
};

function cleanSnapshot(textbox){
 val =  textbox.getSnapshot();
 val = val.split(" ");
 output = "";
 for (var i = 0; i <  val.length; i++) 
 {
    val[i] = replaceAll('>', '> ', val[i] );
    val[i] = replaceAll('<', ' <', val[i] );
    output = output + val[i]+" ";
  }
  val = output.split(" ");
  output = "";
  for (var i = 0; i <  val.length; i++) 
  {
    val[i] = check(val[i] , val[i+1]);
    output = output + val[i]+ " ";
  }

 return output
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function replaceURLWithHTMLLinks(text)
{
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1' target='_blank' >$1</a>");
}

function ytVidId(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
}


function check(url,url2) 
{
  splitout = url.split("?");
  urlstart = splitout[0];
  ext = urlstart.split('.').pop();
  if (ext=="jpg" || ext=="png" || ext=="gif" ){
    return ("<a href='"+url+"' target='_blank' ><img src='"+ url +"'alt='"+ url +"'></a><br>");
  }
  else if (ytVidId(url)){
   return '<iframe width="560" height="315" src="//www.youtube-nocookie.com/embed/'+ ytVidId(url) +'" frameborder="0" allowfullscreen></iframe>'
  }

  if (url.substring(0,7) == "//sound"){
    return '<audio controls autoplay><source src="assets/sounds/' + soundfiles[url2] + '" type="audio/mpeg"></audio>'
  };

    return replaceURLWithHTMLLinks(url);
}
function get_gravatar(email, size) {
  // MD5 (Message-Digest Algorithm) by WebToolkit
  var MD5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
  var size = size || 80;
  return 'http://www.gravatar.com/avatar/' + MD5(email) + '.jpg?s=' + size;
}