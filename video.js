var movieArr = JSON.parse(localStorage.getItem("moviels")) || [];
function getData() {
  let movieUrl = `https://www.youtube.com/embed/${movieArr[0].id}`;
  document.querySelector("iframe").src = movieUrl;
}
getData();

let url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${movieArr[0].id}&key=AIzaSyBhTu2NjYu--Zx3Xofachwm7mxUJkVU9X0`;
fetch(url).then((res) => {
  res.json().then((data) => {
    let h3 = document.createElement("h3");
    h3.innerText = data.items[0].snippet.title;
    document.getElementById("iframe").append(h3);
    document.querySelector("title").innerText = data.items[0].snippet.title;
  });
});
