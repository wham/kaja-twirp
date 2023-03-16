package model

import (
	"os"

	"github.com/gin-gonic/gin"
)

func ModelLoader() gin.HandlerFunc {
	return func(c *gin.Context) {
		text, _ := os.ReadFile("error.txt")

		if len(text) > 0 {
			c.AbortWithStatus(501)
		}
	}
}