from rest_framework.views import APIView
from rest_framework.response import Response
from bs4 import BeautifulSoup
import requests
import json

class PageScramp(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get("name")
        
        if not code:
            return Response({"error": "Nome não fornecido"}, status=400)
        
        url = f'https://fiis.com.br/{code}/'

        try:
            page = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            soup = BeautifulSoup(page.text, 'html.parser')

            currentStatus = soup.find('div', attrs={'class': 'wrapper indicators'}).find_all(attrs={'class': 'indicators__box'})
            if currentStatus:
                data = []
                categories = {
                    "Valor em caixa": "caixa",
                    "Liquidez média diária": "media",
                    "Val. Patrimonial p/Cota": "patrimonial",
                    "N° de Cotistas": "cotistas",
                    "Participações no IFIX": "ifix"
                }
                try:
                    for element in currentStatus:
                        line = element.find_all('p')

                        value = line[0].text
                        description = line[1].text
                        category = categories.get(description, "other")

                        data.append({
                            "value": value,
                            "description": description,
                            "category": category
                        })


                    return Response(data, status=200)

                except Exception as e:
                    return Response({"error: Dados incompletos"}, status=404)
                
            else:
                return Response({"error": "Não foi possível encontrar os dados."}, status=404)

        except Exception as e:
            return Response({"error": f"Erro ao acessar a página: {str(e)}"}, status=500)
        

    
