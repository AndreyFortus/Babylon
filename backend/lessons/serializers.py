from rest_framework import serializers
from .models import Lesson, MultipleChoiceQuestion, FillBlankQuestion, Monster

class LessonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class MultipleChoiceQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoiceQuestion
        fields = '__all__'


class FillBlankQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FillBlankQuestion
        fields = '__all__'


class MonsterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monster
        fields = '__all__'
