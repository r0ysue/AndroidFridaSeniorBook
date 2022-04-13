import requests

def encrypt(enParam):
    url = "http://192.168.31.94:8899/encrypt"
    param = enParam
    headers = {"Content-Type":"application/x-www-form-urlencoded"}
    r = requests.post(url = url ,data=param,headers = headers)
    print(r.content)

def decrypt(enParam):
    url = "http://192.168.31.94:8899/decrypt"
    param = enParam
    headers = {"Content-Type":"application/x-www-form-urlencoded"}
    r = requests.post(url = url ,data=param,headers = headers)
    print(r.content)

if __name__ == '__main__' :
    encrypt("roysue")
    decrypt("47fcda3822cd10a8e2f667fa49da783f")