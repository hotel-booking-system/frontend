# AuthService Documentation

O `AuthService` é responsável pela autenticação de usuários em uma aplicação Angular, utilizando tokens JWT para gerenciar sessões de usuário e permissões de acesso.

## Conteúdo

1. [Overview](#overview)
2. [Methods](#methods)
   - [signup](#signup)
   - [login](#login)
   - [setToken](#settoken)
   - [getToken](#gettoken)
   - [removeToken](#removetoken)
   - [redirectToHome](#redirecttohome)
   - [isLoggedIn](#isloggedin)
   - [isAuthenticated](#isauthenticated)
   - [hasUserRole](#hasuserrole)
   - [getDecodedToken](#getdecodedtoken)
   - [getUserRoles](#getuserroles)
   - [logout](#logout)

---

## Overview

O `AuthService` é um serviço Angular que gerencia a autenticação de usuários utilizando um backend que emite tokens JWT. Ele se comunica com o servidor através de requisições HTTP para realizar operações como login, logout, signup, e verificar permissões de usuário.

### Dependências

- `HttpClient`: Para realizar requisições HTTP ao servidor.
- `Router`: Para redirecionar o usuário após certas operações, como login ou logout.
- `JwtHelperService` (do pacote `@auth0/angular-jwt`): Para ajudar na manipulação e decodificação de tokens JWT.

### Funcionalidades Principais

- **Signup**: Registra um novo usuário na aplicação através de uma requisição HTTP POST para `/signup`.
- **Login**: Autentica o usuário através de credenciais (email e senha), armazena o token JWT e extrai as roles do usuário.
- **Verificação de Permissões**: Permite verificar se um usuário possui uma role específica com base nas informações do token JWT.
- **Gerenciamento de Sessão**: Fornece métodos para verificar se o usuário está autenticado, obter informações do token JWT e gerenciar a sessão de usuário.
- **Logout**: Limpa o token JWT e roles do usuário ao encerrar a sessão.

---

## Methods

### `signup`

Registra um novo usuário na aplicação.

```typescript
signup(userRequest: UserRequest): Observable<UserResponse>
```

### `login`

Autentica o usuário com as credenciais fornecidas.

```typescript
login(email: string, password: string): Observable<any>
```

### `setToken`

Armazena o token JWT na sessão do navegador.

```typescript
setToken(token: string): void
```

### `getToken`

Recupera o token JWT armazenado na sessão do navegador.

```typescript
getToken(): string | null
```

### `removeToken`

Remove o token JWT da sessão do navegador.

```typescript
removeToken(): void
```

### `redirectToHome`

Redireciona o usuário para a página inicial da aplicação.

```typescript
redirectToHome(): void
```

### `isLoggedIn`

Verifica se o usuário está autenticado verificando a presença do token JWT na sessão.

```typescript
isLoggedIn(): boolean
```

### `isAuthenticated`

Verifica se o token JWT não está expirado.

```typescript
isAuthenticated(): boolean
```

### `hasUserRole`

Verifica se o usuário possui uma role específica com base nas informações do token JWT.

```typescript
hasUserRole(role: string): boolean
```

### `getDecodedToken`

Decodifica o token JWT e retorna suas informações.

```typescript
getDecodedToken(): any
```

### `getUserRoles`

Retorna as roles do usuário armazenadas localmente.

```typescript
getUserRoles(): string[]
```

### `logout`

Limpa o token JWT e as roles do usuário ao efetuar logout.

```typescript
logout(): void
```
