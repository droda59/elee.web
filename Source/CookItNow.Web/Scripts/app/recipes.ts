export class QuickRecipe {  
    get() {
        return {}; 
    }
}

export class Pouding extends QuickRecipe {  
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
                    "time": "PT00H30M"
                },
                {
                    "title": "Cuisson",
                    "time": "PT01H00M"
                }
            ], 
            "subrecipes": [
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
                    },
        			"replacements": [
                        {
        					"name": "Lait de beurre",
        					"quantity": {
                                "value": 1,
                                "originalMeasureUnit": "cups"
        				      }
                        },
                        {
        					"name": "Yogourt nature",
        					"quantity": {
                                "value": 2,
                                "originalMeasureUnit": "cups"
        				      }
                        }
                    ]
                },
                {
                    "id": 10,
                    "subrecipeId": 2,
                    "name": "Cacao",
                    "quantity": {
                        "value": 125,
                        "originalMeasureUnit": "ml"
                    },
                    "requirements": [
                        "Tamisé"
                    ]
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
                    "description": "Dans une casserole, {action:'mélanger'} {ingredient:1} et {ingredient:3}. {action:'Ajouter'} {ingredient:5}. {action:'Ajouter'} {ingredient:2} et {ingredient:4}. {action:'Porter à ébullition'} en remuant à l'aide d'un fouet. {action:'Incorporer'} {ingredient:6}. {action:'Réserver'}."
                },
                {
                    "subrecipeId": 2, 
                    "description": "Dans une petite casserole, {action:'porter à ébullition'} {ingredient:9} et {ingredient:10} en remuant à l’aide d’un fouet. {action:'Laisser tiédir'}. {action:'Gosser'} {timer:'PT00H02M'}." 
                },
                {
                    "subrecipeId": 2,
                    "description": "Dans un bol, {action:'mélanger'} {ingredient:7}, {ingredient:12} et {ingredient:13}. {action:'Réserver'}." 
                },
                {
                    "subrecipeId": 2,
                    "description": "Dans un autre bol, {action:'mélanger'} {ingredient:11} et {ingredient:8} au batteur électrique jusqu’à ce que le mélange prenne une texture granuleuse. {action:'Ajouter'} les oeufs, un à la fois, et {action:'battre'} jusqu’à ce que la préparation soit homogène. À basse vitesse, {action:'incorporer'} les ingrédients secs en alternant avec le mélange de cacao. {action:'Répartir'} la pâte dans le plat." 
                },
                {
                    "subrecipeId": 2,
                    "description": "{action:'Verser'} la sauce chaude délicatement sur la pâte. {action:'Cuire'} au four environ {timer:'PT00H45M'} ou jusqu’à ce qu’un cure-dent inséré au centre du gâteau en ressorte propre.", 
                    "postStep": {
                        "description": "{action:'Servir'} chaud ou tempéré."
                    } 
                }
            ]
        };
    }
}

export class Gaufres extends QuickRecipe {  
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
                    "time": "PT00H10M"
                },
                {
                    "title": "Cuisson",
                    "time": "PT00H20M"
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
                    "description": "Dans un bol, {action:'mélanger'} {ingredient:2}, {ingredient:3}, {ingredient:6}, {ingredient:7} et {ingredient:8}. {action:'Réserver'}."
                },
                {
                    "description": "Dans un autre bol, {action:'fouetter'} {ingredient:9} et {ingredient:5} environ {timer:'PT0H05M'} jusqu'à ce qu'ils blanchissent, forment un ruban et triplent de volume.",
                    "postStep": 
                    {
                        "description": "{action:'Ajouter'} {ingredient:4} graduellement en fouettant. À l'aide dune spatule, {action:'incorporer'} les ingrédients secs en alternant avec {ingredient:1} jusqu'à ce que le mélange soit humecté (il restera quelques grumeaux de farine). {action:'Laisser reposer'} {timer:'PT00H10M'}."
                    }
                },
                {
                    "description": "{action:'Préchauffer'} le gaufrier. {action:'Verser'} environ 250 ml (1 tasse) de pâte à la fois (pour deux gaufres) et {action:'refermer'} l'appareil (ou selon les recommandations du fabricant). {action:'Cuire'} environ {timer:'PT00H05M'} ou jusqu'à ce qu'elles soient dorées.",
                    "postStep":
                    {
                        "description": "{action:'Réserver'} au chaud. {action:'Répéter'} l'opération avec le reste de la pâte. {action:'Servir'} avec le coulis de fraises en trempette."
                    } 
                }
            ]
        };
    }
}
