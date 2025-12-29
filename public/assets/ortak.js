$(function(){
	doc=$(document);
	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	if(supportsTouch!=1){
		$("body").addClass("mousedetected");
	}

	$(document).on("click",".on",function(e){/*open next*/
		$(this).next("div,ul").slideToggle(100).focus();
	});

	$(document).on("click",".sn",function(e){/*open next*/
		e.stopPropagation();
		$(this).next("div,ul").toggle(10).focus();
	});
	$(document).on("click",".sn+div",function(e){
		e.stopPropagation();
	});
	$(document).on('click',function(e){
		if( $(".myaccount:hidden").length==0 )
		$(".myaccount").css('display','none');
	})

	$(document).on("click",".ta",function(e){/*this active*/
		e.stopPropagation();
		$(this).toggleClass("active");//.focus();
	});
	/* $(document).on("blur",".ta",function(e){
		$(this).toggleClass("active");
	});	 */

	$(document).on("click",".na",function(e){/*next active*/
		$(this).next("div,ul").toggleClass("active");
	});

/* 	$('input.konutarihi').after('<div class="clndr pa z9 b df fdr fw dn- p-2 z999 bg-fff"></div>');
	date = new Date();
	y=date.getFullYear();m=date.getMonth();d=date.getDate();wd=date.getDay();
	date.setDate(m-35);
	for(i=1;i<40;i++){
		date.setDate(date.getDate()+1);mt=date.getMonth();;
		if(mt==m){
			$('.clndr').append('<b>'+date.getDate()+'</b>');
			if(i%7==0)
			$('.clndr').append('<b class="w-100 p-0 b0"></b>');
		}
	}
	 */


	$('.tarih').click(function(){
		$(this).next('clndr').addClass('df');


	})

	$(document).on("mouseover",".hon",function(e){
		e.stopPropagation();
		t=$(this);
		t.addClass("active");
		t.next("div,ul").slideDown(0);

	});
	$(document).on("mouseleave",".hon",function(e){
		t=$(this);
		setTimeout(function(){
			t.removeClass("active");
			t.next("div,ul").slideUp(200);

		},1);
	});
	$(document).on("mouseover",".hon+*",function(e){
		t=$(this);
		t.slideDown(0);
	});
	$(document).on("mouseleave ",".hon+*",function(e){
		$(this).slideUp(0);
		$('.hon').removeClass('active')

		setTimeout(function(){
		},5);
	});



/* 	$('body *').click(function(e){
		e.stopPropagation();
		t=$(this);
		//alert (t.parents('.accordion').length)
		if ( $('.accordion').children('h2.active').length==1 && t.closest('.accordion').length==0){
			$('.yatirim_merkezleri').closest('.body').hide();
			$('.yatirim_merkezleri').closest('.accordion').children('h2').removeClass('active');
		}
	}) */

	$(document).on("click",".yatirim_merkezleri a",function(e){
		$(this).closest('.accordion').children('h2').removeClass('active');
		$(this).parents('.body').hide().slideUp(0);
		$('.hon').removeClass('active')
	})

	$('.onhandle,.opn').each(function(){
		t=$(this);
		t.parent().addClass("onhandle_container")
	})

	$(document).on("click",".onhandle,.opn",function(e){/*open parent next*/
		t=$(this);
		t.parent().next("div,ul").slideToggle(100);
		setTimeout(function(){
			//t.parent().next("div,ul")//.toggleClass("open");
		},150);
	});

	$(document).on("click",".nextrmvdn",function(e){
		t=$(this);
		t.next().toggleClass("dn");
	});

	$(document).on("click",".nav-tabs> .nav-item",function(e){
		let t=$(this);


		$(this).addClass('active').siblings().removeClass('active');

		let target=$(this).data("target");
		let tabtarget=$(this).data("tabtarget");
		if (target){
			t.parent().next(".tab-content").children('[data-target="'+target+'"]').first().addClass("active").siblings("div").removeClass("active");
		}else if (tabtarget){
			$(".tab-content").children('[data-tabtarget="'+tabtarget+'"]').first().addClass("active").siblings("div").removeClass("active");
		}else{
			//tindex=$(this).index();
			var tindex=$(this).parent().children('.nav-item').index(this);
			t.parent().next(".tab-content").children().eq(tindex).addClass("active").siblings().removeClass("active");
			if ($(this).parents('.tab-round').length>0){
				if (tindex==0) deg=-45
				else if (tindex==1) deg=45
				else if (tindex==2) deg=-90
				else if (tindex==3) deg=90
				else if (tindex==4) deg=-135
				else if (tindex==5) deg=135
				$('.tab-hand').css('transform','rotate('+deg+'deg)')
			}
		}
	});

	var tabindex=0;
	$.fn.maketab = function(e){
		tabindex++;
		let tabs=$(this);
		tabs.each(function(){
			let tb=$(this);	  //.data('target','tab'+tabindex)
			tb.children().eq(0).addClass("nav nav-tabs").children().addClass("nav-item").eq(0).addClass("active").click();
			tb.children().eq(1).addClass("tab-content").children().addClass("tab-pane p-2 p-md-0").eq(0).addClass("active");
		});
	};
	
	
	$(".tab-container").maketab();
	setTimeout(function(){
		$('.firm-card-tab-content .tab-pane').removeClass('p-2').addClass('py-2')
	},100);

/* 	setTimeout(function(){
		$('.nav-tabs').find('.nav-item').eq(0).append('<span class="glider"></span>');
	},500);
	$(document).on("click",".closeit",function(e){
	});
	$(document).on("click",".close_scl",function(e){
	});
	*/

	$(document).on("click",".closex",function(e){
		$(this).closest(".closen").hide();
		$(this).closest(".closendn").addClass('dn');
		$(this).closest('.scl').removeClass('scl');
		$(this).closest('.closeit').removeClass('b-0 t-0');
	});
	$(document).on("click",".closeself",function(e){
		$(this).addClass('dn');
	});



	var toolid=0,ctip;
	$(document).on("mouseover","[data-title]",function(e){
		var t=$(this);
		if(t.find('.tooltiptext').length==0){
			tid='tooltip'+toolid;
			t.attr('data-tooltipid',tid);
			t.append('<div class="tooltiptext" id="'+tid+'">'+t.attr('data-title')+'</div>');
			toolid++;
		}
	})


	$('.bulten_rapor .check_until_next').click(function(e){//checkall
		e.stopPropagation();
		t=$(this);
		true_false=t.children().prop('checked');
		t.nextUntil('.check_until_next').children('input').prop('checked',true_false);
	})

	$('.bulten_rapor .check_until_next').each(function(){//init
		t=$(this);
		check_kontrol(t);
	})

	$('.bulten_rapor input').click(function(e){
		t=$(this);
		if(t.closest('.check_until_next').length==0){
			$('.bulten_rapor .check_until_next').each(function(){
				t=$(this);
				check_kontrol(t);
			})
		}
	})


	//PLUGINS
	$.fn.select2 = function(e){
		let s2s=$(this);
		s2s.each(function(){
			var tt=$(this);
			if(tt.prop('tagName')==='SELECT' && !tt.attr('class').match(/selected2/)){
				tt.addClass('selected2');
				var divselect=$('<div class="newselect" ><span class="db on assigned">Seçiniz</span> \
				<div class="onext pa ra-1 oh mt-1"><input type="text" class="w-100 p-2 select2-search" placeholder="Search..."/><div class="body"></div></div></div>');
				var ic=tt.html().replace(/<(\/?)optgroup([^<>]*?)>/gim,'<$1h3$2>').replace(/<(\/?)option([^<>]*?)>/gim,'<$1a$2>');
				['class','alt','style'].forEach(function(ee){if(tt.attr(ee)) divselect.attr(ee,tt.attr(ee));});
				var selected=tt.find('option:selected').text();
				divselect.find('span').addClass('p-2').text(selected);
				divselect.find('.body').html(ic).find('a').addClass('hvr'); //'<a>Hisse Senedi Arayın</a>'+
				tt.addClass('dn').hide().before(divselect);

				$(document).on('click',function(e){
					setTimeout(function(){
						divselect.find('.onext').hide();
					},25);
				})
				$(document).on('click','.selected2',function(e){
					e.stopPropagation();
				})

				divselect.on('input','input',function(){
					var rx=new RegExp(''+$(this).val()+'','gi');
					js_lookup( $(this).next('.body').children('a') ,rx);
				}).on('click','a',function(){
					var t=$(this);var v=t.text();
					t.closest('.onext').hide();
					if(t.attr('value')) v=t.attr('value');
					divselect.find('.assigned').html(v);
					//alert(tt.find('option[value="'+v+'"]').length)
					tt.attr('aria-selected',v).val(v).change();
					//.find('option[value="'+v+'"]').prop('selected',true);

				}).on('click','.on',function(){
					setTimeout(function(){
						divselect.find('input.select2-search').eq(0).focus();
					},50);
				});
			}
		})
	}

	$('.select2').select2();

});//ready
function check_kontrol(t){
	cn(t.nextUntil('.check_until_next').children('input').length+' - '+t.nextUntil('.check_until_next').children('input:checked').length)
	if(t.nextUntil('.check_until_next').children('input').length==t.nextUntil('.check_until_next').children('input:checked').length){
		t.find('input').prop('checked',true);
	}else{
		t.find('input').prop('checked',false);
	}
}

function a(x=''){
	alert(x);
}

function js_lookup(jq_obj_list,rx){
	jq_obj_list.each(function(){
		let txtValue = $(this).text();
		if (txtValue.replace(/İ/g,'i').replace(/ı/g,'I').match(rx)) {
			console.log(txtValue);
			$(this)[0].style.display = "";
		} else {
			$(this)[0].style.display = "none";
		}
	})
}
