<template>
    <div class="cart-info">
        <div>
            <div class='item'>总数：<strong>{{cartInfos.total_nums}}</strong></span></div>
            <div class='item'>总价：<strong>{{changeNumber(cartInfos.total_price)}}</strong>&nbsp;元</span></div>

            <div class="btn-buy" @click='by_db'>购买商品</div>
            <div class="btn-clear" @click='clear_db'>清空购物车</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'shop-info',
        computed: {
            cartInfos() {
                return this.$store.getters.getInfos;
            }
        },
        methods: {
            by_db() {
                this.$router.replace("/");
            },
            clear_db() {
                this.$store.dispatch('clear_local');
            },
            // by_db() {
            //     this.$store.dispatch('local');
            // },
            changeNumber(num) {
                num += "";
                num = num.replace(/[^0-9|\.]/g, ""); //清除字符串中的非数字非.字符

                if (/^0+/)
                    //清除字符串开头的0
                    num = num.replace(/^0+/, "");
                if (!/\./.test(num))
                    //为整数字符串在末尾添加.00
                    num += ".00";
                if (/^\./.test(num))
                    //字符以.开头时,在开头添加0
                    num = "0" + num;
                num += "00"; //在字符串末尾补零
                num = num.match(/\d+\.\d{2}/)[0];
                return num;
            }
        }
    };
</script>
<style scoped lang='scss'>
    .cart-info{
        font-size: 20px;
        text-align: left;
        height:40px;
        .item{
            height:40px;
            line-height: 40px;
            display: inline-block;
            margin-right: 20px;
            strong{
                color: #a00;
            }
        }
        .btn-buy{
            width: 232px;
            height:40px;
            float:right;
            font-size: 18px;
            background-color:#684029;
            color:#f1f1f1;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
        }
        .btn-clear{
            width: 132px;
            height:38px;
            float:right;
            font-size: 18px;
            background-color:#ffffff;
            color:#684029;
            text-align: center;
            line-height: 40px;
            border: 1px solid #aaa;
            cursor: pointer;
        }
    }
</style>
