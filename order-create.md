# 接口地址

{网关地址}/api/orders/create

# 请求参数

| 字段名 | 变量名 | 类型 | 示例值 |
| --- | --- | --- | --- |
| 商户ID | client_id | string | 1000 |
| 商户订单号 | out_trade_no | string | 20150806125346 |
| 产品编码 | product_id | string | 2001 |
| 订单金额 | total_amount | string | 100.00 |
| 时间戳 | timestamp | string | 1381281244 |
| 随机字符串 | nonce_str | string | 5K8264ILTKCH16CQ2502SI8ZNMTM67VS |
| 异步通知地址 | notify_url | string | https://baidu.com |
| 签名 | sign | string | 601ec0dc5094918242fdea85ce680835 |

# 返回参数

### 成功返回

```json
{
    "success": true,
    "data": {
        "trade_no": "2101121627461528957524", //注: 我方订单号 [!code focus]
        "pay_url": "https://baidu.test/cashier/order" //注: 支付链接 [!code focus]
    },
    "timestamp": 1256881666
}
```

### 失败返回

```json
{
    "success": false,// [!code focus]
    "message": "商户ID 不存在。",
    "timestamp": 1256881666
}
```