import React, {useEffect, useState} from 'react'
import axios from 'axios';

if (!window.db) {
    window.db = {
        Event: [],

        User: [{
            user_id: 1,
            username: "superAdmin", 
            user_pw: "superPass", 
            name: "Super Admin User", 
            university_id: "",
            email: "", 
            user_type: 1
        },{
            user_id: 2,
            username: "saida", 
            user_pw: "saidaPass", 
            name: "saida", 
            university_id: 3,
            email: "saida@usf.edu", 
            user_type: 0
        },{
            user_id: 3,
            username: "camila", 
            user_pw: "camilaPass", 
            name: "Camila", 
            university_id: 1,
            email: "camila@knights.ucf.edu", 
            user_type: 0
        },{
            user_id: 4,
            username: "ana", 
            user_pw: "anaPass", 
            name: "Ana", 
            university_id: 2,
            email: "ana@fiu.edu", 
            user_type: 0}],

        Location: [{
            location_id: 1,
            location_name: "UCF",
            longitud: -81.200608,
            latitude: 28.601391,
        },{
            location_id: 2,
            location_name: "FIU",
            longitud: -80.3733,
            latitude: 25.7574,
        },{
            location_id: 3,
            location_name: "USF",
            longitud: 82.4139,
            latitude: 28.0587,
        }],

        Review:[],

        RSO: [{
            rso_id: 1,
            university_id: 1,
            rso_name: "Delta Sigma Phi",
            admin_id: 3,
            description:"description Delta",
        },{
            rso_id: 2,
            university_id: 2,
            rso_name: "ZBT",
            admin_id: 4,
            description:"description ZBT",
        },{
            rso_id: 3,
            university_id: 3,
            rso_name: "SHPE",
            admin_id: 1,
            description:"description SHPE",
        }],

        RSO_Member: [{
            rso_member_id: 1,
            user_id: 3,
            rso_id: 1
        },{
            rso_member_id: 2,
            user_id: 4,
            rso_id: 2
        },{
            rso_member_id: 3,
            user_id: 1,
            rso_id: 3
        }],

        University: [{
            university_id: 1,
            uni_name: "UCF",
            location_id: 1,
            description: "University of Central Florida"
        }, {
            university_id: 2,
            uni_name: "FIU",
            location_id:2,
            description: "Florida International university",
        }, {
            university_id: 3,
            uni_name: "USF",
            location_id: 3,
            description: "University of South Florida"
        }],
        
        loaded: false,
        Categories: ["Public", "University", "RSO"],
        currentUser: {},
        Event_types: []
    }
}

