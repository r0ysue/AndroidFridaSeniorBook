## Time: 2020-7-31 19:41:11
## com.hay.dreamlover 

import requests, os,  time, sys
from lxml import etree
import re
import json
import threading
import hashlib
import base64
from urllib import parse

# import click
# import frida
# import logging
# import traceback

import base64
import re

from Crypto.Cipher import AES

# https://blog.csdn.net/wangziyang777/article/details/104982823

## aes 加密/解密
class AESECB:
    def __init__(self, key):
        self.key = key
        self.mode = AES.MODE_ECB
        self.bs = 16  # block size
        self.PADDING = lambda s: s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)
    def encrypt(self, text):
        generator = AES.new(self.key, self.mode)  # ECB模式无需向量iv
        crypt = generator.encrypt(self.PADDING(text))
        crypted_str = base64.b64encode(crypt)
        result = crypted_str.decode()
        return result

    def decrypt(self, text):
        generator = AES.new(self.key, self.mode)  # ECB模式无需向量iv
        text += (len(text) % 4) * '='
        decrpyt_bytes = base64.b64decode(text)
        meg = generator.decrypt(decrpyt_bytes)
        # 去除解码后的非法字符
        try:
            result = re.compile('[\\x00-\\x08\\x0b-\\x0c\\x0e-\\x1f\n\r\t]').sub('', meg.decode())
        except Exception:
            result = '解码失败，请重试!'
        return result


#计算密码的md5值
def get_md5(s):
    md = hashlib.md5()
    md.update(s.encode('utf-8'))
    return md.hexdigest()

if __name__ == '__main__':
    aes = AESECB('8648754518945235')
    ctl = "index"
    act = "index"
    signqt = get_md5("528094&*3564695()" + ctl + "+_" + act + "@!@###@");
    timeqt = str(round(time.time() * 1000));
    
    headers = {"X-JSL-API-AUTH":"sha1|1596358731|VOI1X6448Y4f4E|fd941812d5b875b021f92cf2b0044552462d8cd9"};
    body = {"screen_width":1080,
            "screen_height":1794,
            "sdk_type":"android",
            "sdk_version_name":"1.3.0",
            "sdk_version":2020031801,
            "xpoint":120.107042,
            "ypoint":30.302162,
            "ctl":ctl,
            "act":"new_video",
            "p":1,
            "signqt":signqt,
            "timeqt":timeqt}
    requestData = aes.encrypt(str(body));
    url = "http://hhy2.hhyssing.com:47232/mapi/index.php?requestData=" + requestData + "i_type=1&ctl=" + ctl + "&act=" + act;
    rsp = requests.post(url, headers = headers);
    result = json.loads(rsp.text).get("output");
    decodeAes = AESECB("7489148794156147");
    print(decodeAes.decrypt(result));
