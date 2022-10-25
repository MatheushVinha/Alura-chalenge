# Alura-chalenge
 
Essa é uma API que ainda está em desenvolvimento, requisitada pelo challenge da alura, mais abaixo terá o 
passo a passo para usala.😁

A primeira coisa é baixar as dependencias dando um *__npm install__*, assim baixando todos os modulos que serão utilizados.😁
Essa api é feita utilizando a ORM __prisma__, e o banco __Mysql__, então você terar que instalar o mysql em sua maquina.❤️
Apos todo esse processo, voce terá que criar um arquivo __.env__ para guardar a chave de conecção com o seu banco,
ele será utilizado no prisma\schema.prisma no lugar que está o DATABASE_URL, você coloca a sua chave.✨
Feito isso está pronto, basta dar o npm rum dev no seu terminal e começar a utilizar a api🐈
A api tem 5 rotas, elas sendo:
##
	-POST    /videos      Para criar um video 
	-DELETE  /videos:id   Para deletar um video
	-GET     /videos      Para mostrar todos os videos 
	-GET 	 /video/:id   Para mostrar apenas o video daquele id
	-PUT     /path 	      Para atualizar um registro
	
Agora basta ir no postman ou no insomnia e fazer as requisições http, gualquer bug ou duvida eu to no discord
