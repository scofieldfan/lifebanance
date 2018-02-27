<template>
    <div class="dialog">
        <flex-box class="mask">
            <div class="box">
                <div class="title">
                    <h2>{{info.title}}</h2>
                    <div class="close-icon" @click="close"></div>
                </div>
                <flex-box class="container" dir="column">
                    <div class="tip">*请留下您的联系方式，客服将第一时间与您沟通。</div>
                    <div class="form">
                        <div class="form-item">
                            <label>姓名：</label>
                            <input v-model="form.visitor_name" maxlength="20" />
                        </div>
                        <div class="warn">{{tip.visitor_name}}</div>
                        <div class="form-item">
                            <label>邮箱：</label>
                            <input v-model="form.email" maxlength="100" />
                        </div>
                        <div class="warn">{{tip.email}}</div>
                        <div class="form-item">
                            <label>手机号：</label>
                            <input v-model="form.phone" />
                        </div>
                        <div class="warn">{{tip.phone}}</div>
                        <div class="submit" @click="submit" >提交</div>
                    </div>
                </flex-box>
            </div>
        </flex-box>
    </div>
</template>

<style lang="less" scoped>
@import '../../assets/css/mixin.less';

    .dialog {
        .mask {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
            z-index: 1;
            .box {
                position: relative;
                width: 500px;
                height: 500px;
                background: #fff;
                border-radius: 10px;
                .title {
                    position: relative;
                    height: 60px;
                    border-bottom: 1px solid #CBCBCB;
                    line-height: 60px;
                    h2 {
                        margin: 0;
                        font-size: 18px;
                        color: #515151; 
                        text-align: center;
                    }
                    .close-icon {
                        position: absolute;
                        top: 50%;
                        right: 18px;
                        width: 15px;
                        height: 15px;
                        background: url(../../assets/img/home/close.png) no-repeat center;
                        background-size: cover;
                        .transform(translateY(-50%));
                        cursor: pointer;
                    }
                }
                .container {
                    .tip {
                        margin: 50px 0 42px;
                        color: #C6000D;
                    } 
                    .form {
                        .form-item {
                            label {
                                display: inline-block;
                                width: 64px;
                                text-align: right;
                                color: #2B4342;
                                font-size: 16px;
                            }
                            input {
                                width: 230px;
                                height: 51px;
                                border: 1px solid #cbcbcb;
                                padding: 0 10px;
                                font-size: 16px;
                            }
                        }
                        .warn {
                            height: 30px;
                            padding-left: 55px;
                            line-height: 30px;
                            color: #f56c6c;
                            font-size: 12px;
                        }
                    }
                    .submit {
                        position: absolute;
                        left: 50%;
                        bottom: 24px;
                        width: 205px;
                        height: 50px;
                        background: #515151;
                        line-height: 50px;
                        text-align: center;
                        color: #fff;
                        font-size: 18px;
                        .transform(translateX(-50%));
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
<script>
    const reqUrl = {
        visitor: '/kingeye/visitors' // 添加客户信息接口
    }

    import FlexBox from '../common/flexBox.vue';

    export default {
        name: 'serviceDialog',
        data () {
            return {
                form: {
                    visitor_name: '',
                    email: '',
                    phone: null,
                    interet_service: this.info.title
                },
                tip: {
                    visitor_name: '',
                    email: '',
                    phone: ''
                }
            }
        },
        props: ['info'],
        methods: {
            close () {
                this.form.visitor_name = '';
                this.form.email = '';
                this.form.phone = null;
                this.$emit('close');
            },
            submit () {
                console.log(this.form);
                const t = this;
                const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (! this.form.email || this.form.email === '' || !this.form.email.match(/\w+@(\w+\.)?\w+\.\w+$/)) {
                    this.tip.email = '请输入正确的邮箱！';
                } else {
                    this.tip.email = '';
                }
                if (/^[a-zA-Z_0-9\u4e00-\u9fa5]{1,20}$/.test(this.form.visitor_name)) {
                    this.tip.visitor_name = '';
                } else {
                    this.tip.visitor_name = '请输入正确的姓名！';
                }
                if (! this.form.phone || this.form.phone === '' || !phoneReg.test(this.form.phone)) {
                    this.tip.phone = '请输入正确的手机号！';    
                } else {
                    this.tip.phone = '';
                }
                if (this.tip.visitor_name || this.tip.email || this.tip.phone ) return false;
                if (!this.form.visitor_name || !this.form.email || !this.form.phone) return false;
                console.log('this.form', this.form);
                this.form.interet_service = this.info.title;
                
                this.$http.post(reqUrl.visitor,this.form).then((res) => {
                    res.json().then((data) => {
                        if (data.code === 200) {
                            t.$emit('close');    
                        } else {
                            window.alert(data.msg);
                        }    
                    })      
                }, function (err) {
                    throw err
                });
            }
        },
        components: {
            FlexBox
        }
    }
</script>