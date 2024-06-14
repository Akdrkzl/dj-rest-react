from rest_framework import serializers
from userapp.models import CustomUser

class CustomUserListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['id','username','first_name','last_name','email']
    

class CustomUserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    username = serializers.ReadOnlyField()

    class Meta:
        model = CustomUser
        fields = ('id','username','first_name', 'last_name','email','password')

    def create(self, validated_data):
        password = validated_data.pop('password')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        user = CustomUser(**validated_data)
        user.username = CustomUser.objects.generate_unique_username(first_name,last_name)
        user.set_password(password)
        user.save()
        return user