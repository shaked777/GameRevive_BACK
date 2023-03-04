from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework. permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.response import Response

from ..recommend_sys import give_recommendations
from ..models import Product
from ..products import products
from ..serializer import ProductSerializer, UserSerializer, UserSerializerWithToken


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    print(query)
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    recomend = give_recommendations(int(pk))
    product = Product.objects.get(_id=pk)
    index_list =recomend['Index']

    products = Product.objects.filter(_id__in=index_list)
    serializer = ProductSerializer(product, many=False).data
    r_serializer = ProductSerializer(products, many=True).data
    print(products.values())
    
    return Response(serializer)

@api_view(['GET'])
def getRecommendProduct(request, pk):
    recomend = give_recommendations(int(pk))
    product = Product.objects.get(_id=pk)
    index_list = recomend['Index']

    products = Product.objects.filter(_id__in=index_list)

    r_serializer = ProductSerializer(products, many=True).data
    print(products.values())
    
    return Response(r_serializer)
