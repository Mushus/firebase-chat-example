package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

func main() {
	opt := option.WithCredentialsFile("./service_account.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("failed to create firebase app: %v", err)
	}

	auth, err := app.Auth(context.Background())
	if err != nil {
		log.Fatalf("failed to firebase auth: %v", err)
	}

	ctrl := Controller{
		App:  app,
		Auth: auth,
	}

	http.HandleFunc("/", ctrl.AuthHandler)
	http.ListenAndServe(":8080", nil)
}

// Controller コントローラー
type Controller struct {
	App  *firebase.App
	Auth *auth.Client
}

// AuthHandler 認証するコントローラー
func (c *Controller) AuthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(200)
		w.Write([]byte(`<!doctype html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>auth</title>
			</head>
		<body>
			<form method="post" action="/">
				<label>user<input type="text" name="user"></label>
				<label>password<input type="password" name="password"></label>
				<button type="submit">login</button>
			</form>
		</body>
		</html>`))
		return
	}
	user := r.Form.Get("user")
	password := r.Form.Get("password")

	// 認証する
	if user != "user" && password != "password" {
		w.WriteHeader(401)
	}

	// このトークンが接続するためのトークンです
	token, err := c.Auth.CustomToken(context.Background(), "user")
	if err != nil {
		w.WriteHeader(500)
	}

	fmt.Fprintf(w, token)
}
