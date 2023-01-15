# dwbc-payback

Full API documentation: https://raskovan.github.io/dwbc-payback/

~https://dwbc-payback-api.herokuapp.com~

New url: https://peiback-api.onrender.com/

HEALTH CHECK
`/_health`

Header `{x-api-key: XXX}`

*City has many Categories -> Category has many Items*

## CITIES

CREATE
`api/v1/cities/`

READ/UPDATE/DELETE
`api/v1/cities/:city_id`

## CATEGORIES

CREATE CATEGORY FOR CITY
`api/v1/cities/:city_id/categories/`

UPDATE/DELETE CATEGORY FOR CITY
`api/v1/cities/:city_id/categories/:cat_id`

## ITEMS

CREATE ITEM
`api/v1/cities/:city_id/categories/:cat_id/items/`

UPDATE/DELETE ITEM
`api/v1/cities/:city_id/categories/:cat_id/items/:item_id`

---

*Sample output:* `api/v1/city/:city_id`
```
[
    {
        "_id": "5c944dbdfb35f94d9ca2f2d7",
        "city_name": "Boston",
        "categories": [
            {
                "category_price": null,
                "items": [
                    {
                        "_id": "5c95a7a7d808747211eae5f6",
                        "item_name": "Beer",
                        "item_price": 4
                    },
                    {
                        "_id": "5c95a7b7d808747211eae5f7",
                        "item_name": "Wine",
                        "item_price": 5
                    }
                ],
                "_id": "5c958577723d7b6846c5213e",
                "category_name": "Bar",
                "type_of": "bar",
                "order": 1
            },
            {
                "category_price": null,
                "items": [],
                "_id": "5c958722723d7b6846c5213f",
                "category_name": "Dharma",
                "type_of": "dharma",
                "order": 2
            }
        ],

        "__v": 0
    }
]
```

## HELPER ROUTE

GET CITIES
`api/v1/cities/list`

```
[
    {
        "_id": "5c980bd42ec14f2b29f8a1b8",
        "city_name": "New York",
        "city_id": "5c980bd42ec14f2b29f8a1b7",
        "__v": 0
    },
    {
        "_id": "5c980bdc2ec14f2b29f8a1ba",
        "city_name": "Boston",
        "city_id": "5c980bdc2ec14f2b29f8a1b9",
        "__v": 0
    },
    {
        "_id": "5c997e8e2335454521a54dd4",
        "city_name": "NRC",
        "city_id": "5c997e8e2335454521a54dd3",
        "__v": 0
    }
]
```
