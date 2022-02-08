## ChatRoom - websocket version
(hw8 of wp1101)

### 登入與註冊
1. 啟動服務後會看到登入頁面 

   <img src="https://i.imgur.com/Z15YaVK.png" width="300">

2. 用戶需先點擊 "Register" 註冊用戶名和密碼才能使用服務

   <img src="https://i.imgur.com/f6ELJ9e.png" width="400">
  
3. 已存在的用戶名即不能再次註冊

4. 加密的過程為：註冊時於前端 hash，將 hash 值傳至後端資料庫儲存；登入時將使用者的密碼傳至後端，使用 bcrypt.compare 比對密碼和 hash 值

### 聊天室
1. 登入後會看到聊天室頁面，預設不會開啟任何聊天室，訊息輸入欄和清空按鈕皆無效化

   <img src="https://i.imgur.com/9zsEdqA.png" width="400">
   
2. 點擊 "+" 會彈出視窗詢問要和誰開啟聊天室，只能和已註冊過的用戶聊天

   <img src="https://i.imgur.com/GHWbynt.png" width="300">
   
3. 開啟聊天室後即可跟其他用戶及時對話

   <img src="https://i.imgur.com/zURQAtw.png" width="700">
   
4. 按下 Clear 按鈕會清空這個聊天室的聊天紀錄，對話兩方的聊天室都會即時清空

5. 無法開啟相同的聊天室，如： 對 Mark 開啟兩個聊天室

6. 可開啟與自己的聊天室
