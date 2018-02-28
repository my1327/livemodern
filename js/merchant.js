/**
 * Created by dev on 2016/6/17.
 */

var arr = ["l1.png", "l2.png", "l3.png"];
var timer = null;
var num = 0;
var as = "";

$(function () {
    /* 轮播*/
    Carousel.init();
    Carousel.fnTab();
    Carousel.autoPlay();

    /* 登录注册忘记密码 */
    $(".topBar_wrap").hover(function () {
        $(".login_user").show();
    }, function () {
        $(".login_user").hide();
    });


    $(".left_user div").hover(function () {
        $(".left_user div").removeClass("leftUser_active");
        $(this).addClass("leftUser_active");
        $(".right_user >div").hide();
        var index = $(this).index();
        $(".right_user >div:eq(" + index + ")").show();
    });

    /* qq微信登录 */

    $(".qq").click(function () {
        $(".qq_show").show();
    });
    $(".close").click(function () {
        $(".qq_show").hide();
    });
    $(".weixin").click(function () {
        $(".weixin_show").show();
    });
    $(".close1").click(function () {
        $(".weixin_show").hide();
    });
    
    /*鼠标点击出现搜索框*/
    $(".floor_box_search").click(function () {
        $(".box_search").toggle(500);
    });
    
    /*当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失*/
    $(window).scroll(function () {
        if ($(window).scrollTop() > 250) {
            $(".floor_box").fadeIn(1000);
        } else {
            $(".floor_box").fadeOut(1000);
        }
        /*当点击跳转链接后，回到页面顶部位置*/
        $(".floor_box_back").click(function () {
            $("body,html").stop().animate({scrollTop: 0}, 1000);
            return false;
        });
        /*鼠标移入图片放大 */
        $(".right_image").hover(function () {
                $(this).stop().animate({width: "120%", height: "120%", left: "-20px", top: "-20px"}, 400);
            }
            , function () {
                $(this).stop().animate({width: "100%", height: "100%", left: "0px", top: "0px"}, 400);
            });
    });
});


/**
 * 轮播
 * @type {{init: Carousel.init, startTimer: Carousel.startTimer, stopTimer: Carousel.stopTimer, autoPlay: Carousel.autoPlay, fnTab: Carousel.fnTab}}
 */
var Carousel = {
    init: function () {
        for (var i = 0; i < arr.length; i++) {
            as += '<a href="#"></a>';
        }
        $("#imgNum").html(as);

        $("#imgBox").hover(function () {
            Carousel.stopTimer();
        }, function () {
            Carousel.autoPlay();
        });

        $("#left_btn").click(function () {
            if (--num == -1) {
                num = arr.length - 1;
            }
            Carousel.fnTab();
        });

        $("#right_btn").click(function () {
            if (++num == arr.length) {
                num = 0;
            }
            Carousel.fnTab();
        });

        for (var j = 0; j < arr.length; j++) {
            $("#imgNum a:eq(" + j + ")").attr("index", j);
            $("#imgNum a:eq(" + j + ")").mouseover(function () {
                num = $(this).index();
                Carousel.fnTab();
            });
        }
    },
    startTimer: function () {
        Carousel.stopTimer();
        timer = setInterval(function () {
            num++;
            num %= arr.length;
            Carousel.fnTab();
        }, 2000);
    },
    stopTimer: function () {
        if (timer != null) {
            clearInterval(timer);
            timer = null;
        }
    },
    autoPlay: function () {
        Carousel.startTimer();
    },
    fnTab: function () {
        $("#imgBox_list img").attr("src", "img/" + arr[num]);
        $("#imgNum a").removeClass("active");
        $("#imgNum a:eq(" + num + ")").addClass("active");
    }
};
