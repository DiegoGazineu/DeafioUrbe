from rest_framework.views import APIView
from rest_framework.response import Response
from bs4 import BeautifulSoup
import requests

class PageScramp(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get("name")
        
        if not name:
            return Response({"error": "Nome não fornecido"}, status=400)
        
        url = f'https://fiis.com.br/{name}/'

        try:
            page = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            soup = BeautifulSoup(page.text, 'html.parser')

            currentStatus = soup.find('div', attrs={'class': 'wrapper indicators'}).find_all(attrs={'class': 'indicators__box'})
            if currentStatus:
                final_object = currentStatus[0].find('b').text 
                return Response({"scraped_data": final_object})  
            else:
                return Response({"error": "Não foi possível encontrar os dados."}, status=404)

        except Exception as e:
            return Response({"error": f"Erro ao acessar a página: {str(e)}"}, status=500)
