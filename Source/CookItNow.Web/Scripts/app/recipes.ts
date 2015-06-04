class QuickRecipe {  
    get() {
        return {}; 
    }
}

class Pouding extends QuickRecipe {  
    get() {
        return {
            "id": 1,
            "title": "Pouding au chocolat",
            "originalUrl": "http://www.ricardocuisine.com/recettes/5409-pouding-au-chocolat",
            "summary": "Sommaire de la recette, un bon pouding au chocolat mi-amer avec ben des calories.",
            "originalServings": 10,
            "durations": [
                {
                    "title": "Preparation",
                    "time": "PT0H30M"
                },
                {
                    "title": "Cuisson",
                    "time": "PT1H00M"
                }
            ], 
            "Subrecipes": [
                {
                    "id": 1, 
                    "title": "Sauce"
                },
                {
                    "id": 2, 
                    "title": "Gâteau"
                }
            ],
            "ingredients": [
                {
                    "id": 1,
                    "subrecipeId": 1, 
                    "name": "Cassonade",
                    "quantity": {
                        "value": 3,
                        "originalMeasureUnit": "cups"
                    }
                },
                {
                    "id": 2,
                    "subrecipeId": 1, 
                    "name": "Eau",
                    "quantity": {
                        "value": 625,
                        "originalMeasureUnit": "ml"
                    }
                }, 
                {
                    "id": 3,
                    "subrecipeId": 1, 
                    "name": "Cacao",
                    "quantity": {
                        "value": 180,
                        "originalMeasureUnit": "ml"
                    },
                    "requirements": [
                        "Tamisé"
                    ]
                },
                {
                    "id": 4,
                    "subrecipeId": 1, 
                    "name": "Crème 35%",
                    "quantity": {
                        "value": 125,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 5,
                    "subrecipeId": 1, 
                    "name": "Fécule de maïs",
                    "quantity": {
                        "value": 10,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 6,
                    "subrecipeId": 1, 
                    "name": "Extrait de vanille",
                    "quantity": {
                        "value": 2.5,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 7,
                    "subrecipeId": 2,  
                    "name": "Farine tout usage non blanchie",
                    "quantity": {
                        "value": 375,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 8,
                    "subrecipeId": 2,
                    "name": "Sucre",
                    "quantity": {
                        "value": 375,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 9,
                    "subrecipeId": 2,
                    "name": "Lait",
                    "quantity": {
                        "value": 1,
                        "originalMeasureUnit": "cups"
                    }
                },
                {
                    "id": 10,
                    "subrecipeId": 2,
                    "name": "Cacao",
                    "quantity": {
                        "value": 125,
                        "originalMeasureUnit": "ml"
                    },
                    "requirement": "Tamisé"
                },
                {
                    "id": 11,
                    "subrecipeId": 2,
                    "name": "Beurre non salé",
                    "quantity": {
                        "value": 125,
                        "originalMeasureUnit": "ml"
                    },
                    "requirement": "Ramolli"
                },
                {
                    "id": 12,
                    "subrecipeId": 2,
                    "name": "Bicarbonate de soude",
                    "quantity": {
                        "value": 5,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 13,
                    "subrecipeId": 2,
                    "name": "Sel",
                    "quantity": {
                        "value": 1,
                        "originalMeasureUnit": "pinch"
                    }
                },
                {
                    "id": 14,
                    "subrecipeId": 2,
                    "name": "Oeufs",
                    "quantity": {
                        "value": 2,
                        "originalMeasureUnit": "units"
                    }
                }
            ],
            "steps": [
                {
                    "subrecipeId": 1, 
                    "description": "Dans une casserole, {action:'Mélanger'} {ingredientId:1} et {ingredientId:3}. {action:'Ajouter'} {ingredientId:5}. {action:'Ajouter'} {ingredientId:2} et {ingredientId:4}. {action:'Porter à ébullition'} en remuant à l'aide d'un fouet. {action:'Incorporer'} {ingredientId:6}. {action:'Réserver'}"
                },
                {
                    "subrecipeId": 2, 
                    "description": "Dans une petite casserole, {action:'Porter à ébullition'} {ingredientId:9} et {ingredientId:10} en remuant à l’aide d’un fouet. {action:'Laisser tiédir'}. {action:'Gosser'} {timer:'PT0H02M'}." 
                },
                {
                    "subrecipeId": 2,
                    "description": "Dans un bol, {action:'Mélanger'} {ingredientId:7}, {ingredientId:12} et {ingredientId:13}. {action:'Réserver'}." 
                },
                {
                    "subrecipeId": 2,
                    "description": "Dans un autre bol, {action:'Mélanger'} {ingredientId:11} et {ingredientId:8} au batteur électrique jusqu’à ce que le mélange prenne une texture granuleuse. {action:'Ajouter'} les oeufs, un à la fois, et {action:'Battre'} jusqu’à ce que la préparation soit homogène. À basse vitesse, {action:'Incorporer'} les ingrédients secs en alternant avec le mélange de cacao. {action:'Répartir'} la pâte dans le plat." 
                },
                {
                    "subrecipeId": 2,
                    "description": "{action:'Verser'} la sauce chaude délicatement sur la pâte. {action:'Cuire'} au four environ {timer:'PT0H45M'} ou jusqu’à ce qu’un cure-dent inséré au centre du gâteau en ressorte propre.", 
                    "postStep": {
                        "description": "{action:'Servir'} chaud ou tempéré."
                    } 
                }
            ]
        };
    }
}

class Gaufres extends QuickRecipe {  
    get() {
        return {
            "id": 2,
            "title": "Gaufres",
            "originalUrl": "http://www.ricardocuisine.com/recettes/3892-gaufres",
            "summary": "",
            "originalServings": 8,
            "durations": [
                {
                    "title": "Préparation",
                    "time": "PT0H10M"
                },
                {
                    "title": "Cuisson",
                    "time": "PT0H20M"
                }
            ],
            "ingredients": [
                {
                    "id": 1,
                    "name": "Lait de beurre",
                    "quantity": {
                        "value": 250,
                        "originalMeasureUnit": "ml"
                    },
        			"replacements": [
                        {
        					"name": "Lait",
        					"quantity": {
                                "value": 250,
                                "originalMeasureUnit": "ml"
        				      }
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Farine tout usage non blanchie",
                    "quantity": {
                        "value": 250,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 3,
                    "name": "Fécule de maïs",
                    "quantity": {
                        "value": 60,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 4,
                    "name": "Huile de canola",
                    "quantity": {
                        "value": 60,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 5,
                    "name": "Cassonade",
                    "quantity": {
                        "value": 45,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 6,
                    "name": "Poudre à pâte",
                    "quantity": {
                        "value": 2.5,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 7,
                    "name": "Bicarbonate de soude",
                    "quantity": {
                        "value": 1,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 8,
                    "name": "Sel",
                    "quantity": {
                        "value": 1,
                        "originalMeasureUnit": "ml"
                    }
                },
                {
                    "id": 9,
                    "name": "Oeufs",
                    "quantity": {
                        "value": 2,
                        "originalMeasureUnit": "units"
                    }
                }
            ],
            "steps": [
                {
                    "description": "Dans un bol, {action:'Mélanger'} {ingredientId:2}, {ingredientId:3}, {ingredientId:6}, {ingredientId:7} et {ingredientId:8}. {action:'Réserver'}."
                },
                {
                    "description": "Dans un autre bol, {action:'Fouetter'} {ingredientId:9} et {ingredientId:5} environ {timer:'PT0H05M'} jusqu'à ce qu'ils blanchissent, forment un ruban et triplent de volume.",
                    "postStep": 
                    {
                        "description": "{action:'Ajouter'} {ingredientId:4} graduellement en fouettant. À l'aide dune spatule, {action:'Incorporer'} les ingrédients secs en alternant avec {ingredientId:1} jusqu'à ce que le mélange soit humecté (il restera quelques grumeaux de farine). {action:'Laisser reposer'} {timer:'PT0H10M'}."
                    }
                },
                {
                    "description": "{action:'Préchauffer'} le gaufrier. {action:'Verser'} environ 250 ml (1 tasse) de pâte à la fois (pour deux gaufres) et {action:'Refermer'} l'appareil (ou selon les recommandations du fabricant). {action:'Cuire'} environ {timer:'PT0H05M'} ou jusqu'à ce qu'elles soient dorées.",
                    "postStep":
                    {
                        "description": "{action:'Réserver'} au chaud. {action:'Répéter'} l'opération avec le reste de la pâte. {action:'Servir'} avec le coulis de fraises en trempette."
                    } 
                }
            ]
        };
    }
}
