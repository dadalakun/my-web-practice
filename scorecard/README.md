## ScoreCard
<img src="https://i.imgur.com/lkqB9tF.png" width="550" >

### 簡介
本應用是「網路服務程式設計」課程的作業七。這個作業中，我使用 React/Axios/Express/Mongoose 框架，去寫出一個簡單的成績登錄系統，此系統有以下功能：
1. ADD 頁面新增成績紀錄（名字, 科目, 成績）
2. QUERY 頁面選擇以名字、科目名稱進行搜尋，抑或是點選 All 查詢資料庫中所有成績資料
3. 左下角是這個系統的 console 頁面，顯示在新增、查詢資料時產生的附屬資料/紀錄
4. 右下角是查詢的結果，在每次 QUERY/ADD 時刷新，並可點選表格上方欄位名稱對資料進行排序
5. 右上角兩個按鈕分別可以清空資料庫和清空 console block

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