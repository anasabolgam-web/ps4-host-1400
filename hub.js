(function(){
  'use strict';
  var sel=document.getElementById('firmware');
  var detected=document.getElementById('detected');
  var engine=document.getElementById('engine');
  var explain=document.getElementById('explain');
  var open=document.getElementById('open');
  var cache=document.getElementById('cacheStatus');
  var routes={};
  function add(list,name,path,note){var a=list.split(',');for(var i=0;i<a.length;i++){routes[a[i]]={name:name,path:path,note:note};}}
  add('9.00,9.03,9.04,9.50,9.51,9.60','PSFree + Lapse','900/version-selector.html','افتح قائمة إصدار GoldHEN ثم انتظر اكتمال التخزين الخاص بهذا المسار.');
  add('10.00,10.01,10.50,10.70,10.71,11.00,11.02','CSSFontFace + Lapse','css/stable/index.html','هذا هو المسار المبدئي لإصدار 10.50. يبدأ التشغيل يدويًا بعد اكتمال التخزين.');
  add('11.50,11.52','Slopkit','slopkit/version-selector.html','اختر نسخة التشغيل المناسبة، واتبع تعليمات التخزين في صفحة المحرك.');
  add('12.00,12.02,12.50,12.52,13.00,13.02,13.04,13.50,13.52,14.00','Afterglow','afterglow/index.html','بعد زيارة المسار بالإنترنت، تأكد من حفظ ملفات Afterglow للاستخدام دون اتصال.');
  function getFW(){var ua=navigator.userAgent||'';if(!/PlayStation 4/i.test(ua)||/PlayStation 5/i.test(ua))return '';var m=ua.match(/PlayStation 4[^0-9]*([0-9]{1,2}\.[0-9]{2})/i);return m?m[1]:'';}
  var actual=getFW();
  if(actual){detected.textContent='إصدار PS4 المكتشف: '+actual;sel.value=actual;}
  else {detected.textContent='لم يمكن تحديد إصدار الجهاز تلقائيًا — اختر الإصدار الصحيح يدويًا.';try{var saved=localStorage.getItem('momtaz.fw');if(saved&&routes[saved])sel.value=saved;}catch(e){}}
  function update(){var fw=sel.value,route=routes[fw];var mismatch=actual && fw && actual!==fw;
    if(!route){engine.textContent='غير محدد';explain.textContent='اختر إصدارًا من القائمة.';open.disabled=true;return;}
    engine.textContent=route.name;explain.textContent=mismatch?'تحذير: الإصدار المحدد لا يطابق إصدار PS4 الذي اكتشفناه.':route.note;
    open.disabled=!!mismatch;
    try{localStorage.setItem('momtaz.fw',fw);}catch(e){}
  }
  sel.addEventListener('change',update,false);
  open.addEventListener('click',function(){var route=routes[sel.value];if(route && !(actual && sel.value!==actual))location.href=route.path;},false);
  update();
  var a=null;try{a=window.applicationCache||null;}catch(e){}
  if(a){
    function status(){try{switch(a.status){case a.UNCACHED:cache.textContent='لم يُحفظ فهرس الموقع للعمل دون إنترنت';break;case a.IDLE:cache.textContent='فهرس الموقع مخزن محليًا؛ يجب تحميل ملفات كل محرك بصورة مستقلة';break;case a.CHECKING:cache.textContent='يجري فحص تحديثات التخزين…';break;case a.DOWNLOADING:cache.textContent='يجري حفظ ملفات فهرس الموقع…';break;case a.UPDATEREADY:cache.textContent='نُزّلت نسخة جديدة من الفهرس؛ أغلق الصفحة وأعد فتحها';break;case a.OBSOLETE:cache.textContent='انتهت صلاحية التخزين المحلي';break;default:cache.textContent='حالة التخزين غير معروفة';}}catch(e){}}
    var events=['checking','downloading','progress','cached','noupdate','updateready','error','obsolete'];for(var i=0;i<events.length;i++){try{a.addEventListener(events[i],status,false);}catch(e){}}
    status();
  }else cache.textContent='المتصفح الحالي لا يوفر Application Cache؛ اختبر الحفظ من PS4.';
})();
