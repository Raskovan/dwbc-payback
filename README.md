# dwbc-payback

https://dwbc-payback-api.herokuapp.com

Header `{x-api-key: XXX}`

*City has many Categories -> Category has many Items*

## CITIES

READ W/ ALL CATEGORIES
`api/v1/cities/`

CREATE/READ/UPDATE/DELETE
`api/v1/cities/:city_id`

## CATEGORIES

CREATE CATEGORY FOR CITY
`api/v1/cities/:city_id/categories/`

UPDATE/DELETE CATEGORY FOR CITY
`api/v1/cities/:city_id/categories/:cat_id`

## ITEMS

CREATE ITEM
`api/v1/cities/:city_id/categories/:cat_id/items/`

DELETE ITEM
`api/v1/cities/:city_id/categories/:cat_id/items/:item_id`

---

*Sample output:* `api/v1/city/:name`
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
