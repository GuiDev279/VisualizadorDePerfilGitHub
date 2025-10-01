const btnSearch = document.getElementById('btn-search')
const inputSearch = document.getElementById('input-search')
const profileResults = document.getElementById('profile-results')

const baseUrl = 'https://api.github.com';

 btnSearch.addEventListener('click', async () => {
    const userName = inputSearch.value;
    if(userName){

        try{
            const response = await fetch(`${baseUrl}/users/${userName}`)
        
            if(!response.ok){
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
            `

    }catch (error){
        console.error('Erro ao buscar perfil do usuário', error);
        alert('Ocorreu um erro ao buscar perfil do usuário. Por favor, tente novamente mais tarde.')
    }
    }else{
        alert('Por favor, digite um nome de usuário do GitHub')
    };
});