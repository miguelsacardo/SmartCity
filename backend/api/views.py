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

        #rename columns -> ensure that columns can have upper and lower names
        df = df.rename(columns=lambda column_name: column_name.lower())

        # convert the value of 'ambient' to str
        df['ambiente'] = df['ambiente'].astype(str)

        sensor_resource = SensorResource()
        dataset = Dataset().load(df) 

        # simulates the sending the excel file, but doesn't save it to the database yet
        # important to check errors. Here is validated if there is also an additional
        # foreign key query
        result = sensor_resource.import_data(dataset, dry_run=True, raise_errors=False)

        if not result.has_errors():

            # if the simulation has no errors, now saves it to the database completely
            result = sensor_resource.import_data(dataset, dry_run=False)
            return Response(status=status.HTTP_200_OK)
        else:
            for i in result.error_rows:
                return Response({"detail":f"Erro na linha {i.number + 1} do arquivo. Verifique se o ambiente com valor '{i.errors[0].row['ambiente']}' existe na lista de ambientes."},
                                status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# class ImportHistoricData(APIView):
#     parser_classes = [parsers.MultiPartParser]

#     def post(self, request, *args, **kwargs):
#         file = request.FILES['excel']
#         df = pd.read_excel(file)

#         #rename columns -> ensure that columns can have upper and lower names
#         df = df.rename(columns=lambda column_name: column_name.lower())

               

        