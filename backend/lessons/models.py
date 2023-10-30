from django.db import models


class Lesson(models.Model):
    lesson_title = models.CharField(max_length=100)
    theory_text = models.CharField(max_length=10000)
    hp = models.IntegerField()
    fill_blank_task = models.CharField(max_length=100, default='fill_blank_task', blank=True)
    multiple_choice_task = models.CharField(max_length=100, default='multiple_choice_task',  blank=True)

    def __str__(self):
        return self.lesson_title


class MultipleChoiceQuestion(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    question = models.CharField(max_length=256)
    correct_answer = models.IntegerField()  # number of correct answer
    option_one = models.CharField(max_length=100)
    option_two = models.CharField(max_length=100)
    option_three = models.CharField(max_length=100)

    damage = models.IntegerField(default=10)

    def __str__(self):
        return self.question


class FillBlankQuestion(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    correct_answers_fill = models.CharField(max_length=255)

    def __str__(self):
        return self.question

class Monster(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    hp = models.IntegerField()

    def __int__(self):
        return self.hp
