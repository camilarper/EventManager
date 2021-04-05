import React, {useEffect, useState} from 'react'
import { get } from 'axios';

if (!window.db) {
    window.db = {
        loaded: false,
        events: [],
        users: [{name: "Super Admin User", uni_name: "", email:"", username: "superAdmin", user_pw: "superPass", orgs:[], isSuperAdmin: true}],
        categories: [],
        organizations: [],
        universities: ["UCF", "FIU", "USF"],
        scopes: ["Public", "University", "RSO"],
        currentUser: {}
    }
}

function API() {
    function matches(str1, str2){
        return str1 && str2 && str1.toLowerCase()==str2.toLowerCase();
    }

    function isContained(str, subStr){
        return str && str.toLowerCase().includes(subStr.toLowerCase());
    }

    function dateDiff(date1, date2){        
        if (!date1 || !date2) return 0;
        return new Date(date1) - new Date(date2);
    }

    async function authenticate(credentials){
        window.db.currentUser = window.db.users.find(x => matches(x.username, credentials.username) && x.user_pw === credentials.user_pw);
        return window.db.currentUser;
    }

    async function register(user){
        window.db.users.push(user);
        window.db.currentUser = user;
        return user;
    }

    function getEvents(filter){
        var result = window.db.events.filter(x => {

            if (x.scope != window.db.scopes[0]) { //if it is not public check user rights
                if (!filter.user) //if there is no authenticated user
                    return false
                if (!filter.user.isSuperAdmin && filter.user.univ != x.university)
                 return false; //if is not the same univ.
                //if (x.scope == window.db.scopes[2]) //RSO scope
            }
            if (filter.univ && !isContained(x.university, filter.univ))
                return false;
            if (filter.org && !isContained(x.org, filter.org))
                return false;
            if (filter.startDate && !dateDiff(x.date, filter.startDate) >= 0)
                return false;
            if (filter.endDate && !dateDiff(x.date, filter.endDate) <= 0)
                return false;
            if (filter.categ && !isContained(x.category, filter.categ))
                return false;
            return true;
        });
        return result;
    }
    
    async function getCategories(){
        await loadData();
        return window.db.categories;
    }

    async function loadData(){
        if (!window.db.loaded)
        {
            try {
                const response = await get('https://events.ucf.edu/feed.json');
                var temp = { cat:{}, org:{} };
                window.db.events = response.data.map((x, i) => {
                    var ev = {
                        id: x.id,
                        title: x.title,
                        description: x.description,
                        university: window.db.universities[i % 3],
                        category: x.category,
                        date: x.starts,
                        location: x.location,
                        contact_name: x.contact_name,
                        contact_email: x.contact_email,
                        contact_phone: x.contact_phone,
                        scope: window.db.scopes[(i %  5) % 3],
                        comments: [],
                    }
                    if (x.tags){
                        ev.org = x.tags[0];
                        temp.cat[ev.org] = true;
                    }
                    temp.cat[ev.category] = true;
                    return ev;
                });
                window.db.categories = Object.keys(temp.cat).sort();
                window.db.organizations = Object.keys(temp.org).sort();
                window.db.loaded = true;
            } catch(error) {
                console.log('error', error);
            }
        }
        return window.db.loaded;
    }

    return {
        loadData,
        getEvents,
        getCategories,
        authenticate,
        register
    }
}

export default API();