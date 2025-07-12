from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Event(models.Model):
        """Evento de apoio"""
        name = models.CharField(u'Nome', max_length=300)
        is_active = models.BooleanField(default=True)
        description = models.CharField(u'Descrição', max_length=1000)
        promotes_by = models.CharField(u'Nome', max_length=300)
        local = models.CharField(u'Local', max_length=300)
        state = models.CharField(max_length=2,verbose_name="Estado")
        phone = models.CharField(u'Telefone', max_length=11)
        start_date = models.DateField()
        end_date = models.DateField()
        time_start = models.TimeField()
        time_end = models.TimeField()
        email = models.CharField(u'Email', max_length=100)
        event_link = models.CharField(u'Link do evento', max_length=100)

        def __str__(self):
            return self.name