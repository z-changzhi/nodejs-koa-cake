import * as types from '../cart/mutations_types';

const muations = {
    [types.CLEAR_LOCAL](state) {
        state.cartList.forEach(function(item) {
            item.num = 0;
        });
        state.cartList = [];
        localStorage.removeItem('vuex_cart');
    },
    [types.UPDATE_LOCAL](state) {
        localStorage.setItem('vuex_cart', JSON.stringify(state.cartList));
    },
    [types.UPDATE_CUR_SHOP_STATUS](state, {
        index = -1
    }) {
        state.curIndex = index;
    },
    [types.DELETE_DB](state) {
        if (state.curIndex >= 0) {
            state.cartList[state.curIndex].num = 0;
            state.cartList.splice(state.curIndex, 1);
        }
    },
    [types.CREATE_DB](state, shop) {
        // console.log('mu create');

        state.cartList.push(shop);
    },
    [types.ADD_DB](state) {
        // console.log('mu add id:' + state.curIndex);

        state.cartList[state.curIndex].num = parseInt(state.cartList[state.curIndex].num);
        state.cartList[state.curIndex].num++;
    },
    [types.REDUCE_DB](state) {
        // console.log('mu reduce');

        state.cartList[state.curIndex].num = parseInt(state.cartList[state.curIndex].num);
        state.cartList[state.curIndex].num--;

        // console.log(state.cartList[state.curIndex].num);
        if (state.cartList[state.curIndex].num == 0) {
            state.cartList.splice(state.curIndex, 1);
        }
    },
    [types.CHECK_DB](state, {
        id
    }) {
        // console.log('mu check id :' + id);
        // console.log(state.cartList);

        state.curIndex = -1;

        var list = state.cartList;
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                    state.curIndex = i;
                    break;
                }
            }
        }
    }
};

const state = {
    //购物车列表
    cartList: localStorage.getItem('vuex_cart') ? JSON.parse(localStorage.getItem('vuex_cart')) : [],

    //当前购物车信息
    cartInfos: {
        total_price: 0,
        total_nums: 0
    },

    //当前菜品是否在购物车的状态。在则是对应的索引，不在则是-1
    curIndex: -1
};


const getters = {
    getInfos(state) {
        state.cartInfos.total_price = 0;
        state.cartInfos.total_nums = 0;
        var list = state.cartList;
        for (var i = 0; i < list.length; i++) {
            var price = parseFloat(list[i].price),
                num = parseFloat(list[i].num);

            state.cartInfos.total_price += price * num;
            state.cartInfos.total_nums += num;
        }
        return state.cartInfos;
    },
    getCartList(state) {
        return state.cartList;
    }
};

const actions = {
    clear_local: ({
        commit
    }) => {
        commit(types.CLEAR_LOCAL);
    },
    update_local: ({
        commit
    }) => {
        commit(types.UPDATE_LOCAL);
    },
    update_cur_shop_status: ({
        commit
    }, obj) => {
        commit(types.UPDATE_CUR_SHOP_STATUS, obj);
    },
    delete_db: ({
        commit
    }) => {
        commit(types.DELETE_DB);
        commit(types.UPDATE_LOCAL);
    },
    create_db: ({
        commit
    }, {
        shop
    }) => {
        commit(types.CREATE_DB, shop);
        commit(types.UPDATE_LOCAL);
    },
    add_db: ({
        commit
    }) => {
        commit(types.ADD_DB);
        commit(types.UPDATE_LOCAL);
    },
    reduce_db: ({
        commit
    }) => {
        commit(types.REDUCE_DB);
        commit(types.UPDATE_LOCAL);
    },
    check_db: ({
        commit
    }, obj) => {
        commit(types.CHECK_DB, obj);
    }
};

export default {
    state,
    mutations:muations,
    getters,
    actions
}