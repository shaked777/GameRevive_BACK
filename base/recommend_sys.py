from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from sklearn.decomposition import PCA
import numpy as np
import pandas as pd
import os

# The data
cwd = os.getcwd()
data = pd.read_csv(f"{cwd}/video_games.csv")
data = data.rename(columns={'plot': 'description'})
print(data.columns)
print(type(data))
X = np.array(data.description)

# View the data
data = data[['name', 'description', 'rating', 'url']].astype(str)

# Translate the data to numbers(vectors) BERT
text_data = X
model = SentenceTransformer('distilbert-base-nli-mean-tokens')
embeddings = model.encode(text_data, show_progress_bar=True)
embed_data = embeddings

# PCA
X = np.array(embed_data)
n_comp = 5
pca = PCA(n_components=n_comp)
pca.fit(X)
pca_data = pd.DataFrame(pca.transform(X))
b = pca_data.head()

# Give reccomendatio by the cosine simalrity of the vectors
cos_sim_data = pd.DataFrame(cosine_similarity(X))

def give_recommendations(index):
    index_recomm = cos_sim_data.loc[index].sort_values(
        ascending=False).index.tolist()[1:5]
    games_recomm = data['name'].loc[index_recomm].values
    result = {'Games': games_recomm, 'Index': index_recomm}

    return result


# 0	Spider-Man
# 1	Red Dead Redemption II
# 2	Grand Theft Auto V
# 3	God of War
# 4	Uncharted 4: A Thief's End
# 5	The Last of Us: Part II
# 6	Horizon Forbidden West
# 7	The Last of Us
# 8	Detroit: Become Human
# 9	Death Stranding
# 10	Ghost of Tsushima
# Give recommendations the index above (full list at csv file)

    
