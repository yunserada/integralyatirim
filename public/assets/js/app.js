var loader = '<div class="eng-loader-wp"><div class="eng-loader"></div></div>';
var loader2 = '<div class="eng-loader-wp"><div class="eng-loader2"></div></div>';

$(document).on("mouseover","[data-country]",function(){

 var country = $(this).data("country");

 $("[data-id='"+country+"']").css("fill","#B3B5B9");

});

$(document).on("mouseout","[data-country]",function(){

 var country = $(this).data("country");

 $("[data-id='"+country+"']").css("fill","rgb(121, 119, 119)");

});

$(document).on("mouseover","[data-countrytwo]",function(){

 var country = $(this).data("countrytwo");

 $("[data-id='"+country+"']").css("fill","#B3B5B9");

});

$(document).on("mouseout","[data-countrytwo]",function(){

 var country = $(this).data("countrytwo");

 $("[data-id='"+country+"']").css("fill","rgb(121, 119, 119)");

});



$("[data-country]").each(function(index) {

  var country = $(this).data("country");

  $("[data-id='"+country+"']").css('fill', '#797777');

});

$(document).ready(function(){

  $.ajax({

    url:origin + "/service/data",

    type:"POST",

    dataType:"json",

    data:{"type":"getExportCountry"},

    success:function(data){

       if(data.success){

        $("[data-id]").each(function(index) {

          var id = $(this).data("id");

          var link = window.location.origin + "/country/"+data.link[index];

           $("[data-id='"+data.code[index]+"']").parent().attr("href", link);

           

        });

      }else{



      }

    

    }

});

});















const element = document.querySelector("#svg-country");

const info = document.querySelector(".country-names");

const area = document.querySelector(".export-box:nth-child(2)");

const area2 = document.querySelector(".export-page .export-box");

const svg = document.querySelector(".export-box svg");



if (element) {

  element.addEventListener("mouseover", function(event) {

    if (event.target.tagName === "path") {

      info.innerHTML = [

        "<div class='inline-block'>",

        event.target.getAttribute("data-name"),

        "</div>"

      ].join("");

    }

  });





  area.addEventListener("mousemove", function(event) {

    var offset = $(this).offset();

    info.style.top = event.pageY - offset.top + 20 + "px";

    info.style.left = event.pageX - offset.left + "px";

  });



  if (area2) {

    area2.addEventListener("mousemove", function(event) {

      var offset = $(this).offset();

      info.style.top = event.pageY - offset.top + 20 + "px";

      info.style.left = event.pageX - offset.left + "px";

    });

  }



  svg.addEventListener("mouseout", function(event) {

    info.innerHTML = "";

  });

}



$("[data-countrytwo]").each(function(index) {

 var country = $(this).data("countrytwo");

 $("[data-id='"+country+"']").css('fill', '#797777');

});



$(document).on("click","#human",function(e){ //İnsan Kaynakları

  var form_data = new FormData();
  var t = $(this);
  var html = t.html();
  t.html(loader);
  t.prop("disabled", !0);

  var file_data = $('#file').prop('files')[0];

  var firstName = $("#firstName").val();

  var lastName = $("#lastName").val();

  var emailAddress = $("#emailAddress").val();

  var phoneNumber = $("#phoneNumber").val();


    form_data.append('file', file_data);

    form_data.append('firstName', firstName);

    form_data.append('lastName', lastName);

    form_data.append('emailAddress', emailAddress);

    form_data.append('phoneNumber', phoneNumber);

    form_data.append('type', "contact");

    $.ajax({

      url:origin + "/service/data",

      cache: false,

      contentType: false,

      processData: false,

      type:"POST",

      dataType:"json",

      data:form_data,

      enctype: 'multipart/form-data',

      success:function(data){

        if(data.success){

        $("form").trigger("reset");

          Swal.fire({

            position: 'top-center',

            icon: 'success',

            title: data.success,

            showConfirmButton: false,

            timer: 2500

          })

        }else{

          Swal.fire({

            position: 'top-center',

            icon: 'error',

            title: data.error,

            showConfirmButton: false,

            timer: 2500

          })

        }

      },

      complete:function(){
        t.html(html);
        t.prop("disabled", !1)
        

      }

    })

    e.preventDefault();

  });



