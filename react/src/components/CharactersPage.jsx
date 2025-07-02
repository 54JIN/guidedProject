import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

//Components
import PageLayout from "./PageLayout";

const CharactersPage = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [character, setCharacter] = useState()

    useEffect(() => {
        let tempCharacter 
        fetch(`http://localhost:3001/api/characters/${id}`)
            .then(response => response.json())
            .then(char => {tempCharacter = char; return char;})
            .then(char => fetch(`http://localhost:3001/api/planets/${char.homeworld}`))
            .then(respone => respone.json())
            .then(planetData => {
                tempCharacter['homeworld'] = [{ id: planetData.id, title: planetData.name, page: 'planet' }];
            })
            .then(() => fetch(`http://localhost:3001/api/characters/${id}/films`))
            .then(respone => respone.json())
            .then(films => {
                const arrayOfPromises = films.map((film) => {
                    return fetch(`http://localhost:3001/api/films/${film.film_id}`).then(respone => respone.json())
                });
                return  Promise.all(arrayOfPromises)
            })
            .then(films => tempCharacter.films = films)
            .then(() => setCharacter(tempCharacter))
        .catch((error) => console.error('Error:', error))
        .catch((error) => console.error('Error:', error)).finally(setLoading(false));
}, []);

return (
    <div>
        {loading ?
            <div>
                <h1>Loading</h1>
            </div>
            :
            <div>
                <PageLayout
                    title={character?.name}
                    featured={[
                        { title: 'Height', value: character?.height },
                        { title: 'Mass', value: character?.mass },
                        { title: 'Born', value: character?.birth_year },
                        { title: 'Gender', value: character?.gender },
                    ]}
                    sections={[
                        { title: 'Homeworld', value: character?.homeworld, page: 'planet' },
                        { title: 'Films Appeared in', value: character?.films, page: 'film' },
                    ]}
                />
            </div>}
    </div>
)
}

export default CharactersPage;