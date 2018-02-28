/**
 * Created by dev on 2016/6/17.
 */

var arr = ["imgBox01.png", "imgBox02.png", "imgBox03.png", "imgBox02.png"];
var timer = null;
var num = 0;
var as = "";


$(function () {
    /* 轮播*/
    Carousel.init();
    Carousel.fnTab();
    Carousel.autoPlay();

    /* 登录 */
    Login.init();


    /* 导航条 */
    NavBar.init();


    /* 商品信息 */
    GoodsInfo.init();

    /* 商品详情 */
    GoodsDetails.details();
    GoodsDetails.picDetails();


    /* 商品图片 */
    GoodsPic.picChange();
    //右侧导航栏
    RightBar.rightBox();
});


function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName("*");
    var aTmp = [];
    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            aTmp.push(aEle[i]);
        }
    }
    return aTmp;
}
window.onload = function () {
    var oDiv = document.getElementById("div1");
    var oMark = getByClass(oDiv, "mark")[0];
    var oFloat = getByClass(oDiv, "float_layer")[0];
    var oBig = getByClass(oDiv, "big_pic")[0];
    var oSmall = getByClass(oDiv, "topImg")[0];
    var oImg = oBig.getElementsByTagName("img")[0];

    oMark.onmouseover = function () {
        oFloat.style.display = "block";
        oBig.style.display = "block";
    };
    oMark.onmouseout = function () {
        oFloat.style.display = "none";
        oBig.style.display = "none";
    };
    oMark.onmousemove = function (ev) {      //让小白块跟着鼠标移动
        var ev1 = ev || event;
        var l = ev1.clientX - oDiv.offsetLeft /*$("#div1").offset().left*/ - oSmall.offsetLeft - oFloat.offsetWidth / 2;
        var t = ev1.clientY - (oDiv.offsetTop - $(document).scrollTop()) - oSmall.offsetTop - oFloat.offsetHeight / 2;

        if (l < 0) {                               //限制小白块的范围
            l = 0;
        } else if (l > oMark.offsetWidth - oFloat.offsetWidth) {
            l = oMark.offsetWidth - oFloat.offsetWidth;
        }
        if (t < 0) {
            t = 0;
        } else if (t > oMark.offsetHeight - oFloat.offsetHeight) {
            t = oMark.offsetHeight - oFloat.offsetHeight;
        }
        oFloat.style.left = l + "px";         //l-oFloat.offsetWidth/2:让鼠标跟着中心点走
        oFloat.style.top = t + "px";

        //document.title = l / (oMark.offsetWidth - oFloat.offsetWidth); //小白块在图片中所占的百分比
        var percentX = l / (oMark.offsetWidth - oFloat.offsetWidth);
        var percentY = t / (oMark.offsetHeight - oFloat.offsetHeight);
        oImg.style.left = -percentX * (oImg.offsetWidth - oBig.offsetWidth) + "px";
        oImg.style.top = -percentY * (oImg.offsetHeight - oBig.offsetHeight) + "px";
    }
};

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

/**
 * 登录
 * @type {{init: Login.init}}
 */
var Login = {
    init: function () {
        /* 显示登录框 */
        $(".topBar_wrap").hover(function () {
            $(".login_user").show();
        }, function () {
            $(".login_user").hide();
        });

        /* 登录注册忘记密码 */
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
    }
};


/**
 * 导航条
 * @type {{init: NavBar.init}}
 */
var NavBar = {
    init: function () {
        $(".navBar_list li").click(function () {
            $(".navBar_list li").removeClass("navBar_active");
            $(this).addClass("navBar_active");
            $(".navBar_list li a").removeClass("navBar_red");
            $(this).children("a").addClass("navBar_red");
        });
    }
};

/**
 *商品信息
 * @type {{amount: GoodsInfo.amount}}
 */
