from django.core.management.base import BaseCommand
import pandas as pd
from base.models import Product
import os


class Command(BaseCommand):

    def handle(self, *args, **options):
        cwd = os.getcwd()
        # Process data with Pandas
        data = pd.read_csv(f"{cwd}/video_games.csv")
        data = data.rename(columns={'plot': 'description', 'Unnamed: 0':'g_index'})

        # iterate over DataFrame and create your objects
        for game in data.itertuples():
            num_vote = game.votes
            if num_vote == str:
                vote = float(num_vote.replace(',', ''))
                Product.objects.create(_id=int(game.g_index), name=game.name, rating=int(game.rating)/2, numReviews=vote, price=1, description=game.description)
            else:
                Product.objects.create(_id=int(game.g_index), name=game.name, rating=0, numReviews=0, price=1, description=game.description)
