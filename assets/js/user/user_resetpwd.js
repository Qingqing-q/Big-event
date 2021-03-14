$(function () {
  // 表单验证
  let form = layui.form;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    aPass: (value) => {
      if (value === $("[name=oldPwd]").val()) {
        return "新旧密码不能一样";
      }
    },

    bPass: (value) => {
      if (value !== $("[name=newPwd]").val()) {
        return "新密码两次不一致";
      }
    },
  });

  // 修改密码
  $("#form").on("submit", function (e) {
    e.preventDefault();
    let value = $(this).serialize();
    // 发送ajax请求
    axios.post("/my/updatepwd", value).then((res) => {
      // 修改失败
      if (res.data.status !== 0) {
        return layer.msg(res.data.message);
      }

      // 修改成功
      layer.msg(res.data.message);
      $("#form")[0].reset();
    });
  });

  // 点击重置
  $("[type=reset]").click(() => {
    $("#form")[0].reset();
  });
});
