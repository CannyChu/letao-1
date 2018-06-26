

$(function(){
  //获取用户列表;



$.ajax({
  url:"/user/queryUser",
  type:"get",
  data: {
    page: 1,
    pageSize: 10,


  },
  //注意: 在html文件中, 把作为模板的html文件模板放到标签中<script type="text/template" id="userTp1"> html文件 模板内容</script>
  success: function(res){
    console.log(res);
    var html = template(userTp1,res)//利用模板库, 拼接字符串;template(id, 对象);
  }
})


})

