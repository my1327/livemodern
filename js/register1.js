var wait=5;
function time(o) {
	this.disabled = false;
        if (wait == 0) {
            o.removeAttribute("disabled");           
            o.value="点击获取验证码";
            wait=5;
        } else {
            o.setAttribute("disabled", true);
            o.value="获取验证码("+wait+")";
            wait--;
            setTimeout(function() {
                time(o)
            },
            1000)
        }
    }
/*获得焦点隐藏号码判断提示*/
function hide(){
	var err=document.getElementById("errorphone");
    err.style.cssText="display:none;";
    this.innerHTML="";
}
/*失去焦点判断号码格式*/
function checkPhone(){ 
    var phone = document.getElementById("phonenum").value;
    var err=document.getElementById("errorphone");
    //err.style.cssText="display:none;";
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
        err.style.cssText="display:block;";
        return false; 
    } 
    if(/^1[3|4|5|7|8]\d{9}$/.test(phone)){
    	err.style.cssText="display:none;";
    	return false;
    }
}