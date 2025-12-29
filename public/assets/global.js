$(function(){
	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	if(supportsTouch!=1){
		$("body").addClass("mousedetected");
		whatsapp_link=$('.whatsapp_mouse_detect a').data("desktop");
	}else{
		$("body").addClass("mobiledevice");
		whatsapp_link=$('.whatsapp_mouse_detect a').data("mobile");
	}
	$('[href*=".whatsapp.com/send?phone="]').attr("href",whatsapp_link);

	var doc=$(document),
	lh=location.href,
	lh=lh.replace(/\/$/g,""),
	h=document.documentElement.clientHeight,
	wi=window.innerHeight,
	hi=$(document).height();

	md=$(".mousedetected").length;
	mousedetected=$(".mousedetected").length;

	if ($('.kategorisi').length)
	katid=$('.kategorisi').val();



	if($('.sidebar').length){
		var lh_current=lh;
		if($('article').length){
			var lh_current=$('a.breadcrumb-item:last-child').prev('a.breadcrumb-item').attr('href').trim('/').replace(/.+\/(.+?)$/,'$1');
		}

		$('.sidebar .duzey1 a[href*="'+lh_current+'"]').eq(0).addClass("t-p2");
		$('.sidebar .duzey1 a[href*="'+lh_current+'"]').parents(".sub-side").prev().addClass("open");
		$('.sidebar div.sub-side').prev("li").children("a").removeAttr("href");
		$('.sidebar .d2').next('.sub-side').each(function(){
			var t=$(this);t.prev().find('i.fa').addClass("down");
		})


	}

	$(document).on("click",".sidebar li",function(e){
		t=$(this);
		t.siblings('.on').next('div').hide();
	});


	/*sayfa start*/
	$(document).on("click",function(e){
		if ( $(e.target).closest(".accordion.select").length == 0){
			$(".accordion.select").find('h2').removeClass('active').next('.body').slideUp(150);
		}
	});
	$(document).on("click",".accordion> h2",function(e){
		t=$(this);
		if (t.hasClass('active'))
			t.next().slideUp(150);
		else
			t.next().slideDown(150);

		setTimeout(function(){
			t.toggleClass("active");
		},10);
	});
	if($('article').length && $('.accordion').length && $('article').attr('alt').match(/sirket-bilgileri/)){
		$('.accordion h2').addClass('active').next().show();
	}


	tabarr=[...Array($(".tab").length).keys()];
	$('article .tab').addClass("bg-d").each(function(e){

		t=$(this);
		t.before('<div class="nav-tabs df fw tab_inx_'+e+'"></div>'); //'+(+new Date())+'
		t.before('<div class="tab-content bt tab_content_inx_'+e+'"></div>');

		current_t=t;

		h2=current_t.children('h2').detach();
		$('.nav-tabs.tab_inx_'+e).append(h2.addClass("nav-item active"));

		body=current_t.children('.body').detach();
		$('.tab-content.tab_content_inx_'+e).append(body.addClass("tab-pane pt-3 active"));
		current_t.addClass("done_to_remove");
		tabarr.forEach(function(ee){
			current_t=current_t.next('.tab')
			if (current_t.length){
				h2=current_t.children('h2').detach();
				$('.nav-tabs.tab_inx_'+e).append(h2.addClass('nav-item'));

				body=current_t.children('.body').detach();
				$('.tab-content.tab_content_inx_'+e).append(body.addClass("tab-pane pt-3"));
				current_t.addClass("done_to_remove");//.prev('.tab').remove();
			}
		})
		$('.done_to_remove').remove();
	});
	/*sayfa end*/

	var orj_title=document.title;
	$(window).focus(function() {
	   document.title = orj_title;
	});

	$(window).blur(function() {
	   //document.title = '';//tab not focus title
	});



	$('[type=radio][name=same]:not([id])').each(function(e){
		t=$(this);
		t.attr("id","_same"+e);
		t.next("label").attr("for","_same"+e);
	});


	$(document).on("click",".mousedetected .menu>li.menu-item:not(:first-of-type)> a",function(e){
		return false;
	});

	$(document).on("click",".mobiledevice .menu li a",function(e){
		$(this).closest('li').siblings('.active').removeClass('active');
		if ($(this).next('ul').length>0){
			$(this).toggleClass('active');
			return false;
		}
	});




	$('.call-here li').hover(function(e){  play('./lib/sound/ss.mp3');    });

	$("*[data-tooltip]").each(function(e){
		$(this).prepend('<div class="tooltip">'+$(this).attr("data-tooltip")+'</div>');
	});






	var scroll,trns,scroll2,
	baslangic=0,
	reading=$('#reading-position'),oran=0;
	scrollup=$('.scrollup'),oran=0;
	$(".scrollup").hide();
	$(document).on("scroll",function(){

/* 		//$('.mousedetected .menu ul').addClass('dn')
		if (scroll>5){
			setTimeout(function(){
				//$('.mousedetected .menu ul').removeClass("dn");
			},80);
		} */
		scroll=document.documentElement.scrollTop
		scroll=$(window).scrollTop();
		maxh=$(document).height()-$(window).height();

		oran=Math.round(scroll/maxh*100);
		string_oran=oran+"%";
		reading.css("width", string_oran )
		scrollup.css("background","conic-gradient(rgb(94, 94, 94) "+string_oran+", rgb(211, 211, 211) "+string_oran+")");

		if (baslangic==0 && scroll>60){
			$("body").addClass("scrolled");
			$(".scrollup").show();
			baslangic=1;
		}else if (baslangic==1 && scroll==0){
			baslangic=0;
			$("body").removeClass("scrolled");
			$(".scrollup").hide();
		}


		$(".menu-triger").removeClass("open");
		$(".menu").removeClass("open");
		$(".menu").find(".open").removeClass("open");

	});

	$('.mousedetected .menu .col-9').each(function(){
		t=$(this);
		rm=t.find('a').length%3;
		t.find('a').slice(-rm).addClass('b-0');
	})

	function animateElement(){
		var first=0;
		var elem = $(this);
		var oTop2 = elem.offset().top - wi;
		if (first==0 && wst > oTop2-60){
			elem.addClass(elem.data('anim')+" animated");
			first=1;
		}else {
			elem.removeClass("animated");
		}
	}


	var wst=$(window).scrollTop(),
	dan=$('[data-anim]').length,
	ast=0;
	if (dan>0){
		$('[data-anim]').not(".animated").each(animateElement);
	}

	$(window).scroll(function() {
		wi=window.innerHeight;
		wst=$(window).scrollTop()
		if ($('.event-counter').length){
			var oTop = $('.event-counter').offset().top - window.innerHeight;
			if (ast==0 && $(window).scrollTop() > oTop-80){
				$(".event-counter").eventcounter();
				ast=1;
			}
		}
		if (dan>0){
			$('[data-anim]').not(".animated").each(animateElement);
		}
	});


	/*ortak.js de ta*/
	/* $(document).on("click",".footer",function(e){
		if ($(this).closest(".ta").length==0)
		$(".ta").removeClass("active");
	}); */

	$(document).on('click','.bulls-assist-menu-back',function(e){
		$(this).siblings('.bulls-assist-btn').removeClass('active');
	});

	$(".mce-toc h2").append('<a class="toggle-content-table" onclick="$(\'.mce-toc ul\').toggle()"><i class="fl-bigmug-line-sort48"></i></a>');


	function array_unique(value, index, self) {
	  return self.indexOf(value) === index;
	}


	$(document).on('click','a:contains("excel_kolon_adi")', function(){
		a=$(this).closest("th").index();
		$(this).closest("table").find("tbody").find("tr").each(function(){
			b=$(this).find("td").eq(a).text();
		});
	});



/* 	$(document).on('submit', '#musterikayit',function (e){
		let roleChecked = $("input[name='ilgilendiginiz_urunler[]']:checked").length;
		if (!roleChecked) {
			alert("En az bir adet ilgilendiginiz ürünlerden işaretleme yapmalısınız.");
			e.preventDefault();
			return false;
		}
	}); */

	$(document).on('keydown', function (e){
		key=(e.which||e.keydown);
		if (key==27){
			setTimeout(function(){
				$.fancybox.close();
				$(".fancybox-button--close").click();
				},700);
			$.fancybox.close();
			$(".fancybox-button--close").click();
		}
	});

	$(document).on('keyup','[type="tel"]',function(e){
		key=(e.which||e.keydown);
		f=[8,37,39,46];
		if (f.indexOf(key)==-1){
			var num = $(this).val().replace(/\D/g,'');
			$(this).val(
				0 + '(' + num.substring(1,4)
				+(num.length>3?') ':'')
				+(num.length>4?''+num.substring(4,7):'')
				+(num.length>7?' '+num.substring(7,9):'')
				+(num.length>9?' '+num.substring(9,11):'')
			);
			ss=$(this)[0].selectionStart;
		}
	});
	$(document).on('keyup','[name="dogum_tarihi"],[name="tarih"]',function(e){
		key=(e.which||e.keydown);
		f=[8,37,39,46];
		if (f.indexOf(key)==-1){
			var num = $(this).val().replace(/\D|-/g,'');
			if (num.substring(0,2)>31)
				alert("Gün 31 den büyük olamaz Örnek: 15-09-1980");
			if (num.substring(2,4)>12)
				alert("Ay 12 den büyük olamaz  Örnek: 15-09-1980");
			$(this).val(

				num.substring(0,2)
				+(num.length>1?'-':'')
				+(num.length>2?''+num.substring(2,4):'')
				+(num.length>3?'-':'')
				+(num.length>4?''+num.substring(4,8):'')
			);
			ss=$(this)[0].selectionStart;
		}
	});

	setTimeout(function(){
		$(".img-container,.img-c").addClass("dark");
	},3500)


	window.onresize = function(event) {
		max=$(document).height()-$(window).height();

		slideitonresize();
	};

/* 	$(document).on("click",".basvur",function(){
		urunad=$(this).data("urunad");
		$('html').addClass("modal-open");
		$(".popup3.general-popup").removeClass("dn");
		$(".popup3.general-popup .card").html(load);
		$(".popup3.general-popup .card").load("goo",{islemtipi:'basvuru_formu', urunad},function(){});
	}); */




	setTimeout(function(){
		$('.toast3').removeClass('b-0 t-0');
	},9000);

	$(document).on("click",".musterigirisi",function(e){
		expires = new Date(Date.now() + (360*24*60*60*1000) );
		expires = "expires="+expires.toUTCString();
		if($(this).prop('checked')){
			$('.email').attr('name','hesapno').attr('pattern','\\d+').attr('placeholder','Hesap No');
			document.cookie="musterigirisi=1;secure;"+expires+";path=/";
			$('.sifremi-unuttum').hide();
		}else{
			$('.email').attr('name','email').attr('pattern','.+@.+\\...+').attr('placeholder','E-posta Adresiniz');
			document.cookie="musterigirisi=0;secure;"+expires+";path=/";
			$('.sifremi-unuttum').show();
		}
	});

	try{
		if(getCookie("musterigirisi")==1){
			$('.musterigirisi').click();
		}
	}catch(a){}


	$(document).on("click",".close,.modalBackground",function(e){
		e.stopPropagation();
		$(this).closest(".modal,.popup,.modal2").addClass("dn");
		$("html,body").removeClass("modal-open").removeClass("oh");

	});


	$(".copylink").click(function(){
		$(".copytemp").focus();
		$(".copytemp").select();
		try {
			var successful = document.execCommand('copy');
			if (successful){
				$("body").append("<div class='bildirim'><a rel='nofollow' class='close' onclick=\"this.parentNode.style.display='none';\">×</a><h3>Bildirim</h3><hr>Mesaj linki kopyalandı (CTRL+V) ile istediğiniz yere yapıştırabilirsiniz. <p/><br/>Not:Bildirim Otomatik Kapanacaktır.</div>");
				setTimeout(function(){$(".bildirim").hide(0);},2200);
			}else{prompt("CTRL-C ile Kopyalayabilirsiniz", nn);}
		}catch(err){
			prompt("CTRL-C ile Kopyalayabilirsiniz", nn);
		}
	});

	$(document).on('click','.scrollup,.to-top', function (){
		$("html, body").animate({scrollTop: 0 }, 60);
		return false;
	});

	$(".menu-triger").click(function(){
		$(this).toggleClass("open");
		$(".menu").toggleClass("open");
		$(".menu").find(".open").removeClass("open");
	});


	$(document).on("click",".searchtoggle",function(e){
		$('.btn_mobil_search').click();

/* 		if ( $('.search-text').val()!='' && $(".desktop-search.header-search.dn").length==0 ){
			$('.desktop-search.header-search form').submit();
			return false;
		}

		$(".menu").removeClass("open");
		$(".menu-triger").removeClass("open");
		if (md){
			$(".header-search").toggleClass("dn");
		}
		setTimeout(function(){
			$(".header-search input").focus();
		},200);
		return false; */
	});


	$(document).on('click','.morearticle',function(e){
		$(this).next(".more_result").html(load);
		$(this).next(".more_result").load("yazi_listesi.php?"+$(this).attr("alt"));
		$(this).remove();
	});


	$.fn.eventcounter = function(e) {
		ifa=[];
		$(this).find("span b").each(function(e) {
			ifa[e]=$(this).find("i").prop("outerHTML");

			if (ifa[e]) ifa[e]+="<br>";
			else ifa[e]='<i class="fl-bigmug-line-checkmark16"></i><br>';

			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 1200,
				easing: 'swing',
				step: function (now) {
					$(this).html(ifa[e]+Math.ceil(now));
				}
			});
		});
	};



	$('.hisse-degistir').change(function(){
		var t=$(this);
		if(t.val() && t.val()!=''){
			location.href=$('.logo-container .logo').attr('href')+'hisse-analiz/'+(t.val());
		}

	})

