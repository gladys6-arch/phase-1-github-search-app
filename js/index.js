document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("github-form");
  const searchInput = document.getElementById("search");
  const userList = document.getElementById("user-list");
  const reposList = document.getElementById("repos-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) return;

    // Clear previous results
    userList.innerHTML = '';
    reposList.innerHTML = '';

    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        data.items.forEach(user => {
          const li = document.createElement("li");
          li.innerHTML = `
            <img src="${user.avatar_url}" width="80" />
            <p><strong>${user.login}</strong></p>
            <a href="${user.html_url}" target="_blank">View Profile</a>
          `;
          li.style.cursor = "pointer";

          li.addEventListener("click", () => {
            fetch(`https://api.github.com/users/${user.login}/repos`)
              .then(res => res.json())
              .then(repos => {
                reposList.innerHTML = `<h3>${user.login}'s Repositories</h3>`;
                repos.forEach(repo => {
                  const repoLi = document.createElement("li");
                  repoLi.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                  reposList.appendChild(repoLi);
                });
              });
          });

          userList.appendChild(li);
        });
      });
  });
});
