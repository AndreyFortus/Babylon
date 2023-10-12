from django.urls import path
from .views import MultipleChoiceQuestionList, MultipleChoiceQuestionDetail, LessonList, LessonDetail, \
    FillBlankQuestionDetail, FillBlankQuestionList, MonsterList, MonsterDetail

urlpatterns = [
    path('lesson/', LessonList.as_view()),
    path('lesson/<int:pk>', LessonDetail.as_view()),
    path('multiple_question/', MultipleChoiceQuestionList.as_view()),
    path('multiple_question/<int:pk>', MultipleChoiceQuestionDetail.as_view()),
    path('fill_question/', FillBlankQuestionList.as_view()),
    path('fill_question/<int:pk>', FillBlankQuestionDetail.as_view()),
    path('monster/', MonsterList.as_view()),
    path('monster/<int:pk>', MonsterDetail.as_view()),

]
