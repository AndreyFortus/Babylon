from rest_framework import generics

from .models import Lesson, Monster, MultipleChoiceQuestion, FillBlankQuestion
from .serializers import LessonsSerializer, MultipleChoiceQuestionSerializer, MonsterSerializer, \
    FillBlankQuestionSerializer


class MultipleChoiceQuestionList(generics.ListCreateAPIView):
    serializer_class = MultipleChoiceQuestionSerializer

    def get_queryset(self):
        queryset = MultipleChoiceQuestion.objects.all()
        question = self.request.query_params.get('question')
        if question is not None:
            queryset = queryset.filter(question=question)
        return queryset

class MultipleChoiceQuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MultipleChoiceQuestionSerializer
    queryset = MultipleChoiceQuestion.objects.all()


class LessonList(generics.ListCreateAPIView):
    serializer_class = LessonsSerializer
    queryset = Lesson.objects.all()


class LessonDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LessonsSerializer
    queryset = Lesson.objects.all()


class FillBlankQuestionList(generics.ListCreateAPIView):
    serializer_class = FillBlankQuestionSerializer
    queryset = FillBlankQuestion.objects.all()


class FillBlankQuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FillBlankQuestionSerializer
    queryset = FillBlankQuestion.objects.all()


class MonsterList(generics.ListCreateAPIView):
    serializer_class = MonsterSerializer
    queryset = Monster.objects.all()


class MonsterDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MonsterSerializer
    queryset = Monster.objects.all()
