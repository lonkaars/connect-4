#!/bin/sh

username="test_$RANDOM"
email="$username@example.com"
password=$(echo $RANDOM | base64)

signup () {
	curl -X POST \
		-H "Content-Type: application/json" \
		-d "{
		\"username\": \"$username\",
		\"email\": \"$email\",
		\"password\": \"$password\"
		}" \
		localhost:5000/api/auth/signup
}

login_username () {
	curl -X POST \
		-H "Content-Type: application/json" \
		-d "{
		\"email\": \"$username\",
		\"password\": \"$password\"
		}" \
		localhost:5000/api/auth/login
}

login_email () {
	curl -X POST \
		-H "Content-Type: application/json" \
		-d "{
		\"email\": \"$email\",
		\"password\": \"$password\"
		}" \
		localhost:5000/api/auth/login
}

user_info () {
	curl -X GET \
		-H "Content-Type: application/json" \
		-d '{
		"username": "loekaars"
		}' \
		localhost:5000/api/user/info
}

# login_token () {
# 	curl -X POST \
# 		-H "Content-Type: application/json" \
# 		-d "{
# 		\"user_id\": \"2dc82ac3-e3c1-4a0e-b024-c6224107ff59\",
# 		\"token\": \"beda7848ac601d80ac88bfc629d13ed6dc27dabd29a3e1db5b2a93839bd6dd3c79e25ea939d13789fdec74edafa18b4040d39729c282f28f82f366d44b5455cd8e3c28b59da2c397ff4e637a99c3ccbea4af00828ab7094b5285b8f900e31e833b5e55994e68e3de7e7fbeb02adc74231f63173e84f7e22aef97f9c7bfd920a1\"
# 		}" \
# 		localhost:5000/api/auth/token
# }

new_game () {
	curl -X POST \
		-H "Content-Type: application/json" \
		-d '{
			"user_id": "4577c119-c768-4ad5-afec-b53a5c19baf4",
			"settings": {
				"ranked": true,
				"timelimit": {
					"minutes": 5,
					"seconds": 30,
					"enabled": true,
					"shared": "false"
				}
			}
		}' \
		localhost:5000/game/new
}

new_game

