# 准备

联系平台获取商户信息 商户ID 商户密钥 网关地址
# 协议规则

商户调用API必须遵循以下规则:
| 规则名称 | 协议概述 |
| --- | --- |
| 提交方式 | 采用POST方法提交 |
| 数据格式 | 提交和返回数据都为 JSON 格式 |
| 签名算法 | MD5 |

# 签名算法

## 步骤

第一步，设所有发送或者接收到的数据为集合M，将集合M内非空参数值的参数按照参数名ASCII码从小到大排序（字典序），使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串stringA。

第二步，在stringA最后拼接上密钥（直接拼接密钥 不需要参数）得到stringSignTemp字符串，并对stringSignTemp进行MD5运算，再将得到的字符串所有字符转换为大写，得到sign值signValue。 注意：APIv2密钥的长度为32个字节。

## 注意

* 参数名ASCII码从小到大排序（字典序）

* 参数名区分大小写

* 主动通知签名时，传送的sign参数不参与签名，将生成的签名与该sign值作校验


## 代码示例

### 加密sign
::: code-group
```java
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;
import java.util.stream.Collectors;

public class SignDemo {

    private static final String SECRET = "44a8544b-ffee-4282-bd6f-241705cb042b";

    public static void main(String[] args) {
        Map<String, Object> data = new TreeMap<>();
        
        long currentTime = System.currentTimeMillis() / 1000;

        data.put("client_id", 1001);
        data.put("out_trade_no", "test" + currentTime);
        data.put("product_id", 1002);
        data.put("total_amount", "100.00"); 
        data.put("nonce_str", UUID.randomUUID().toString().replace("-", "").substring(0, 13));
        data.put("timestamp", currentTime);
        data.put("notify_url", "https://baidu.com");

        String builtQuery = data.entrySet().stream()
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .collect(Collectors.joining("&"));

        String signString = builtQuery + SECRET;
        System.out.println("待签名字符串: " + signString);

        String sign = md5(signString);
        System.out.println("签名结果 (MD5): " + sign);
    }

    public static String md5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexString = new StringBuilder();
            for (byte b : messageDigest) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("MD5 算法不存在", e);
        }
    }
}
```
```php
$data = [
    'client_id' => 1001,
    'out_trade_no' => 'test'.time(),
    'product_id' => 1002,
    'total_amount' => 100.00,
    'nonce_str' => uniqid(),
    'timestamp' => time(),
    'notify_url' => 'https://baidu.com',
;
ksort($data);
$sign = md5(urldecode(http_build_query($data)).'44a8544b-ffee-4282-bd6f-241705cb042b');
```
```python
import hashlib
import time
import uuid


def generate_sign():
    secret = "44a8544b-ffee-4282-bd6f-241705cb042b"
    current_time = int(time.time())

    data = {
        "client_id": 1001,
        "out_trade_no": f"test{current_time}",
        "product_id": 1002,
        "total_amount": "100.00",
        "nonce_str": uuid.uuid4().hex[:13],
        "timestamp": current_time,
        "notify_url": "https://baidu.com",
    }

    sorted_pairs = [f"{k}={data[k]}" for k in sorted(data.keys())]
    built_query = "&".join(sorted_pairs)

    sign_string = built_query + secret
    print("待签名字符串:", sign_string)

    sign = hashlib.md5(sign_string.encode("utf-8")).hexdigest()
    print("签名结果 (MD5):", sign)

    return sign


if __name__ == "__main__":
    generate_sign()
```
:::