
import { useContext, useState } from 'react';
import AppContext from '../../context/AuthContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import ListUsers from '../../components/ListUsers/ListUsers';

export default function AdminPanel() {
    const { users } = useContext(AppContext)
    const [searchResults, setSearchResults] = useState(null);
    const [selectedOption, setSelectedOption] = useState('option1');
    const navigate = useNavigate();
    const handleSearchResults = (results) => {
        setSearchResults(results);
    }

    return (
        <>
            <div className='admin-search-panel'>
                <div>
                    <label color='black'>
                        <input

                            type="radio"
                            name="searchOption"
                            value="username"
                            checked={selectedOption === 'username'}
                            onChange={() => setSelectedOption("username")}
                        /> Username
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="searchOption"
                            value="email"
                            checked={selectedOption === 'email'}
                            onChange={() => setSelectedOption("email")}
                        /> Email
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="searchOption"
                            value="first-name"
                            checked={selectedOption === 'first-name'}
                            onChange={() => setSelectedOption("first-name")}
                        /> First name
                    </label>
                </div>
                <SearchBar searchingFor={users}
                    onSearchResults={handleSearchResults}
                    selectedOption={selectedOption} />
            </div>
            <div>
                {searchResults && <ListUsers users={searchResults} selectedOption={selectedOption} />}
            </div>
        </>
    )
}