/* 	$.fn.shake = function(e) {
		var t=$(this)
		t.addClass('shake');

	};
	 */





	var sdr=0;
	var timer=[];
	$.fn.makeslider = function(e){
		sdr++;
		var bolen=1,clone_adt;
		var i,frst,lst,lst_i,trns,adt,ww,ii,sss,scope,d,d2;
		setTimeout(function(){
			$(".slider,.carousel").removeClass("vh");
		},500);
		if ($(this).length==0)
			return false;
		var s=$(this);
		var ss=s.parent();
		if(s.parents('.slider-scope').length){
			var scope=s.parents('.slider-scope');
		}else{
			var scope=ss;
		}

		var cls2="",cls=s.attr("class");
		if (cls.match(/carousel/)){
			cls2="carousel-container";
		}

		ss.attr('id','newslider-'+sdr).addClass('slider-container '+cls2+' oh')
		s.addClass("simple-body").attr('sdr_index',sdr).children().addClass("slider-item");
		scope.find('.slider-text').eq(0).addClass('active aos-animate');

		ww=$('body').width();
		adt=s.children().length,i=1;

		if (s.attr('alt')!=undefined ){
			var bolen=parseFloat(s.attr('alt'));
		}else{var bolen=1;}

		ss.attr("data-slidercount",adt);
		ss.find("img").attr("draggable",false);

		if (adt>1){
			//lst = s.children(".slider-item").last().clone().addClass("duplicate") ;
			clone_adt=Math.ceil(bolen)+2;
			lst = s.children(".slider-item").slice(-clone_adt).clone().addClass("duplicate");//get();
			if (s.attr('class').match(/carousel/)){
				frst=s.children(".slider-item").slice(0,clone_adt).clone().addClass("duplicate");//.get();
				/* s.children(".slider-item").each(function(e){
					if(e<5) s.append( $(this).clone().addClass("duplicate") );
				})  */
			}else{
				frst = s.children(".slider-item").first().clone().addClass("duplicate") ;
			}



			s.append( frst ).prepend( lst );


			$('.duplicate [data-fancybox]').each(function(){
				var t=$(this);
				t.addClass('ra-2 oh');
				let href='#gallery-'+( t.data('caption').replace(/[^\d]/g,'') );
				t.attr('href',href).removeAttr('data-fancybox').removeAttr('target');
			});
			setTimeout(function(){$('.duplicate [data-fancybox]').removeAttr('data-fancybox')},500);


			/*kontrol-start*/
			if (ss.find('.slider-kontrol').length==0){
				ss.append('<div class="slider-kontrol"></div>');
			}
			ss.find('.slider-kontrol')
			.addClass('w-100 df aic jcc py-1    mx-0')
			.append('<div class="ct df fnw jcsb px-0"></div>');

			var control_prev=$('<a class="controlbtn control_prev bi bi-chevron-left"></a>');
			var control_next=$('<a class="controlbtn control_next bi bi-chevron-right"></a>');
			var navdots=$('<ul class="nav dots df aic jcc fnw b-0 w-100 w-lg-auto tc db lsn jcl"></ul>');


			ss.find(".ct")
			.append(control_prev)
			.append('<div class="nv col-12 col-lg px-2 df aic col"></div>')
			.append(control_next);
			ss.find(".nv").append(navdots);
			/*kontrol-end*/

			for(o=1;o<=adt;o++){
				ss.find("ul.nav").append("<li>"+o+"</li>");
			}
			scope.find("ul.nav").find("li").removeClass("chk").eq(0).addClass("chk");
		}

		ss.append('<div class="slider-counter df dn pa b-0"><div class="current">'+(i+1)+'</div><div class="seperator">/</div><div class="totalslider">'+adt+'</div></div>');
		s.children(".slider-item").append("<div class='slidertouch w-100 pa- l-0 t-0'></div>");

		var w=s.width();
		w=(w/bolen).toFixed(4);

		if (s.attr('class').match(/carousel/)){
			s.children('.slider-item').attr('col-md-sldr-'+sdr,'1');
			//$('html').append('<style class="css_r">@media(min-width: 992px){[col-md-sldr-'+sdr+'] {width:'+w+'px;}}</style>');

			sheet.insertRule('@media(min-width:992px){[col-md-sldr-'+sdr+']{width:'+w+'px;min-width:'+Math.round(100/bolen)+'%;}}');document.adoptedStyleSheets = [sheet];
		}

		w=s.children().outerWidth();

		if (adt<2){
			ss.find("ul.nav").addClass("dn");
			ss.find(".controlbtn").addClass("dn");
			return false;
		}else{

			//init
			lst_i=lst.length;
			i=lst_i;//+ lst
			if (bolen==1){
				trns='translate3d('+(-100*i)+'%,0px,0)';
			}else{
				trns='translate3d('+(-w*i)+'px,0px,0)';
			}
			s.css("transition-duration",0+"ms").css('transform', trns);
			scope.find(".current").html(1);
			scope.find("ul.nav").find("li").removeClass("chk").eq(0).addClass("chk");

			timer[sdr] = setInterval(function(){
				i++;slideit();
				//scope.find('a.control_next').click();
			},6500);

			//gesture start
			var threshold=md?35:55,start,end,flag=false,flagmove=false,xx,yy;


			$('body').on('mouseleave', function(e) {
				if (flag==true){
					flag=false;
					slideit();
				}
			});
			//ss
			scope.on('mouseleave', function(e) {
				if (flag==true){
					//slideit();
				}else{
					flag=false;
					clearInterval(timer[$(this).find('[sdr_index]').attr('sdr_index')]);
					timer[$(this).find('[sdr_index]').attr('sdr_index')] = setInterval(function(){
						i++;slideit();
						//scope.find('a.control_next').click();
					},6500);
				}
			});
			//s idi
			scope.on('touchstart mousedown', function(e) {
				if (typeof window.ontouchstart == 'undefined'){
					e.preventDefault();
				}
				flag=true;
				if (!e.pageX)
				e = e.originalEvent.touches[0];
				start=e;
			});
			//ss
			scope.on("mousemove hover touchmove",function(){
				clearInterval(timer[ $(this).find('[sdr_index]').attr('sdr_index') ]);
			});
			s.on("mousemove hover",function(){
				clearInterval(timer[$(this).attr('sdr_index')]);
			});
			//md:mousedetected
			                                                  //s idi
			sss=md?$('html,[sdr_index='+sdr+'],.slider-scope'):scope;

			//sss !!!
			sss.on('mouseup touchend', function(e) {
				if (flag==true){
					if (!e.pageX  && md==0 ){
						e = e.originalEvent.changedTouches[0];
					}
					d=(-start.pageX+e.pageX);
					im=0;
					if (d<0 && Math.abs(d)>threshold){//next
						im=md?Math.ceil(-d/w):1;
					}else if (d>0 && Math.abs(d)>threshold){//prev
						im=md?Math.floor(-d/w):-1;
					}
					i=i+im;slideit();
					flag=false;
				}
			}).on('touchmove mousemove', function(e){
				if (flag==true){
					flagmove=true;
					if (!e.pageX && md==0){
						e = e.originalEvent.touches[0];
					}
					w=s.children().outerWidth();
					yy=(start.pageY-e.pageY);
					xx=d2=(start.pageX-e.pageX);
					if( md==0 ){
						if ((Math.abs(yy)*1)<Math.abs(xx)){
							//
						}else{
							flag=false;
						}
					}
					if (flag==true){
						if(Math.abs(d2)>threshold){
							ss.addClass('sliding');
						}
						trns='translate3d('+(-w*i-xx*(md?0.8:1))+'px,0px,0)';
						s.css("transition-duration","0ms").css('transform', trns);
					}
				}
			});

			/*
			scope.on("click","ul.nav li",function(){
				i=$(this).index()+lst_i;
				slideit();
			});
			scope.on("click",control_prev,function(){
				i--;
				slideit();
			}); */

			navdots.on("click","li",function(){
				i=$(this).index()+lst_i;
				slideit();
			});
			control_next.on("click",function(){
				i++;
				slideit();
			});
			control_prev.on("click",function(){
				i--;
				slideit();

			});

			//gesture end
		}

		function slideit(){
			flagmove=false;
			w=s.children().outerWidth();
			trns='translate3d('+(-w*i)+'px,0px,0)';
			s.css("transition-duration","300ms").css('transform', trns);

			setTimeout(function(){
				ss.removeClass('sliding');
			},500);

			//lazy loading if needed
			for(lazy_i=i-4;lazy_i<=i+4;lazy_i++){
				bimg=s.children().eq(lazy_i-2).find("img");
				if( bimg.data("src")){bimg.attr("src",bimg.data("src")).removeAttr("data-src");}
			}

			if (i>=adt+lst_i){//beyond most last
				i=i-adt;// == i=lst_i;
			}else if (i<lst_i ){//prev of first
				i=adt+i;
			}else if (i>=adt){ //16,14,26=6+14+6
				//required
			}else{
				i=i%adt;
			}
			if (s.attr('sdr_index')==4){
				//cn('kaç'+i);
			}

			s.delay(285).queue(function(){
				trns='translate3d('+(-w*i)+'px,0px,0)';
				$(this).css("transition-duration","0ms").css('transform', trns);
				s.clearQueue();
			});

			s.children('.slider-item').removeClass('active').eq(i).addClass('active');
			scope.attr('alt',i).find('ul.nav').find('li').removeClass('chk').eq(i-lst_i).addClass('chk');
			scope.find('.current').html(' '+(i-lst_i+1));
			if(scope.find('.slider-text').length){
				scope.find('.slider-text').removeClass('active aos-animate').eq(i-lst_i).addClass('active aos-animate');
			}
			//dynamic bulletin
			//anim	//$(".title").removeClass("fadeInUp").removeClass("animated");ss.find(".slider-item").find(".title").addClass("fadeInUp animated");
		}
	};
	//plugins end


	$(".slider,.carousel").each(function(){
		$(this).makeslider();
	})


	/*
	slider-adjustments
	*/

	for( acls of ['.gunluk-bulten','.main-slider']){
		let ms=$(acls);
		let sk=ms.find('.slider-kontrol').detach();
		ms.find('.slider-control-slot').append(sk);
	}
	var gunluk_bulten_dots=$('.gunluk-bulten .nv').detach();
	$('.gunluk-bulten-nv-slot').append(gunluk_bulten_dots);

	$('.gunluk-bulten .slider-kontrol').removeClass('jcc').addClass('jcl');
	$('.gunluk-bulten .ct').removeClass('jcsb').addClass('jcc f-2');

	$('.main-slider').find('.slider-kontrol').removeClass('jcc').addClass('jcl row');
	$('.main-slider').find('.nv').removeClass('px-2 col col-12 col-lg');
	$('.main-slider .nv').prepend($('.main-slider').find('.controlbtn.control_prev').detach());
	$('.main-slider .nv').append($('.main-slider').find('.controlbtn.control_next').detach());
	$('.main-slider').find('.nav').removeClass('w-100');



 	//slider to carousel
	$('.carousel-container .nv').addClass('p-0');
	$('.carousel-container .slider-kontrol').addClass('py-4').removeClass('pa');
	$('.duyurular .carousel-container .slider-kontrol').removeClass('pt-md-4');
	$('.carousel').closest('.carousel-container').each(function(){

	});
	$('.hizmetlerimiz .slider-kontrol').removeClass('').append($('.tum-hizmetlerimiz').detach());


	$('.carousel.duyurular').next('.slider-kontrol').removeClass('w-100 jcl').addClass('h-100 bg-i');



	$('.layer2 a').on('click', function(){  //to #id
		a=$(this).attr("href");
		if (a=="#")
		return false;
	});


