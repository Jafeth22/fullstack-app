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
 - `nest [generate module]/[g mo] folderName/moduleName`: Create the module
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
- `controllers`: Define the controllers that belong to the current, these manage HTTP requests
- `providers`: Define the services or other providers that should be instantiated by the dependency inyector and available in the current module. Servicios u otros proveedores que deben ser instanciados por el inyector de dependencias y pueden ser compartidos en toda la aplicación.
- `exports`: Proveedores que deben estar disponibles en otros módulos que importan este módulo.