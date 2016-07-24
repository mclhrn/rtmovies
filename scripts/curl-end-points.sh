#!/bin/sh
function curlHello {
    curl -X POST http://localhost:8001/hello?hello=world
    curl -X GET http://localhost:8001/movies
}
