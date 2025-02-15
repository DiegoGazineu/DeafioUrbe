from rest_framework.views import APIView
from rest_framework.response import Response
from bs4 import BeautifulSoup
import requests
import json
from .models import Favorites, FavoritesComponents

class PageScramp(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get("name")
        if not code:
            return Response({"error": "Código não fornecido"}, status=400)

        try:
            data = page_scram_function(code)
            if "error" in data or not data:
                return Response(data, status=400)  

            return Response(data, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

class ScrampFavorite(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get("name")
        if not code:
            return Response({"error": "Código não fornecido"}, status=400)

        try:
            data = page_scram_function(code)

            if "error" in data or not data:
                return Response(data, status=400)
            
            if not Favorites.objects.filter(code=code).exists():
                
                new_favorite = Favorites.objects.create(code = code)

                for information in data:
                    FavoritesComponents.objects.create(
                        favorites = new_favorite,
                        value = information['value'],
                        description = information['description'],
                        category = information['category']
                    )

                return Response({"success": "Favorito adicionado com sucesso."}, status=201)
            else:
                return Response({"error": "already exists"}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

def page_scram_function(code):
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
    headers = {'User-Agent': user_agent}

    url = f'https://fiis.com.br/{code}/'

    try:
        page = requests.get(url, headers=headers)
        soup = BeautifulSoup(page.text, 'html.parser')

        currentStatus = soup.find('div', attrs={'class': 'wrapper indicators'}).find_all(attrs={'class': 'indicators__box'})
        
        if currentStatus:
            try:
                data = []
                categories = {
                    "Valor em caixa": "caixa",
                    "Liquidez média diária": "media",
                    "Val. Patrimonial p/Cota": "patrimonial",
                    "N° de Cotistas": "cotistas",
                    "Participações no IFIX": "ifix"
                }
                
                for element in currentStatus:
                    line = element.find_all('p')

                    if len(line) >= 2: 
                        value = line[0].text.strip()
                        description = line[1].text.strip()
                        category = categories.get(description)

                        if value and description and category:
                            data.append({
                                "value": value,
                                "description": description,
                                "category": category
                            })

                if not data:
                    return {"error": "Nenhum dado válido encontrado."}

                return data  

            except Exception as e:
                return {"error": "Dados incompletos ou inválidos."}  

        else:
            return {"error": "Não foi possível encontrar os dados."} 

    except requests.exceptions.RequestException as e:
        return {"error": f"Erro ao acessar a página: {str(e)}"}  
    
    except Exception as e:
        return {"error": f"Erro inesperado: {str(e)}"}