var GoodsInfo = {
    init: function () {
        GoodsInfo.amount();
        GoodsInfo.provinceList();
        GoodsInfo.taste();
    },
    amount: function () {
        /* amount */
        var text = $(".number input").val();
        $(".reduce").click(function () {
            text--;
            $(".number input").val(text);
            if (text < 0) {
                text = 0;
                $(".number input").val(text);
            }
        });

        $(".plus").click(function () {
            text++;
            $(".number input").val(text);
        });
    },
    provinceList: function () {
        /* province_list */
        $(".select").hover(function () {
            $(".province_list").show();
            $(".province_list a").click(function () {
                $(".select h3").html($(this).html());
                $(".province_list").hide();
            });
        }, function () {
            $(".province_list").hide();
        });
    },
    taste: function () {
        /* taste */
        $("#taste .dd").hover(function () {
            $("#taste .dd").removeClass("active");
            $(this).addClass("active");
        });
    }
};

/**
 * 商品详情
 * @type {{details: GoodsDetails.details}}
 */
var GoodsDetails = {
    details: function () {
        /* details */
        var dtDiv = $("#details_title div");
        var iSpeed = 0;
        var left = 0;
        var oBg = document.getElementById("details_active");
        for (var i = 0; i < dtDiv.length - 1; i++) {
            dtDiv[i].onclick = function () {
                dtDiv.removeClass("goods_label");
                $(this).addClass("goods_label");
                startMove(oBg, this.offsetLeft);
                $(".details_big").hide();
                $(".details_evaluate").hide();
                $(".details_left >div:eq(" + ($(this).index() + 1) + ")").show();
                if ($(this).index() == 1) {
                    $(".review_page").show();
                } else {
                    $(".review_page").hide();
                }
            }
        }
        function startMove(obj, iTarget) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                iSpeed += (iTarget - obj.offsetLeft) / 10;
                iSpeed *= 0.7;
                left += iSpeed;                 //防止小数误差问题
                if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {      //距离足够近与速度足够小
                    clearInterval(obj.timer);
                    obj.style.left = iTarget + "px";
                } else {
                    obj.style.left = left + "px";
                }
            }, 30);
        }
    },
    /** 商品评价图片*/
    picDetails: function () {
        var flog = true;
        var imgId;
        $("#user_right img").click(function () {
            if (flog) {
                $(".userShop_img img").css("cursor", "zoom-in");
                $(this).css("cursor", "zoom-out");
                $("#userShop_big img").attr("src", $(this).attr("src"));
                $("#userShop_big img").attr("yh", $(this).attr("yh"));
                $("#userShop_big").show();
                flog = false;
            } else {
                var imgIdNew = $(this).attr("yh");
                if (imgId == imgIdNew) {
                    $(".userShop_img img").css("cursor", "zoom-in");
                    $("#userShop_big").hide();
                    flog = true;
                } else {
                    $(".userShop_img img").css("cursor", "zoom-in");
                    $(this).css("cursor", "zoom-out");
                    $("#userShop_big img").attr("src", $(this).attr("src"));
                    $("#userShop_big img").attr("yh", $(this).attr("yh"));
                }
            }
            imgId = $(this).attr("yh");
        });

        $("#user_right img").click(function () {

        });
    }
};

/**
 * 商品图片
 * @type {{bigPicChange: GoodsPic.bigPicChange}}
 */
var GoodsPic = {
    picChange: function () {
        $("#smallImg_list img").hover(function () {
            $("#topImg").attr("src", $(this).attr("src"));
            $("#big_pic img").attr("src", $(this).attr("src"));
            $("#smallImg_list img").removeClass("active");
            $(this).addClass("active");
        });
    }
};

/**
 * 右侧导航条
 * @type {{rightBox: RightBar.rightBox}}
 */
var RightBar = {
    rightBox: function () {
        /* floor_rightBox */
        $(window).scroll(function () {
            if ($(window).scrollTop() > 250) {
                $(".floor_rightBox").fadeIn(1000);
            }
            else {
                $(".floor_rightBox").fadeOut(1000);
            }
        });

        $(".floor_top").click(function () {
            $('body,html').animate({scrollTop: 0}, 1000);
            return false;
        });

        $("#floor_search").click(function () {
            $("#search_input").toggle(500);
        });

    }
};