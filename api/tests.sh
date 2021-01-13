#!/bin/sh

signup () {
	curl -X POST \
		-H "Content-Type: application/json" \
		-d '{
		"username": "test",
		"email": "test@example.com",
		"password": "password123"
		}' \
		localhost:5000/api/auth/signup
}
