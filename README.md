# FCC_urlShortenerAPI

URL Shortener Microservice

User Stories

Able to pass a URL as a parameter and receive a shortened URL in JSON format If URL passed as parameter is invalid, the JSON response will contain an error instead You can visit shortened URL and be redirected to the original URL

Example Uses:

Create Shortened URL: http://<i></i>hurley-fcc-urlshortener-api.herokuapp.com/new/http://<i></i>www.foo.com

Output: {'original_url':'http://<i></i>www.foo.com>', 'short_url':'<http://<i></i>hurley-fcc-urlshortener-api.herokuapp.com/1234'}

Usage: http://<i></i>hurley-fcc-urlshortener-api.herokuapp.com/1234/

Will redirect to: http://<i></i>www.foo.com/
