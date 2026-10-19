# 接口地址

{网关地址}/api/orders/query

# 请求参数

| 字段名 | 变量名 | 类型 | 示例值 |
| --- | --- | --- | --- |
| 商户ID | client_id | string | 1000 |
| 商户订单号 | out_trade_no | string | 20150806125346 |
| 时间戳 | timestamp | string | 1381281244 |
| 随机字符串 | nonce_str | string | 5K8264ILTKCH16CQ2502SI8ZNMTM67VS |
| 签名 | sign | string | 601ec0dc5094918242fdea85ce680835 |

# 返回参数

### 成功返回

```json
{
    "success": true,
    "data": {
        "status": 1 //注: 0 未支付 1 支付成功 [!code focus]
    },
    "timestamp": 1256881666
}
```

### 失败返回

```json
{
    "success": false, // [!code focus]
    "message": "商户ID 不存在。",
    "timestamp": 1256881666
}
```