const fetchData = () => {
  fetch("https://b59b-125-200-17-207.ngrok-free.app/fetch_game_status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched data:", data);

      if (data.response_status === "ok") {
        // 各チームのデータをローカルストレージに保存
        const teamData = {};
        data.game_statuses.forEach((status) => {
          teamData[status.team_id] = status.distance;
        });
        localStorage.setItem("teamData", JSON.stringify(teamData));

        // 距離が長い順にソートして上位3つを取得
        const topThree = data.game_statuses
          .sort((a, b) => b.distance - a.distance)
          .slice(0, 3);

        // ランキング要素を更新
        const rankingElements = document.querySelectorAll(".ranking");
        topThree.forEach((status, index) => {
          const rankingElement = rankingElements[index];
          const rankText = rankingElement.querySelector("p");
          const teamImage = rankingElement.querySelector("img");

          // チームの距離と名前を更新
          rankText.textContent = `${status.team_id}班 - ${status.distance}m`;
          teamImage.alt = `${status.team_id} rank image`; // 代替テキストを設定
        });

        // progress-barの更新
        data.game_statuses.forEach((status) => {
          const teamContainers = document.querySelectorAll(".team-container");
          teamContainers.forEach((container) => {
            const teamName = container.querySelector("h2").textContent;
            if (teamName.includes(`${status.team_id}班`)) {
              const progressBar = container.querySelector(".progress-bar");
              const distanceText = container.querySelector(".progress p");

              // 距離を全体値1031に対しての割合（%）で計算
              const progressPercentage = (status.distance / 1031) * 100;

              // 幅をCSSで更新
              progressBar.style.width = `${progressPercentage}%`;

              // pタグのテキストをdistanceに合わせて更新
              distanceText.textContent = `${status.distance}m`;
            }
          });
        });
      } else {
        document.getElementById("data-container").innerText = "No data found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("data-container").innerText =
        "Error fetching data.";
    });
};

// データを5秒ごとに取得
setInterval(fetchData, 5000);
