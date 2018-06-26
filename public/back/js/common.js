
// common.js 中是所有的通用的js功能;



$(function(){



//退出功能的实现
//1 获取退出按钮
//2. 注册点击事件, 调用退出接口, 实现退出功能
//退出功能的实现
$("#btn-out").on("click", function(){

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
});




//登陆拦截功能(如果管理员不登陆, 某些功能就不能操作)
//页面一加载, 就进行登陆拦截
//*******坑: ajax请求是异步执行的,当我们发送请求的时候, 下面的代码仍然可以进行执行的, 但我们没有登陆的时候,下面的代码不能执行;所有为了保证此时,下面的代码不能执行, 我们ajax请求改为同步执行的: ********************  */
$.ajax({
  url:"/employee/checkRootLogin",
  type: "get",
  //**************坑: 发送同步请求******************** */
  async: false,//同步请求; 当值是true(默认值), 发送异步请求;
  success: function(res){
    if(res.error && res.error ==400){
      window.location.href = "login.html";
    }
    console.log(res);
  }
});





/* nprogress.js插件: 进度条效果 */
/* ctrl+alt+/: 多行注释; */
// 进度条效果的实现;
/*  */
/* NProgress.start();

setTimeout(function(){//加一个延时器;

  NProgress.done();//请求之后;
}, 500);
 */

 //配置: 关闭进度环;
 NProgress.configure({showSpinner: false});

$(document).ajaxStart(function(){
   console.log("发送ajax请求开始了...");
   NProgress.start();

 });

 $(document).ajaxStop(function(){
   console.log("ajax请求结束了....");
   NProgress.done();
 });



});

