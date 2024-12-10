# JANUS Test

## Backend

### Prerequisites
- dotnet

### Installation Steps
1. Clone the repository.
2. cd backend/test
3. Set up the appsettings.json file ("server=yourhost;port=yourport;database=databasename;user=databaseuser;password=databasepassword;")
4. Run `dotnet watch run`.

## Server
http://localhost:5115/

## EndPoints

### Get Report
- GET http://localhost:5115/reporte

### Get Product Types
- GET http://localhost:5115/tipos

### Create Product 
- POST http://localhost:5115/productos/agregar

### Update Product 
- PUT http://localhost:5115/productos/modificar

 ### Delete Product 
- DELETE http://localhost:5115/productos/eliminar/{id}

## Frontend

### Prerequisites
- Angular 18


### Installation Steps
1. Clone the repository.
2. cd frontend/test
3. Run `npm install`.
4. Run `ng serve`.

## Server
http://localhost:4200/  
