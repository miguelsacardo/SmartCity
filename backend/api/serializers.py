from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

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

# ambiente serializer
class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        many = True
        fields = "__all__"

# sensor serializer
class SensorSerializer(serializers.ModelSerializer):
    ambiente = serializers.SlugRelatedField(slug_field="sig", queryset=Ambiente.objects.all())
    class Meta:
        model = Sensor
        many = True
        fields = "__all__"

# historico serializer
class HistoricoSerializer(serializers.ModelSerializer):
    sensor = serializers.SlugRelatedField(slug_field="mac_address", queryset=Sensor.objects.all())
    class Meta:
        model = Historico
        many = True
        fields = "__all__"



    
    
