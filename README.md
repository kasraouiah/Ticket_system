Ticket Management System
----------------------
This is a web application developed using .NET 8 for the backend and React for the frontend and Postgres as Database. The application implements a CRUD (Create, Read, Update, Delete) functionality for managing tickets. Users can create, edit, delete, and view tickets, each with a unique 
identifier, description, status, and creation date.

For runing backend download this repo, create database and update docker-compose.yml db environnemnt 
For example, my postgres database infos are
###### docker-compose Database (parameters)

      - POSTGRES_PASSWORD=root
      - POSTGRES_USER=postgres
      - POSTGRES_DB=Tickets_database



###### running Backend

       requirement (.net 8)
###### appsettings.json (parameters)
Edit  **appsettings.json** infos and configure  'Ef_Postgres_Db' ConnectionStrings parameters
<br /><br />
      ***`"ConnectionStrings": {
        "Ef_Postgres_Db": "Server=localhost;Host=localhost;Database=Tickets_database;Port=5432;User Id=postgres;Password=root"
      }`***
<br /><br /><br /><br />


enter Api_backend_dotnet folder and run following com

      - dotnet ef migrations add InitialCreate
      - dotnet ef database update
      - dotnet run

<br /><br />






###### running frontend (2 methods to run it)
 **method 1**<br /><br />
Run following com 
<br />
`
      - docker-compose build frontend
      `<br />
      `
      - docker-compose up frontend
      `<br />

<br /><br />
       **method 2**<br /><br />
       **requirement (node v18.20.1   && npm 10.5.0)**
       enter frontend folder and run following com 
<br />
`
      - npm install
      `<br />
      `
      - npm run dev
      `
