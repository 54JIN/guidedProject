import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

//Components
import PageLayout from "./PageLayout";

const PlanetsPage = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [planet, setPlanet] = useState()

    useEffect(() => {
        let tempPlanet
        fetch(`http://localhost:3001/api/planets/${id}`)
            .then(response => response.json())
            .then(plan => { tempPlanet = plan; return plan; })
            .then(() => fetch(`http://localhost:3001/api/planets/${id}/films`))
            .then(respone => respone.json())
            .then(films => {
                const arrayOfPromises = films.map((film) => {
                    return fetch(`http://localhost:3001/api/films/${film.film_id}`).then(respone => respone.json())
                });
                return Promise.all(arrayOfPromises)
            })
            .then(films => tempPlanet.films = films)
            .then(() => setPlanet(tempPlanet))
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
                        title={planet?.name}
                        featured={[
                            { title: 'Terrain', value: planet?.terrain },
                            { title: 'Climate', value: planet?.climate },
                            { title: 'Diameter', value: planet?.diameter },
                            { title: 'Population', value: planet?.population },
                        ]}
                        sections={[
                            { title: 'Films Appeared in', value: planet?.films, page: 'film' },
                        ]}
                    />
                </div>}
        </div>
    )
}

export default PlanetsPage;