import sqlite3
import bcrypt
import time
from random import random, choice
from math import floor
from uuid import uuid4

connection = sqlite3.connect("./database.db")
cursor = connection.cursor()

def random_string():
    return str(floor(random() * 1e16)) # 1e16 is wetenschappelijke notatie (1 * 10^16)

def repeat_action(action, name):
    def return_function():
        count = int(input(f"Hoeveel {name} wil je aanmaken? "))
        for i in range(count):
            action()
            print(f"{i+1}/{count} {name} toegevoegd!")
        print(f"{count} {name} toegevoegd!")
    return return_function

# dit is om dit script te organiseren
programma_acties = []
class programma_actie:
    def __init__(self, name, execute):
        self.name = name
        self.exec = execute

# initialiseer een nieuwe (lege) database
def init_db():
    commands_text = open("./init_db.sql").read()
    commands = commands_text.strip().split("\n"*2) # python sqlite3 kan maar 1 "statement" per cursor.execute doen, en de statements zijn gescheden door witregels in ./init_db.sql
    for i, command in enumerate(commands):
        cursor.execute(command)
        print(f"SQL commando {i+1} van de {len(commands)} uitgevoerd...")
    print("Klaar!")
programma_acties.append(programma_actie("Maak tabellen aan", init_db))

def destroy_tables():
    for table_name in ["games", "users", "social"]:
        # format strings + sql is gevaarlijk vanwege sql injectie, maar omdat de invoer hier niet door de gebruiker aangepast kan worden is het semi-ok
        cursor.execute(f"drop table if exists {table_name}")
        print(f"Tabel \"{table_name}\" verwijderd!")
programma_acties.append(programma_actie("Verwijder alle tabellen", destroy_tables))

def user_amount():
    return len(cursor.execute("select user_id from users").fetchall())

# pak een willekeurige user_id uit de users tabel (gebruikt voor insert_random::games)
def random_player():
    return choice(cursor.execute("select user_id from users").fetchall())[0]

# class om alle functies die willekeurige data invoegen te organiseren (python heeft geen namespaces :( )
class insert_random:
    # omdat veel kolommen in onze database gebruikersinteracties opslaan laat ik ze hier leeg omdat ik geen tijd hem om gebruikersgedrag te simuleren.

    def __init__(self):
        pass

    def users(self):
        user_id = str(uuid4())
        username = random_string()
        email = f"{username}@example.com"
        password_hash = bcrypt.hashpw(random_string().encode("utf-8"), bcrypt.gensalt())
        registered = int( time.time() * 1000 )

        cursor.execute("insert into users values (?, ?, ?, NULL, ?, ?, \"[]\", FALSE, \"user\", \"{}\", NULL, \"online\") ",
                (user_id, username, email, password_hash, registered))

    def games(self):
        if user_amount() < 2:
            print("Er zijn niet genoeg gebruikers om spellen aan te maken!")
            return

        game_id = str(uuid4())
        timestamp = int( time.time() * 1000 )

        cursor.execute("insert into games values (?, NULL, NULL, ?, ?, NULL, ?, NULL, NULL, NULL, FALSE, \"in_progress\", \"default\") ",
                (game_id, random_player(), random_player(), timestamp))

    def friends(self):
        users = list(rij[0] for rij in cursor.execute("select user_id from users").fetchall()) # cursor.execute.fetchall() stuurt rijen altijd terug als tuples ookal vraag je 1 kolom op, dus dit zet het om naar een list van strings
        # maak een nieuwe rij aan voor elke gebruiker in tabel users als deze nog niet bestaat
        for user in users:
            if cursor.execute("select user_id from social where user_id = ?", [user]).fetchone(): continue
            cursor.execute("insert into social values (?, NULL, NULL, NULL)", [user])

programma_acties.append(programma_actie("Maak nepgebruikers aan", repeat_action(insert_random().users, "nepgebruikers")))
programma_acties.append(programma_actie("Maak voorbeeld spellen aan", repeat_action(insert_random().games, "spellen")))
programma_acties.append(programma_actie("Vul social tabel met gebruikers", insert_random().friends))

# Verifiëer een user_id of verkrijg een user_id uit een username
def resolve(resolveable):
    user_id = None
    user_id = user_id or cursor.execute("select user_id from users where user_id = ?", [resolveable]).fetchone()
    user_id = user_id or cursor.execute("select user_id from users where username = ?", [resolveable]).fetchone()
    # stuur de eerste kolom van de rij terug omdat het weer een tuple is >:(
    return user_id[0] if user_id else None

def edit_username():
    resolveable = input("Voer een gebruikers-id of gebruikersnaam in: ")
    user_id = resolve(resolveable)
    if not user_id:
        print("Er is geen gebruiker met gebruikers-id of gebruikersnaam \"{resolveable}\"")
        return
    new_username = input("Voer een nieuwe gebruikersnaam in: ")
    cursor.execute("update users set username = ? where user_id = ?", [new_username, user_id])
    print("Nieuwe gebruikersnaam succesvol toegepast!")
