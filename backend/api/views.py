from django.shortcuts import render, get_list_or_404, get_object_or_404
from django.http import Http404

from api.serializers import *
from .models import *
from .resources import *


from rest_framework.generics import ListCreateAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, parsers

import pandas as pd
from tablib import Dataset

class UserRegistrationView(ListCreateAPIView):
    
    queryset = User.objects.all()

    # checks which serializer will be used based on the http method -> improve api security
    def get_serializer_class(self):
        
        if self.request.method == 'GET':
            return UserDetailSerializer
        
        elif self.request.method == 'POST':
            return UserRegisterSerializer
        
class ImportAmbientData(APIView):
    parser_classes = [parsers.MultiPartParser]

    def post(self, request, *args, **kwargs):
        file = request.FILES['excel']
        df = pd.read_excel(file)

        ambient_resource = AmbienteResource()
        dataset = Dataset().load(df)

        result = ambient_resource.import_data(dataset, dry_run=True, raise_errors=True)

        if not result.has_errors():
            result = ambient_resource.import_data(dataset, dry_run=False)
            return Response({"status": "Ambient data imported successfully"})
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class ImportSensorData(APIView):
    parser_classes = [parsers.MultiPartParser]

    def post(self, request, *args, **kwargs):
        file = request.FILES['excel']
        df = pd.read_excel(file)  
        query = None

        # convert the value of 'ambient' to integer
        df['ambiente'] = df['ambiente'].astype(str)

        # interate the ambient values from df to make a query and checks if the ambient exists (because it is foreign key)
        for value in df['ambiente'].values:
            query = list(Ambiente.objects.filter(sig=value))
            
            # if an ambient doesn't exists, an error is raised and indicates which row has the inexistent ambient
            if not query: 
                loc = df.loc[df['ambiente'] == value].index.tolist()
                return Http404(f"Voce esta tentando cadastrar sensores com ambiente(s) inexistente(s) na linha {loc[0] + 2}")
            else:
                sensor_resource = SensorResource()
                dataset = Dataset().load(df) 

                result = sensor_resource.import_data(dataset, dry_run=True, raise_errors=True)

                if not result.has_errors():
                    result = sensor_resource.import_data(dataset, dry_run=False)
                    return Response(status=status.HTTP_200_OK)
                return Response(status=status.HTTP_400_BAD_REQUEST)

               

        