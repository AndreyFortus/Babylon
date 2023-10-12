from django.contrib import admin

from .models import Lesson, Monster, MultipleChoiceQuestion, FillBlankQuestion

admin.site.register(Lesson)
admin.site.register(Monster)
admin.site.register(MultipleChoiceQuestion)
admin.site.register(FillBlankQuestion)
