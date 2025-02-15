# 1) Iniciar o ambiente virtual

python -m venv env

# Ativar o ambiente virtual

env/scripts/activate


# 2) Instalar dependências do backend

pip install -r ./backend/requirements.txt

# 3) Iniciar o backend

# Navegar para o diretório do backend

cd backend

# Executar as migrações

python manage.py migrate

# Iniciar o servidor

python manage.py runserver 

# 4) Iniciar o frontend

# novo terminal

inicie um novo terminal na raiz

# Navegar para o diretório do frontend

cd frontend

Instalar dependências do frontend

npm install vite

# Iniciar o servidor de desenvolvimento

npm run dev 

# 5) Utilizar a aplicação

Acesse a aplicação em http://localhost:5173/

# Acesso ao site para fundo do código
Coloque qualquer código de fundo do site https://fiis.com.br/