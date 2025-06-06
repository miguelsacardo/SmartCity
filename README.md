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
    "password":"root
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




