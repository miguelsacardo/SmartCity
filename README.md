# SMART CITY

### como rodar o backend

```bash
cd backend

py -m venv env

env\scripts\activate 

(env) pip install -r requirements.txt

(env) py manage.py runserver

```

### rotas do backend

#### obter token para login
http://127.0.0.1:8000/api/token/ (access token)
http://127.0.0.1:8000/api/token/refresh/ (token de refresh)

##### usuário pronto para login:
```json
{
    "username":"root",
    "password":"root"
}
```

#### cadastrar usuário
http://127.0.0.1:8000/api/user/

##### modelo de registro:
```json
{
    "username":"exemplo",
    "email":"exemplo@exemplo.com",
    "password":"exemplo"
}
```

#### importar arquivos do excel
http://127.0.0.1:8000/api/data/

como importar: 
no body selecione "Multipart". No primeiro campo escreva "excel" e selecione o tipo "file" e no segundo campo escreva "type", selecione o tipo "text" e escreva o tipo desejado
os tipos são: 
* data (para planilha de histórico)
* sensor (para qualquer sensor)
* ambiente 

#### filtro de ambiente
http://127.0.0.1:8000/api/ambiente/?search=&size=&page=

##### ?search= 
é onde você coloca o que deseja filtrar. Campos podem ser filtrados em ambiente:
* SIG

##### &size=
é onde você informa quantos registros serão retornados na lista, ou seja, se você escrever &size=8, apenas 8 registros serão retornados na lista.

##### &page=
número da página. A consulta dessa URL é feita por paginação, então os registros estarão divididos em páginas. 
a página sempre começa em 1 e dependendo da quantidade de registro ela aumenta. 

#### atualização e exclusão de ambiente
http://127.0.0.1:8000/api/ambiente/<int: pk>

URL onde você informa o id do ambiente que deseja atualizar ou excluir.

##### modelo de json:
```json
{
    "sig": "exemplo",
    "descricao": "exemplo",
    "ni": "exemplo",
    "responsavel": "exemplo"
}
```

#### filtro de sensor
http://127.0.0.1:8000/api/sensor/?search=&size=8&page=

##### ?search=
o que você deseja filtrar. Campos que podem ser filtrados em sensores:
* mac address
* sensor (tipo)
* status

##### &size=
tanto de registro que a lista terá.

##### &page=
página que a lista está.

#### atualização e exclusão de sensor
http://127.0.0.1:8000/api/sensor/<int: pk>

URL onde você informa o id do ambiente que deseja atualizar ou excluir.

##### modelo de json:
```json
{
    "mac_address": "00:00:00:00",
    "unidade_medida": "exemplo",
    "ambiente": "exemplo",
    "latitude": "exemplo",
    "longitude": "exemplo",
    "sensor": "exemplo",
    "status": "exemplo"
}
```



