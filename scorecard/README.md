![](https://i.imgur.com/lkqB9tF.png)

#### 1. 將 clear 按鈕分成 1. 清除 database 2. 清空 Console。
#### 2. 面板左下為 Console，負責印出對 ScoreCard DB 操作時的資訊。
#### 3. 右下為 Table，依據本次作業進階要求對 ADD 和 Query 操作做出反應。
#### 4. Table 有東西時，點擊 Column Name 可對該項資料做排序。
#### 5. 於 Query 區域新增 All 選項，選擇 All 並送出搜尋即可爬回資料庫中所有分數卡。
#### 6. 如果在 table 中有搜尋結果時按下 Clear DB，table 中的資料不會因此消失，需要等到下次 Add 或是 Query 時才會刷新，這部分算是比較遺憾的地方 (做作業時沒有考慮到這個層面，要改的話除非大改，不然架構和 State 的邏輯應該會變雜亂)。