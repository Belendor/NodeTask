# NodeTask

1. POST -> https://apinodetask.herokuapp.com/register
```
{
  "username": "vardas",
  "password1": "slaptazodis",
  "password2": "pakartoti slaptazodi"
}
```

2. POST -> https://apinodetask.herokuapp.com/login
```
{
  "username": "vardas",
  "password": "slaptazodis"
}
```
Gaunams acces accessToken kuri reikia prikabinti i request headeri norint pasiekti vartotoju resursus.


3. POST -> https://apinodetask.herokuapp.com/add + Bearer tokenas (accessToken) gautas prisijungus.
```
{
  "amount": suma,
  "currency": "valiuta"
}
```
  3.1. Priklausomai nuo uzklausos gaunamas rezultatas ar viskas ivykdyta sekmingai ir ar ivyko klaida.
  
  
 4. GET -> https://apinodetask.herokuapp.com/show?page=1&limit=20 + Bearer tokenas (accessToken) gautas prisijungus.
 
  - tiesiog /show parodo visus irasus.
  - page - koki puslpai norima ziureti.
  - limi  - po kiek irasu atvaizduoti puslapyje.
  - taip pat grazina ar yra pries ir po psulapiai.
  - /show/:id parodis irasa su tokiu ID.
  
  5. GET -> https://apinodetask.herokuapp.com/logs + Bearer tokenas (accessToken) gautas prisijungus.
  
  Atvaizduoja visus api prisijungimus, koks end point buvo pasiektas, kada ir koks vartotojas (jei buvo prisijunges).
  
  6.  DELETE -> https://apinodetask.herokuapp.com/delete/:id + Bearer tokenas (accessToken) gautas prisijungus.
  
  - :id - norimo istrinti iraso ID.
  
  7. PUT -> https://apinodetask.herokuapp.com/update/:id + Bearer tokenas (accessToken) gautas prisijungus.

   - :id - norimo istrinti iraso ID.

  
```
{
  "amount": nauja suma,
  "currency": "nauja valiuta"
}
```
  
