from django.urls import path

from .views import LessonDetailView, MonsterListView, PhraseDetailView
from .views import MultipleChoiceQuestionListView
from .views import FillBlankQuestionListView

urlpatterns = [
    path('lesson/<int:pk>/', LessonDetailView.as_view(), name='lesson-detail'),
    path('lesson/<int:pk>/questions/multiple-choice/',
         MultipleChoiceQuestionListView.as_view(), name='multiple-choice'),
    path('lesson/<int:pk>/questions/fill-blank/',
         FillBlankQuestionListView.as_view(), name='fill-blank'),
    path('lesson/<int:pk>/monster/', MonsterListView.as_view(), name='monster'),
    path('lesson/get-phrase/<str:mode>', PhraseDetailView.as_view(), name='phrase'),
    ]
