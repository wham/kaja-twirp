package model

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func ModelLoader() gin.HandlerFunc {
	return func(c *gin.Context) {
		text, _ := os.ReadFile("error.txt")

		if len(text) > 0 {
			c.HTML(http.StatusOK, "error.tmpl", gin.H{
				"text": string(text),
			})
			c.Abort()
		}

		c.Next()
	}
}