<template>
  <section>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 2px" @click="update(row.id)">编辑</Button>
          <Button type="primary" size="small" style="margin-right: 2px" @click="setting(row.id)">设置</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page
          :total="page.total"
          :page-size="page.per_page"
          :current="page.current_page"
          show-total
          @on-change="handlePage"
        ></Page>
      </section>
    </section>
  </section>
</template>

<script>
import merge from "webpack-merge";
import { mapState, mapActions } from "vuex";

export default {
  name: "list",
  data() {
    return {
      list: [],
      page: {},
      currentPage: 1,
      columns: [
        {
          title: "ID",
          key: "id",
          width: 80,
          align: "center"
        },
        {
          title: "产品封面",
          width: 100,
          align: "center",
          key: "cover",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: { src: params.row.cover },
                style: { width: "100%", height: "100%" }
              })
            ]);
          }
        },
        {
          title: "产品标题",
          key: "title",
          align: "center"
        },
        // {
        //     title: '评论次数',
        //     align: 'center',
        //     key: 'comments_nums',
        //     width: 100
        // },
        {
          title: "产品描述",
          align: "center",
          key: "desc"
        },
        {
          title: "产品标签",
          align: "center",
          key: "labels",
        },
        {
          title: "产品价格",
          
          align: "center",
          key: "price"
        },
        {
          title: "产品规格",
          
          align: "center",
          key: "scales"
        },
        {
          title: "产品分类",
          
          align: "center",
          key: "category_id"
        },

        {
          title: "创建时间",
          
          key: "created_at",
          align: "center"
        },
        {
          title: "Action",
          slot: "action",
          width: 180,
          align: "center"
        }
      ]
    };
  },
  created() {
    this._getProductList();
  },
  methods: {
    ...mapActions({
      getProductList: "product/getProductList",
      destroyProduct: "product/destroyProduct"
    }),
    // 获取商品
    async _getProductList() {
      // let {page, desc, category_id, keyword} = this.$route.query;

      const res = await this.getProductList({
        page: this.currentPage
      });
      // console.log(res);
      this.list = res.data.data.data;

      this.page = res.data.data.meta;
    },
    // 切换分页
    handlePage(page) {
      this.$router.replace({
        query: merge(this.$route.query, {
          page
        })
      });
      this.currentPage = page;
      this._getProductList();
    },
    // 更新
    update(id) {
      this.$router.push(`/product/update/${id}`);
    },
    // 设置
    setting(id) {
      this.$router.push(`/product/setting/${id}`);
    },
    // 删除分类
    destroy(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除此商品吗？</p>",
        loading: true,
        onOk: async () => {
          try {
            await this.destroyProduct(id);
            this.$Message.success("删除成功");

            this._getProductList();
          } catch (e) {
            console.log(e);
            this.$Message.error(e);
          } finally {
            this.$Modal.remove();
          }
        },
        onCancel: () => {
          this.$Message.warning("取消！");
        }
      });
    }
  }
};
</script>

<style scoped>
.page {
  padding: 32px 0;
  text-align: center;
}
</style>
