// 把获取用户信息封装成一个函数
function getUserInfo() {
  // 发送ajax请求获取用户信息

  // console.log(data);
  axios
    .get("/my/userinfo", {
      // headers: {
      //   Authorization: localStorage.getItem("token"),
      // },
    })
    .then(function (res) {
      let data = res.data.data;
      // console.log(data);

      // 获取姓名
      let name = data.nickname || data.username;
      // console.log(name);

      // 获取头像
      // console.log(data);
      if (data.user_pic === null) {
        $(".layui-nav-img").hide();
        $(".text-avatar-box").show().children().text(name[0].toUpperCase());
      } else {
        $(".text-avatar-box").hide();
        $(".layui-nav-img").show().attr("src", data.user_pic);
      }

      $("#welcome").text("欢迎 " + name);
    });
}

$(function () {
  getUserInfo();

  $("#btnLogout").on("click", function () {
    layer.confirm("确定退出嘛?", { icon: 3, title: "提示" }, function (index) {
      localStorage.removeItem("token");
      location.href = "/login.html";
      layer.close(index);
    });
  });
});
