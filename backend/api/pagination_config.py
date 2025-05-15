from rest_framework.pagination import PageNumberPagination

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'size'
    max_page_size = 10000

class StandardResultsPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'size'
    max_page_size = 1000