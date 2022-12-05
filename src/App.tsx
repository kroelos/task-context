import { useState, createContext, useContext } from 'react';
import { data, IItem } from './data';
import './styles.css';
const DataContext = createContext(data);
const ThemeContext = createContext('light' as Theme);
const ItemContext = createContext(data[0]);
type Theme = 'light' | 'dark';
export function App() {
    const [currentTheme, setCurrentTheme] = useState<Theme>('light');

    function changeTheme() {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    const className = `app app_${currentTheme}`;

    return (
        <div className={className}>
            <button onClick={changeTheme}>Toggle theme</button>
            <DataContext.Provider value={data}>
                <ThemeContext.Provider value={currentTheme}>
                    <List />
                </ThemeContext.Provider>
            </DataContext.Provider>
        </div>
    );
}

function List() {
    const data = useContext(DataContext);
    const main_theme = useContext(ThemeContext);
    return (
        <div>
            {data.map((item) => (
                <ItemContext.Provider value={item} key={item.id}>
                    <ThemeContext.Provider value={main_theme}>
                        <ListItem />
                    </ThemeContext.Provider>
                </ItemContext.Provider>
            ))}
        </div>
    );
}

function ListItem() {
    const theme = useContext(ThemeContext);
    const item = useContext(ItemContext);
    const className = `listItem listItem_${theme}`;
    return <div className={className}>{item.name}</div>;
}
