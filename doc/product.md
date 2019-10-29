## 接口前缀
```shell
http://localhost:3000/v1
```

# 产品

## 创建产品
```
POST    /product
```

### 参数说明
```js
{
	"title":"浅草",
	"desc":"好好吃",
	"labels":"生日,蛋糕",
	"price":111.2,
	"scales":"1,2,3",
	"cover":"https://static.21cake.com//upload/images/7d8ec9a9edcd7179d65a3bc86727a6c1.png",
	"category_id":"0"
}
```

### 成功操作返回
```json
{
    "msg": "创建商品成功",
    "code": 200,
    "errorCode": 0
}
```

## 产品详情
```
GET    /product/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 产品ID | 是


### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "created_at": "2019-10-28",
        "id": 1,
        "title": "米道",
        "desc": "天真、天然，这是这款蛋糕唯一的出发点",
        "labels": "聚会,人气,生日",
        "price": 298,
        "scales": "1,2",
        "cover": "https://m.z-changzhi.cn/static/images/1_2.png",
        "category_id": 1,
        "updated_at": "2019-10-28T02:15:13.000Z",
        "deleted_at": null
    }
}
```

## 产品列表
```
GET    /product
```

### 参数说明
无

### 成功操作返回
```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "data": [
            {
                "created_at": "2019-10-28",
                "id": 1,
                "title": "米道",
                "desc": "天真、天然，这是这款蛋糕唯一的出发点",
                "labels": "聚会,人气,生日",
                "price": 298,
                "scales": "1,2",
                "cover": "https://m.z-changzhi.cn/static/images/1_2.png",
                "category_id": 1
            },
            {
                "created_at": "2019-10-28",
                "id": 2,
                "title": "中秋坚果慕斯",
                "desc": "月光如果可以凝固，一定是芝士慕斯的味道",
                "labels": "聚会,人气,生日",
                "price": 268,
                "scales": "1,2",
                "cover": "https://m.z-changzhi.cn/static/images/1_3.png",
                "category_id": 1
            }
        ],
        "meta": {
            "current_page": 1,
            "per_page": 10,
            "count": 12,
            "total": 12,
            "total_pages": 2
        }
    }
}
```

## 更新单个产品
```
PUT    /product/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 产品ID | 是
name | 产品名字 | 否
key | 产品关键字 | 否
parent_id | 产品父级ID | 否

### 成功操作返回

```json
{
    "msg": "更新产品成功",
    "code": 200,
    "errorCode": 0
}
```

## 删除产品
```
DELETE    /product/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 产品ID | 是

### 成功操作返回

```json
{
    "msg": "删除产品成功",
    "code": 200,
    "errorCode": 0
}
```

