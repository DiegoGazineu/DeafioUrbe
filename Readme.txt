# 1) Iniciar o ambiente virtual

python -m venv env

# Ativar o ambiente virtual
# Windows
# source env\\Scripts\\activate
# macOS/Linux

source env/bin/activate

# Voltar para a raiz do projeto

cd ..

# 2) Instalar dependências do backend

pip install -r .backend/requirements.txt

# 3) Iniciar o backend


# Lembre-se de substituir o valor de 'user_agent' no arquivo backend/DesafioUrbe/backend/posts/views.py, linha 55 pelo seu user agent https://www.whatismybrowser.com/detect/what-is-my-user-agent/

# Navegar para o diretório do backend

cd backend

# Executar as migrações

python manage.py makemigrations
python manage.py migrate

# Iniciar o servidor

python manage.py runserver 

# 4) Iniciar o frontend

# Voltar para o diretório raiz

cd ..

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