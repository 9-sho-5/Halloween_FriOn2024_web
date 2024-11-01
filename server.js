const fetchData = () => {
  fetch("https://b59b-125-200-17-207.ngrok-free.app/fetch_game_status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: "value" }), // 必要に応じてボディを設定
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // JSON形式で返ってくる場合はこちら
    })
    .then((data) => {
      console.log("Fetched data:", data);

      // Fetchが成功したら、progress-barを更新
      if (data.response_status === "ok") {
        data.game_statuses.forEach((status) => {
          // チームIDに基づいてチームの progress-bar 要素を取得
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
