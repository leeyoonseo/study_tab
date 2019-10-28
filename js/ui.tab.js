/**
 * 탭 매니저
 * @author yoonseo Lee (2019.05.30)
 * @refactoring yoonseo Lee (2019.10.25)
 * @options
 *   tabArea {String} - a태그를 감싸고 있는 id, class 값
 *   contentArea {String} - 콘텐츠 태그를 감싸고 있는 id, class 값
 *   defaultTab {Number, Boolean} - 처음에 오픈 될 탭의 숫자 값, 미 입력 시 기본이 0. true = 1, false = 최초 오픈되지 않음
 *   mouseover {Boolean} - 마우스 오버 가능
 */
(function($){
    'use strict';

    $.fn.tabManager = function(options){  
        var managerEl = $(this);
        var options = $.extend(true, {
            tabArea : '.tab_box',
            contentArea : '.container', 
            defaultTab : 0,
            mouseover : false 
        }, options);
        
        init();
        
        // ----------------------------------------------------------------------

        // 최초 실행
        function init(){
            attachEvent();

            // 기본 탭 오픈 옵션이 필요없는 경우
            if(options.defaultTab === false) return false;

            if(managerEl.length > 1){
                managerEl.each(function(){
                    onClickDefaultTab($(this));
                });

            }else{
                onClickDefaultTab(managerEl);

            }
        }

        // 이벤트 바인딩
        function attachEvent(){
            var allTabEl = managerEl.find('a');

            allTabEl.on('click', function(e){
                e.preventDefault();
                onToggleClass($(this));
            });

            // 마우스오버 옵션
            if(options.mouseover){
                allTabEl.on('mouseover', function(e){
                    e.preventDefault();
                    $(this).trigger('click')
                });
            }
        }

        // 기본 탭 오픈
        function onClickDefaultTab(tab){
            var tabEl = tab.find('a').eq(options.defaultTab);
            tabEl.trigger('click');
        }

        // 컨텐츠 오픈
        function onToggleClass(tabEl){
            var contentEl = $(tabEl.attr('href'));
            
            // 탭
            tabEl.closest(options.tabArea).find('.on').removeClass('on');
            tabEl.addClass('on');

            // 콘텐츠
            contentEl.closest(options.contentArea).find('.on').removeClass('on');
            contentEl.addClass('on');
        }

    }; // tabManager
}(jQuery));