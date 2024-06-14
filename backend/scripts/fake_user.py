import os 
import random
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restUc.settings') #settings.py belirtmem gerekiyor

import django
django.setup()

### Modellerimize ve django içeriklerine erişmek için yukarıdaki gibi ayarlamaları yapmamız lazım
### SIRALAMA ÇOK ÖNEMLİ
from userapp.models import CustomUser
import requests
from pprint import pprint

def set_user():
    url = 'https://hwfakeapi.cloud/users'
    response = requests.get(url)

    if response.status_code != 200:
        print('Hatalı İstek',response.status_code)
        return
    jsn = response.json()
    profil = jsn.get('profile')

    for p in profil:
        f_name = p.get('firstName')
        l_name = p.get('lastName')
        email = p.get('email')
        print(email)

        user = CustomUser(
            first_name = f_name,
            last_name = l_name,
            email = email,
            username = CustomUser.objects.generate_unique_username(f_name,l_name)
        )
        user.set_password('test123')
        user.save()
        print('Kullanıcı Oluşturuldu.')

