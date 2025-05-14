from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import *

class AmbienteResource(resources.ModelResource):
    class Meta:
        model = Ambiente
        import_id_fields = ['ni'] # identify a data uniquely
        skip_unchanged = True
        use_bulk = True

class SensorResource(resources.ModelResource):

    ambiente = fields.Field(
        column_name='ambiente', # column name from excel
        attribute='ambiente', # name of model field (foreign key ambiente)
        widget=ForeignKeyWidget(Ambiente, 'sig') # it is like 'slug related field'
    )
    class Meta:
        model = Sensor
        import_id_fields = ['mac_address']
        skip_unchanged = True
        use_bulk = True