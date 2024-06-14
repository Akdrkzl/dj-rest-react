import requests

def client():
    token = 'Token 263617d5d4cd7467e689b229ef0e978713aee2c3'

    headers = {
        'Authorization':token,
    }

    response = requests.get(
        url = 'http://127.0.0.1:8000/api/kullanicilar/',
        headers=headers,
    )

    print('Status Code',response.status_code)

    response_data = response.json()
    print(response_data)


#bu dosyayı terminalde çağırıp dışarıdan localhosta istek atıp giriş yapacağız.
if __name__ == '__main__':
    client()