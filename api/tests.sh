#!/bin/sh

signup () {
	curl -X POST \
		-H "Content-Type: application/json" \
		-d '{
		"username": "gert",
		"email": "gert@example.com",
		"password": "password123"
		}' \
		localhost:5000/api/auth/signup
}

login () {
	curl -X POST \
		-H "Content-Type: application/json" \
		-d '{
		"email": "gert@example.com",
		"password": "password123"
		}' \
		localhost:5000/api/auth/login
}

login
