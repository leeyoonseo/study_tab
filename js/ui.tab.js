'use strict';
 /*
* @author Lee yoonseo (2019.05.30)
* 탭 버튼 클릭 시 컨테이너 show, hide
* @param options {object}
* - multi : true일 때, 분기문 실행(tab이 디자인 상 떨어져있을때)
* - mouseover : true일 때 마우스 오버 시 이벤트 호출
* - tab : 처음 tab을 호출한 객체
* - defaultTab : 0이 기본이고, 처음 눌러져야 할 탭 index
* - container[필수] : 탭 클릭 시 보여져야하는 콘텐츠들의 상위 객체
*/ 
(function($){

  $.fn.tabManager = function(options){
    var info = {
      multi : false, // info.tab이 두개가 될 때
      mouseover : false, // 마우스 오버 시 탭 
      tab : this, // tab은 호출한 객체
      defaultTab : 0, // 처음에 오픈 될 탭의 숫자 값 {string} or {number}
      container : '' // 탭 버튼 클릭 시 노출 될 콘텐츠 {string}
    }

    if(options) info = $.extend(true, info, options);

    var _init = (function(info){
      var $tab = info.tab;
      var $tabParent = $tab.parent();

      // 탭 클릭
      $tab.on('click', function(e){
        e.preventDefault();
        setClass($(this));
      });
      
      $tab.on('mouseover', function(){
        // 마우스 오버 설정을 했을 때
        if(info.mouseover) $(this).trigger('click');
      });

      // info.tab의 부모가 여러개 일 경우(여러개의 탭을 같은 이름으로 사용할 경우)
      ($tabParent.length > 1 && !info.multi) ? $tabParent.each(function(){ triggerClick($(this).children()); })
                              : triggerClick($tab);

    })(info);

    // 클래스 추가 및 삭제
    function setClass(target){
      var $content = $( target.attr('href') );
      // 탭
      target.closest('.tab').find('a.on').removeClass('on').end().end().addClass('on') ;
      // 콘텐츠
      $content.siblings().removeClass('on').end().addClass('on');
    }

    function triggerClick(target){
      var $target = target.closest('.tab').find('a').eq(info.defaultTab);
      $target.trigger('click');
    }
  };
}(jQuery));