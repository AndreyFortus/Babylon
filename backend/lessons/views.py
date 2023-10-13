from rest_framework import viewsets

from .models import Lesson, Monster, MultipleChoiceQuestion, FillBlankQuestion
from .serializers import LessonsSerializer, MultipleChoiceQuestionSerializer, MonsterSerializer, \
    FillBlankQuestionSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonsSerializer


class MultipleChoiceQuestionViewSet(viewsets.ModelViewSet):
    queryset = MultipleChoiceQuestion.objects.all()
    serializer_class = MultipleChoiceQuestionSerializer


class FillBlankQuestionViewSet(viewsets.ModelViewSet):
    queryset = FillBlankQuestion.objects.all()
    serializer_class = FillBlankQuestionSerializer


class MonsterViewSet(viewsets.ModelViewSet):
    queryset = Monster.objects.all()
    serializer_class = MonsterSerializer
