/*!
* jQuery transcendance Plugin
* Examples and documentation at: creutzgraphics.de/transcendance
* Copyright (c) 2011 Alexej Creutz
* Version: 0.1.5 (9-9-2011)
* Licensed under the GPL license:
* http://www.gnu.org/licenses/gpl.html
* Tested on: jQuery v1.6.2
* Bug reports can be sent to: info@creutzgraphics.de
*/

var transcendance = {
	ver: '0.1.5',
	status: 'beta'
	},
	trn = transcendance;

(function($){	
	
	/* Used for debugging */
	function cl(a) {
		if ($.browser.mozilla && console) {
			console.log(a);
		}
	};
	
 	var	transGlobal = [],	/* used to store all settings for each object initializing transcendance */
	methods = {
		init : function(options, settings) {
			return this.each(function() {
				options = options || {};
				
				var Tcont = $(this),
					transImgDimX = Tcont.find('img').eq(0).width(),
					transImgDimY = Tcont.find('img').eq(0).height(),
					transImgLength = Tcont.find('img').length,				/* checks how many images there are to be cycled */
					transImgInd = 0,										/* will be used to determine which image is being cycled */
					transCellPiv = 0,										/* determines which cell is being animated */
					transBounce = 0,										/* used for bounce state */
					transImgRmd = Array(),									/* saves the indexes of images that have/ have not been randomed */
					imagesRandomedTotal = 1,								/* counter to determine when to reset transImgRmd */
					
				/* define customizable settings */
				settings = {				
					'transxLength' : 5,					/* number of horizontal cells being spawned */
					'transyLength' : 5,					/* number of vertical cells being spawned */
					'transAnimSpeed': 1200,				/* speed of fading animation of a cell */
					'transAnimDelay': 90,				/* delay until the next cell is being animated */
					'transImgDelay': 2000,				/* delay until a new image gets cycled after all cells have faded in */
					'transAnimBounce': false,			/* true if you want to bounce fading direction */
					'transAnimType': 'default',			/* determines the order cells are being animated */
					'transImgOrder': 'default',			/* determines the type of order images are being cycled */ /* NOT IN USE */
					'transActive' : true				/* used for live update only */
				};	
				
				/* okay then, if the user has defined options, merge with default settings */
				if (options) { 
					$.extend(settings, options);
				};
				
				if (Tcont.attr('id') === '') {
					Tcont.attr('id', 'transEl');	
				}
				
				/* write the current settings into a global array */
				transGlobal['' + Tcont.attr('id') + ''] = settings;
				
				/* to access the settings more easily, make a shortcut for settings */
				s = settings;
				
				/* transImgDelay needs to be greater than transAnimSpeed + Delay */
				var transImgDelay = s.transAnimSpeed + s.transAnimDelay + s.transImgDelay + 100;
				
				/* now the transDisplay wrap is created which will include all the fluffy cells */
				$('<div class="transDisplay"></div>').css({
					width: Tcont.find('img').eq(0).width() + 1 + 'px',
					height: Tcont.find('img').eq(0).height() + 1 + 'px',
					'background': 'none',
					'background-repeat': 'no-repeat'
				}).prependTo(Tcont);
				
				/* .transDisplay can now be referred to as transD */
				var transD = Tcont.find('div.transDisplay:first');
				
				/* now each image src gets saved into an array and will later be used as cell background */
				transBgUrls = Array();
				
				for (i = 0; i < transImgLength; i++) {
					transBgUrls[i] = Tcont.find('img').eq(i).attr('src');
				};
				
				/* now all images in Tcont need to be hidden.. well, actually you can remove them */
				Tcont.find('img').remove();
				
				/* now the cells are being spawned and put into transD */
				for (k = 0; k < s.transxLength * s.transyLength; k++) {		
					$('<div class="transCell"></div>').appendTo($('.transDisplay'));
				};
				
				/* shortcut for the cells */
				var transDC = Tcont.find('div.transCell');
				
				/* check if image order is random to generate random start image */
				if (s.transImgOrder === 'random') {
					transImgInd = Math.floor(Math.random() * transImgLength);	
				}
				
				/* all the cells need some css now */
				transDC.each(function() {		
					$(this).css({
						width: (transImgDimX / s.transxLength), 
						height: (transImgDimY / s.transyLength), 
						'float': 'left',
						'overflow': 'hidden', 
						'background-image': 'url(' + transBgUrls[transImgInd] + ')',
						'background-position': '0px 0px',
						'background-repeat': 'no-repeat'
					});
				});
				
				/* now set the background position for each cell */
				var transRx = 0,
					transDumY = (-1) * (transImgDimY / s.transyLength),
					transDumX = (transImgDimX / s.transxLength);
				
				for (cc = 0; cc < s.transxLength * s.transyLength; cc++) {
					/* get the current cell */
					transL = transDC.eq(cc);
					
					/* get the current offset for x in background position */
					transDumX = transDumX + /*Math.round(*/(transImgDimX / s.transxLength)/*)*/;
					
					/* if the current cell is the first one in a row, set x positon to 0 and set y position one row lower */
					if (cc === (s.transxLength * transRx)) {				
						transDumX = 0;
						transRx++;
						transDumY = transDumY + /*Math.round(*/(transImgDimY / s.transyLength)/*)*/;
					};
					
					transL.css({'background-position': ((-1) * transDumX) + 'px ' + ((-1) * transDumY) + 'px'});		
				};
				
				/* now please hide all cells */
				transDC.stop().fadeTo(10, 0.01);
				
				/* ============================================================= */
				
				/* please give me the next random image to be cycled */
				function getRandomInd(a, f) {
					/* if all images have been randomed already, reset */
					if (imagesRandomedTotal === transImgLength) {
						imagesRandomedTotal = 1;
						for (i = 0; i < transImgLength; i++) {
							transImgRmd[i] = 0;
						}
						transImgRmd[transImgInd] = 1;
					};
					
					/* pick random image */
					transImgInd = Math.floor(Math.random() * transImgLength);
					
					/* search for image that has not been randomed in the current cycle */
					if (transImgRmd[transImgInd] === 1) {
						while (transImgRmd[transImgInd] === 1) {
							transImgInd = Math.floor(Math.random() * transImgLength);	
						};
						
					};
					
					imagesRandomedTotal++;
					f();
				};
				
				/* ============================================================= */
				/* transNext will start the next trancedance */
				function transNext(f) {
					if (s.transImgOrder === 'random') {
						transImgRmd[transImgInd] = 1;
						
						getRandomInd(0, function() {
							transDC.stop().fadeTo(0, 0.0, function() {
								transDC.css('background-image', 'url(' + transBgUrls[transImgInd] + ')');
							});
							
							if (transGlobal['' + Tcont.attr('id')].transActive === false) {
								return;
							}
							else {
								f();	
							}
						});
					} else {
						if ((transImgInd + 1) === transImgLength) {	
							transImgInd = 0;
						} 
						else {
							transImgInd++;
						}
						
						transDC.css('background-image', 'url(' + transBgUrls[transImgInd] + ')');
						
						for (i = 0; i < transDC.length; i++) {
							transDC.eq(i).stop().fadeTo(0, 0);
						};
						
						if (transGlobal['' + Tcont.attr('id')].transActive === false) {
							return;
						}
						else {
							f();	
						}	
					}
				};
				
				/* ============================================================= */
				
				/* and now create the default fading/ animation function */
				function transGo() {
					if (transCellPiv < transDC.length) {
						/* animate current (pivoted) cell */
						transDC.eq(transCellPiv).stop().fadeTo(s.transAnimSpeed, 1);
						
						transCellPiv++;
						
						/* and then wait for transAnimDelay milliseconds before the next cell is being animated */
						transWaitForNextAnim = setTimeout(function() {
							transGo();
						}, s.transAnimDelay);
					}
					/* but else, reset, set new bg url and start over */
					else {
						transCellPiv = 0;
						
						transWaitForNextImage = setTimeout(function() {
							transD.css('background-image', 'url(' + transBgUrls[transImgInd] + ')');	
							
							/* check if bounce is wanted */
							if (transBounce === 1) {
								transCellPiv = transDC.length - 1;
								transNext(transGoBounce);	
							}
							else {
								transNext(transGo);	
							}
						}, transImgDelay);
					}; /* else end */
				
				}; /* transGo end */
				
				/* ============================================================= */
				
				if (s.transAnimBounce) {
					transCellPiv = transDC.length - 1;
					transBounce = 1;
				}
				
				/* create Bounce function */
				function transGoBounce() {
					if (transCellPiv > (-1)) {
						/* animate current (pivoted) cell */
						transDC.eq(transCellPiv).stop().fadeTo(s.transAnimSpeed, 1.0);
						
						transCellPiv--;
						
						/* and then wait for transAnimDelay milliseconds before the next cell is being animated */
						transWaitForNextAnim = setTimeout(function() {
							transGoBounce();
						}, s.transAnimDelay);
					}
					/* but else, check for bounce mode, reset, set new bg url and start over */
					else {
						transCellPiv = 0;
						
						transWaitForNextImage = setTimeout(function() {
							transD.css('background-image', 'url(' + transBgUrls[transImgInd] + ')');	
							
							transNext(transGo);
						}, transImgDelay);
					}; /* else end */
				
				}; /* transGoBounce end */
				
				/* ============================================================= */
				
				/* animate random cell function */
				function transGoRandom() {
					/* if number of animated cells smaller than number of cells at all */
					if (transCellPiv < transDC.length) {
						transRandCur = Math.floor(Math.random() * (transDC.length));
						
						/* if the current cell has been randomed already, start the function again */
						if (transDC.eq(transRandCur).hasClass('transRandomed') && transCellPiv < transDC.length) {
							transGoRandom();
							return;
						} 
						else {
							transDC.eq(transRandCur).addClass('transRandomed').fadeTo(s.transAnimSpeed, 1.0);
							transCellPiv++;
							
							/* if all cells have been randomed, start again */
							if (transCellPiv === transDC.length) {
								
								transCellPiv = 0;
								Tcont.find('div.transRandomed').removeClass('transRandomed');
							
								transWaitForNextImage = setTimeout(function() {
									transD.css('background-image', 'url(' + transBgUrls[transImgInd] + ')');
										
									transCellPiv = 0;
									Tcont.find('div.transRandomed').removeClass('transRandomed');
									
									transNext(transGoRandom);
								}, transImgDelay);
							
							}
							/* if not all cells have been randomed, start over */	
							else {
								transWaitForNextAnim = setTimeout(function() {
									if (transGlobal['' + Tcont.attr('id')].transActive === false) {
										return;
									}
									else {
										transGoRandom();	
									}
								}, s.transAnimDelay);
							};
						}; /* else end */	
					}; /* if end */
				}; /* transGoRandom end */
				
				/* ============================================================= */
				
				/* check which animation type is wanted and start the relating function */
				if (s.transAnimType === 'default' && !s.transAnimBounce) {
					transGo();
				}
				else {
					if (s.transAnimType === 'random') {
						transGoRandom();
					}
					else {
						if (s.transAnimBounce && s.transAnimType === 'default') {
							transGoBounce();	
						};
					}; 
				};
			}); /* each end */			
		}, /* init end */
		transStop : function() {
			transGlobal['' + $(this).attr('id') + ''].transActive = false;
		}
	};
	
	$.fn.transcendance = function(method) {
		if (methods[method]) {
	      return methods[method];
	    } else if (typeof method === 'object' || ! method) {
	      return methods.init.apply(this, arguments);
	    } else {
	      $.error('invalid method dude');
	    }
	};

})(jQuery);