try{

	//jump1
	var gc=$('.graphs-container').clone();
	gc.addClass('t-f ').find('.head-graphs').addClass('py-3').parent().find('.kp1').remove();
	var dgc=$('<div class="home-component dynamic-graphs-container"></div>').append(gc);
	$('.grid-structure').closest('.home-component').before(dgc);

/* 	$('.dynamic-graphs-container .graph').each(function(){
		var t=$(this);
		let id = $(this).attr('id');
		var tempobjname=id.replace(/graph_/,'');
		var tmp_chart=makechart(t[0],options_sparkline);
		tmp_chart.updateOptions({series: [ graph_series[tempobjname] ] })

	}) */


	if (md==0){
		$('.tab-container-tobe').maketab();

		//jump2
		$('.main-market-chart-container').append($('.market-data-notify').detach());//15gün

	}else{

		$(document).on("click",".sliding a",function(e){
			return false;
		});
		$(document).on("click",".sliding [data-fancybox]",function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	}
}catch(err){}



	var h1_baslik=$('h1').text();
	$('article .slider-container img,article .tab-content img,article .zebra img,article .yazi img').each(function(e){
		var t=$(this);
		if( t.closest('a').length==0 && t.closest('td').length==0 && t.closest('article[alt="bizi-taniyin"]').length==0   ){
			$(this).attr('href',$(this).attr('src')).attr('data-fancybox','a').attr('data-caption',h1_baslik+'-'+(e+1))
		}
	});

	var aimg=$('article section img');
	function fullscreen(element) {
		var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
		if (requestMethod) { // Native full screen.
			requestMethod.call(element);
		} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript !== null) {
				wscript.SendKeys("{F11}");
			}
		}
	}


 	$(document).on("click",".btn-accept",function(e){
		var id=$(this).attr("alt");
		if(!id){return false;id=0;}
		expires = new Date(Date.now() + (30*24*60*60*1000) );
		expires = "expires="+expires.toUTCString();
		document.cookie="popup="+  encodeURIComponent(getCookie("popup")+","+id) +";secure;"+expires+";path=/"; //decodeURIComponent
		$(this).closest(".cookie,.popup").addClass("dn").hide();
	})



	$(document).on("click","html.modal-hidden",function(e){
		$("html").addClass("modal-hidden");
	});


	if($('.js_nest_data').length){
		js_nest_data=$('.js_nest_data').val();
		js_nest_data=JSON.parse(js_nest_data);
		$(document).on("click",".yatirim_merkezleri a",function(e){
			ix=$(this).attr('alt');
			$('.baslik.js_nest').text(js_nest_data.il[ix]+' '+js_nest_data.baslik[ix])
			$('.adres.js_nest').text(js_nest_data.adres[ix])
			$('.telefon.js_nest').text(js_nest_data.telefon[ix])
			$('.email.js_nest').text(js_nest_data.email[ix]);
			$('iframe.harita.js_nest').attr('src',js_nest_data['harita-linki'][ix])
		});
	}


	$('input.yatirim_merkezi_ara').keyup(function(){
		let tx = $(this).val();
		tx = tx.replace(/İ/g,'i').replace(/ı/g,'I').replace(/  +/g,' ').trim().split(' ');
		tx='(?=.*'+tx.join(')(?=.*')+')';
		rx=new RegExp(tx,'gi');
		js_lookup( $('.yatirim_merkezleri a') ,rx);
	})

	var fqs='';
	$('input.faq').keyup(function(){
		$('.accordion h2.active').removeClass('active');
		$('.accordion .body').css('display','none');
		var tx = $(this).val();

		clearTimeout(fqs);
		fqs=setTimeout(function(){
			tx = tx.replace(/İ/g,'i').replace(/ı/g,'I').replace(/  +/g,' ').trim().split(' ');
			tx='(?=.*'+tx.join(')(?=.*')+')';

			rx=new RegExp(tx,'gi');
			$('.faq-search .accordion> h2').each(function(){
				txtValue = $(this).text();
				if (txtValue.replace(/İ/g,'i').replace(/ı/g,'I').match(rx)) {
					$(this)[0].style.display = "";
				} else {
					$(this)[0].style.display = "none";
				}
			})
			toast('Arama Sonuçları Filtrelendi');
		},200);

	})


	$('.capatcha_yenile,img.captcha').click(function(){
		$('.captcha').attr('src','captcha.png?v='+(new Date().getTime()));
	})


	$('.menu-container').removeClass('dn-mobile');
	$('.menu-triger').click(function(){
		$(this).toggleClass('hmbrg ass bg-bulls3');
		$('body').toggleClass('openmenu')
		//$('.menu-container').toggleClass('dn-mobile');
	})



	if(md==0){
		$('.fromto .fromhere').each(function(){
			t=$(this);
			t.closest('.fromto').find('.tohere').prepend(t.detach().addClass('curve fr'));
		})

		fc=$('.footer-contact').detach();
		$('.footer').children('div').eq(0).prepend(fc.addClass('py-4 px-1 mx-0 bb'));

	}




	if (md==0){
		$('body').not('.mousedetected').find('.nav-tabs').each(function(){ //.find('article')
			if($(this).children('.nav-item').length>5 && $(this).parents('.tab-content').length==0){

				$(this).addClass('tab-round');
				//$('.nav-tabs.tab-round').addClass('jcc row fww aic')
				//$('.tab-round+.tab-content').removeClass('bt')
				//$('.nav-tabs.tab-round .nav-item').addClass('ra-pill col-5 mb-1 bb-force');
				$(this).addClass('jcc row fww aic')
				$(this).next('.tab-content').removeClass('bt')
				$(this).find('.nav-item').addClass('ra-pill col-5 mb-1 bb-force');
				$(this).find('.nav-item').eq(2).after('<span class="col-1 tc ra-circle df b tab-hand bi bi-hand-index-fill asc"></span>');
			}
		})

	}else{
		$('[aria-replace]').each(function(){
			t=$(this);th=t.attr('href');wr=t.attr('aria-replace').split('@2@');
			t.attr('href', th.replace(wr[0],wr[1]) );
		})

	}

	$('.tab-pane').has('.nav-tabs').addClass('has_nav_tabs');
	$('.buton').has('i').addClass('has_i');
	$('table').each(function(){
		if($(this).find('th').length==0)
			$(this).addClass('noth');

		$(this).find('tr:lt(4)').find('td').has('input').addClass('hasinput');


		if (md==0){
			t=$(this);
			if (t.find('tr').eq(0).find('td').length>3){
				t.after('<div class="t-bulls fi tr pt-3 pb-5 pr-0 f-07">Diğer Sütünlar İçin Yana Kaydırınız <img src="/lib/img/swipe.png" class="w-25px"/></div>')
			}
		}
	})

	$('.mousedetected .tab-content').each(function(){
		t=$(this);
		t.parents('.container').first().parent().addClass('oh');//fill sides to oh
	})

	$('.mobiledevice article[alt="banka-hesap-bilgileri"] table tr:gt(0) td:last-child').prepend('<i class="fl-bigmug-line-copy23 di fl pr-1 f-06"></i> ');

	$('article[alt="banka-hesap-bilgileri"] table tr:gt(0) td:last-child').click(function(){
		t=$(this);
		tt=t.text();
		t.append('<input type="text" class="pf td_copyinput" value="'+tt+'" readonly />');
		setTimeout(function(){
			t.find('input.td_copyinput').eq(0).focus().select();
			document.execCommand('copy');
			toast('IBAN Bilgisi Kopyalandı ');
		},10);

	});


	$(document).on("click",".loadmore",function(e){
		var si_url=$('.si_url').last().val();
		var page=$('.loadmore_page_index').last().val();
		var lmc=$('.load-more-container');
		lmc.addClass('fw-700 f-12').html( loadhtml +' Loading...');
		$.get('loadmore/'+si_url+'/page='+page,function(e){
			var clist=$('.category-list');
			clist.append(e);
			setTimeout(function(){
				lmc.remove();
			},250);
		});
	});


	$('.mobiledevice .bultene-abonel-ol').click(function(){
		$('.bulten_bottom_modal').slideToggle(200);
		return false;
	});


	$('article table').each(function(){
		t=$(this);
		t.after('<div class="table-container"></div>')
		tc=t.next();t=t.detach();tc.append(t);
	});


	/*user table filter*/
	$(document).on("click",".sql_table .pagination a.page-link",function(e){
		sayfa=$(this).attr('href');
		user_table_filter_pagination($(this),sayfa);
		return false;
	});

	var st;
	$('.sql_table tr input').keyup(function(e){
		sayfa=1;
		clearTimeout(st);
		st=setTimeout(function(){
			user_table_filter_pagination($(this),sayfa);
		},500);
		if(e.keyCode==13){
			user_table_filter_pagination($(this),sayfa);
			clearTimeout(st);
		}
	});

	$(document).on("click",".sifremi-unuttum",function(e){
		email=$('.email').val();
		document.cookie="email_unuttum="+email+";0;path=/";
	});

	$('.sifre').keypress(function(){
		$('.show_hide').removeClass('dn');
	});

	$('.zaman_asimi_sorgula').click(function(e){
		var kriter=$('[name="kriter"]').val();
		var kriter_degeri=$('[name="kriter_degeri"]').val();
		var yil=$('[name="yil"]').val();
		$('.zamanasimi_sonuc').html(load+' Lütfen Bekleyiniz ');
		$.post("account",{islemtipi:"zaman_asimi_sorgula",kriter,kriter_degeri,yil},function(e){
			$('.zamanasimi_sonuc').html(e);
		});
	});



	kyc = $('.kayanyazi-container');
	ky = $('.kayanyazi');
	if($('.kayanyazi-container').length>0){
		start_ky();
	}
	$('.kayanyazi-container').mouseover(function(){
		stop_ky();
	}).mouseleave(function(){
		start_ky();
		setTimeout(function(){
		},250);
	})
	$('.kayanyazi-container').on('touchstart',function(e){
		stop_ky();
	})

	$('.mousedetected .kayanyazi-container').on('mousedown',function(e){
		ky_downed=true;
		ky_down_x=(e.pageX);
	}).on('mouseup',function(e){
		ky_downed=false;
		ky_up_x=(e.pageX);
		let fark=(ky_down_x-ky_up_x);
		kyc[0].scrollLeft += fark;
	}).on('mousemove',function(e){
		stop_ky();
		ky_up_x=(e.pageX);
		let fark=(ky_down_x-ky_up_x);
		if(ky_downed){
			kyc[0].scrollLeft += fark;
			if(e.type=='mousemove') ky_down_x=ky_up_x;
		}
	}).on('blur mouseleave focusout',function(e){
		//ky_downed=false;
	});

	$('.mousedetected').on('mousemove',function(e){
		if(ky_downed){
			stop_ky();
			ky_up_x=(e.pageX);
			let fark=(ky_down_x-ky_up_x);
			kyc[0].scrollLeft += fark;
			if(e.type=='mousemove') ky_down_x=ky_up_x;
		}
	}).on('mouseup',function(e){
		if(ky_downed){
			start_ky();
		}
		ky_downed=false;

	});
	$('.breadcrumb .breadcrumb-item').last().addClass('active');


