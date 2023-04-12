from django.core.management.base import BaseCommand
import pandas as pd
from base.models import Product
import os
import random


class Command(BaseCommand):

    def handle(self, *args, **options):
        cwd = os.getcwd()
        # Process data with Pandas
        data = pd.read_csv(f"{cwd}/video_games_100.csv")
        data = data.rename(
            columns={'plot': 'description', 'Unnamed: 0': 'g_index'})

        # iterate over DataFrame and create your objects
        for game in data.itertuples():
            num_vote = str(game.votes)
            vote = float(num_vote.replace(',', ''))
            Product.objects.create(_id=int(game.g_index), name=game.name, rating=int(game.rating)/2, numReviews=vote, price=(
                random.randrange(10, 50)), description=game.description, countInStock=(random.randrange(0, 5)))
