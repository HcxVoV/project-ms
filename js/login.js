$(function () {
    // 登录页面和注册页面点击交换
    $('#link-log').on('click', function () {
        $('.log-box').hide();
        $('.reg-box').show();
    })
    $('#link-reg').on('click', function () {
        $('.reg-box').hide();
        $('.log-box').show();
    })

    // 从layui中进行自定义表单验证
    // 从layui中获取 form 对象
    var form = layui.form;
    form.verify({
        // 自定义pwd这个规验证则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
       
        // 检验注册页面中两次密码的相同
        repwd: (value) => {
        var pwd = $('.reg-box [name=password]').val();
        if (pwd !== value) {
            return '请输入相同的密码'
        }
    }
    });
    
    // 监听注册表单的提交事件
    var layer = layui.layer;
    $('#form_reg').on('submit', (e) => {
        // 阻止表单默认行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
            success: (res) => {
                if (res.status !== 0) {
                   return layer.msg(res.message);
                } 
                layer.msg('注册成功');
                // 注册成功后自动跳转到登录页面
                $('#link-reg').click();
            }
       })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit((e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            // 快速获取表单中的元素
            data: $('#form_login').serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('登录失败,用户名或密码不正确！');
                }
                 layer.msg('登录成功')
                // 将登录成功后的 token 字符串保存到 localStorage 中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';   
            }
        })

    })
})