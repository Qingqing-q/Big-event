$(function () {
  // =================== 调用cropper方法，创建剪裁区 ===================
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $("#image");

  // 1.2 配置选项
  let options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // =================== 点击上传 ===================
  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });

  // ============= 添加文件域change事件 当文件域发生改变触发 =============
  $("#file").on("change", function () {
    // 获得图片信息
    let file = this.files[0];
    // console.log(file);

    if (!file) {
      return;
    }

    // 将图片信息转成路径
    let newImgURL = URL.createObjectURL(file);
    // console.log(newImgURL);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 点击确定更换头像
  $("#btnCreateAvatar").on("click", function () {
    let base64Str = $image.cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    });

    // 把图片转成base64格式  因为里面有特殊字符需要对其进行编码
    let dataURL = encodeURIComponent(base64Str.toDataURL()); // 把canvas图片转成base64格式

    // 发送ajax请求
    axios.post("/my/update/avatar", "avatar=" + dataURL).then((res) => {
      // 更换失败
      if (res.data.status !== 0) {
        return layer.msg(res.data.message);
      }
      // 更换成功
      layer.msg(res.data.message);
      window.parent.getUserInfo();
    });
  });
});