$(document).on("click","#dealerButton",function(e){
  var t = $(this);
  var html = t.html();
  t.html(loader);
  t.prop("disabled", !0);
  var name = $("#firstName").val();

  var email = $("#emailAddress").val();

  var phone= $("#phoneNumber").val();

  var companyName = $("#companyName").val();

  var brand =$("#selectBrand").val();

  var country =$("#country2").val();

  var message =$("#message").val();

  $.ajax({

    url:origin + "/service/data",

    type:"POST",

    dataType:"json",

    data:{"name":name,"email":email,"phone":phone,"companyName":companyName,"brand":brand,"country":country,"message":message,"type":"dealerForm"},

    success:function(data){

       if(data.success){

      $("form").trigger("reset");

        Swal.fire({

          position: 'top-center',

          icon: 'success',

          title: data.success,

          showConfirmButton: false,

          timer: 2500

        })

      }else{

        Swal.fire({

          position: 'top-center',

          icon: 'error',

          title: data.error,

          showConfirmButton: false,

          timer: 2500

        })

      }

    

    },

    complete:function(){
      t.html(html);
      t.prop("disabled", !1)
      

    }

  })

  e.preventDefault();

});

$(document).on("click","#exportButton",function(e){
  var t = $(this);
  var html = t.html();
  t.html(loader);
  t.prop("disabled", !0);

  var name = $("#firstName").val();

  var email = $("#emailAddress").val();

  var phone= $("#phoneNumber").val();

  var companyName = $("#companyName").val();

  var country =$("#country").val();

  var brand =$("#brand").val();

  var message =$("#message").val();

  $.ajax({

    url:origin + "/service/data",

    type:"POST",

    dataType:"json",

    data:{"name":name,"email":email,"phone":phone,"companyName":companyName,"country":country,"brand":brand,"message":message,"type":"exports"},

    success:function(data){

       if(data.success){

      $("form").trigger("reset");

        Swal.fire({

          position: 'top-center',

          icon: 'success',

          title: data.success,

          showConfirmButton: false,

          timer: 2500

        })

      }else{

        Swal.fire({

          position: 'top-center',

          icon: 'error',

          title: data.error,

          showConfirmButton: false,

          timer: 2500

        })

      }

    

    },

    complete:function(){

      t.html(html);
      t.prop("disabled", !1)

    }

  })

  e.preventDefault();

});



$(document).on("click","#exportButton2",function(e){
  var t = $(this);
  var html = t.html();
  t.html(loader);
  t.prop("disabled", !0);

  var name = $("#adsoyad").val();

  var email = $("#email").val();

  var phone= $("#telefon").val();

  var companyName = $("#firmaad").val();

  var country =$("#country").val();

  var brand =$("#brand").val();

  var message =$("#mesaj").val();

  $.ajax({

    url:origin + "/service/data",

    type:"POST",

    dataType:"json",

    data:{"name":name,"email":email,"phone":phone,"companyName":companyName,"brand":brand,"country":country,"message":message,"type":"exports"},

    success:function(data){

       if(data.success){

      $("form").trigger("reset");

        Swal.fire({

          position: 'top-center',

          icon: 'success',

          title: data.success,

          showConfirmButton: false,

          timer: 2500

        })

      }else{

        Swal.fire({

          position: 'top-center',

          icon: 'error',

          title: data.error,

          showConfirmButton: false,

          timer: 2500

        })

      }

    

    },

    complete:function(){
      t.html(html);
      t.prop("disabled", !1)
      

    }

  })

  e.preventDefault();

});



