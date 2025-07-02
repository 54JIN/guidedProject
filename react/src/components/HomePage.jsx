import { useState, useEffect } from "react";

//Components
import LittleBox from "./LittleBox";

const HomePage = () => {
    const [characters, setCharacters] = useState([]);

    // Fetch all the characters and set it in useState "Characters"
    useEffect(() => {
        fetch('http://localhost:3001/api/characters', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        ).then(response => response.json()).then(data => setCharacters(data))
        .catch((error) => console.error('Error:', error));
    }, []);

    // fetch('https://httpbin.org/post', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({'Id': 123, 'Name': 'J DOe'}),
    // }).then(response => response.json).then(data => console.log('POST:', data))
    // .catch((error) => console.error('Error:', error));

    return (
        <div className="HomePage">
            {characters.map(character => <LittleBox key = {character.id} title = {character.name} page='character' id={character.id} />)}
        </div>
    );
}

export default HomePage;