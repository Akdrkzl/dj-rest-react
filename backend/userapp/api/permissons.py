from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

# SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS') gelen request method da bunlar var mı?
#kendi izin classımızı yazdık üst classı miras alıp ezdik  burada eğer admin ise yetkisi var yok ise sadece okuma yetkisi var.

class IsAdminUserOrReadOnly(permissions.IsAdminUser):
    
    def has_permission(self, request, view):
        is_admin = super().has_permission(request, view)
        return request.method in SAFE_METHODS or is_admin


#kendi profilini görüntüleme ve düzenleme izni.Başka bir profile girdiğinde yalnızca okuma izni veriyoruz. 
class KendiProfiliYaDaReadOnly(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user.username == obj.username