programma_acties.append(programma_actie("Pas de gebruikersnaam van een gebruiker aan", edit_username))

def delete_user():
    resolveable = input("Voer een gebruikers-id of gebruikersnaam in: ")
    user_id = resolve(resolveable)
    if not user_id:
        print("Er is geen gebruiker met gebruikers-id of gebruikersnaam \"{resolveable}\"")
        return
    cursor.execute("delete from users where user_id = ?", [user_id])
    print("Gebruiker verwijderd!")
programma_acties.append(programma_actie("Verwijder een gebruiker", delete_user))

def mark_game_done():
    game_id = input("Voer een game-id in om als klaar te markeren: ")
    if not cursor.execute("select game_id from games where game_id = ?", [game_id]).fetchone():
        print("Kon geen spel vinden met die game_id!")
        return

    outcome = "w"
    starttime = cursor.execute("select timestamp from games where game_id = ?", [game_id]).fetchone()[0]
    duration = int( time.time() * 1000 ) - starttime
    cursor.execute("update games set outcome = ?, duration = ?, status = \"finished\" where game_id = ?", [outcome, duration, game_id])
    print("Spel gemarkeerd als afgelopen!")
programma_acties.append(programma_actie("Spel markeren als afgelopen", mark_game_done))

def delete_game():
    game_id = input("Voer een game-id in om te verwijderen: ")
    if not cursor.execute("select game_id from games where game_id = ?", [game_id]).fetchone():
        print("Kon geen spel vinden met die game_id!")
        return

    cursor.execute("delete from games where game_id = ?", [game_id])
    print("Spel verwijderd!")
programma_acties.append(programma_actie("Spel verwijderen", delete_game))

# maakt een vriendschap tussen 2 willekeurige user_id's
def make_friendship():
    # Dit is misschien de lelijkste functie die ik ooit heb geschreven, wees gewaarschuwd
    user_1 = random_player()
    user_2 = random_player()
    while user_1 == user_2: # garandeer dat user_1 != user_2
        user_2 = random_player()

    # [v for v in ? if v] zorgt er voor dat lege list elementen worden verwijderd
    # .fetchone()[0] or "" is omdat deze kolommen ook NULL kunnen zijn, maar ik wil altijd een string
    # .split(",") is omdat het user_id's zijn die gescheden zijn door komma's
    user_1_friend_list = [v for v in (cursor.execute("select friends from social where user_id = ?", [user_1]).fetchone()[0] or "").split(",") if v]
    user_2_friend_list = [v for v in (cursor.execute("select friends from social where user_id = ?", [user_2]).fetchone()[0] or "").split(",") if v]

    user_1_friend_list.append(user_2)
    user_2_friend_list.append(user_1)

    cursor.execute("update social set friends = ? where user_id = ?", [",".join(user_1_friend_list), user_1])
    cursor.execute("update social set friends = ? where user_id = ?", [",".join(user_2_friend_list), user_2])

    print(f"Nieuwe vriendschap gemaakt tussen {user_1} en {user_2}")
programma_acties.append(programma_actie("Vriendschap maken", make_friendship))

def reset_friendlist():
    resolveable = input("Voer een gebruikers-id of gebruikersnaam in: ")
    user_id = resolve(resolveable)
    if not user_id:
        print("Er is geen gebruiker met gebruikers-id of gebruikersnaam \"{resolveable}\"")
        return
    cursor.execute("delete from social where user_id = ?", [user_id])
    cursor.execute("insert into social values (?, NULL, NULL, NULL)", [user_id])
    print(f"Vriendenlijst van {user_id} geleegd!")
programma_acties.append(programma_actie("Vriendenlijst legen", reset_friendlist))

for table in ["users", "games", "social"]:
    programma_acties.append(programma_actie(
        f"Tabel '{table}' weergeven",
        lambda: print(cursor.execute(f"select * from {table}").fetchall())
        ))

programma_acties.append(programma_actie("Sla alle wijzigingen op", connection.commit))
programma_acties.append(programma_actie("Stop", exit))

def main():
    while True:
        # print witregels
        print("\n"*2, end="")

        # print alle acties in programma_acties
        for i, actie in enumerate(programma_acties):
            print(f"#{i}: {actie.name}")

        # vraag om keuze
        keuze = int(input("Geef je keuze: "))
        print("\n", end="")

        # kijk of keuze bestaat
        if keuze > len(programma_acties) - 1:
            print("Die actie bestaat niet!")
            continue # ga door naar de volgende iteratie van de while loop (voer keuze niet uit)

        # voer keuze uit
        programma_acties[keuze].exec()

if __name__ == "__main__":
    main()
