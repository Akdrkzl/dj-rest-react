
# Django REST Framework ve React ile Authentication Projesi

Bu proje, Django REST Framework ve React kullanarak bir kullanıcı kimlik doğrulama sistemi sunmaktadır. Backend kısmında Django REST Framework ve custom user model kullanılmıştır. Kullanıcılar sahte bir API'den çekilip veritabanına kaydedilmiştir. Kullanıcı girişi için dj-rest-auth kütüphanesi kullanılmış ve frontend kısmında React ile kullanıcı giriş işlemleri gerçekleştirilmiştir.

## Başlarken
Gereksinimler
Bu projeyi çalıştırmak için aşağıdaki yazılımlara ihtiyacınız olacak:

```bash 
    Python 3.10.10
    Node.js ve npm/yarn
    Django
    Django REST Framework
    dj-rest-auth
    corsheaders
    Axios (React için)
```
  
# Kurulum 
#### Backend

#### 1. Projeyi klonlayın:
```bash 
git clone https://github.com/Akdrkzl/dj-rest-react.git
cd dj-rest-react/backend
```
#### 2. Veritabanını oluşturun ve migrasyonları uygulayın:
```bash 
python manage.py migrate
```
#### 3. Projeyi başlatın::
```bash 
python manage.py runserver
```

#### Frontend

#### 1. Frontend dizinine gidin::
```bash 
cd ../frontend
```

#### 2. Gerekli paketleri yükleyin::
```bash 
npm install  # veya yarn install
```

#### 3. Projeyi başlatın:
```bash 
npm run dev
```
## API Kullanımı

#### Kullanım

### Backend API
Backend API, kullanıcı kimlik doğrulama işlemlerini yönetir. Aşağıdaki uç noktaları içerir:

```bash 
/api/dj-rest-auth/login/ #dj-rest-auth ile login logout işlemleri için.
/api/kullanicilar/ #veri tabanına kayıtlı kullanıcıların bilgisini getirir.
``` 

### Frontend
Frontend kısmında Axios kullanarak login işlemi yapılır ve kullanıcı bilgileri çekilir. Aşağıdaki adımlar izlenir:

##### Kullanıcı giriş formunu doldurur ve gönderir.
##### Axios ile login isteği yapılır ve JWT token alınır.
##### Alınan token, kullanıcının kimlik doğrulama işlemleri için kullanılır.
## Kullanım/Örnek Kodlar
#### Backend

#### settings.py
```Python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #app 
    'userapp',
    #3.parti uygulamalar 
    'django_extensions',
    'rest_framework',
    'rest_framework.authtoken', #kimlik doğrulama tokeni(belirteç)
    'dj_rest_auth',
    'corsheaders',
]

REST_FRAMEWORK = {
    #!auth işlemleri
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}
```

#### models.py
```Python
class CustomUser(AbstractUser):
    username = models.CharField(max_length=150,blank=True,null=True)
    first_name = models.CharField(max_length=30, blank=False, null=False)
    last_name = models.CharField(max_length=30, blank=False, null=False)
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email
```


#### serializers.py
```Python
class CustomUserListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['id','username','first_name','last_name','email']
```

#### views.py
```Python
class CustomUserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserListSerializer
    permission_classes = [permissions.IsAuthenticated]
```

#### urls.py
```Python
from django.urls import path,include
from .views import CustomUserList,CustomUserDetail,CustomUserCreate

urlpatterns = [
    path('kullanicilar/',CustomUserList.as_view(),name='kullanicilar'),
    path('kullanicilar/<int:pk>/',CustomUserDetail.as_view(),name='kullanicilar'),
    path('kullanici-olustur/',CustomUserCreate.as_view(),name='kullanici-olusturma'),
]
```

#### Frontend

Login işlemi için Axios kullanımı:
```Javascript
import axios from 'axios';

const handleLogin = async (e) =>{
      e.preventDefault();
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/dj-rest-auth/login/',{
          email:email,
          password:password
        },{
          headers:{
            'Content-Type': 'application/json'
          },
        });
        const token = response.data.key
        console.log(token)
        localStorage.setItem('authKey',token)
        getUser(token)
        
      }catch(error){
        console.error(error);
      }
    }
```

Login işleminden sonra alınan token ile kayıtlı kullanıcıları getirme.
```Javascript
 useEffect(()=>{
      const token = localStorage.getItem('authKey')
      if(token){
        getUser(token)
      }
    },[])

    
    const getUser = async (token) =>{
        const response = await axios.get('http://127.0.0.1:8000/api/kullanicilar/',{
          headers:{
            Authorization: `Token ${token}`,
          }
        })
        return setUser(response.data);
    }
```