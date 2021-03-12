#!/bin/sh

# username="test_$RANDOM"
# email="$username@example.com"
# password=$(echo $RANDOM | base64)

# signup () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d "{
# 		\"username\": \"$username\",
# 		\"email\": \"$email\",
# 		\"password\": \"$password\"
# 		}" \
# 		localhost:5000/api/auth/signup
# }

# login_username () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d "{
# 		\"email\": \"$username\",
# 		\"password\": \"$password\"
# 		}" \
# 		localhost:5000/api/auth/login
# }

# login_email () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d "{
# 		\"email\": \"$email\",
# 		\"password\": \"$password\"
# 		}" \
# 		localhost:5000/api/auth/login
# }

# user_info () {
# 	curl -X GET \
# 		-H "Content-Type: application/json" \
# 		-d '{
# 		"username": "loekaars"
# 		}' \
# 		localhost:5000/user/info
# }

# login_token () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d "{
# 		\"user_id\": \"2dc82ac3-e3c1-4a0e-b024-c6224107ff59\",
# 		\"token\": \"beda7848ac601d80ac88bfc629d13ed6dc27dabd29a3e1db5b2a93839bd6dd3c79e25ea939d13789fdec74edafa18b4040d39729c282f28f82f366d44b5455cd8e3c28b59da2c397ff4e637a99c3ccbea4af00828ab7094b5285b8f900e31e833b5e55994e68e3de7e7fbeb02adc74231f63173e84f7e22aef97f9c7bfd920a1\"
# 		}" \
# 		localhost:5000/api/auth/token
# }

# new_game () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d '{
# 			"user_id": "4577c119-c768-4ad5-afec-b53a5c19baf4",
# 			"settings": {
# 				"ranked": true,
# 				"timelimit": {
# 					"minutes": 5,
# 					"seconds": 30,
# 					"enabled": true,
# 					"shared": "false"
# 				}
# 			}
# 		}' \
# 		localhost:5000/game/new
# }

# random_game_1 () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d '{ "user_id": "e6162c82-3e60-4479-ac96-a1af508e49c4" }' \
# 		localhost:2080/api/game/random
# }

# random_game_2 () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d '{ "user_id": "de960155-7d58-46b3-a4f6-7d33aa034ad9" }' \
# 		localhost:2080/api/game/random
# }

# sleep 3
# random_game_1
# sleep 10
# random_game_2

# search () {
# 	curl  \
# 		-H "Content-Type: application/json" \
# 		-d "{ \"query\": \"$1\" }" \
# 		localhost:2080/api/social/search
# }

# search loekaars

# games () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d "{ \"id\": \"4577c119-c768-4ad5-afec-b53a5c19baf4\" }" \
# 		localhost:2080/api/user/games
# }

# games

curl -X POST \
	-H "Content-Type: application/json" \
	--cookie "token= 40183c739ae198cee3718c81c72b1bbd56ff83d9fcdbb9badb9ecef3684f98cf8df391aa31a8c1c8cfa55d1161a847fd60040c5b28104892e20b2d7e6eaf1cfc79f3bb288b50718c015834f3c162e1d3c771afc23d53b316b20ab20922244c0ddec789d3427b6bbaba766dee34f77b792cce2a1cd8e65ae69b16289d285d93e3" \
	-d '{
	"id": "a651f66c-a769-40a7-a962-0a4e1bd38d42"
	}' \
	localhost:2080/api/social/block

sleep 10

curl -X POST \
	-H "Content-Type: application/json" \
	--cookie "token= 40183c739ae198cee3718c81c72b1bbd56ff83d9fcdbb9badb9ecef3684f98cf8df391aa31a8c1c8cfa55d1161a847fd60040c5b28104892e20b2d7e6eaf1cfc79f3bb288b50718c015834f3c162e1d3c771afc23d53b316b20ab20922244c0ddec789d3427b6bbaba766dee34f77b792cce2a1cd8e65ae69b16289d285d93e3" \
	-d '{
	"id": "a651f66c-a769-40a7-a962-0a4e1bd38d42"
	}' \
	localhost:2080/api/social/request

