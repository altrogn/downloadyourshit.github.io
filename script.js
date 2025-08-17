let playerWidth = 860; // Начальная ширина плеера
let playerHeight = 483; // Начальная высота плеера
let currentUrl = ""; // Храним текущую ссылку на видео

function playVideo() {
    let url = document.getElementById("videoUrl").value;
    let playerDiv = document.getElementById("player");
    let inputContainer = document.getElementById("inputContainer");
    let controls = document.getElementById("controls");

    currentUrl = url;
    playerDiv.innerHTML = "";
    playerDiv.style.width = `${playerWidth}px`;
    playerDiv.style.height = `${playerHeight}px`;

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        let videoId = "";
        if (url.includes("youtube.com")) {
            videoId = url.split("v=")[1];
            if (videoId) videoId = videoId.split("&")[0];
        } else if (url.includes("youtu.be")) {
            videoId = url.split("youtu.be/")[1];
            if (videoId) videoId = videoId.split("?")[0];
        }
        if (videoId) {
            playerDiv.innerHTML = `<iframe width="${playerWidth}" height="${playerHeight}" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            playerDiv.innerHTML = "<p>Ошибка: неверная ссылка на YouTube!</p>";
        }
    } else {
        playerDiv.innerHTML = `<video width="${playerWidth}" height="${playerHeight}" controls>
                                <source src="${url}" type="video/mp4">
                                Браузер не поддерживает видео.
                              </video>`;
    }

    inputContainer.classList.add("hidden");
    controls.classList.remove("hidden");
}

function goBack() {
    let playerDiv = document.getElementById("player");
    playerDiv.innerHTML = "";
    playerDiv.style.width = "";
    playerDiv.style.height = "";

    playerWidth = 560; // Сбрасываем размеры
    playerHeight = 315;

    let inputContainer = document.getElementById("inputContainer");
    let controls = document.getElementById("controls");
    inputContainer.classList.remove("hidden");
    controls.classList.add("hidden");

    document.getElementById("videoUrl").value = "";
    currentUrl = "";
}

function resizePlayer(action) {
    if (action === "increase") {
        playerWidth += 300;
        playerHeight += 168;
    } else if (action === "decrease" && playerWidth > 200) {
        playerWidth -= 300;
        playerHeight -= 168;
    }

    // Ограничиваем максимальную ширину по viewport
    const maxWidth = window.innerWidth - 40; // Учитываем padding
    if (playerWidth > maxWidth) {
        playerWidth = maxWidth;
        playerHeight = Math.round((maxWidth / 16) * 9);
    }

    let playerDiv = document.getElementById("player");
    playerDiv.style.width = `${playerWidth}px`;
    playerDiv.style.height = `${playerHeight}px`;

    if (currentUrl) {
        playerDiv.innerHTML = "";
        if (currentUrl.includes("youtube.com") || currentUrl.includes("youtu.be")) {
            let videoId = "";
            if (currentUrl.includes("youtube.com")) {
                videoId = currentUrl.split("v=")[1];
                if (videoId) videoId = videoId.split("&")[0];
            } else if (currentUrl.includes("youtu.be")) {
                videoId = currentUrl.split("youtu.be/")[1];
                if (videoId) videoId = videoId.split("?")[0];
            }
            if (videoId) {
                playerDiv.innerHTML = `<iframe width="${playerWidth}" height="${playerHeight}" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
            }
        } else {
            playerDiv.innerHTML = `<video width="${playerWidth}" height="${playerHeight}" controls>
                                    <source src="${currentUrl}" type="video/mp4">
                                    Браузер не поддерживает видео.
                                  </video>`;
        }
    }
}

function downloadVideo() {
    if (currentUrl.includes("youtube.com") || currentUrl.includes("youtu.be")) {
        let videoId = "";
        if (currentUrl.includes("youtube.com")) {
            videoId = currentUrl.split("v=")[1];
            if (videoId) videoId = videoId.split("&")[0];
        } else if (currentUrl.includes("youtu.be")) {
            videoId = currentUrl.split("youtu.be/")[1];
            if (videoId) videoId = videoId.split("?")[0];
        }
        if (videoId) {
            let downloadUrl = `https://www.y2mate.com/youtube/${videoId}`;
            window.open(downloadUrl, "_blank");
        } else {
            alert("Ошибка: неверная ссылка на YouTube!");
        }
    } else {
        let link = document.createElement("a");
        link.href = currentUrl;
        link.download = "video.mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}