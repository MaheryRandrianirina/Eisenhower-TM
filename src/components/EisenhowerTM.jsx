import { useState } from "react";
import Navbar from "./navbar";
import Tasks from "./tasks";

export default function EisenhowerTM() {
    const [searchValue, setSearchValue] = useState('')
    const handleSearchChange = (e)=>{
        setSearchValue(e.target.value)
    }

    const searchForResult = (e)=>{
        let tableBody = document.querySelector('tbody')
        if(tableBody){
            let rows = Array.from(tableBody.querySelectorAll('tr'))
            rows.forEach(row => {
                let elementsHavingValue = 0
                Array.from(row.children).forEach(child => {
                    if(child.innerHTML.includes(searchValue)){
                        elementsHavingValue++
                    }
                })
                
                if(elementsHavingValue === 0){
                    row.setAttribute('hidden', 'true')
                }
            })
        }
    }

    if(searchValue === ''){
        document.querySelectorAll('tr[hidden]').forEach(hiddenElement =>{
            hiddenElement.removeAttribute('hidden')
        })
    }

    return  <>
        <Navbar onChange={handleSearchChange} value={searchValue} onSearchButtonClick={searchForResult}/>
        <Tasks/>
    </>
}