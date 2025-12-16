from detoxify import Detoxify
import textstat

detox = Detoxify("original")

def blog_score(content):
    score = 100

    # TOXICITY CHECK (60 marks)
    toxicity = max(detox.predict(content).values())
    score -= toxicity * 60

    # LENGTH CHECK (25 marks)
    words = len(content.split())
    if words < 200:
        score -= 25
    elif words < 400:
        score -= 10

    # READABILITY (15 marks)
    readability = textstat.flesch_reading_ease(content)
    if readability < 40:
        score -= 15
    elif readability < 60:
        score -= 7

    return round(max(score, 0), 2)
