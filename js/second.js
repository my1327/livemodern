$(function () {
    $(".leftBar").hover(function () {
        $(".pr-fh").addClass("fh-aa");
        $(".pr-fh img").attr("src", "img/more.png");
        $(".pr-fhd").css("display", "block");
    }, function () {
        $(".pr-fh").removeClass("fh-aa");
        $(".pr-fh img").attr("src", "img/more1.png");
        $(".pr-fhd").css("display", "none");
    });
    /*搜索框显示隐藏*/
    $(".to-search").click(function () {
        $(".to-se").toggle(500);
        $(this).toggleClass("to-search2");
    });
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".float-btn").fadeIn(800);
        }
        else {
            $(".float-btn").fadeOut(800);
        }
    });
    //当点击跳转链接后，回到页面顶部位置
    $(".to-top").click(function () {
        $('body,html').animate({scrollTop: 0}, 800);
        return false;
    });
    /*分类中的more按键效果切换*/
    $(".nor").click(function () {
        $(this).siblings("div").slideToggle(500);
        $(this).toggleClass("nor2");
        $(this).parent().toggleClass("types2");
    });
})