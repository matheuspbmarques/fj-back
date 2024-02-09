# Projeto Clean House

## Downloads

Caso você não tenha nenhum dos softwares abaixo, basta clicar no link e fazer o download e instalação dos mesmos, é muito importante para que o projeto funcione corretamente.

- [PostgreSQL v15.5](https://www.postgresql.org/);
- [pgAdmin 8.2](https://www.pgadmin.org/)
- [Node 20.10.0](https://nodejs.org/en)

## Começar

Instale todos os pacotes necessários para rodar o projeto em sua máquina:

```bash
# npm
npm install

# yarn
yarn install
```

## Configuração de ambiente

Crie um aquivo ".env" e nele insira as seguintes variáveis de ambiente:

- DB_USER: Nome do usuário do banco de dados;
- DB_HOST: O host do banco de dados;
- DB_NAME: Aqui você deve inserir o nome ```clean_house_db```, para que as querys de consulta sejam executadas corretamente;
- DB_PASS: A senha de acesso ao banco de dados;
- DB_PORT: A porta do banco de dados;
- LOCAL_PORT: A porta que deseja que seu projeto rode na sua máquina.

## Criar tabelas

### Clientes:

```sql
CREATE TABLE IF NOT EXISTS clients(
	id uuid DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	phone VARCHAR NOT NULL,
    coordinate_x VARCHAR NOT NULL,
    coordinate_y VARCHAR NOT NULL
)
```