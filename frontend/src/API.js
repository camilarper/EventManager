import React, {useEffect, useState} from 'react'
import axios from 'axios';

if (!window.db) {
    window.db = {
        Event: [],

        User: [{
            user_id: 1,
            username: "superAdmin", 
            user_pw: "superPass", 
            full_name: "Super Admin User", 
            university_id: "",
            email: "", 
            user_type: 1,
            student_id: "021567"
        },{
            user_id: 2,
            username: "saida", 
            user_pw: "saidaPass", 
            full_name: "saida", 
            university_id: 3,
            email: "saida@usf.edu", 
            user_type: 0,
            student_id: "021437"
        },{
            user_id: 3,
            username: "camila", 
            user_pw: "camilaPass", 
            full_name: "Camila", 
            university_id: 1,
            email: "camila@knights.ucf.edu", 
            user_type: 0,
            student_id: "021553"
        },{
            user_id: 4,
            username: "ana", 
            user_pw: "anaPass", 
            full_name: "Ana", 
            university_id: 2,
            email: "ana@fiu.edu", 
            user_type: 0,
            student_id: "012567"
        },{
            user_id: 5,
            username: "daniel", 
            user_pw: "danielPass", 
            full_name: "Daniel", 
            university_id: 1,
            email: "daniel@knights.ucf.edu", 
            user_type: 0,
            student_id: "021453"
        },{
            user_id: 6,
            username: "jose", 
            user_pw: "josePass", 
            full_name: "Jose", 
            university_id: 1,
            email: "jose@knights.ucf.edu", 
            user_type: 0,
            student_id: "021253"
        },{
            user_id: 7,
            username: "luis", 
            user_pw: "luisPass", 
            full_name: "Luis", 
            university_id: 1,
            email: "luis@knights.ucf.edu", 
            user_type: 0,
            student_id: "021543"
        },{
            user_id: 8,
            username: "angel", 
            user_pw: "angelPass", 
            full_name: "Angel", 
            university_id: 1,
            email: "angel@knights.ucf.edu", 
            user_type: 0,
            student_id: "021593"
        },{
            user_id: 9,
            username: "matt", 
            user_pw: "mattPass", 
            full_name: "Matt", 
            university_id: 1,
            email: "matthew@knights.ucf.edu", 
            user_type: 0,
            student_id: "021551"
        },{
            user_id: 3,
            username: "laura", 
            user_pw: "LauraPass", 
            full_name: "Laura", 
            university_id: 1,
            email: "laura@knights.ucf.edu", 
            user_type: 0,
            student_id: "021503"
        }],

        Location: [{
            location_id: 1,
            location_name: "University of Central Florida",
            longitud: -81.200608,
            latitude: 28.601391,
        },{
            location_id: 2,
            location_name: "Florida International University",
            longitud: -80.3733,
            latitude: 25.7574,
        },{
            location_id: 3,
            location_name: "University of South Florida",
            longitud: 82.4139,
            latitude: 28.0587,
        }],

        Review:[],

        RSO: [{
            rso_id: 1,
            university_id: 2,
            rso_name: "Delta Sigma Phi",
            admin_id: 3,
            description:"Delta Sigma Phi, commonly known as Delta Sig or D Sig, is a fraternity established in 1899 at The City College of New York. It was the first fraternity to be founded on the basis of religious and ethnic acceptance. ",
        },{
            rso_id: 2,
            university_id: 1,
            rso_name: "Zeta Beta Tau",
            admin_id: 4,
            description:"Zeta Beta Tau is a Greek-letter social fraternity based in North America. It was founded on December 29, 1898, at City College of New York and is recognized as the first Jewish collegiate social fraternity.",
        },{
            rso_id: 3,
            university_id: 1,
            rso_name: "Society of Hispanics Professional Engineers",
            admin_id: 1,
            description:"The Society of Hispanic Professional Engineers was founded in Los Angeles, California in 1974 by a group of engineers employed by the city of Los Angeles. Their objective was to form a national organization of professional engineers to serve as role models in the Hispanic community.",
        },{
            rso_id: 4,
            university_id: 1,
            rso_name: "Knights Capital Fund",
            admin_id: 3,
            description:"The mission of Knights Capital Fund is to provide its members with a detailed and engaging education of investment management.",
        },{
            rso_id: 5,
            university_id: 2,
            rso_name: "Artificial Intelligence",
            admin_id: 4,
            description:"Serves as a place of community for discussing, learning about, and working on topics related to machine learning and artificial intelligence across disciplines. Meeting activities include discussions of current events in AI, professor talks, tutorials, and workshops.",
        },{
            rso_id: 6,
            university_id: 2,
            rso_name: "Italian Club",
            admin_id: 1,
            description:"The mission of the Italian Club at UCF is to promote a fun and comfortable learning environment for all students studying, or interested in, the Italian language and culture.",
        },{
            rso_id: 7,
            university_id: 1,
            rso_name: "Knights Hack",
            admin_id: 3,
            description:"The goal of Knight Hacks is to develop computer science skills among students and to build an appreciation for real-world uses of the field.",
        },{
            rso_id: 8,
            university_id: 2,
            rso_name: "Robotics",
            admin_id: 4,
            description:"At robotics competitions, teams of students must design and build a robot that can compete against opponents in a series of specific challenges.",
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
            uni_name: "University of Central Florida",
            location_id: 1,
            description: "The University of Central Florida is a public research university in unincorporated Orange County, Florida. It is part of the State University System of Florida. With almost 72,000 students, it currently has the largest student body in the United States.",
        }, {
            university_id: 2,
            uni_name: "Florida International university",
            location_id:2,
            description: "Florida International University is a public research university with its main campus in University Park, Florida. It is part of the State University System of Florida and has been designated as having Emerging Preeminence.",
        }, {
            university_id: 3,
            uni_name: "University of Florida",
            location_id: 3,
            description: "University of Florida is an educational and research institution. The institute provides associate, bachelors, masters, doctoral, and professional degrees in the languages, arts, sciences, engineering, media, distance education, and part time programs. University of Florida was founded in 1853 and is based in Gainesville, Florida."
        },{
            university_id: 4,
            uni_name: "Florida State University",
            location_id: 4,
            description: "Home to the Florida State Seminoles, Florida State University offers more than 300 undergraduate, graduate, and professional programs, including M.D. (medicine) and J.D. (law) programs. The educational institution has 16 colleges dedicated to academic fields ranging from liberal arts, music, visual arts, and education, to criminology, engineering, social work, and information.",
        }, {
            university_id: 5,
            uni_name: "University of Miami",
            location_id:5,
            description: "The University of Miami is an educational and research institution that includes the Rosenstiel School of Marine and Atmospheric Science, the Medical Campus, the John J. Koubek Center, and the James L. Knight Center. The university offers certificates, bachelors, masters, doctoral, first professional, post-masters, and post-bachelors degrees.",
        }],

        Review: [{
            review_id: 1,
            user_id: 4,
            event_id: 1,
            comment: "Great event!",
        },{
            review_id: 2,
            user_id: 2,
            event_id: 1,
            comment: "Don't forget your mask!",
        },{
            review_id: 3,
            user_id: 3,
            event_id: 1,
            comment: "I will be there",
        }

        ],
        
        loaded: false,
        Categories: ["Public", "Private", "RSO"],
        currentUser: {},
        Event_types: []
    }
}

