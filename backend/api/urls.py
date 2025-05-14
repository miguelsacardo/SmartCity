from django.urls import path
from .views import *


urlpatterns = [

    # user model view set
    path('user/', UserRegistrationView.as_view()),

    # ambient import file
    path('ambient/', ImportAmbientData.as_view()),

    # sensor import file
    path('sensor/', ImportSensorData.as_view())
]