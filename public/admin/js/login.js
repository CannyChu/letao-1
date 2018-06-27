
$(function(){

  //1.初始化表单校验, 找到表单, 调用bootstrapValidator;
  $("form").bootstrapValidator({

    //配置校验规则: 用户名不能为空, 用户密码不能为空, 用户密码长度为6-12位;
    fields: {
      //对应了表单中的name属性;
      username: {
        //陪用户名的具体校验规则;
        validators: {
          notEmpty: {
            message:'用户名不能为空'
          },
          stringLength: {
            message:'用户名长度是3-12位',
            min: 3 ,
            max: 9,
          }
        }
      },
      password:{
        validators: {
          notEmpty:{
            message: '用户密码不能为空',
          }
        },
        stringLength: {
          min: 6,
          max: 12,
          message: '用户密码长度是6-12位',
        }
      }
    },

    //也可以配置校验成功之后显示的小图标
    feedbackIcons: {
      valid: 'glyphicon  glyphicon-thumbs-up',//校验成功时,显示的小图标的名字;
      invalid: 'glyphicon glyphicon-remove',//校验失败时, 显示的小图标名字;
      validating: 'glyphicon glyphicon-refresh',// 刷新;
    }

  });


  //2.表单校验成功的时候, 阻止表单的跳转, 使用ajax进行数据的提交;
//成功的时候触发;
$('form').on("success.form.bv", function(e){
  e.preventDefault();//阻止浏览器的默认跳转功能;
  
  
  //发送ajax请求, 不成功的时候, 不跳转页面;
  $.ajax({
    type: "post",
    //没有跨域;
    url:"/employee/employeeLogin",
    data: $("form").serialize(),//数据序列化;
   
    success: function(info){
      
      //console.log(info);
      //打印info 查看返回的结果, 根据返回的结果, 再写接下来的判断;
      if(info.success){
        //跳转到首页
        location.href = 'index.html';

      }
      if(info.error===1000){
        alert("用户名不存在");
      }
      if(info.error ===1001){
        alert("密码错误");
      }

    }
  });


});




//3.重置表单;
$("[type='reset']").on("tap", function(){
  //获取表单校验插件的实例用: data("bootstrapValidator"), 通过这个实例就可以调用插件提供的很多方法;
  // resetForm(true): 重置表单所有的样式以及内容;默认参数是false;
  $(form).data("bootstrapValidator").reset(true);
})

//$(form).bootstrapValidator(options);


});



















$.ajax({
  url:"/employee/checkRootLogin",
  type: "get",
  //**************坑: 发送同步请求******************** */
  async: false,//同步请求; 当值是true(默认值), 发送异步请求;
  success: function(res){
    if(res.success){//如果用户已经登陆了;
      window.location.href = "user.html";
    }

    // if(res.error && res.error ==400){
    //   window.location.href = "login.html";
    // }
    // console.log(res);
  }
})





// 登陆功能的实现

$(function(){
  //表单校验功能;
  //bootstrapValidator插件:是bootstrap的一个插件, 依赖于bootstrap;
  //bootstrapValidator插件会自动进行表单校验, 只需要配置一些校验的规则即可;
  //在表单提交的时候, 以及输入内存的时候会自动校验; 

  //1.获取登陆按钮, 给按钮注册点击事件
  //2. 获取用户输入的信息(用户名和密码), 并且判断用户输入的表单信息进行校验,是否为空,如果为空,则阻止操作;
  //3.根据接口文档, 调用登陆接口,实现登陆,发送ajax 请求 

  $("#login-button").on("click", function(){

    var username = $.trim( $("[name='username']").val());
    var password = $.trim( $("[name= 'password']").val());

    if(!username){
      alert("请输入用户名");
      return;
    }
    if(!password){
      alert("请输入密码");
      return;
    }

    $.ajax({
      url:"employee/employeeLogin",
      type:"post",
      data:{
        username: username,
        password: password,
      },
      success:function(res){//回调函数
        if(res.success){
          //登陆成功
          location.href = "user.html";
        }
        //console.log(res);
      }
    })



  })

});