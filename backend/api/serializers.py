from rest_framework import serializers
from django.contrib.auth.models import User

# user serializers
# first serializer is only for registration and the second is to display user information
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password', 'email']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_superuser(**validated_data)
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']



    
    
