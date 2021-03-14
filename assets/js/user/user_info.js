$(function () {
  let form = layui.form;

  // 封装函数 获取并显示在用户信息
  function getUser() {
    // 发送ajax请求
    axios.get("/my/userinfo").then(function (res) {
      // 给表单赋值
      form.val("formTest", res.data.data);
    });
  }
  getUser();

  // 添加表单验证
  form.verify({
    fault: function (value) {
      if (value.length > 6) {
        return "昵称要求1-6个字符之间";
      }
    },
  });

  // 提交修改
  $("#form").on("submit", function (e) {
    e.preventDefault();
    let value = $(this).serialize();

    // 发送ajax请求
    axios.post("/my/userinfo", value).then((res) => {
      if (res.data.status !== 0) {
        return layer.msg(res.data.message);
      }
      window.parent.getUserInfo();
    });
  });

  // 重置按钮
  $("#btnReset").click(function (e) {
    e.preventDefault();

    getUser();
  });
});
