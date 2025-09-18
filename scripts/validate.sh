#!/bin/bash
# @autor: Gonzalo Mansera 
# @comment
# @description : Script que valida si tenemos instalados git, node, npm, curl 
#Crear un script utilizando el comando command -v verifique si tengo instalado o no los paquetes git, node , npm, curl, si alguno no esta instalado en el sistema, mostraremos mensaje de error 
echo "Hola Mundo"

if command -v npm > /dev/null 2>&1 ;then
	NPM_VERSION=$(npm --version)
	echo "NPM instalado correctamente: Version: $NPM_VERSION"
else
	echo "No tienes npm"
	exit 1
fi


if command -v git > /dev/null 2>&1 ;then
	GIT_VERSION=$(git --version)
	echo "GIT instalado correctamente: Version: $GIT_VERSION"
else
	echo "No tienes git"
	exit 1
fi


if command -v node > /dev/null 2>&1;then
	NODE_VERSION=$(node --version)
	echo "NODE instalado correctamente: Version: $NODE_VERSION"
else
	echo "No tienes node"
	exit 1
fi



if command -v curl > /dev/null 2>&1 ;then
	CURL_VERSION=$(curl --version)
	echo "CURL instalado correctamente: "
else
	echo "No tienes curl"
	exit 1
fi
echo

echo "Todos los paquetes instalados correctamente "
exit 0
