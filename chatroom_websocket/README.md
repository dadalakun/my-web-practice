## ChatRoom - websocket version
### 簡介
本應用是「網路服務程式設計」課程的第八個作業。這個作業中，我使用 React/WebSocket/Express/Mongoose 框架，去寫出一個簡單的聊天室系統，此系統有以下功能：

＊ **登入與註冊**
1. 啟動服務後會看到登入頁面 

   <img src="https://i.imgur.com/Z15YaVK.png" width="300">

2. 用戶需先點擊 "Register" 註冊用戶名和密碼才能使用服務

   <img src="https://i.imgur.com/f6ELJ9e.png" width="400">
  
3. 已存在的用戶名即不能再次註冊

4. 密碼在存進資料庫之前會先被 bcrypt.js 套件加密

＊ **聊天室**

1. 登入後會看到聊天室頁面，預設不會開啟任何聊天室，訊息輸入欄和清空按鈕皆無效化

   <img src="https://i.imgur.com/9zsEdqA.png" width="400">
   
2. 點擊 "+" 會彈出視窗詢問要和誰開啟聊天室，並且只能和已註冊過的用戶聊天

   <img src="https://i.imgur.com/GHWbynt.png" width="300">
   
3. 開啟聊天室後即可跟其他用戶即時對話

   <img src="https://i.imgur.com/zURQAtw.png" width="700">
   
4. 按下 Clear 按鈕會清空這個聊天室的聊天紀錄，對話兩方的聊天室會同時被清空

5. 無法開啟相同的聊天室，如： 對 Mark 開啟兩個聊天室

6. 可開啟與自己的聊天室

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