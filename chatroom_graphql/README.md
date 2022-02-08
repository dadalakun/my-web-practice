## ChatRoom - graphql version
### 簡介

在 WebSocket 版本中原是使用 listen and broadcast 去實現即時通訊的功能，而在此 GraphQL 版本中則是透過 Subscription - 當特定資訊有所更動時，GraphQL Server 會去自動通知有訂閱該資訊的所有 Client 端，以實現即時聊天的效果。除此 WebSocket 版本有的基本功能之外，這個 Project 也加入 "未讀訊息數量標示" 的功能。

<img src="https://i.imgur.com/lRrrXg5.png" width="700">

### Set Up
Install the necessary dependencies
``` bash
# in frontend
$ yarn install
# in backend
$ yarn install
```
Set env variable for database connection
``` bash
# in backend
$ mkdir .env
$ echo "MONGO_URL = '${MongoDB link}'" > .env
```
Start the application
``` bash
# run frontend on one terminal
$ yarn start
# run backend on another terminal
$ yarn server
```
