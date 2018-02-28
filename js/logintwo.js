$(function(){
    /*验证手机号码的有效性*/
         $(".phone_input").focus(function(){
          $(".cell_phone_p").html("请输入手机号");
        });
        $(".phone_input").blur(function(){
           if($(".phone_input").val() == 0){
               $(".cell_phone_p").html("请输入手机号");
               //alert("请输入手机号");
               return false;
           }
           if($(".phone_input").val().length != 11){
               $(".cell_phone_p").html("请输入有效的手机号");
            //alert("请输入有效的手机号");
            return false; 
           }
           if(!$(".phone_input").val().match(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)){
               $(".cell_phone_p").html("请输入正确的手机号");
            // alert("请输入正确的手机号");
            return false; 
           }
        }); 
});