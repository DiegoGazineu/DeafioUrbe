1) iniciar o ambiente virtual:

python -m venv env
cv env
scripts\activate
cd..

2) instalar dependências do backend no ambiente virtual


pip install -r .backend/requirements.txt

3) iniciar o backend

cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

4) iniciar o front end

abrir um novo terminal na raiz

cd frontend
npm install vite
npm run dev

5) Utilizar a aplicação

colocar no navegador a url: http://localhost:5173/

inserir qualquer código de fundo do site https://fiis.com.br/vghf11/