'use strict';

/*
* @author Lee yoonseo (2019.05.30)
* 탭 버튼 클릭 시 컨테이너 show, hide
*/
var tabManager = (function(){
  //default 옵션
  var info = {
    multi : false,
    tab : '.tab a', // 탭 버튼 {string}
    defaultTab : 0, // 처음에 오픈 될 탭의 숫자 값 {string} or {number}
    container : '.container_on' // 탭 버튼 클릭 시 노출 될 콘텐츠 {string}
  };

  var _privateFunc = {
    // 이벤트 추가
    attachEvent : function(){
      var $tab = $( info.tab );

      // 탭 클릭
      $tab.on('click', function(e){
        e.preventDefault();
        
        // 탭
        setClass($(this));
        // 콘텐츠
        setClass( $($(this).attr('href')) );
      });
      
      $tab.on('mouseover', function(){
        // 마우스 오버 clss가 있을 때
        if($(this).closest('.mouseover').length > 0) $(this).trigger('click');
      });

      // default 탭 클릭
      var $tabParent = $tab.parent();
      // info.tab의 부모가 여러개 일 경우(여러개의 탭을 같은 이름으로 사용할 경우) 
      ($tabParent.length > 1) ? $tabParent.each(function(){ triggerClick($(this).children()); })
                              : triggerClick($tab);
    }
  }

  // 클래스 추가 및 삭제
  function setClass(target){
    target.siblings().removeClass('on').end().addClass('on');
  }

  function triggerClick(target){
    target.eq( info.defaultTab ).trigger('click');
  }

  return {
    set : function(addInfo){
      // 옵션 확장
      if(addInfo) info = $.extend(true, info, addInfo); 
      _privateFunc.attachEvent();
    },
  }
})();


