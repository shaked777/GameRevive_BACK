from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..recommend_sys import main
from ..models import Product
from ..serializer import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False).data

    return Response(serializer)

@api_view(['GET'])
def getRecommendProduct(request, pk):
    # recomend = give_recommendations(int(pk))
    recomend = main(int(pk))
    index_list = recomend['Index']

    products = Product.objects.filter(_id__in=index_list)

    r_serializer = ProductSerializer(products, many=True).data

    return Response(r_serializer)
