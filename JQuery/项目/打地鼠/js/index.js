$(function () {
    //监听游戏规则的点击事件
    $('.rules').click(function () {
        $(".rule").fadeIn(100);
    })

    //监听关闭的点击事件
    $(".rule>a").click(function () {
        $(".rule").fadeOut(100);
    });

    //监听开始按钮的点击事件
    $(".start").click(function () {
        $(this).fadeOut(100);
        //调用进度条方法
        progressRun();
        //调用处理地鼠出现的方法
        mouseAnimate();
    });

    //处理进度条
    function progressRun() {
        //还原进度条
        $(".progress").width(180);
        $(".progress").animate({
            width: "0px"
        }, 10000, function () {
            //进度条结束时弹出重新开始的画面
            $mouseImage.remove();
            clearInterval(mouseTimer);
            $(".mask").fadeIn(100);
        })
    };

    //监听重新开始按扭的点击事件
    $(".restart").click(
        function () {
            $(".mask").fadeOut(100);
            progressRun();
            mouseAnimate();
        }
    )

    //处理地鼠出现的动画
    var $mouseImage;
    var mouseTimer;
    function mouseAnimate() {
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片
        var mouse_1 = ['../images/h0.png', '../images/h1.png', '../images/h2.png', '../images/h3.png', '../images/h4.png', '../images/h5.png', '../images/h6.png', '../images/h7.png', '../images/h8.png', '../images/h9.png'];
        var mouse_2 = ['../images/x0.png', '../images/x1.png', '../images/x2.png', '../images/x3.png', '../images/x4.png', '../images/x5.png', '../images/x6.png', '../images/x7.png', '../images/x8.png', '../images/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            { left: "100px", top: "115px" },
            { left: "20px", top: "160px" },
            { left: "190px", top: "142px" },
            { left: "105px", top: "193px" },
            { left: "19px", top: "221px" },
            { left: "202px", top: "212px" },
            { left: "120px", top: "275px" },
            { left: "30px", top: "295px" },
            { left: "209px", top: "297px" }
        ];
        //创建随机位置和随机数组
        var randomIndex = Math.round(Math.random() * 8);
        var randomMouse = Math.round(Math.random()) == 0 ? mouse_1 : mouse_2;
        // 3.创建图片
        $mouseImage = $("<img src=''>");
        $mouseImage.css({
            position: "absolute",
            left: arrPos[randomIndex].left,
            top: arrPos[randomIndex].top
        })
        //设置定时器使地鼠逐渐露头
        var mouseIndex = 0;
        mouseTimer = setInterval(function () {
            if (mouseIndex > 5) {
                $mouseImage.remove();
                clearInterval(mouseTimer);
                mouseAnimate();
            }
            $mouseImage.attr("src", randomMouse[mouseIndex]);
            mouseIndex++;
        }, 300);
        $(".container").append($mouseImage);
        //处理游戏规则
        gameRules($mouseImage);
    }

    function gameRules($mouseImage) {
        $mouseImage.click(function () {
            var $src = this.attr("src");
            var flag = $src.indexOf('h') >= 0;
            if(flag) $(".grade").text(parseInt($(".grade").text())+10);
            else $(".grade").text(parseInt($(".grade").text())-10);
        })
    }
});