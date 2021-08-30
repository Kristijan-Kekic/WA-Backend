//obsolete sve
let data = {
    korisnici:[
        {
            username: "denis",
            lozinka: "1234",
            ime: "Denis",
            prezime: "Kodrin",
        },
        {
            username: "kristijan",
            lozinka: "5678",
            ime: "Kristijan",
            prezime: "Kekić",
        }
    ],

    profesori:[
        {
            prof_id: 1,
            ime: "Ivo",
            prezime: "Ivić"
        },
        {
            prof_id: 2,
            ime: "Marko",
            prezime: "Markić"
        }
    ],

    ocjene:[
        {
            ocjena_id: 1,
            ocjena: 4,
            prof_id: 1,
            autor: "denis"
        },
        {
            ocjena_id: 2,
            ocjena: 2,
            prof_id: 1,
            autor: "kristijan"
        }
    ],

    komentari:[
        {
            ocjena_id: 1,
            komentar: "Jako dobar profesor",
            autor: "denis"
        },
        {
            ocjena_id: 2,
            komentar: "Može bit bolje",
            autor: "kristijan"
        }
    ]
}

export default data