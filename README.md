# I am alive

A deadly simple http server that tracks the IPs of whatever sends a POST request to it.

`curl -d 'name=myPersonalNotebook' -X POST $SERVER_IP:$PORT`

```
curl localhost:3000
[{"name":"myPersonalNotebook","ip":"<REDACTED>","updatedAt":"2020-09-26T20:23:56.799Z"}]
```


## Running

`node node index.js $PORT`
