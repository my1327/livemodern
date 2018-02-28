$(function(){
      $("#phone").focus(function(){
          $("#judge_phone").html("请输入手机号");
        });
        $("#phone").blur(function(){
           if($("#phone").val() == ""){
               $("#judge_phone").html("请输入手机号");
               //alert("请输入手机号");
               return false;
           }
           if($("#phone").val().length != 11){
               $("#judge_phone").html("请输入有效的手机号");
            //alert("请输入有效的手机号");
            return false; 
           }
           if(!$("#phone").val().match(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)){
               $("#judge_phone").html("请输入正确的手机号");
            // alert("请输入正确的手机号");
            return false; 
           }
        });          
});