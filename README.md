"# ExamenAgil" 
Instalacion de la base de datos en el caso de windows:

1.-Ir a la pagina de MongoDB https://www.mongodb.com/download-center/community 

Ejecutar el archivo: mongodb-win32-x86_64-2012plus-4.2.5-signed 
y siguiente en todas la opciones. 

Colocarse en el bash de windows o terminal y ejecutar los siguietes comandos
1.- cd C:\
     md "\data\db"

2.- "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"

Ejecutar MongoDB: 

3.- "C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"

Pasos a ejecutar para correr el proyecto: 

1.- Colocarse en la carpeta raiz del pryecto examen
2.- Ejecutar el comando: npm install 
3.- Encender el servidor: nodemon server/server
