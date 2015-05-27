class QuickRecipe {  
    get() {
        return {}; 
    }
}

class Pouding extends QuickRecipe {  
    get() {
        return {
            "Id": 1,
            "Title": "Pouding au chocolat",
            "OriginalUrl": "http://www.ricardocuisine.com/recettes/5409-pouding-au-chocolat",
            "Summary": "Sommaire de la recette, un bon pouding au chocolat mi-amer avec ben des calories.",
            "OriginalServings": 10,
            "Durations": [
                {
                    "Title": "Preparation",
                    "Time": "PT0H30M"
                },
                {
                    "Title": "Cuisson",
                    "Time": "PT1H00M"
                }
            ], 
            "Subrecipes": [
                {
                    "Id": 1, 
                    "Title": "Sauce"
                },
                {
                    "Id": 2, 
                    "Title": "Gâteau"
                }
            ],
            "Ingredients": [
                {
                    "Id": 1,
                    "SubrecipeId": 1, 
                    "Name": "Cassonade",
                    "Quantity": {
                        "Value": 3,
                        "OriginalMeasureUnit": "cups"
                    }
                },
                {
                    "Id": 2,
                    "SubrecipeId": 1, 
                    "Name": "Eau",
                    "Quantity": {
                        "Value": 625,
                        "OriginalMeasureUnit": "ml"
                    }
                }, 
                {
                    "Id": 3,
                    "SubrecipeId": 1, 
                    "Name": "Cacao",
                    "Quantity": {
                        "Value": 180,
                        "OriginalMeasureUnit": "ml"
                    },
                    "Requirements": [
                        "Tamisé"
                    ]
                },
                {
                    "Id": 4,
                    "SubrecipeId": 1, 
                    "Name": "Crème 35%",
                    "Quantity": {
                        "Value": 125,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 5,
                    "SubrecipeId": 1, 
                    "Name": "Fécule de maïs",
                    "Quantity": {
                        "Value": 10,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 6,
                    "SubrecipeId": 1, 
                    "Name": "Extrait de vanille",
                    "Quantity": {
                        "Value": 2.5,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 7,
                    "SubrecipeId": 2,  
                    "Name": "Farine tout usage non blanchie",
                    "Quantity": {
                        "Value": 375,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 8,
                    "SubrecipeId": 2,
                    "Name": "Sucre",
                    "Quantity": {
                        "Value": 375,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 9,
                    "SubrecipeId": 2,
                    "Name": "Lait",
                    "Quantity": {
                        "Value": 1,
                        "OriginalMeasureUnit": "cups"
                    }
                },
                {
                    "Id": 10,
                    "SubrecipeId": 2,
                    "Name": "Cacao",
                    "Quantity": {
                        "Value": 125,
                        "OriginalMeasureUnit": "ml"
                    },
                    "Requirement": "Tamisé"
                },
                {
                    "Id": 11,
                    "SubrecipeId": 2,
                    "Name": "Beurre non salé",
                    "Quantity": {
                        "Value": 125,
                        "OriginalMeasureUnit": "ml"
                    },
                    "Requirement": "Ramolli"
                },
                {
                    "Id": 12,
                    "SubrecipeId": 2,
                    "Name": "Bicarbonate de soude",
                    "Quantity": {
                        "Value": 5,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 13,
                    "SubrecipeId": 2,
                    "Name": "Sel",
                    "Quantity": {
                        "Value": 1,
                        "OriginalMeasureUnit": "pinch"
                    }
                },
                {
                    "Id": 14,
                    "SubrecipeId": 2,
                    "Name": "Oeufs",
                    "Quantity": {
                        "Value": 2,
                        "OriginalMeasureUnit": "units"
                    }
                }
            ],
            "Steps": [
                {
                    "SubrecipeId": 1, 
                    "Description": "Dans une casserole, {action:'Mélanger'} {ingredientId:1} et {ingredientId:3}. {action:'Ajouter'} {ingredientId:5}. {action:'Ajouter'} {ingredientId:2} et {ingredientId:4}. {action:'Porter à ébullition'} en remuant à l'aide d'un fouet. {action:'Incorporer'} {ingredientId:6}. {action:'Réserver'}"
                },
                {
                    "SubrecipeId": 2, 
                    "Description": "Dans une petite casserole, {action:'Porter à ébullition'} {ingredientId:9} et {ingredientId:10} en remuant à l’aide d’un fouet. {action:'Laisser tiédir'}. {action:'Gosser'} {timer:'PT0H02M'}." 
                },
                {
                    "SubrecipeId": 2,
                    "Description": "Dans un bol, {action:'Mélanger'} {ingredientId:7}, {ingredientId:12} et {ingredientId:13}. {action:'Réserver'}." 
                },
                {
                    "SubrecipeId": 2,
                    "Description": "Dans un autre bol, {action:'Mélanger'} {ingredientId:11} et {ingredientId:8} au batteur électrique jusqu’à ce que le mélange prenne une texture granuleuse. {action:'Ajouter'} les oeufs, un à la fois, et {action:'Battre'} jusqu’à ce que la préparation soit homogène. À basse vitesse, {action:'Incorporer'} les ingrédients secs en alternant avec le mélange de cacao. {action:'Répartir'} la pâte dans le plat." 
                },
                {
                    "SubrecipeId": 2,
                    "Description": "{action:'Verser'} la sauce chaude délicatement sur la pâte. {action:'Cuire'} au four environ {timer:'PT0H45M'} ou jusqu’à ce qu’un cure-dent inséré au centre du gâteau en ressorte propre.", 
                    "PostStep": {
                        "Description": "{action:'Servir'} chaud ou tempéré."
                    } 
                }
            ]
        };
    }
}

class Gaufres extends QuickRecipe {  
    get() {
        return {
            "Id": 2,
            "Title": "Gaufres",
            "OriginalUrl": "http://www.ricardocuisine.com/recettes/3892-gaufres",
            "Summary": "",
            "OriginalServings": 8,
            "Durations": [
                {
                    "Title": "Préparation",
                    "Time": "PT0H10M"
                },
                {
                    "Title": "Cuisson",
                    "Time": "PT0H20M"
                }
            ],
            "Ingredients": [
                {
                    "Id": 1,
                    "Name": "Lait de beurre",
                    "Quantity": {
                        "Value": 250,
                        "OriginalMeasureUnit": "ml"
                    },
        			"Replacements": [
                        {
        					"Name": "Lait",
        					"Quantity": {
                                "Value": 250,
                                "OriginalMeasureUnit": "ml"
        				      }
                        }
                    ]
                },
                {
                    "Id": 2,
                    "Name": "Farine tout usage non blanchie",
                    "Quantity": {
                        "Value": 250,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 3,
                    "Name": "Fécule de maïs",
                    "Quantity": {
                        "Value": 60,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 4,
                    "Name": "Huile de canola",
                    "Quantity": {
                        "Value": 60,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 5,
                    "Name": "Cassonade",
                    "Quantity": {
                        "Value": 45,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 6,
                    "Name": "Poudre à pâte",
                    "Quantity": {
                        "Value": 2.5,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 7,
                    "Name": "Bicarbonate de soude",
                    "Quantity": {
                        "Value": 1,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 8,
                    "Name": "Sel",
                    "Quantity": {
                        "Value": 1,
                        "OriginalMeasureUnit": "ml"
                    }
                },
                {
                    "Id": 9,
                    "Name": "Oeufs",
                    "Quantity": {
                        "Value": 2,
                        "OriginalMeasureUnit": "units"
                    }
                }
            ],
            "Steps": [
                {
                    "Description": "Dans un bol, {action:'Mélanger'} {ingredientId:2}, {ingredientId:3}, {ingredientId:6}, {ingredientId:7} et {ingredientId:8}. {action:'Réserver'}."
                },
                {
                    "Description": "Dans un autre bol, {action:'Fouetter'} {ingredientId:9} et {ingredientId:5} environ {timer:'PT0H05M'} jusqu'à ce qu'ils blanchissent, forment un ruban et triplent de volume.",
                    "PostStep": 
                    {
                        "Description": "{action:'Ajouter'} {ingredientId:4} graduellement en fouettant. À l'aide dune spatule, {action:'Incorporer'} les ingrédients secs en alternant avec {ingredientId:1} jusqu'à ce que le mélange soit humecté (il restera quelques grumeaux de farine). {action:'Laisser reposer'} {timer:'PT0H10M'}."
                    }
                },
                {
                    "Description": "{action:'Préchauffer'} le gaufrier. {action:'Verser'} environ 250 ml (1 tasse) de pâte à la fois (pour deux gaufres) et {action:'Refermer'} l'appareil (ou selon les recommandations du fabricant). {action:'Cuire'} environ {timer:'PT0H05M'} ou jusqu'à ce qu'elles soient dorées.",
                    "PostStep":
                    {
                        "Description": "{action:'Réserver'} au chaud. {action:'Répéter'} l'opération avec le reste de la pâte. {action:'Servir'} avec le coulis de fraises en trempette."
                    } 
                }
            ]
        };
    }
}
