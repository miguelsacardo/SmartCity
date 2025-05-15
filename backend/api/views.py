from django.shortcuts import render, get_list_or_404, get_object_or_404
from django.http import Http404

from api.serializers import *
from .models import *
from .resources import *
from .pagination_config import StandardResultsPagination


from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveDestroyAPIView
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

class ImportData(APIView):
    parser_classes = [parsers.MultiPartParser]

    def post(self, request, *args, **kwargs):
        file = request.FILES['excel']
        df = pd.read_excel(file) 
        
        type = request.data['type']
        resource = None

        #rename columns -> ensure that columns can have upper and lower names
        df = df.rename(columns=lambda column_name: column_name.lower())

        # differentiates between which sensor the spreadsheet is 
        match type:
            case "ambiente":
                resource = AmbienteResource()
            case "sensor":
                # convert the value of 'ambient' to str
                df['ambiente'] = df['ambiente'].astype(str)
                resource = SensorResource()
            case "data":
                resource = HistoricoResource()
            case _:
                raise Http404({"detail": f"Type {type} does not exist."})
        
        request_resource = resource
        dataset = Dataset().load(df)

        # simulates an import, but does not save data to the database yet
        result = request_resource.import_data(dataset, dry_run=True, raise_errors=False)

        if not result.has_errors():
            result = request_resource.import_data(dataset, dry_run=False)
            return Response(status=status.HTTP_200_OK)
        else:
            message = ""
            for i in result.error_rows:
                if type == "sensor":
                    message = f"Erro na linha {i.number + 1} do arquivo. O ambiente '{i.errors[0].row['ambiente']}' talvez não esteja cadastrado."
                elif type == "data":
                    message = f"Erro na linha {i.number + 1} do arquivo. O sensor '{i.errors[0].row['sensor']}' talvez não esteja cadastrado."
                return Response({"detail":message}, status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# responsible to List paged, patch and destroy ambients
class AmbienteView(ListAPIView, RetrieveDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    pagination_class = StandardResultsPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def patch(self, request, pk):
        ambiente = get_object_or_404(Ambiente, id=pk)

        serializer = AmbienteSerializer(ambiente, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SensorView(ListAPIView, RetrieveDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    pagination_class = StandardResultsPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def patch(self, request, pk):
        sensor = get_object_or_404(Sensor, id=pk)
        
        # correct measurements depending on the type of sensor
        match request.data["sensor"]:
            case "temperatura": request.data["unidade_medida"] = "°C"
            case "luminosidade": request.data["unidade_medida"] = "lux"
            case "umidade": request.data["unidade_medida"] = "%"
            case "contagem": request.data["unidade_medida"] = "num"
            case _: raise Http404({"detail":"tipo de sensor não existente."})

        serializer = SensorSerializer(sensor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HistoricoView(ListAPIView, RetrieveDestroyAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    pagination_class = StandardResultsPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
# class ListPagedView(ListAPIView):
#     def list(self, request, *args, **kwargs):
#         name = request.query_params.get("type")

#         if name == "ola":
#             return Response(f"{name}", status=status.HTTP_200_OK)