$(document).on("click","#dealerview",function(e){
  var t = $(this);
  var html = t.html();
  t.html(loader);
  t.prop("disabled", !0);

  var name = $("#firstName2").val();

  var email = $("#emailAddress2").val();

  var phone= $("#phoneNumber2").val();

  var companyName = $("#companyName2").val();

  var brand =$("#selectBrand2").val();

  var message =$("#message2").val();

  $.ajax({

    url:origin + "/service/data",

    type:"POST",

    dataType:"json",

    data:{"name":name,"email":email,"phone":phone,"companyName":companyName,"brand":brand,"message":message,"type":"dealerviewForm"},

    success:function(data){

       if(data.success){

      $("form").trigger("reset");

        Swal.fire({

          position: 'top-center',

          icon: 'success',

          title: data.success,

          showConfirmButton: false,

          timer: 2500

        })

      }else{

        Swal.fire({

          position: 'top-center',

          icon: 'error',

          title: data.error,

          showConfirmButton: false,

          timer: 2500

        })

      }

    

    },

    complete:function(){

       t.html(html);
       t.prop("disabled", !1)

    }

  })

  e.preventDefault();

})



$(document).on("click","#bulletinButton",function(e){

  var bulletin = $("#bulletin").val();
    var t = $(this);
    var html = t.html();
    t.html(loader);
    t.prop("disabled", !0);
  $.ajax({

    url:origin + "/service/data",

    type:"POST",

    dataType:"json",

    data:{"bulletin":bulletin, "type":"bulletin"},

    success:function(data){

        if(data.success){

        Swal.fire({

          position: 'top-center',

          icon: 'success',

          title: data.success,

          showConfirmButton: false,

          timer: 2500

        })

      }else{

        Swal.fire({

          position: 'top-center',

          icon: 'error',

          title: data.error,

          showConfirmButton: false,

          timer: 2500

        })

      }

    },

    complete:function(){

      $("form").trigger("reset");
        t.html(html);
        t.prop("disabled", !1)

    }

  })

  e.preventDefault();

});



$(document).on("click","#contactFormButton",function(e){
  var t = $(this);
  var html = t.html();
  t.html(loader);
  t.prop("disabled", !0);

  var name  =  $("#fullName").val();

  var email = $("#email").val();

  var phone =  $("#phoneNumber").val();

  var message =$("#message").val();

  $.ajax({

    url:origin + "/service/data",

    type:"POST",

    dataType:"json",

    data:{"name":name,"email":email,"phone":phone,"message":message,"type":"contactform"},

    success:function(data){

       if(data.success){

      $("form").trigger("reset");

        Swal.fire({

          position: 'top-center',

          icon: 'success',

          title: data.success,

          showConfirmButton: false,

          timer: 2500

        })

      }else{

        Swal.fire({

          position: 'top-center',

          icon: 'error',

          title: data.error,

          showConfirmButton: false,

          timer: 2500

        })

      }

    

    },

    complete:function(){

       t.html(html);
        t.prop("disabled", !1)

    }

  })

  e.preventDefault();

});



let language = document.querySelectorAll(".language-drop");

let all_language = language[0].children[0].children;

let each = Object.values(all_language)

each.forEach(function(index,key){

if(window.location.pathname.search("/new/") != -1){

  index.children[0].href = index.children[0].href + "news";

}else{

  index.children[0].href = index.children[0].href + window.location.pathname.replace("/","");

}

});

let language_mobile = document.querySelectorAll(".mobile-language");
let all_language_mobile = language_mobile[0].children[0].children;
let each_mobile = Object.values(all_language_mobile)
each_mobile.forEach(function(index,key){
if(window.location.pathname.search("/new/") != -1){
  index.children[0].href = index.children[0].href + "news";
}else{
  index.children[0].href = index.children[0].href + window.location.pathname.replace("/","");
}
});
