import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

//Components
import PageLayout from "./PageLayout";

const FilmsPage = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [film, setFilm] = useState()

    useEffect(() => {
        let tempFilm
        fetch(`http://localhost:3001/api/films/${id}`)
            .then(response => response.json())
            .then(fil => { tempFilm = fil; return fil; })
            .then(() => fetch(`http://localhost:3001/api/films/${id}/characters`))
            .then(respone => respone.json())
            .then(characters => {
                const arrayOfPromises = characters.map((character) => {
                    return fetch(`http://localhost:3001/api/characters/${character.character_id}`).then(respone => respone.json())
                });
                return Promise.all(arrayOfPromises)
            })
            .then(characters => tempFilm.characters = characters)
            .then(() => setFilm(tempFilm))
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
                        title={film?.title}
                        featured={[
                            { title: 'Producer', value: film?.producer },
                            { title: 'Director', value: film?.director },
                            { title: 'Release Date', value: film?.release_date },
                            { title: 'Opening Crawl', value: film?.opening_crawl },
                        ]}
                        sections={[
                            { title: 'Appearing Characters:', value: film?.characters, page: 'character' },
                        ]}
                    />
                </div>}
        </div>
    )
}

export default FilmsPage;