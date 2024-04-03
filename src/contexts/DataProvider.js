import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [people, setPeople] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/projects.json')
                .then(response => response.json()),
            fetch('https://raw.githubusercontent.com/imagine-uniandes/web_data/main/data/people.json')
                .then(response => response.json())
        ]).then(([projectData, peopleData]) => {
            setProjects(projectData);
            setPeople(peopleData);
            setIsLoading(false);
        });
    }, []);

    return (
        <DataContext.Provider value={{ projects, people, isLoading }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;