/*chart tarih bazında filtreleme*/
	var resetCssClasses = function(t) {
		$(t).siblings('button').removeClass('active');
		$(t).addClass('active');
	}

	var today_for_chart=new Date().getTime()-3*60*60;
	var a_day=24*60*60*1000;
	$('.one_day').on('click',function(e) {
		resetCssClasses(this);
		home_chart.zoomX(
			today_for_chart-a_day,
			today_for_chart
		)
	})
	$('.one_week').on('click',function(e) {
		resetCssClasses(this);
		home_chart.zoomX(
			today_for_chart-a_day*7,
			today_for_chart
		)
	})
	$('.one_month').on('click',function(e) {
		resetCssClasses(this);
		home_chart.zoomX(
			today_for_chart-a_day*30,
			today_for_chart
		)
	})

	$('.six_months').on('click', function(e) {
		resetCssClasses(this);
		home_chart.zoomX(
			today_for_chart-a_day*30*6,
			today_for_chart
		)
	})

	$('.one_year').on('click', function(e) {
		resetCssClasses(this);
		home_chart.zoomX(
			today_for_chart-a_day*365,
			today_for_chart
		)
	})


	$('.all').on('click', function(e) {
		resetCssClasses(this);
		home_chart.zoomX(
			today_for_chart-a_day*365*3,
			today_for_chart
		)
	})


	$('.bize-ulasin-header li').click(function(){
		$('h1').text($(this).text());
	})

	$('.dropdown-toggle').click(function(){
		var drop_pos='drpup';
		if( $(this).position().top>wi*0.8) drop_pos='drpdown';

		$(this).closest('.dropdown').find('.dropdown-menu').addClass(drop_pos);

	})

	$('.piyasa-btn').click(function(){
		$(this).closest('.graphs-container').toggleClass('active');
	});
	$('.opensearch').click(function(){
		$('.header-search').toggleClass('dn');
		$('.header-search .search-text').focus();

	})

	$('.piyasaveri li').click(function(){
		setTimeout(function(){
			$('.piyasaveri').find('.tab-pane.active').find('tbody').find('tr').eq(0).click();
		},100);
	});

	$('.piyasaveri .piyasaveri-change-table tbody tr').click(function(){
		var t=$(this);
		t.closest('.piyasaveri').find('tr.active').removeClass('active');
		t.addClass('active');
		$('.chart-nest-title').text(t.find('td').eq(0).text());
		var seri=t.attr('alt').replace(/[-\/]/g,'_');
		//home_chart_obj.name='Fiyat';
		try{
			home_chart_obj.data=graph_series[seri].data;
			var min_Yval = Math.min(...home_chart_obj.data.map(function(e){return e[1]}))*0.95;
			var max_Yval = Math.max(...home_chart_obj.data.map(function(e){return e[1]}))*1.05;
			home_chart.updateOptions({series: [ home_chart_obj ],yaxis:{min:min_Yval,max:max_Yval}  })
		}catch(e){
			toast('NO DATA FOR '+seri.toUpperCase());
			home_chart.updateOptions({series: [ {name:'No Data',data:[[1328223600000,100]]} ],yaxis:{min:min_Yval,max:max_Yval}  })
		}
		setTimeout(function(){
			$('.chart-filter .active').click();
		},80);

	});
	setTimeout(function(){
		$('.piyasaveri-change-table tbody tr').eq(0).click();
	},150);


	/*ust bar chart init*/
	function makechart(id_or_obj,options){
		if(typeof id_or_obj === 'object'){
			let chart = new ApexCharts( id_or_obj , options);
			chart.render();
			return chart;
		}else if($(id_or_obj).length){
			let chart = new ApexCharts( document.querySelector(id_or_obj), options);
			chart.render();
			return chart;
		}
		return;
	}

	var a_share=$('#a_share');
	if(a_share.length){
		var tempobjname=''+a_share.attr('alt');
		//options_main.title.text=''+tempobjname;
		options_main.fill.gradient.shadeIntensity=0.001;
		options_main.fill.gradient.opacityFrom=0.001;
		options_main.fill.gradient.opacityTo=0.001;

		options_main.stroke.colors=['#00a'];
		options_main.stroke.curve="straight";
		options_main.stroke.width=2;

		options_main.grid.borderColor='#ddd';
		options_main.grid.strokeDashArray=3  ;

		/*
		var bolunmeler=[[1636056000000,150]];
		graph_series.bolunmeler = {name:'Bölünmeler',data:bolunmeler,type:'bar'};
		graph_series[tempobjname].type='area'; ,graph_series.bolunmeler
		*/


		var tmp_chart=makechart(a_share[0],options_main);

		var min_Yval = Math.min(...graph_series[tempobjname].data.map(function(e){return e[1]}))*0.95;
		var max_Yval = Math.max(...graph_series[tempobjname].data.map(function(e){return e[1]}))*1.05;

		var min_Xval = Math.min(...graph_series[tempobjname].data.map(function(e){return e[0]}))*1;
		var max_Xval = Math.max(...graph_series[tempobjname].data.map(function(e){return e[0]}))*1;


		tmp_chart.updateOptions({series:[ graph_series[tempobjname] ],xaxis:{min:min_Xval,max:max_Xval} })
		home_chart=tmp_chart;/*for month filter*/
	}



	setTimeout(function(){
		$('.head-graphs .graph').each(function(){//multi graph sparkline enabled
			var t=$(this);
			var tmp_chart=makechart(t[0],options_sparkline);
			var tempobjname='SPARK_'+t.attr('alt');
			tmp_chart.updateOptions({series:[ graph_series[tempobjname] ] })
		})
	},90);

	if($('#home_chart').length){
		home_chart  = new ApexCharts( document.querySelector('#home_chart'),options_main);
		home_chart.render();

		//var title_txt=$('.apexcharts-title-text');
		//$('#home_chart').parent().find('.chart-nest-title').html(title_txt.text()).addClass('fw-700');
		//title_txt.remove();

		/*
		var min_Yval = Math.min(...home_chart_obj.data.map(function(e){return e[1]}))*0.95;
		var max_Yval = Math.max(...home_chart_obj.data.map(function(e){return e[1]}))*1.05;
		//home_chart.updateOptions({series: [ home_chart_obj],yaxis2:{min:min_Yval,max:max_Yval}  })
		*/

	}
	if($('.pie-chart').length){
		pie_chart  = new ApexCharts( $('.pie-chart')[0] ,option_pie);
		pie_chart.render();
	}


	//.mousedetected
	$('.menu-container')
	.mouseover(function(){
		$('.logo-light').addClass('dn');
		$('.logo-dark').removeClass('dn');
		$('.menu').find('.musteri-ol,.opensearch').removeClass('bg-lb t-efl').addClass('bg-bulls3 t-f')
	})
	.mouseleave(function(){
		$(this).siblings('.header-top').removeClass('active');
		$('.logo-light').removeClass('dn');
		$('.logo-dark').addClass('dn');
		$('.menu').find('.musteri-ol,.opensearch').addClass('bg-lb t-efl').removeClass('bg-bulls3 t-f')
	})

	setTimeout(function(){
		$('.hizmetlerimiz .control_prev').click();
		$('.hizmetlerimiz .control_next').click();
		setTimeout(function(){
			$('.hizmetlerimiz.op0').removeClass('op0');
		},450);
	},450);


	$('.fix').addClass('fixed');
	setTimeout(function(){
		$('.category-header>.fr,article>.fr').each(function(){
			var t=$(this);
			var distance=t.position().top;
			t.css('margin-top',-distance);
		})
	},100);


	function slideitonresize(){
		if (!md)
		return false;
		resized++;

		$('.css_r').remove();
		sheet = new CSSStyleSheet();
		var rz_i=0;
		clearTimeout(st);
		st=setTimeout(function(){
			$(".slider,.carousel").each(function(){
				rz_i++;
				var s=$(this);
				var ss=s.parent();

				var adt=ss.data("slidercount");
				if ( adt<2 ) return false;

				var w=s.width();
				var ww=$('body').width();
				var sc=$('.slider-container,.carousel-container').width();
				var screenwidth = screen.width;

				var i=ss.find('.chk').index();

				if (s.attr('class').match(/carousel/)){
					if (s.attr('alt')!=undefined ){
						var bolenalt=parseFloat(s.attr('alt'));//slidercount
						var bolen=bolenalt*ww/992;
					}else{var bolen=1;var bolenalt=1;}
					w=(w/bolen).toFixed(4);

					//$('html').append('<style class="css_r" '+resized+'>@media(min-width:992px){[col-md-sldr-'+s.attr('sdr_index')+']{width:'+w+'px;}}</style>');
					var sdr=s.attr('sdr_index');
					setTimeout(function(){
						sheet.insertRule('@media(min-width:992px){[col-md-sldr-'+sdr+']{width:'+w+'px;min-width:'+Math.round(100/bolenalt)+'%;}}');document.adoptedStyleSheets = [sheet];
					},100);
				}
				sss=md?$('html,[sdr_index='+sdr+'],.slider-scope'):s;
				var trns='translate3d('+(-w*i)+'px,0px,0)';
				s.css("transition-duration","350ms").css('transform', trns);
				ss.attr("alt",i).find(".counter").html(i);
				ss.children("ul.nav").find("li").removeClass("chk").eq(i-1).addClass("chk");
				ss.find(".slider-item").removeClass("active").eq(i).addClass("active");
				sss.find('.control_next').click();
				/*
				*/

			})
		},200);
	}


	var ha,td_text;
	if( $('.hisse-ara').length){
		filter_arananlar();
	}
	$('.hisse-ara').keyup( filter_arananlar );
	$('.hisse-ara').click( filter_arananlar );

	$('.alphabet li').click( function(){
		var t=$(this);
		var h=t.attr('h');
		if(h=='*'){
			$('.hisse-senetleri tbody tr').removeClass('dn');
			return false;
		}
		$('.hisse-senetleri tbody tr').addClass('dn');
		$('.hisse-senetleri tbody tr[h='+h+']').removeClass('dn');
		$("html, body").animate({scrollTop: 350 }, 60);
	});

	function filter_arananlar(){
		var arananlar=$('.hisse-ara').eq(0).val();
		arananlar=arananlar.replace('ı','i').replace('İ','I').replace(/ş/gim,'s').replace(/ğ/gim,'g').replace(/ç/gim,'c').replace(/ü/gim,'u').replace(/ö/gim,'o').trim().replace(/ +/gim,' ');
		document.cookie="arananlar="+arananlar+";secure;"+expires+";path=/";
		arananlar=arananlar.split(' ');
		clearTimeout(ha);
		ha=setTimeout(function(){
			$('.hisse-senetleri tbody tr').addClass('dn');
			$('.hisse-senetleri tbody tr').each(function(){
				var t=$(this);
				td_text=t.find('td').eq(0).text();
				for (ee of arananlar){
					ee=new RegExp(ee,'gim');
					if(td_text.match(ee)){
						t.removeClass('dn');
					}
				}
			})
		},350);
	}

