# dwbc-payback

https://dwbc-payback-api.herokuapp.com

Header `{x-api-key: XXX}`

## CITIES

READ W/ ALL CATEGORIES
`api/v1/city/:name`

CREATE/READ
`api/v1/city/`

UPDATE/DELETE
`api/v1/city/:name`

## CATEGORIES

READ ALL
`api/v1/cat/`

CREAT/DELETE CATEGORY FOR CITY
`api/v1/cat/:name`

UPDATE CATEGORY FOR CITY
`api/v1/cat/:name/:cat`

---

*Sample output:* `api/v1/city/:name`
```
[
    {
        "_id": "5c92e81cb1a8670017e7d207",
        "category_name": "Cafe",
        "category_price": null,
        "type_of": "cafe",
        "items": [
            {
                "_id": "5c92e81cb1a8670017e7d209",
                "item_name": "Kombucha",
                "item_price": 4
            },
            {
                "_id": "5c92e81cb1a8670017e7d208",
                "item_name": "Grape Juice",
                "item_price": 5
            }
        ],
        "city_id": "5c92e6f8b1a8670017e7d206",
        "__v": 0
    },
    {
        "_id": "5c92e882b1a8670017e7d20a",
        "category_name": "Lecture",
        "category_price": 10,
        "type_of": "lecture",
        "items": [],
        "city_id": "5c92e6f8b1a8670017e7d206",
        "__v": 0
    }
]
```
