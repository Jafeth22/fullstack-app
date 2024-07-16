# Installed packages
These are for managing and connect to the DB
- `typeorm`: facilitating interaction with relational DB, also facilitates the migrations and operations with the CRUD
- `@nestjs/typeorm`: Integration between TypeORM and NestJS, it offers decorators and tools to work with DBs
- `pg`: Main pack to connect with the DB (postgres)
- `@nestjs/config`: Allows you to manage the system settings

The `.env` file only contains values that are for testing, for this project

# Tech stack
- NodeJs@10.0.0
- typeORM@0.3.20
- PostgresSQL@8.12.0

# Using command-line to crear files
This `[large opc]/[short opc]` means that two options to create a file, but at the end use only one at time,
all commands are executed within `src` folder
 - **`nest g res nameModule`**: This will create all files
 - `nest [generate module]/[g mo] moduleName`: Create the module
 - `nest [generate controller]/[g co] contName`: Create the controller
 - `nest [generate service]/[g s] servName`: Create a service
 - `nest [generate class]/[g cl] entityName`: Create empty class 

 This will be the structure
 ```
 src/
├── folderModule/
│   ├── moduleName.controller.ts
│   ├── moduleName.controller.spec.ts
│   ├── moduleName.module.ts
│   ├── moduleName.service.ts
│   └── moduleName.service.spec.ts
├── app.module.ts

 ```

 # Componentes of a Module

- `imports`: Import neccesary modules to create the current
- `controllers`: Manage HTTPS requests and logic of the app, they define routes and methods for handling requests, and can access services to perform specific operations.
- `providers`: They are components that can be inyected in other components. It can be services, helpers, or some other reutilizable component. The decorator `@Injectable()` indicates that a class is a **provider**, making posible the dependency inyection in other components.
- `exports`: Providers that should be enaibles to other modules