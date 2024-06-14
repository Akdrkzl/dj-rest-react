from rest_framework import generics,permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from userapp.models import CustomUser
from .serializers import CustomUserListSerializer,CustomUserCreateSerializer
from .permissons import IsAdminUserOrReadOnly,KendiProfiliYaDaReadOnly #Admin ise oku ve değiştir değilse oku


#!user-Görüntüleme Fonksiyonu 
class CustomUserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserListSerializer
    permission_classes = [permissions.IsAuthenticated]

#!User-Görüntüleme ve Oluşturma Fonksiyonu 
# class CustomUserList(generics.ListCreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserListSerializer
#     permission_classes = [IsAdminUserOrReadOnly]

#!User Oluşturma
class CustomUserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

#!User-Detay Görüntüleme Fonksiyonu 
# class CustomUserDetail(generics.RetrieveAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserSerializer

#!User-Detay Görüntüleme Güncelleme ve Silme Fonksiyonu 
class CustomUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserListSerializer
    permission_classes = [KendiProfiliYaDaReadOnly]