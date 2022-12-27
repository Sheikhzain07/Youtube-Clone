document.getElementById("find").addEventListener("click", () => {
  let data = document.getElementById("search").value;
  document.getElementById("trendVdo").innerHTML = null;
  // let content = document.getElementById("content");
  // content.innerHTML = null;
  // let filter = document.getElementById("filter-main");
  // content.append(filter);
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBhTu2NjYu--Zx3Xofachwm7mxUJkVU9X0&type=video&q=${data}&maxResults=20`
  ).then((res) => {
    res.json().then((dataApi) => {
      // console.log(dataApi.items)

      showData(dataApi.items);
    });
  });
});
document
  .getElementById("search")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("find").click();
    }
  });

const showData = (arr) => {
  // let str="";
  // console.log(arr)
  let content = document.getElementById("content");
  content.innerHTML = null;
  let filter = document.getElementById("filter-main");
  content.append(filter);
  // const ()
  arr.map((ele, idx) => {
    const {
      snippet: {
        thumbnails: {
          high: { url },
        },
        title,
        channelTitle,
        publishTime,
        description,
      },
      id: { videoId },
    } = ele;
    // console.log(url,title)

    // str+=  `<div id="main" class="cart">
    //             <div><img src="${url}" alt=""></div>
    //             <div id="right-side">
    //                 <h3>${title}</h3>
    //                 <p>${publishTime}</p>
    //                 <p>${channelTitle}</p>
    //                 <p>${description}</p>
    //             </div>
    //         </div>`
    // document.getElementById("content").innerHTML=str;
    let mainDiv = createEle("div");
    mainDiv.id = "main";
    let imgDiv = createEle("div");
    let img = createEle("img");
    img.src = url;
    imgDiv.append(img);
    let riDiv = createEle("div");
    riDiv.id = "right-side";
    let titl = createEle("h3");
    titl.innerText = title;
    let p1 = createEle("p");
    p1.innerText = publishTime;
    let p2 = createEle("p");
    p2.innerText = channelTitle;
    let p3 = createEle("p");
    p3.innerText = description;
    riDiv.append(titl, p1, p2, p3);
    mainDiv.append(imgDiv, riDiv);

    mainDiv.addEventListener("click", () => {
      var movieShow = [];
      let movieObj = {
        id: videoId,
      };
      movieShow.push(movieObj);
      localStorage.setItem("moviels", JSON.stringify(movieShow));
      movieShow = [];
      window.location.href = "video.html";
    });

    document.getElementById("content").append(mainDiv);
  });
};
function createEle(tag) {
  let mainDiv = document.createElement(tag);
  return mainDiv;
}

//https://www.youtube.com/watch?v=15sAm0HaB6E

function trendingVdo() {
  // let api = "AIzaSyBhTu2NjYu--Zx3Xofachwm7mxUJkVU9X0"
  let url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&metrics=views&chart=mostPopular&regionCode=IN&maxResults=20&key=AIzaSyBhTu2NjYu--Zx3Xofachwm7mxUJkVU9X0`;
  fetch(url).then((res) => {
    res.json().then((data) => {
      getTrendMovie(data.items);
    });
  });
}
trendingVdo();

function getTrendMovie(arr) {
  console.log(arr);
  arr.map((ele) => {
    const {
      id,
      snippet: {
        channelTitle,
        publishedAt,
        channelId,
        title,
        thumbnails: {
          high: { url },
        },
      },
      contentDetails: { duration },
      statistics: { viewCount },
    } = ele;

    let mainDiv = createEle("div");
    mainDiv.id = "mainT";
    let imgDiv = createEle("div");
    let img = createEle("img");
    img.src = url;
    imgDiv.append(img);

    let durDiv = createEle("div");
    durDiv.id = "duration";
    let p0 = createEle("p");
    p0.id = "durP";
    p0.innerText = timeDuration(duration);
    durDiv.append(p0);

    let titl = createEle("h3");
    titl.innerText = title;

    let p1 = createEle("p");
    p1.innerText = channelTitle;

    let riDiv = createEle("div");
    riDiv.id = "flexDiv";

    let p2 = createEle("p");
    p2.innerText = numFormatter(viewCount);

    let p3 = createEle("p");
    p3.innerText = publishedAt;

    riDiv.append(p2, p3);
    mainDiv.append(imgDiv, durDiv, titl, p1, riDiv);
    document.getElementById("trendVdo").append(mainDiv);

    mainDiv.addEventListener("click", () => {
      var movieShow = [];
      let movieObj = {
        id: id,
      };
      movieShow.push(movieObj);
      localStorage.setItem("moviels", JSON.stringify(movieShow));
      movieShow = [];
      window.location.href = "video.html";
    });
  });
}

//const { id, snippet: { channelTitle, publishedAt, channelId, title, thumbnails: { high: { url } } }, contentDetails: { duration }, statistics: { viewCount } } = element;"

function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num < 900) {
    return num;
  }
}

function timeDuration(duration) {
  let time = eval(
    duration
      .replace("PT", "")
      .replace("H", "*3600+")
      .replace("M", "*60+")
      .replace("S", "+")
      .slice(0, -1)
  );
  let hours = Math.floor(time / 60);
  let minutes = time % 60;
  return hours + ":" + minutes;
}

document.getElementById("one").addEventListener("click", () => {
  let zero = document.getElementById("zero");
  if (zero.style.display === "none") {
    zero.style.display = "block";
  } else {
    zero.style.display = "none";
  }
});
document.getElementById("sortTime").addEventListener("click", () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  let data = document.getElementById("search").value;
  let dat = date.toISOString();
  document
    .getElementById("content")
    .append(document.getElementById("filter-main"));
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBhTu2NjYu--Zx3Xofachwm7mxUJkVU9X0&type=video&q=${data}&maxResults=20&publishedAfter=${dat}`
  ).then((res) => {
    res.json().then((dataApi) => {
      // console.log(dataApi.items)
      showData(dataApi.items);
    });
  });
});
