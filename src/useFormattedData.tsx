import { useState } from 'react';
import { Users } from './interfaces';

// to store result of formatting if hook will be re render
let resultUsers: Users[] = []; 
let firstRender = false;

export const useFormattedData = (users: Users[]) => {

    const [_users, _setUsers] = useState<Users[]>(users);
   
    
    if(!firstRender) {        
        resultUsers = users;
        firstRender = true;
    }
    // result of formatting or initial value
    const formatted = _users;

    // search by string value
    const search = (str: string) => {
        
        const searchedUsers = resultUsers.filter(user => {
            const userKeys = Object.keys(user);
            for(const key of userKeys) {
                if(user[key as keyof typeof user] === str) {
                    return true
                }
            }
        });

        resultUsers = searchedUsers;
        _setUsers(searchedUsers);
    };


    // filter by function
    const filter = (func: (param: any) => boolean) => {
        
        const filteredUsers = resultUsers.filter(user => func(user));
        
        resultUsers = filteredUsers;
        _setUsers(filteredUsers);  
    };
    

    //sort by property or function
    const sortBy = (prop: string | ((param1: any, param2: any) => number)) => {
        
        const usersCopy = [...resultUsers];
        
        let sortedUsers = [];
            sortedUsers = usersCopy.sort((a: any, b: any) => {
                return typeof prop === 'string' ? (a[prop as keyof typeof a] > b[prop as keyof typeof b] ? 1: -1) : prop(a, b);
            });

        resultUsers = sortedUsers;
        _setUsers(sortedUsers);
    }


    return { formatted, sortBy, filter, search };
};


