import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

//Components
import PageLayout from "./PageLayout";

const CharactersPage = () => {
    const { id } = useParams();

    const [ loading, setLoading ] = useState(true)
    const [ character, setCharacter ] = useState()

    useEffect(() => {
        fetch(`http://localhost:3001/api/characters/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        ).then(response => response.json())
        .then(data => fetch(`http://localhost:3001/api/planets/${data.homeworld}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                        ).then(respone => respone.json())
                        .then(planetData => {
                            data['homeworld'] = [{id: planetData.id, title: planetData.name, page: 'planet'}];
                            return data
                        })
                        .then(data => fetch(`http://localhost:3001/api/characters/${id}/films`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                        ).then(respone => respone.json())
                        .then(filmsData => {
                            data['films'] = filmsData.map((film) => {
                                const filmData = {};
                                fetch(`http://localhost:3001/api/films/${film.film_id}`, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                }
                                ).then(respone => respone.json()).then(data => {
                                    filmData['id'] = data.id;
                                    filmData['title'] = data.title;
                                    filmData['page'] = 'film';
                                })
                                return filmData
                            });
                            setCharacter(data)
                        }))
                        .catch((error) => console.error('Error:', error)) 
        )
        .catch((error) => console.error('Error:', error)).finally(setLoading(false));
    }, []);

    return (
        <div>
            {loading? 
                <div>
                    <h1>Loading</h1>
                </div> 
                : 
                <div>
                    <PageLayout 
                        title={character?.name} 
                        featured={[
                            {title: 'Height', value: character?.height},
                            {title: 'Mass', value: character?.mass},
                            {title: 'Born', value: character?.birth_year},
                            {title: 'Gender', value: character?.gender},
                        ]}
                        sections={[
                            {title: 'Homeworld', value: character?.homeworld},
                            {title: 'Films Appeared in', value: character?.films},
                        ]}
                    />   
                </div>}
        </div>
    )
}

export default CharactersPage;