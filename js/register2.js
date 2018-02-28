/**
 * Created by dev on 2016/6/27.
 */
$(function () {
    $(".register_detail input").focus(function () {
        $(".register_detail input").removeClass("active");
        $(this).addClass("active");
    });
    $(".register_detail input").blur(function () {
        $(".register_detail input").removeClass("active");
    });
});