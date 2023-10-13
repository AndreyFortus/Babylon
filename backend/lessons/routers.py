from rest_framework import routers
from . import views

lessons_router = routers.DefaultRouter()
lessons_router.register(r'lessons', views.LessonViewSet)
lessons_router.register(r'fill-blank', views.FillBlankQuestionViewSet)
lessons_router.register(r'multiple-choice', views.MultipleChoiceQuestionViewSet)
lessons_router.register(r'monsters', views.MonsterViewSet)
