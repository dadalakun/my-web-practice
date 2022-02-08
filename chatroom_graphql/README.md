## ChatRoom - graphql version
(hw9 of wp1101)

單人聊天室的 Graphql 版本，另外加入進階要求的 "未讀訊息數量標示" 功能。

- 按下 Clear 按鈕會清空**當前**聊天室的聊天紀錄，此變化也會透過 Subscription 及時反映到聊天對象的 Client 端(如果他有開啟聊天室的話)。
- 使用者皆須在登入頁面點選 Register 並註冊過後才能使用，聊天的對象也僅限有註冊過的用戶。
- 許多程式碼是參考老師上課開過的 & 投影片的 Code。

### 使用方法
安裝套件
``` bash
> cd frontend
> yarn install
> cd ../backend
> yarn install
```
新增資料庫 config file: `.env`，填入 mogoose database 連結
``` bash
> cd backend
> mkdir .env
```
``` vim=
// .env
MONGO_URL = '${your database link}'
```
開啟後端，結果如下圖
``` bash
> pwd
.../hw9

> yarn server
```
<img src="https://i.imgur.com/HPLe7vg.png" width="400">

###

另一個 terminal 開啟前端
``` bash
> yarn start
```

<img src="https://i.imgur.com/oosItXY.png" width="400">
