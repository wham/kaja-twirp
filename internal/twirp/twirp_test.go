package twirp

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetBaseURL(t *testing.T) {
	assert.Equal(t, "hi", GetBaseURL())
}