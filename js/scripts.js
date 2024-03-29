$(function(){
	
	if (console) {
		l = function(a) {
			console.log(a);
		}
	}
	
	$('.hidden').each(function() {
		$(this).removeClass('hidden');
	});
	
	$('.warning').remove();
	
	/* start: home */
	
	$('#codeWrapper').fadeTo(0, 0).hide();
	
	var bugColor = '#FF0000', 
		okColor = '#FFF', 
		trnl = Array(), 
		iPiv = 0, 
		nextToTrans = 'hull', 
		currentCode = '';
	
	markError = function() {
		$('.uiContLeft').eq(iPiv).css('color', bugColor);
	};
	
	markValid = function() {
		$('.uiContLeft').eq(iPiv).css('color', okColor);
	};
	
	$('#uiHull').css({'height': '0px', opacity: 0.0});
	
	$('#customizeButton').click(function(){
		if (parseInt($('#uiHull').height()) === 0) {
			$(this).text('hide');
			$('#uiHull').stop().animate({height: $('#uiProxy').height() + 10 + 'px', opacity: 1.0}, 600);
		}
		else {
			$(this).text('customize');
			$('#uiHull').stop().animate({height: '0px', opacity: 0}, 600);
		}
	});
	
	$('.stillNot').click(function() {
		if (parseInt($('#uiHull').height()) === 0) {
			$('#customizeButton').click();
		}
		else {
			$('html, body').animate({scrollTop: '500px'}, 800);	
		}
	});
	
	$('#uiButtonApply').click(function() {	
		iPiv = 0;
		trnl = {};
		/* 1 */
		if ($('.uiContMid').eq(iPiv).find('input').val().match(/[0-9]/) && parseInt($('.uiContMid').eq(iPiv).find('input').val()) > 0) {
			trnl[iPiv] = $('.uiContMid').eq(iPiv).find('input').val();
			markValid();
			iPiv++; 
			
			/* 2 */
			if ($('.uiContMid').eq(iPiv).find('input').val().match(/[0-9]/) && parseInt($('.uiContMid').eq(iPiv).find('input').val()) > 0)	{
				trnl[iPiv] = $('.uiContMid').eq(iPiv).find('input').val();
				markValid();
				iPiv++;
			
				/* 3 */
				if ($('.uiContMid').eq(iPiv).find('input').val().match(/[0-9]/) && parseInt($('.uiContMid').eq(iPiv).find('input').val()) > 0)	{
					trnl[iPiv] = $('.uiContMid').eq(iPiv).find('input').val();
					markValid();
					iPiv++;
				
					/* 4 */
					if ($('.uiContMid').eq(iPiv).find('input').val().match(/[0-9]/) && parseInt($('.uiContMid').eq(iPiv).find('input').val()) > 0)	{
						trnl[iPiv] = $('.uiContMid').eq(iPiv).find('input').val();
						markValid();
						iPiv++;
						
						/* 5 */
						if ($('.uiContMid').eq(iPiv).find('select').val() === 'default') {
							trnl[iPiv] = 'default';
							iPiv++;		
						} /* end if 5 */ 
						else {
							trnl[iPiv] = 'random';
							iPiv++;
						};
						
						/* 6 */
						if ($('.uiContMid').eq(iPiv).find('select').val() === 'true') {
							trnl[iPiv] = true;
							iPiv++;	
						} /* end if 6 */
						else {
							trnl[iPiv] = false;
							iPiv++;	
						};
						
						/* 7 */
						if ($('.uiContMid').eq(iPiv).find('select').val() === 'default') {
							trnl[iPiv] = 'default';	
							iPiv++;	
						} /* end if 7 */
						else {
							trnl[iPiv] = 'random';
							iPiv++;	
						};
						
						/* 8 */
						if ($('.uiContMid').eq(iPiv).find('input').val().match(/[0-9]/) && parseInt($('.uiContMid').eq(iPiv).find('input').val()) > 0)	{
							trnl[iPiv] = $('.uiContMid').eq(iPiv).find('input').val();
							markValid();
							iPiv++;							
							
							/* 9 */
							if ($('.uiContMid').eq(iPiv).find('select').val() === 'true') {
								trnl[iPiv] = true;	
								iPiv++;	
							} /* end if 9 */
							else {
								trnl[iPiv] = false;
								iPiv++;	
							};
							
							/* 10 */
							if ($('.uiContMid').eq(iPiv).find('select').val() === 'true') {
								trnl[iPiv] = true;	
								iPiv++;	
							} /* end if 10 */
							else {
								trnl[iPiv] = false;
								iPiv++;	
							};
							
							//trnl[iPiv] = $('.uiContMid').eq(iPiv).find('input').val();
							//markValid();

							$('#' + nextToTrans + '').transcendance('transStop');
							$('#' + nextToTrans + '').children().each(function() {$(this).remove();});
							
							nextToTrans = 'trans_' + Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000) + '';
							
							beginNewtransc = setTimeout(function() {
								$('<div id=' + '"' + nextToTrans + '">' +
									'<img src=' + '"' + 'images/gallery/sicimg01.jpg' + '" /> ' +
									'<img src=' + '"' + 'images/gallery/sicimg02.jpg' + '" /> ' +
									'<img src=' + '"' + 'images/gallery/sicimg03.jpg' + '" /> ' +
									'<img src=' + '"' + 'images/gallery/sicimg04.jpg' + '" /> ' +
									'<img src=' + '"' + 'images/gallery/sicimg05.jpg' + '" /> ' +
									'<img src=' + '"' + 'images/gallery/sicimg06.jpg' + '" /> ' +
									'<img src=' + '"' + 'images/gallery/sicimg07.jpg' + '" />' +
									'</div>'
								).prependTo('#hull');
								$('#' + nextToTrans).transcendance({
									'transxLength': parseInt(trnl[0]), 
									'transyLength': parseInt(trnl[1]),
									'transAnimSpeed': parseInt(trnl[2]),
									'transAnimDelay': parseInt(trnl[3]),
									'transAnimType': trnl[4],
									'transAnimBounce': trnl[5],
									'transImgOrder': trnl[6],
									'transImgDelay': parseInt(trnl[7]),
									'transAutoAdjust': trnl[8],
									'transPause': trnl[9]
								});
							}, 1000);
						} /* end if 8 */
						else {
							markError();
						}
					} /* end if 4 */
					else {
						markError();
					};
				} /* end if 3 */
				else {
					markError();
				};
			} /* end if 2 */
			else {
				markError();
			};
		} /* end if 1 */ 
		else {
			markError();		
		};
	});
	
	$('#uiButtonCode').click(function() {
		
		currentCode = '$("#yourId").transcendance({\n';
		
		var currentCont = $('.uiContMid').eq(0).children().eq(0).val(),
			addCode = 0,
			codeLines = 1,
			defaultCode = Array(); 		/* only output code that differs from default settings */
		
		
		defaultCode = ['5', '5', '1200', '90', 'default', 'false', 'default', '2000', 'true', 'false'];
		
		for (i = 0; i < $('.uiContLeft').length; i++) {
			currentCont = $('.uiContMid').eq(i).children().eq(0).val();
			addCode = 1;
			
			if (currentCont === defaultCode[i]) {
				addCode = 0;	
			}
			
			if (addCode === 1) {
				if ($('.uiContMid').eq(i).children().eq(0).val() === 'true' || $('.uiContMid').eq(i).children().eq(0).val() === 'false') {
					currentCode += '"' + $('div.uiContLeft').eq(i).text() + '": ' + $('.uiContMid').eq(i).children().eq(0).val() + ', \n';
				}
				else {
					if (!parseInt($('.uiContMid').eq(i).children().eq(0).val())) {
						currentCode += '"' + $('div.uiContLeft').eq(i).text() + '": ' + '"' + $('.uiContMid').eq(i).children().eq(0).val() + '", \n';
					}
					else {
						currentCode += '"' + $('div.uiContLeft').eq(i).text() + '": ' + $('.uiContMid').eq(i).children().eq(0).val() + ', \n';	
					}
				}
				codeLines++;
			}
			
			if (i === $('.uiContLeft').length - 1) {
				currentCode = currentCode.substring(0, currentCode.length - 3);
			}
			
		}
		
		currentCode += '\n});';
		codeLines++;
		
		if (codeLines === 2) {
			currentCode = 'No non-default options have been set. Your code is \n\n$("#yourId").transcendance();';
			codeLines++;	
		}
		
		var wHe = $(window).height(),
			wWi = $(window).width();
		
		$('#codeOverlay').fadeTo(0, 0).css('display', 'block').stop().fadeTo(300, 0.5);
		$('#codeWrapper').html('<p><b>Your code was generated:</b></p>' + '<textarea class="codeLine">' + currentCode + '</textarea>' + '<p id="codeClose">close</p>');
		$('#codeWrapper textarea').css('height', codeLines * 15 + 'px');
		
		$('#codeWrapper').css({
			top: (wHe / 2) - ($('#codeWrapper').height() / 2) + 'px',
			left: (wWi / 2) - ($('#codeWrapper').width() / 2) + 'px'
		}).stop().fadeTo(0, 0).fadeTo(500, 1.0);
		
		
		$('#codeClose, #codeOverlay').live('click', function(){
			$('#codeOverlay').stop().fadeTo(300, 0, function() {
				$('#codeOverlay').hide();	
			});
			$('#codeWrapper').stop().fadeTo(500, 0.0, function(){
				$('#codeWrapper').html('');		
			});
		});
	});
	
	$(document).keyup(function(e) {
		if (e.keyCode === 13 && $('input').is(':focus')) {
			$('#uiButtonApply').click();
		}	
	});
	
	/////////////////////////////////
	
	waveAnim = function() {
		$('#wave').animate({backgroundPosition: '-2000px 50%'}, 30000, 'linear', function() {
			$('#wave').css('background-position', '0px 50%');
			waveAnim();	
		});	
	}
	
	//waveAnim();
	
	
	
	$(window).load(function() {
		$('#' + nextToTrans).transcendance({
			'transxLength': 10, 
			'transyLength': 1,
			'transAnimSpeed': 1200,
			'transImgOrder': 'random',
			'transAnimDelay': 90
		});
	});
	
	/* end: home */
	
}); /* doc ready */