/*
	setTimeout(function(){
		$('.jumbotron').addClass('active')
	},200);

var jumbotronimg=$('.jumbotron img'),jumbotron_img_adet=jumbotronimg.length,jumbotron_i=0;
	if(jumbotron_img_adet>1){
		setInterval(function(){
			jumbotron_i++;jumbotronimg.removeClass('active');
			jumbotronimg.eq(jumbotron_i%jumbotron_img_adet).addClass('active')
		},5500);
	}
	 */

	/*adding extension info image to all links in articles*/
	$('article a:not(.btn)[href$=pdf],article a:not(.btn)[href$=docx],article a:not(.btn)[href$=xlsx],article a:not(.btn)[href$=jpg],article a:not(.btn)[href$=jpeg],article a:not(.btn)[href$=png],article a:not(.btn)[href$=gif],article a:not(.btn)[href$=webp],article a:not(.btn)[href$=doc],article a:not(.btn)[href$=xls],article a:not(.btn)[href$=zip],article a:not(.btn)[href$=pptx]').each(function(){
		if($(this).closest('.slider-item').length==0){
			//$(this).addClass('btn btn-p ra-pill px-3 dosya');
		}
	})

	$('.qrkesfet').click(function(){
		//alert("mobilde uygulama market açılacak. Desktop ta qr kod çıkacak");
		//return false;

	})


	if($('table.sortable').length){
		sorttable.makeSortable($('table.sortable')[0]);
	}



	var sec={};
	if($('table.analiz').length){
		sorttable.makeSortable($('table.analiz')[0]);
		var sec2=getCookie('sec');
		if(sec2!='' && Object.keys(sec).length==0){sec=JSON.parse(sec2);}
		var arr=Object.keys(sec);
		arr=arr.filter(n => n);
		$('.secilenleri-goster').parent().find('b.badge').text(arr.length);
		setTimeout(function(){
			secilenleri_isaretle();
			$('.secilenleri-goster').prop('checked',false);
		},180);

	}

	$('table.analiz').find('tbody').on('click','tr td:nth-child(1)',function(){
		var t=$(this);
		var tr=$(this).closest('tr')

		if(tr.hasClass('sec')){
			delete sec[ tr.attr('alt').replace(/ .+/g,'').trim() ];
			t.find('i.bi').removeClass('bi-star-fill').addClass('bi-star');
			//t.attr('sortKey','0');
		}else{
			t.find('i.bi').removeClass('bi-star').addClass('bi-star-fill');
			//t.attr('sortKey','1');
			sec[ tr.attr('alt').replace(/ .+/g,'').trim() ]=1;
		}
		//sorttable.makeSortable($('table.analiz')[0]);



		$('.secilenleri-goster').parent().find('b').html(''+Object.keys(sec).length+'');
		tr.toggleClass('sec');
		cn(sec);
		expires = new Date(Date.now() + (15*30*24*60*60*1000) );//15 month
		expires = "expires="+expires.toUTCString();
		document.cookie="sec="+ encodeURIComponent( JSON.stringify(sec))+ ";secure;"+expires+";path=/";

		if( $('.secilenleri-goster').prop('checked') && !tr.hasClass('sec')){
			tr.remove();
		}

	})