function API() {
    //const api_url = "http://ec2-54-234-164-147.compute-1.amazonaws.com:3000/";

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
        //return axios.get(api_url + "authenticate", user);
         window.db.currentUser = window.db.User.find(x => matches(x.username, user.username) && x.user_pw === user.user_pw);
         return window.db.currentUser;
    }

    async function register(user){   
        //return axios.post(api_url + "create-account", {...user, user_type: 0});
        
        var newUser = { ...user, user_id: window.db.User.length + 1, user_type: 0};
        window.db.User.push(newUser);
        window.db.currentUser = newUser;
        return newUser;
    }

    async function joinRso(rso_member){
        //return axios.post(api_url + "add_user_to_rso", rso_member);
        window.db.RSO_Member.push({...rso_member, rso_member_id: window.db.RSO_Member.length + 1})
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
        var location = {
            location_id: window.db.Location.length + 1,
            location_name: newUni.locationName,
            longitud: newUni.longitud,
            latitude: newUni.latitude
        }
        window.db.Location.push(location);

        var fullUni = {
            ...newUni, 
            university_id: window.db.University.length + 1,
            location_id: location.location_id
        };
        window.db.University.push(fullUni);
        return fullUni;
    }

    
    async function addReview(review){
        var fullReview = {...review, review_id: window.db.Review.length + 1, timestamp: Date.now};
        window.db.Review.push(fullReview);
        fullReview.user = window.db.User[review.user_id - 1];
        return fullReview;
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
    
    async function getReviews(event_id){
        await loadData();
        return window.db.Review
        .filter(x => x.event_id == event_id)
        .map(x => {return {...x, user: window.db.User[x.user_id - 1]}});
    }
    
    async function getUniversities(){
        await loadData();
        return window.db.University;
    }

    async function getUniversity(university_id){
        await loadData();
        return window.db.University[university_id - 1];
    }
    async function getUser(user_id){
        await loadData();
        return window.db.User[user_id - 1];
    }
    async function getEvent(event_id){
        await loadData();
        var event = window.db.Event[event_id - 1]
        var location = window.db.Location[event.location_id - 1]
        return {...event, location};
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
                        event_id: i + 1,
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
        addReview,

        getEvents,
        getCategories,
        getOrgs,
        getUniversities,
        getUsersFromUni,
        getReviews,
        
        //getUser,
        getEvent,
        getUniversity,
        //getOrganization,      
    }
}

export default API();