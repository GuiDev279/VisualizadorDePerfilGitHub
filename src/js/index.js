const btnSearch = document.getElementById('btn-search')
const inputSearch = document.getElementById('input-search')
const profileResults = document.getElementById('profile-results')

const baseUrl = 'https://api.github.com';


btnSearch.addEventListener('click', async () => {
    const userName = inputSearch.value;

    if (userName) {

        try {

            const response = await fetch(`${baseUrl}/users/${userName}`)

            if (!response.ok) {
                alert('Usuário não encontado. Por favor, verifique o nome do usuário digitado e tente novamente.')
            }

            const user = await response.json()


            profileResults.innerHTML = `
                <div class="profile-card">
                    <img src="${user.avatar_url}" alt="Avatar de ${user.name}" class="profile-avatar">
                    <div class="profile-info">
                        <h2>${user.name}</h2>
                        <p>${user.bio || 'Não possui bio cadastrada 😢 '}</p>
                    </div>
                </div>
                <hr>
                <div class="profile-counters">
                    <div class="followers">
                        <h3>👥 Seguidores</h3>
                        <span>${user.followers}</span>
                    </div>
                    <div class="following">
                        <h3>👥 Seguindo</h3>
                        <span>${user.following}</span>
                    </div>
                </div>
                <hr>
            `;

            // Buscar repositórios (últimos 10 criados)
            const reposResponse = await fetch(`${baseUrl}/users/${userName}/repos?per_page=10&sort=created`);

            if (!reposResponse.ok) {
                throw new Error('Não foi possível buscar os repositórios.');
            }

            const repos = await reposResponse.json();


            // Renderizar lista de repositórios
            const reposHtml = repos.length > 0 ? repos.map(repo => `

                <a href="${repo.html_url}" target="_blank">
                    <div class="repository-card">
                            <h4>${repo.name}</h4>
                            <div class="repository-stats">
                                <span>⭐ Stars: ${repo.stargazers_count}</span>
                                <span>🍴 Forks: ${repo.forks_count}</span>
                                <span>👀 Watchers: ${repo.watchers_count}</span>
                                <span>💻 Language: ${repo.language || 'Não informado'}</span>
                            </div>
                    </div>
                </a>
            `).join('') : `<p>Este usuário não possui repositorios públicos</p>`;


            // Aqui você insere no HTML
            profileResults.innerHTML += `
                    <div class="profile-repositories">
                        <h3>📂 Repositórios</h3>
                        <div class="repositories">
                            ${reposHtml}
                        </div>
                    </div>
                `;

        } catch (error) {
            console.error('Erro ao buscar perfil do usuário', error);
            alert('Ocorreu um erro ao buscar perfil do usuário. Por favor, tente novamente mais tarde.')
        }
    } else {
        alert('Por favor, digite um nome de usuário do GitHub')
    };
});