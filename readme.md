# PO connect-4

## Dit is de PO informatica met Python en SQL

## Dingen die er graag in willes:

- Werkend 4 op een rij spel
- Client-server verbinding met socket.io
- Accounts aanmaken
- Anonieme accounts / invite links
- Veilige wachtwoordauthenticatie
- Spelen tegen computer
- Rest API die dit allemaal doet inplaats van jank oplossing

## Misschien:

- ~Log in met google / apple / andere~
- Berichten
- Mensen kunnen volgen
- Meerdere game modes
- Rating net als op chess.com
- Verschillende thema's (minimalistisch of skeuomorf met realistische stuiter-animaties)

## Dingen die gebruikt worden:

- [Flask](https://flask.palletsprojects.com/) voor de http server en de REST api
- [ReactJS](https://reactjs.org/) om de website mee te maken
- [socket.io](https://socket.io/) voor de communicatie tussen de clients en de server tijdens een potje
- [SQLite](https://sqlite.org/index.html) voor de database

Een voorbeeld van de database is te vinden op [Google Docs](https://docs.google.com/spreadsheets/d/1mDN9IUqRIMjr_9RmLxKybjIgVuaUadalmPEFnG-XeJg/edit?usp=sharing), en een voorbeeld van de website is te vinden op [Figma](https://www.figma.com/file/rTciVQApAe6cwrH1Prl5Wn/4-op-een-rij?node-id=0%3A1)

## Hoe 'installeren'

0. `git clone https://github.com/lonkaars/po-4-op-een-rij`
1. Zorg dat je [python](https://python.org/downloads) hebt geïnstalleerd.
2. Zorg dat je [nodejs](https://nodejs.org/en/download) hebt geïnstalleerd.
3. Installeer typescript en yarn:
	```sh
	npm i -g typescript yarn
	```
4. Maak een python virtual environment en installeer pip modules:
	```sh
	python -m venv venv
	pip install -r requirements.txt
	```
5. Installeer node modules:
	```sh
	yarn
	```

## Hoe starten

Om dit project te starten moet je 2 terminals gebruiken die afzonderlijk de flask server en de react server starten:

```sh
# term 1

# windows / powershell
.\venv\Scripts\Activate.ps1

# linux / posix
source venv/bin/activate

flask run

# term 2

yarn start # dit opent automatisch de website in je browser
```

## Hoe API endpoints testen
```sh
curl http://localhost:3000/api/<endpoint>
```

