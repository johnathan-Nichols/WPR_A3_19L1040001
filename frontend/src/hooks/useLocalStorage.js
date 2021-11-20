import {useEffect, useState} from 'react'

const PREFIX = 'JMN-A3-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey);
        if(jsonValue==="undefined"){
            return undefined
        }
        if(jsonValue != null) {
            return JSON.parse(jsonValue)
        }
        if(typeof initialValue === 'function'){
            return initialValue();
        }else{
            return initialValue;
        }
    });

    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    },[prefixedKey, value]);

    return [value, setValue];
}
