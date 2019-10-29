<template>
  <section>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >
      <FormItem
        label="产品详情-标题"
        prop="detailTitle"
      >
        <Input
          v-model="formValidate.detailTitle"
          placeholder="产品标题"
        ></Input>
      </FormItem>
      <FormItem
        label="产品详情-描述"
        prop="detailDesc"
      >
        <Input
          v-model="formValidate.detailDesc"
          placeholder="产品描述"
        ></Input>
      </FormItem>
      <!-- <FormItem label="产品详情-标签" prop="detailLabels">
        <Input v-model="formValidate.detailLabels" placeholder="产品描述"></Input>
      </FormItem>-->
      <FormItem
        label="产品详情-标签"
        prop="detailLabels"
      >
        <CheckboxGroup v-model="formValidate.detailLabels">
          <Checkbox label="乳脂奶油"></Checkbox>
          <Checkbox label="慕斯"></Checkbox>
          <Checkbox label="乳酪"></Checkbox>
          <Checkbox label="巧克力"></Checkbox>
          <Checkbox label="坚果"></Checkbox>
          <Checkbox label="水果"></Checkbox>
          <Checkbox label="含酒"></Checkbox>
          <Checkbox label="咖菲"></Checkbox>

        </CheckboxGroup>
      </FormItem>
      <FormItem
        label="产品-甜度"
        prop="sweetness"
      >
        <Input
          v-model="formValidate.sweetness"
          placeholder="产品标签"
        ></Input>
      </FormItem>
      <FormItem
        label="产品详情-图片"
        prop="detailImg"
      >
        <Input
          v-model="formValidate.detailImg"
          placeholder="产品封面"
        ></Input>
      </FormItem>

      <FormItem
        label="产品详情-内容"
        prop="content"
      >
        <mavon-editor
          v-model="formValidate.content"
          :ishljs="true"
          ref="md"
        ></mavon-editor>
      </FormItem>
      <!-- <FormItem label="商品标题" prop="title">
         <Input v-model="formValidate.title" placeholder="商品标题"></Input>
       </FormItem>
       <FormItem label="商品作者" prop="author">
         <Input v-model="formValidate.author" placeholder="商品作者"></Input>
       </FormItem>
       <FormItem label="商品分类" v-if="categoryList.length > 0">
         <Select v-model="formValidate.category_id">
           <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</Option>
         </Select>
       </FormItem>
       <FormItem label="商品封面" prop="cover">
         <div class="cover">
           <div class="upload">
             <Upload
               multiple
               type="drag"
               action="http://up-z2.qiniu.com"
               :show-upload-list="false"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :data="{token}">
               <div style="padding: 20px 0">
                 <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                 <p>点击或者拖拽上传</p>
               </div>
             </Upload>
           </div>
           <div class="article-cover">
             <img :src="formValidate.cover" alt="cover">
           </div>
         </div>
       </FormItem>
       <FormItem label="商品内容" prop="content">
         <mavon-editor
           v-model="formValidate.content"
           :ishljs="true"
           ref=md>
         </mavon-editor>

      </FormItem>-->
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button
          type="primary"
          @click="handleSubmit('formValidate')"
          style="margin-left: 8px"
        >提交</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import getUploadToken from "../../libs/upload-token";

export default {
  data() {
    return {
      token: "",
      id: this.$route.params.id,
      detail: null,
      categoryList: [],
      formValidate: {
        detailTitle: "",
        detailDesc: "",
        detailLabels: [],
        sweetness: "",
        detailImg: "",
        content: ""
      },
      ruleValidate: {
        detailTitle: [
          { required: true, message: "产品标题不能为空", trigger: "blur" }
        ],
        scales: [
          { required: true, message: "产品描述不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this._getProductDetail();
    this._getCategoryList();
    this._getUploadToken();
  },
  methods: {
    ...mapActions({
      getProductDetail: "product/getProductDetail",
      settingProduct: "product/settingProduct",
      getCategoryList: "category/getCategoryList"
    }),
    // 上传图片成功
    uploadSuccess(response) {
      const url = `http://cdn.boblog.com/${response.key}`;
      this.formValidate.cover = url;
      this.$Message.success("上传成功!");
    },
    // 上传图片失败
    uploadError(response) {
      this.$Message.success("上传失败!");
      console.log(response);
    },
    // 获取上传token
    async _getUploadToken() {
      try {
        const res = await getUploadToken();
        this.token = res.token;
      } catch (e) {
        console.log(e);
      }
    },
    // 获取商品列表
    async _getProductDetail() {
      try {
        const res = await this.getProductDetail({
          id: this.id
        });
        const product = res.data.data;
        console.log(Array.of(product.detailLabels));
        this.formValidate.detailTitle = product.detailTitle;
        this.formValidate.detailDesc = product.detailDesc;
        this.formValidate.detailLabels = product.detailLabels.split(",");
        this.formValidate.sweetness = product.sweetness;
        this.formValidate.detailImg = product.detailImg;
        this.formValidate.content = product.content;
        // this.formValidate.title = product.title;
        // this.formValidate.desc = product.desc;
        // this.formValidate.labels = product.labels;

        // this.formValidate.price = (product.price).toString();
        // this.formValidate.scales = product.scales;
        // this.formValidate.cover = product.cover;
        // this.formValidate.category_id = parseInt(product.category_id);
      } catch (e) {}
    },
    // 获取分类列表
    async _getCategoryList() {
      const res = await this.getCategoryList();
      this.categoryList = res.data.data;
    },
    // 设置更新
    async _updateProduct() {
      this.formValidate.id = this.id;
      this.formValidate.detailLabels = this.formValidate.detailLabels.join(",");
      // console.log(this.formValidate.detailLabels.toString());
      try {
        await this.settingProduct(this.formValidate);
        this.$Message.success("更新成功!");
        this.$router.push("/product");
      } catch (e) {}
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this._updateProduct();
        } else {
          this.$Message.error("请完成表单!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
.article-cover {
  width: 120px;
}

.article-cover img {
  width: 100%;
}

.cover {
  display: flex;
}

.cover .upload {
  width: 280px;
  margin-right: 32px;
}
</style>