/* 	$('.analiz tbody td').on('click','i.star',function(e){
		e.stopPropagation();
		return false;

	}) */

	var boya=0;
	$('table.analiz').find('tbody').on('mousedown','tr td:not(.star)',function(e){
		var t=$(this);
		if(!e.ctrlKey)
		$('td.tdsec').removeClass('tdsec');
		$('tr.active').removeClass('active');
		t.toggleClass('tdsec');
		if(t.hasClass('tdsec')) {t.closest('tr').addClass('active')}


		boya=1;
	}).on('mouseover','tr td:not(.star)',function(){
		/* if(boya==1){
			var t=$(this);
			t.addClass('tdsec');

		} */
	});
	$('body').on('mouseup','tr td:not(.star)',function(){
		boya=0;
	})


	async function secilenleri_isaretle(){
		//$('table.analiz tr td:nth-child(1)').attr('sortKey','0');
		for( cls in sec){
			$('tr[alt='+cls+']').addClass('sec').find('.bi-star').removeClass('bi-star').addClass('bi-star-fill')//.closest('td').attr('sortKey','1');
		}
		//sorttable.makeSortable($('table.analiz')[0]);

	}

	var keyup=1;
	$('.secilenleri-goster').click(function(){
		var t=$(this);

		if(Object.keys(sec).length==0 && t.prop('checked')==true){
			setTimeout(function(){
				t.prop('checked',false);
				$('table.analiz th input,table.analiz th textarea').val('').keyup();
				//$('.sembol-ara').eq(0).val('').trigger('input');
			},180);
			return false;
		}

		if(t.prop('checked')==false){
			$('table.analiz').removeClass('selected-only');
			$('table.analiz th input,table.analiz th textarea,.sembol-ara').val('').keyup();
			return false;
		}
		$('table.analiz th input,table.analiz th textarea,.sembol-ara').val('');


		if(t.prop('checked')){
			$('table.analiz').addClass('selected-only');
			var sec_hisse=Object.keys(sec);
			sec_hisse.sort();
			sec_hisse=(sec_hisse.join(' '));
			keyup=0;
		}

		/*
		$('.sembol-ara').eq(0).val(sec_hisse);
		$('.sembol-ara').eq(0).trigger('input')
		*/

		//$('table.analiz thead:nth-child(2)').find('th').eq(1).find('textarea').eq(0).val(sec_hisse).keyup();
		$('table.analiz thead:nth-child(2)').find('th').find('.sembol').val(sec_hisse).keyup();

		location.href="#";
		setTimeout(function(){
			location.href="#top";
		},180);
		setTimeout(function(){
			secilenleri_isaretle();
			setTimeout(function(){
				secilenleri_isaretle();
			},350);
		},300);
	})

	$('.filter-clean').click(function(){
		$('.secilenleri-goster').prop('checked',false);
		$('table.analiz th input,table.analiz th textarea,.sembol-ara').val('').keyup();
		//toast('Temizlendi')
	})

	if($('.analiz').length){
		$('html').keyup(function(e){
			if(e.keyCode==27){//esc
				$('.suz-container').hide();
				$('.dialog_onizle').addClass('dn');
			}
		})

	}

	function bi_x(){
		var t=$('.sembol-ara');
		if(t.val()==''){
			t.next('i.bi').removeClass('bi-x-lg').addClass('bi-search')
		}else{
			t.next('i.bi').removeClass('bi-search').addClass('bi-x-lg')
		}
	}


	$('.sembol-ara').keyup(function(){
		var t=$(this);
		clearTimeout(ha);
		ha=setTimeout(function(){
			newt=t.val()
			.replace(/[üÜ]/gim,'U').replace(/[Ğğ]/gim,'G')
			.replace(/[Şş]/gim,'S').replace(/[İıi]/gim,'I')
			.replace(/[Öö]/gim,'O').replace(/[Çç]/gim,'C')
			.replace(/[^A-Za-z0-9 ]+| +/gim,' ');
			$('.sembol').val(newt).keyup();
		},50);
		bi_x();
	});
	$(document).on("click",".sembol-ara+.bi-x-lg",function(e){
		$('.sembol-ara').val('').keyup().trigger('input');
	});


	$('.sembol').keyup(function(e){
		var t=$(this);
		$('.sembol-ara').val(t.val());
	});

	var suz='';
	$('table.analiz th > input,table.analiz th > textarea').keyup(function(e){
		if(keyup==1){
			$('.secilenleri-goster').prop('checked',false);
		}
		$('.suz-container').hide();

		bi_x();
		keyup=1;
		if(e.keyCode!=9){
			var kolon={};
			var tt=$(this);
			//var index=tt.closest('th').index();

			var istablesorted=0;
			if($('.sorttable_sorted_reverse,.sorttable_sorted').length>0){
				istablesorted=$('.sorttable_sorted_reverse,.sorttable_sorted').index();
				if($('.sorttable_sorted_reverse').length>0) istablesorted=istablesorted+100;
			}

			clearTimeout(suz);
			stop=0;
			suz=setTimeout(function(){
				$('table.analiz th > input,table.analiz th > textarea').each(function(){
					var t=$(this);
					var val=t.val().replace(/  +/gim,' ').trim();
					t.removeClass('bg-d bg-s')
					if(t.val()){
						kolon[t.attr('alt')]=val;
						//validation
						if(t.attr('alt')=='sembol'){//sembol validation
							if(val.match(/[^a-zA-Z0-9 ]/gim)){
								t.addClass('bg-d');
								stop=1;
							}else{
								t.addClass('bg-s');
							}
						}else{//other columns validation
							var vals=val.split(' ');
							vals.forEach(function(v){
								if(v.match(/[<>]?[\d.,]+$/gim) && !v.match(/[<>]{2,}|[<>]+\d[<>]|=/gim)  ){
									t.addClass('bg-s');
								}else{
									t.addClass('bg-d');
									stop=1;
								}
							})
						}
					}else{
					}
				})
				if(stop==1){
					return false;
				}


			/*
				if(Object.keys(kolon).length>0){
					$('.filter-count .badge').text(Object.keys(kolon).length).removeClass('dn');
				}else{
					$('.filter-count .badge').text(Object.keys(kolon).length).addClass('dn');
				}
			*/

				kolon=JSON.stringify(kolon);
				$.post('analiz',{analiz:1,kolon},function(result){
					$('table.analiz tbody').html(result);
					$(".sil").remove();
					setTimeout(function(){
						if(istablesorted>0){
							$('thead').eq(0).find('tr').find('th').eq(0).click();//to fix sort order for changed data
							setTimeout(function(){
								if(istablesorted>100){
									istablesorted=istablesorted-100;
									$('thead').eq(0).find('tr').find('th').eq(istablesorted).click();
								}
								$('thead').eq(0).find('tr').find('th').eq(istablesorted).click();
							},20);
						}
						if($('.secilenleri-goster').prop('checked')==false){
							secilenleri_isaretle();
						}
						//location.href='#analiz'; tt.focus();
					},80);
				})
			},300);
		}

	});

	var opt='<option value="<">Küçüktür</option><option value=">">Büyüktür</option><option value="">Eşittir</option>';
	$('.analiz thead:nth-child(2) th:gt(2)').append('<i class="filter fa fa-filter p-1 sn"></i>\
		<div class="suz-container au pa pb-0 b bg-fff z2 mt-3 ra-1 oh b bs2 closen" style="width:200px;"> \
			<h3 class="mb-0 bb tl py-2 pl-3 bg-se t-f f-09">Filtrele <a class="closex f-08 pa r-0 mt-2 pt-1 pr-2 t-f"></a> </h3>\
			<div class="dg fw px-3 py-2 g-1">\
				<select class="w-100 py-1 g-1">'+opt+'</select> <input type="number" class="w-100 b"/>\
				<button class="clk w-100 ma mt-1 tc b py-1 px-3 btn-suz" alt="ok">OK</button>\
				<button class="clk w-100 ma mt-1 tc b py-1 px-3 btn-suz" alt="rs">Reset</button>\
			</div>\
		</div>'
	);

	$('th').on('click','.btn-suz',function(){
		var	sc=$(this).closest('.suz-container');
		var i=$(this).parents('th').index();
		if($(this).attr('alt')=='ok'){
			$('table.analiz').find('thead').eq(1).find('th').eq(i).children('input').val(sc.find('select').val()+sc.find('input').val()).keyup();
		}else{
			$('table.analiz').find('thead').eq(1).find('th').eq(i).children('input').val('').keyup();
		}
		sc.hide();
	})

	$('.analiz thead:nth-child(2) th').on('click','.filter',function(e){
		//e.stopPropagation();
		$('.filter').not(this).next().hide();
	})



	var dobo=document.body;
	$('.analiz tbody').on('click','.onizle',function(){
		var t=$(this);
		var dialog_onizle=$('.dialog_onizle')
		var hisse=t.closest('tr').attr('alt');
		var hissedesc=t.closest('tr').attr('title');
		dialog_onizle.addClass('dn').html( loaddiv );
		setTimeout(function(){dialog_onizle.removeClass('dn');},180);//sync
		$.post('analiz',{onizle:1,hisse,hissedesc},function(e){
			dialog_onizle.removeClass('dn').html(e);
			setTimeout(function(){
				$('.table-onizle-container').animate({scrollLeft: 3000}, 900);
			},50);
			//dobo.style.overflow = 'hidden';
		})
	})

