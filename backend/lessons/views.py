import random

from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Lesson, Monster, MultipleChoiceQuestion, FillBlankQuestion, Phrase
from .serializers import LessonsSerializer, MultipleChoiceQuestionSerializer, MonsterSerializer, \
    FillBlankQuestionSerializer, PhraseSerializer


class LessonDetailView(generics.RetrieveAPIView):
    serializer_class = LessonsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self):
        lesson_pk = self.kwargs.get('pk')
        lesson = Lesson.objects.filter(pk=lesson_pk).first()

        user = self.request.user
        level = user.userprofile.level if hasattr(user, 'userprofile') else 0
        if level >= lesson.pk:
            return lesson
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)


class MultipleChoiceQuestionListView(generics.ListAPIView):
    serializer_class = MultipleChoiceQuestionSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        lesson_pk = self.kwargs.get('pk')
        lesson = Lesson.objects.filter(pk=lesson_pk).first()

        user = self.request.user
        level = user.userprofile.level if hasattr(user, 'userprofile') else 0
        if level >= lesson.pk:
            return MultipleChoiceQuestion.objects.filter(lesson=lesson_pk)
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)


class FillBlankQuestionListView(generics.ListAPIView):
    serializer_class = FillBlankQuestionSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        lesson_pk = self.kwargs.get('pk')
        lesson = Lesson.objects.filter(pk=lesson_pk).first()

        user = self.request.user
        level = user.userprofile.level if hasattr(user, 'userprofile') else 0
        if level >= lesson.pk:
            return FillBlankQuestion.objects.filter(lesson=lesson_pk)
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)


class MonsterListView(generics.ListAPIView):
    serializer_class = MonsterSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        lesson_pk = self.kwargs.get('pk')
        lesson = Lesson.objects.filter(pk=lesson_pk).first()

        user = self.request.user
        level = user.userprofile.level if hasattr(user, 'userprofile') else 0
        if level >= lesson.pk:
            return Monster.objects.filter(lesson=lesson_pk)
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)


class PhraseDetailView(generics.RetrieveAPIView):
    serializer_class = PhraseSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self):
        mode = self.kwargs.get('mode')
        if mode == 'theory':
            return random.choice(Phrase.objects.filter(name__icontains='theory'))
        elif mode == 'win':
            phrase = random.choice(Phrase.objects.filter(name__icontains='win'))
            return phrase
        elif mode == 'defeat':
            phrase = random.choice(Phrase.objects.filter(name__icontains='defeat'))
            return phrase
        return Response({'error': 'Invalid mode'}, status=status.HTTP_400_BAD_REQUEST)
