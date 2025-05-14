from django.urls import path
from .views import *


urlpatterns = [

    # user model view set
    path('user/', UserRegistrationView.as_view()),

    #import data
    path('data/', ImportData.as_view())
]