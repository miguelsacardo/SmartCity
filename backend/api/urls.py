from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    # jwt token
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # user model view set
    path('user/', UserRegistrationView.as_view()),

    #import data
    path('data/', ImportData.as_view()),

    # ambiente view
    path("ambiente/", FilterAmbienteView.as_view()),
    path("ambiente/<int:pk>", AmbienteView.as_view()),
    

    # sensor view
    path('sensor/', FilterSensorView.as_view()),
    path("sensor/<int:pk>", SensorView.as_view()),

    # historico view
    path("historico/", FilterHistoricoView.as_view()),
    path("historico/filtro-triplo/", TripleFilterHistoricoView.as_view()),
    path("historico/<int:pk>", HistoricoView.as_view()),

    # list ambiente, historico and ambientes
    path("list/", ListPagedView.as_view()),

    
]