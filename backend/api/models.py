from django.db import models
import datetime

# ambient models -> model and ModelResource to upload xlsx
class Ambiente(models.Model):
    sig = models.CharField(max_length=255, null=False, blank=False)
    descricao = models.TextField()
    ni = models.CharField(max_length=255, null=False, blank=False)
    responsavel = models.CharField(max_length=255, null=False, blank=False)


# sensor models -> model and ModelResource to upload xlsx
class Sensor(models.Model):
    SENSOR_TYPES = (
        ('temperatura', 'Temperatura'),
        ('luminosidade', 'Luminosidade'),
        ('umidade', 'Umidade'),
        ('contagem', 'Contagem')
    )

    UNID_MEDIDA = (
        ('°C', 'Celcius'),
        ('lux', 'Lux'),
        ('%', 'Porcentagem'),
        ('num', 'contador')
    )

    STATUS = (
        ('ativo', 'Ativo'),
        ('inativo', 'Inativo')
    )

    sensor = models.CharField(max_length=30, choices=SENSOR_TYPES, blank=False, null=False, default="temperatura")
    mac_address = models.CharField(max_length=255, blank=False, null=False) # this field must be unique, but for now, no
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE)
    unidade_medida = models.CharField(max_length=3, blank=False, null=False, default="°C")
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=20, blank=False, null=False, choices=STATUS, default="ativo")


class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField()


