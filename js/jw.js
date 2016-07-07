$(function(){
	// qrcode
	$('.qrcode').mouseenter(function(){
		var jid = $(this).attr('id');
		if(jid != 'wx' && jid != 'wb' && jid != 'tb') return;
		$('#'+jid)[0].src='img/'+jid+'1.png';
		$('#'+jid+'2').show();
	}).mouseleave(function(){
		var jid = $(this).attr('id');
		if(jid != 'wx' && jid != 'wb' && jid != 'tb') return;
		$('#'+jid)[0].src='img/'+jid+'.png';
		$('#'+jid+'2').hide();
	})
	// go up
	$('#gt').click(function(){
		window.scrollTo(0, 0);
	})

	$('#wb').click(function(){
		location = 'http://weibo.com/p/1006061744205384/home?from=page_100606&mod=TAB&is_all=1'
	})

	$('#tb').click(function(){
		location = 'http://tieba.baidu.com/f?ie=utf-8&kw=%E7%BB%9D%E5%91%B3%E7%BE%8E%E9%A3%9F';
	})

	$('.m_header_left').click(function(){
		if($(this).attr('src') == 'img/menu.svg'/*tpa=http://www.juewei.cn/js/img/menu.svg*/){
			$(this).attr('src', 'img/close.svg'/*tpa=http://www.juewei.cn/js/img/close.svg*/);
			$('.m_mask').show();
		}else{
			$(this).attr('src', 'img/menu.svg'/*tpa=http://www.juewei.cn/js/img/menu.svg*/);
			$('.m_mask').hide();
		}
	})

	$('.m_mask').click(function(){
		$('.m_header_left').attr('src', 'img/menu.svg'/*tpa=http://www.juewei.cn/js/img/menu.svg*/);
		$('.m_mask').hide();
	})
})