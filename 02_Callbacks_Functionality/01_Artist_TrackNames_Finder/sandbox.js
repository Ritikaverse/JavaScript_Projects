const artistName = document.getElementById("artist-input");
const form = document.querySelector(".search-form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = artistName.value;

  const getInfo = (input, callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const response = request.responseText;
        callback(undefined, JSON.parse(response));
      } else if (request.readyState === 4) {
        callback("unable to fetch data for " + input, undefined);
      }
    });

    request.open("GET", "https://itunes.apple.com/search?term=" + input);
    request.send();
  };

  getInfo(input, (error, data) => {
    result.innerHTML = ""; // always clear old results
    if (error) {
      result.innerHTML = `<p>${error}</p>`;
    } else {
      const filterData = data.results.filter((item) =>
        item.artistName.toLowerCase().includes(input.toLowerCase())
      );
      // console.log(filterData);
      // console.log(data);

      if (filterData.length === 0) {
        result.innerHTML = `<p>No results for "${input}".</p>`;
      } else {
        filterData.forEach((element) => {
          const html = `
                        <p>
                            <strong>${element.artistName}</strong> - <strong>${element.trackName}</strong>
                        </p>
                    `;
          result.innerHTML += html;
        });
      }
    }
  });
});