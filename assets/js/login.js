$(function () {
  // =================== 点击注册切换到注册 ===================
  $("#showReg").click(function () {
    $(".login-form").hide();
    $(".reg-form").show();
  });

  // =================== 点击登录切换到登录 ===================
  $("#showLogin").click(function () {
    $(".login-form").show();
    $(".reg-form").hide();
  });

  // =================== 自定义表单验证属性 ===================
  // 添加form变量, 变量是layui里的form
  let form = layui.form;
  form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 验证两次输入的密码是否一致
    samePass: function (value) {
      // console.log(value);
      //value：表单的值、item：表单的DOM对象
      let pwd = $("#passture").val();
      // console.log(pwd);
      if (value !== pwd) {
        // console.log(1);
        return "两次密码不一致";
      }
    },
  });

  // =================== 获取注册表单内容 ===================
  $(".reg-form").on("submit", function (e) {
    e.preventDefault();
    let value = $(this).serialize(); // 获得表单中带有name属性的值
    // console.log(value);
    // 发送ajax请求
    axios.post("/api/reguser", value).then(function (res) {
      // console.log(res.data);
      // 添加layer变量, 变量是layui里的layer
      let layer = layui.layer;
      if (res.data.status !== 0) {
        // return alert(res.data.message);
        return layer.msg(res.data.message);
      }
      // alert(res.data.message);
      layer.msg(res.data.message);
      $("#showLogin").click();
    });
  });

  // =================== 获取注册表单内容 ===================
  $(".login-form").on("submit", function (e) {
    e.preventDefault();
    let value = $(this).serialize();
    // console.log(value);

    // 发送ajax请求
    axios.post("/api/login", value).then(function (res) {
      // console.log(res);
      if (res.data.status !== 0) {
        return layer.msg("登录失败");
      }

      // console.log(res.data.token);
      // 把token身份认证信息存储起来
      localStorage.setItem("token", res.data.token);

      layer.msg(
        "登录成功",
        {
          time: 1000,
        },
        function () {
          // 跳转页面
          location.href = "/index.html";
        }
      );
    });
  });
});