/*
	$(document).on("mousemove mouseover mousewheel mouseup",function(e){
		if( $('.dialog_onizle.dn').length==0){
			dobo.style.overflow = 'hidden';
		}else if(dobo.style.overflow=='hidden'){
			dobo.style.overflow = '';
		}
	});
	*/
	$('.perde').click(function(){
		$(this).prev().addClass('dn');
	})
	//ANALİZ END

	$('.tarihsel_getir').click(function(){
		var bastar=$('.bastar').val();
		var bittar=$('.bittar').val();
		var hisse=$('.hisse').val();
		$('.result_tarihsel').html(loadhtml+' Loading...')
		$.post('analiz',{tarihsel_getir:1,bastar,bittar,hisse},function(e){
			$('.result_tarihsel').html(e);
		})
	})


	$('.hvrf').click(function(){//yatırım merkezleri active
		$('.hvrf.bg-lb').removeClass('bg-lb');
		$(this).addClass('bg-lb');
	})

	if($('.company-card.chart-filter').length){
		setTimeout(function(){
			$('.company-card.chart-filter').find('button').eq(0).click()
		},200);
	}


	let wrapper = $('efilli-layout-dynamic');
	if(wrapper.length){
		var sheet2 = new CSSStyleSheet();
		sheet2.insertRule('html,body{font-size:16px !important;}');
		sheet2.insertRule('*,a,span,div{font-size:1rem !important;}');
		sheet2.insertRule('[data-name="Banner"]{display:flex;flex-wrap:wrap;width:36rem;margin-left:auto;justify-content:center}');
		sheet2.insertRule('@media(max-width:992px){[data-name="Banner"]{width:98% !important;margin-right:auto;}}');
		//sheet2.insertRule('');

		wrapper[0].shadowRoot.adoptedStyleSheets = [sheet2];
		//console.log('aaaa');
		//justify-content:center

	}

	$('.btn.btn-s2').each(function(){
		var t=$(this);
		if(t.text().match(/Hemen +Ba/)){
			t.addClass('btn-w2')
		}
	});


	$('.esube-popup').click(function(){
		$('.popup_main.esube-popup-container').removeClass('dn').show();
	})


	load=$('.loading');
	loadhtml=load[0].outerHTML;
	loaddiv='<div class="df aic jcc w-100 h-100 f-12 fw-700 py-5">'+loadhtml +'Loading...</div>';
	expires = new Date(Date.now() + (3*30*24*60*60*1000) );
	expires = "expires="+expires.toUTCString();
});//ready rrr
var home_chart,ct='',load='',loadhtml='',loaddiv='',expires='',mousedetected=1,md=1;

