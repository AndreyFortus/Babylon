from django.contrib import admin

from .models import Lesson, Monster, MultipleChoiceQuestion, FillBlankQuestion, Phrase

admin.site.register(Lesson)
admin.site.register(Monster)
admin.site.register(MultipleChoiceQuestion)
admin.site.register(FillBlankQuestion)
admin.site.register(Phrase)
