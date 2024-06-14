from django.urls import path,include
from .views import CustomUserList,CustomUserDetail,CustomUserCreate

urlpatterns = [
    path('kullanicilar/',CustomUserList.as_view(),name='kullanicilar'),
    path('kullanicilar/<int:pk>/',CustomUserDetail.as_view(),name='kullanicilar'),
    path('kullanici-olustur/',CustomUserCreate.as_view(),name='kullanici-olusturma'),
    
]