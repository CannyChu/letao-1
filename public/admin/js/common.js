
// common.js 中是所有的通用的js功能;



$(function(){



//退出功能的实现
//1 获取退出按钮
//2. 注册点击事件, 调用退出接口, 实现退出功能
//退出功能的实现
/* $("#btn-out").on("click", function(){

  if(confirm("确定退出吗?")){
    
    $.ajax({
      url:"emploee/employeeLogout",
      type:"get",
      success:function(res){//回调函数;
        if(res.success){
          location.href = "login.html";

        }else{
          alert(res.message);
        }
      }
    })
  }
}); */



/* 每一个页面一加载, 就需要发送一个ajax请求, 判断当前用户时候登陆, 如果当前用户没有登陆, 需要跳转到登陆页面;
 如果是login.html页面, 就不需要登陆;
如果不是login.html页面, 就需要登陆的;



*/


/*登陆拦截功能(如果管理员不登陆, 某些功能就不能操作)
页面一加载, 就进行登陆拦截
*******坑:****** ajax请求是异步执行的,当我们发送请求的时候, 下面的代码仍然可以进行执行的, 但我们没有登陆的时候,下面的代码不能执行;所以为了保证此时下面的代码不能执行, 我们ajax请求改为同步执行的: *********************** 
前端方式: 实现页面的跳转

*/

if(location.href.indexOf("login.html")==-1){//判断当前页是不是在登陆页,不在登陆页时等于-1;此时, 需要发送ajax请求给服务器, 
  // 除了登陆页面都要先登陆才可以, 所以要发送ajax 发送请求,判断用户是不是登陆了;
  $.ajax({
  url:"/employee/checkRootLogin",
  type: "get",
  //**************坑: 发送同步请求******************** */
  async: false,//同步请求; //当值是true(默认值), 发送异步请求;
  success: function(res){
    if(res.error && res.error ==400){//未登录时;浏览器跳转页面;
      window.location.href = "login.html";//浏览器执行跳转;
    }
    //console.log(res);
  }
}); 

}
 







/* nprogress.js插件: 进度条效果 */
/* ctrl+alt+/: 多行注释; */
// 进度条效果的实现;
/*  */
/* NProgress.start();

setTimeout(function(){//加一个延时器;

  NProgress.done();//请求之后;
}, 500);
 */


 
 NProgress.configure({showSpinner: false});//配置: 关闭进度环;

$(document).ajaxStart(function(){
   console.log("发送ajax请求开始了...");
   NProgress.start();

 });

 $(document).ajaxStop(function(){
   console.log("ajax请求结束了....");
   
   setTimeout(function(){
     NProgress.done();
   },500);
   
 });


  /* 
    二级分类菜单的显示和隐藏;
    该功能写在公共样式中, 因为其他的菜单也可能有这个功能(子菜单的显示和隐藏效果), 写在公共样式中可以公享;

    当点击某个菜单的时候, 显示该菜单下面的子菜单;

  */
$(".child").prev().on("click", function(){
  // slide系列:--卷帘门效果: slidedown(), slideup(), slideToggle()
  $(this).next().slideToggle();
});



/* 点击切换按钮, 显示和隐藏侧边栏;
  1. 找到切换按钮
  2. 切换;

*/

$(".icon_menu").on("click", function(){

  /* $(".lt_aside").width(0);//宽度变为0, 但是图片仍然在那, 还得加overflow:hidden; */
  /* $(".lt_aside").css("left", -180);//通过定位, 让该侧边栏出去;没有单位px;
  $("lt_main").css("paddingLeft", 0);//padding-left: 不好控制
 */

 $(".lt_aside").toggleClass("now");
 $(".lt_main").toggleClass("now");

});










/*
退出功能;
1. 点击退出按钮 ;
2. 显示退出的模态框
3. 点击退出模态框中的确认按钮, 退出即可; 必须发送ajax请求, 告诉服务器我要退出了...下次再访问的时候, 必须再登陆, 才可以房访问; 

*/

$(".icon_logout").on("click", function(){
  // 显示模态框
  $("#logoutModal").modal("show");
})

$(".btn_logout").on("click", function(){
  //只是浏览器的地址栏中的地址发生了跳转, 并没有真正的退出; 登陆信息的数据还在缓存中, 下次访问页面的时候还是可以访问的;
  // location.href ="login.html";


  /* 发发送ajax请求 */
  $.ajax({

    type:"get",
    url:"/employee/employeeLogout",
    success:function(info){
      console.log(info);

      if(info.success){
        //注意页面跳转的时候是不是真的跳转了???依靠浏览器完成跳转的; 后台并不能跳转页面, 服务器只能判断有没有登陆, 如果没有登陆, 告诉浏览器地址, 让浏览器执行跳转页面;
        location.href = "login.html";
      }

    }
  });


});


});

