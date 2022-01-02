/*
 * 分析：
 * 1.获取li的index()
 * 2.更换背景图片
 * 3.更换播放文本及图片
 * 4.更换播放按钮及title为暂停
 * 5.图片旋转
 * 6.播放歌曲
 */ 
// 准备工作，换取元素

var index = 0;
var banner_text = $(".banner_text");
var li = $(".banner ul li");//获取所有li元素
var img = $(".music .img img");
var text = $(".music .text");
var prev = $(".music .btn .prev");
var play = $(".music .btn a").eq(1);
var next = $(".music .btn .next");
var mp3 = $(".music .mp3");
var flag = false;// 音乐播放状态
var close = true;//播放器显示与否

banner_text.click(function() {
    $("body").css({
        "background":"url(img/bgd_body.jpg)",
        "background-size":"cover"
    });

})
// 获取点击的li元素
li.click(function() {
    index = $(this).index();
    newIndex = index + 1;
    // 播放歌曲
    show();
    rotate();
    play_mp3();
});

function show() {
    // 根据索引号更换背景
    $("body").css({
        "background":"url(img/0"+newIndex+".jpg)",
        "background-size":"cover"
    });
    $(".music .img img").attr("src","img/"+newIndex+".jpg");
    $(".music .text").html(li.eq(index).attr('title'));
    $(".music .btn a").eq(1).attr({"class":"play","title":"暂停"})
};

function notshow() {
    // 根据索引号更换背景
    $("body").css({
        "background":"url(img/bgd_body.jpg)",
        "background-size":"cover"
    });
    $(".music .img img").attr("src","img/"+newIndex+".jpg");
    $(".music .text").html(li.eq(index).attr('title'));
    $(".music .btn a").eq(1).attr({"class":"pause","title":"播放"})
};

function rotate() {
    li.children().removeClass("img_rotate")
    li.eq(index).children().addClass("img_rotate");
};

function notrotate() {
    li.children().removeClass("img_rotate")
};

function play_mp3() {
    mp3.attr("src",li.eq(index).attr('datasrc'));
    mp3.get(0).play();
    flag = true;
}
// 暂停或者播放歌曲
play.click(function() {
    if (flag) {
        mp3.get(0).pause();
        li.eq(index).children().removeClass("img_rotate");
        // 暂停按钮更换为播放按钮
        play.removeClass('play').addClass("pause").attr("title","播放");
        flag = false;
    } else {
        mp3.get(0).play();
        li.eq(index).children().addClass("img_rotate");
        play.removeClass('pause').addClass("play").attr("title","暂停");
        flag = true;
    }
})
// 上一首下一首
prev.click(function() {
    index--;
    if (index<0) {
        index = li.length-1;
    }
    newIndex = index + 1;
    show();
    rotate();
    play_mp3();
})
next.click(function() {
    index++;
    if (index>4) {
        index = 0;
    }
    newIndex = index + 1;
    show();
    rotate();
    play_mp3();
})
// 隐藏或者显示播放器
$(".close").click(function() {
    if (close) {
        $(this).addClass("open");
        $(".music").animate({"left":"-524px"},800);
        close = false;
    }else {
        $(this).removeClass("open");
        $(".music").animate({"left":"0px"},800);
        close = true;
    }
})