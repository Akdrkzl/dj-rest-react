import requests

# {'key': '263617d5d4cd7467e689b229ef0e978713aee2c3'}
def client():
    credentials = {
        'email': 'post_user2@gmail.com',
        'password':'kadir12345'
    }

    response = requests.post(
        url = 'http://127.0.0.1:8000/api/dj-rest-auth/login/',
        data = credentials,
    )

    print('Status Code',response.status_code)

    response_data = response.json()
    print(response_data)


#bu dosyayı terminalde çağırıp dışarıdan localhosta istek atıp giriş yapacağız.
if __name__ == '__main__':
    client()