var graph_series={};
// object of object{ name=string ve data=[[unix_timestamp_in_ms1,fiyat1],[unix_timestamp_in_ms2,fiyat2]]}

/*
graph_series.bist100=     {name:'Fiyat',data:bist100}
graph_series.bist30=      {name:'Fiyat',data:bist30}
graph_series.bist_banka=  {name:'Fiyat',data:bist_banka}
graph_series.bist_sinai=  {name:'Fiyat',data:bist_sinai}
graph_series.usd=         {name:'Fiyat',data:usd}
graph_series.euro=        {name:'Fiyat',data:euro}
graph_series.euro_usd=    {name:'Fiyat',data:euro_usd}
*/


var bist100=[[100,100]];/*hata vermesi için*/

var home_chart_obj={
	name:'Fiyat',
	data:bist100
};


var options_main = {
	series: [ home_chart_obj ],
	chart: {
		id: 'chart',//use when update
		defaultLocale: 'tr',
		type: 'area',
		stacked: false,
		height: 330,
		background: '#fff',
		zoom: {
			type: 'x',
			enabled: true,
			autoScaleYaxis: true
		},
		toolbar: {
			show: true,
			autoSelected: 'zoom',
			tools:{
				zoomin: false,
				zoomout: false,
				zoom: true,
				selection: true,
				reset:  '<i class="bi bi-arrows-angle-contract"></i>',
				download : '<i class="bi bi-download"></i>',
			}
		},
	},
	stroke: {
		curve: "smooth",width: 4,
		
		//curve: "straight",
		//colors:['#00a'],
		width: 3,
	},
	dropShadow: {
		enabled: true,
		enabledSeries: [0],
		top: 2,
		left: 1,
		blur: 4,
		opacity: 0.6
	},
	dataLabels: {
		enabled: false
	},
	markers: {
		size: 0,
		style: 'hollow',
	},
	title: {
		//text: 'BİST-100',
		//align: 'center'

	},
	fill: {
		type: 'gradient',
		gradient: {
			shadeIntensity: .571,
			inverseColors: false,
			opacityFrom: 0.025,
			opacityTo: 1,
			stops: [0, 100]//or [0,90,100]
		},
	},


	grid: {
		show: true,
		position: 'front',
		borderColor: '#bbb',
		strokeDashArray: 2,
		padding: {
			left: 30,
			right: 5
		},
		xaxis: {
			lines: {
				show: true
			}
		},
		yaxis: {
			lines: {
				show: true
			}
		},

	},
	yaxis: {
		//min: min_Yval,
		//max: max_Yval,
		labels: {
			formatter: function (val) {
				return val.toFixed(2);
				//return (val / 100000).toFixed(0);
			},
		},
		title: {
			//text: 'TL'
		},


	},
	xaxis: {
		type: 'datetime',
		//type: 'category',

	},
	tooltip: {
		shared: false,
		x: {
			format: 'dd MMM yyyy'
		},
		y: {
			formatter: function (val) {
				return val.toFixed(2);
			}
		}
	},
	noData: {
		text: 'Loading...'
	},
	legend: {
		position: "right",
		position: 'top',
		verticalAlign: "top",
        horizontalAlign: 'left',
		containerMargin: {
			//left: 35,
			//right: 60
		}
	},
};

var options_sparkline = {
    series: [],
    chart: {
        type: 'line',
        width: 80,
        height: 36,
        sparkline: {
            enabled: true
        }
    },
    colors: ['#fff'],
    stroke: {
        show: true,
        curve: 'smooth',
        curve: 'straight',
        //lineCap: 'butt',
		colors: '#fff',
        width: 2,
        dashArray: 0,
    },
    tooltip: {
        enabled: false
    }
};

/*
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
function disableScroll() {
	window.addEventListener('DOMMouseScroll', pd, false); // older FF
	window.addEventListener(wheelEvent, pd, wheelOpt); // modern desktop
	window.addEventListener('touchmove', pd, wheelOpt); // mobile
	//window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function pd(e) {
  e.preventDefault();
}
*/


function showpass(x){
	$(x).prev('input').attr('type','text');
}

function hidepass(x){
	$(x).prev('input').attr('type','password')
}

function toast(x){
	$('.toast').addClass('show').text(x);
	clearTimeout(ct);
	ct=setTimeout(function(){
		$('.toast').removeClass('show');
	},2500);
}

function make_selected(classname,value){
	$(classname).val(value);
}


function user_table_filter_pagination(dis,sayfa){
	islem=dis.closest('table').attr('alt');filtrestring='';
	//loading=$('.loading').eq(0).clone();loading.removeClass('dn'); dis.closest('table').find('tbody').html(loading)
	filtre=['sayfa='+sayfa];
	dis.closest('table').find('input').each(function(){
		t=$(this);
		if (t.val()){
			filtre.push('col_'+t.closest('td').index()+'='+encodeURI(t.val()));
		}
	})
	if (filtre.length){
		filtrestring='&'+filtre.join('&');
	}
	dis.closest('table').find('tbody').load('./account?tablo_suz='+islem+''+filtrestring);

}

var sheets = {};
var sheet = new CSSStyleSheet();

var rz,resized=0,st='';
////



function cn(a){
	console.log(a);
}
function a(a){
	alert(a);
}

function play(aa){
	var audio = new Audio(aa);
	audio.play();
}

$(document).on("click",".popup_main",function(e){
	e.stopPropagation();
	$(this).addClass("dn").hide();
});



var expires='';
$(document).on("click",".popup_main_container",function(e){
	id=$(this).attr("alt");
	document.cookie="popup="+ encodeURIComponent(getCookie("popup")+","+id)+ ";secure;"+expires+";path=/";
	setTimeout(function(){
		$(this).closest(".popup_main").addClass("dn").hide();
	},50);//btnaccept(id);
});



/* function btnaccept(id=1){//btn-accept bu iptal
	//alert(id);
 	$.post("goo",{islemtipi:'acceptcookie', id:id},
	function(e){

	})
	.done(function(e){
		if (typeof bu !="undefined")
		bu.closest(".cookie,.popup").addClass("dn").hide();
	})

	$("[alt="+id+"]").closest(".cookie,.popup").addClass("dn").hide();
	setTimeout(function(){
		$(".modalbox-overlay").removeClass("vv");//.remove();
		$("html").removeClass("modal-hidden");
	},10);
} */

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' '){
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0){
			return c.substring(name.length, c.length);
		}
	}
	return "";
}



var kyc,ky,si_ky='',ky_downed=false;
var oldkycs=-100,ky_up_x,ky_down_x;
function start_ky(){
	clearInterval(si_ky);
	si_ky=setInterval(function(){
		kw=ky[0].scrollWidth;
		kyc[0].scrollLeft += 3;
		let sl=kyc[0].scrollLeft;
		if (sl==oldkycs){
			kyc[0].scrollLeft=0;
		}
		oldkycs=sl;
	},15);
}
function stop_ky(){
	clearInterval(si_ky);
}

function became_online(){
	$('.became_offline').remove();
}

function became_offline(){
	if ($('.became_offline').length==0){

	$('body').append(`<div class="became_offline pf bs1 t-5y ortala w-75 b ma bg-fff ra-2 t-0 db l-0 z999 py-5 tc"><div class="lh-2 pt-3 pb-3">
		<h1>Bağlantı problemi</h1><p>İnternete bağlı değilsiniz, <br>Lütfen internet bağlantınızı kontrol edin.</p>
	</div><button onclick="$('.became_offline').addClass('dn')" class="btn-p px-5 py-2 ra-1 mr-1 b">Kapat</button><button onclick="location.reload()" class="btn-p px-4 py-2 ra-1 b">Yeniden dene</button></div>`);
	}
}