function API() {
    const api_url = "http://ec2-54-234-164-147.compute-1.amazonaws.com:3000/";

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

    async function authenticate(user){
        return axios.post(api_url + "authenticate", user);
        // window.db.currentUser = window.db.User.find(x => matches(x.username, credentials.username) && x.user_pw === credentials.user_pw);
        // return window.db.currentUser;
    }

    async function register(user){   
        return axios.post(api_url + "create-account", user);
        
        // var newUser = { ...user, user_id: window.db.User.length + 1, user_type: 0};
        // window.db.User.push(newUser);
        // window.db.currentUser = newUser;
        // return newUser;
    }

    async function joinRso(rso_member){
        return axios.post(api_url + "add_user_to_rso", rso_member);
        //window.db.RSO_Member.push({...rso_member, rso_member_id: window.db.RSO_Member.length + 1})
    }

    async function getUsersFromUni(university_id){
        return window.db.User.filter(x => x.university_id == university_id);
    }
    
    async function createEvent(event) {
        //always creating a new location, but we should search if the location exist and use that one.
        var location = {
            location_id: window.db.Location.length + 1,
            location_name: event.locationName,
            longitud: event.longitud,
            latitude: event.latitude
        }
        window.db.Location.push(location);

        var fullEvent = {
            ...event, 
            event_id: window.db.Event.length + 1,
            location_id: location.location_id
        };
        window.db.Event.push(fullEvent);
        return fullEvent;
    }
    
    async function createOrg(org, members, univ_id) {
        var admin = members.find(x => x.isAdmin);
        
        var fullOrg = {
            ...org, 
            rso_id: window.db.RSO.length + 1,
            admin_id: admin.user_id,
            university_id: univ_id
        };
        members.forEach(x => window.db.RSO_Member.push({
            rso_member_id: window.db.RSO_Member.length + 1,
            user_id: x.user_id,
            rso_id: fullOrg.rso_id
        }));

        window.db.RSO.push(fullOrg);
        return fullOrg;
    }

        async function createUni(newUni) {
        
        return [];
    }

    async function getEvents(filter){
        var result = window.db.Event.filter(evt => {
            var rso = window.db.RSO[evt.rso_id - 1];
            var univ = window.db.University[rso.university_id - 1];

            if (evt.category != window.db.Categories[0]) { //if it is not public check user rights
                if (!filter.user) //if there is no authenticated user
                    return false

                if (!filter.user.user_type && filter.user.university_id != rso.university_id)
                    return false; //if is not the same univ.

                if (evt.category == window.db.Categories[2]) { //RSO members only
                    var isMember = window.db.RSO_Member.filter(x => {
                        return x.user_id == filter.user.user_id && x.rso_id == evt.rso_id;
                    });
                    if (!isMember)
                        return false;
                }
            }

            if (filter.univ && !isContained(univ.uni_name, filter.univ))
                return false;
            if (filter.org && !isContained(rso.rso_name, filter.org))
                return false;
            if (filter.startDate && !(dateDiff(evt.date, filter.startDate) >= 0))
                return false;
            if (filter.endDate && !(dateDiff(evt.date, filter.endDate) <= 0))
                return false;
            if (filter.categ && !isContained(evt.event_type, filter.categ))
                return false;
            return true;
        });
        return result.map(x => {            
                var location = window.db.Location[x.location_id - 1];
                return {...x, loc:location};
        });
    }
    
    async function getCategories(){
        await loadData();
        return window.db.Event_types;
    }
    
    async function getUniversities(){
        await loadData();
        return window.db.University;
    }

    async function getUniversity(university_id){
        return window.db.University[university_id - 1];
    }
    async function getUser(user_id){
        return window.db.User[user_id - 1];
    }
    // async function getOrganization(rso_id){
    //     return window.db.RSO[rso_id - 1];
    // }

    async function getOrgs(filter){
        var user = await getUser(filter.user_id);
        var myOrgs = {};
        window.db.RSO_Member.forEach(x => {
            if (x.user_id == filter.user_id)
                myOrgs[x.rso_id] = true;
        });
        var result = window.db.RSO.filter(rso => {
            if (rso.university_id != user.university_id)
                return false;
            if (filter.org && !isContained(rso.rso_name, filter.org))
                return false;
            if (filter.myOrg && !myOrgs[rso.rso_id])
                return false;
            return true;
        });
        return result.map(x => {
            return {...x, isAdmin: x.admin_id == filter.user_id, isMember: myOrgs[x.rso_id] };
        });
    }

    async function loadData(){
        if (!window.db.loaded)
        {
            try {
                const response = await axios.get('https://events.ucf.edu/feed.json');
                var evt_type = { };
                window.db.Event = response.data.map((x, i) => {
                    var org = window.db.RSO[i % 3];
                    var univ = window.db.University[org.university_id - 1];
                    var ev = {
                        event_id: x.id,
                        event_name: x.title,
                        description: x.description,
                        event_type: x.category,
                        date: x.starts,
                        location_id: univ.location_id,
                        contact_email: x.contact_email,
                        contact_phone: x.contact_phone,
                        category: window.db.Categories[(i %  5) % 3],
                        comments: [],
                        rso_id: org.rso_id,
                    } 
                    evt_type[ev.event_type] = true;
                    return ev;
                });
                window.db.Event_types = Object.keys(evt_type).sort();
                window.db.loaded = true;
            } catch(error) {
                console.log('error', error);
            }
        }
        return window.db.loaded;
    }

    return {
        loadData,
        authenticate,
        register,
        createEvent,
        createOrg,
        createUni,
        joinRso,

        getEvents,
        getCategories,
        getOrgs,
        getUniversities,
        getUsersFromUni,
        
        //getUser,
        getUniversity,
        //getOrganization
    }
}

export default API();