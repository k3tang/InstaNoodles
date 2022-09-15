import { useState } from "react";
import "./index.css";
import { searchProducts, getProducts, fetchProducts } from "../../store/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";


const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [query, setQuery] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        return (
            <SearchModal/>
        )
    }

    return (
        <>
            <div className="search-component">
                <button className="fa-solid fa-magnifying-glass" id="search-icon" onClick={handleClick}/>
            </div>
        </>
    )
}

export default SearchBar;

// const AutoComplete = ({data}) => {
//     const [suggestions, setSuggestions] = useState([]);
//     const [suggestionIndex, setSuggestionIndex] = useState(0);
//     const [suggestionsActive, setSuggestionsActive] = useState(false);
//     const [value, setValue] = useState("");
//     const dispatch = useDispatch();
//     const products = useSelector(getProducts);

//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [])

//     const handleChange = (e) => {
//         const searchWord = e.target.value.toLowerCase();
//         setValue(searchWord);

//         if (searchWord.length > 1) {
//              let res = dispatch(searchProducts(value));
//              console.log(res)
//             // const matchingWords =  data.filter(
//             //     (suggestion => suggestion.toLowerCase().indexOf(searchWord) > -1))
//             // setSuggestions(matchingWords);

//             // console.log(suggestions)
//             // suggestions.map(suggestion => { 
//             //     if products.
//             // })
//             setSuggestionsActive(true);
//         } else {
//             setSuggestionsActive(false)
//         }

//     }

//     const handleClick = (e) => {
//         setSuggestions([]);
//         setValue(e.target.innerText);
//         setSuggestionsActive(false);
//     }

//     const handleKeyDown = (e) => {
//         //up arrow
//         if (e.keyCode === 38) {
//             if (suggestionIndex === 0) {
//                 return;
//             }
//             setSuggestionIndex(suggestionIndex - 1)
//         }
//         //down arrow
//         else if (e.keyCode === 40) {
//             if (suggestionIndex - 1 === suggestions.length) {
//                 return;
//             } else {
//                 setSuggestionIndex(suggestionIndex + 1)
//             }
//         }
//         //enter button 
//         else if (e.keyCode === 13) { 
//             setValue(suggestions[suggestionIndex]);
//             setSuggestionIndex(0);
//             setSuggestionsActive(false);
//         }
//     }

//     const Suggestions = () => {
//         return (
//             <ul className="suggestions">
//                 {suggestions.map((suggestion, idx) => {
//                     return (
//                         <li
//                             className={idx === suggestionIndex ? "suggestion-active" : ""}
//                             key={idx}
//                             onClick={handleClick}
//                         >
//                             {suggestion}
//                         </li>
//                     )
//                 })}
//             </ul>
//         )
//     }


//     return (
//         <>
//             <div className="search-bar">
//                 <input type="text" 
//                 id="search-input"
//                 onChange={handleChange}
//                 onClick={handleClick}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Search Products" />
//                 {suggestionsActive && <Suggestions/>}
//             </div>
//         </>
//     )
// }

// export default AutoComplete;