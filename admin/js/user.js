
$(function() {
    $.ajax({
        url:BigNew.user_detail,
        type:'get',
        dataType:'json',
        success: function(backData) {
            console.log(backData);
            for (var key in backData.data) {
                $('input.'+key).val(backData.data[key]);
            }
            $('img.user_pic').attr('src',backData.data.user_pic)
        }
    })
    // 功能升级：点击图片，通过 trigger 主动触发文件上传的点击事件
    $('.user_pic').click(function () {
        $('#exampleInputFile').trigger('click');
    })

    // 文件预览
    // 给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        // 获取用户选择的图片
        var file = this.files[0];
        // 将文件转为src路径
        var url = URL.createObjectURL(file);
        //将 url 路径赋值给img标签的src
        $('.user_pic').attr('src',url);
    })

    // 编辑个人信息
    $('#form').on('submit',function (e) {
        // 禁用表单默认提交事件
        e.preventDefault();
        const fdObj = new FormData(this);
        // FormData 这个搞不清楚
        $.ajax({
            url:BigNew.user_edit,
            type:'post',
            dataType:'json',
            data: new FormData(this),
            contentType:false,
            processData:false,
            success:function (backData) {
                console.log(backData);
                if(backData.code === 200) {
                    alert('修改成功');
                    // 下面这个相当于刷新了页面
                    // window.parent.location.reload();
                    // 为了增加用户体验，让他只改变内容，不用重新加载页面
                    const url  =  URL.createObjectURL(fdObj.get('userPic'));
                    const nickname = fdObj.get('nickname');
                    // 从 fromData 对象中大图片转 URL 路径
                    parent.$('.user_info img,.user_center_link img').attr('src',url);
                    parent.$('.user_info span').html('欢迎大佬：'+ nickname);
                }
            }
        })
    })
})