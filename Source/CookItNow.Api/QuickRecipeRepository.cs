using System;
using System.Collections.Generic;

using CookItNow.Business.Models;

namespace CookItNow.Api
{
    public class QuickRecipeRepository : IQuickRecipeRepository
    {
        private static readonly IDictionary<long, QuickRecipe> _recipes = new Dictionary<long, QuickRecipe>();

        public QuickRecipeRepository()
        {
            //_recipes[1] = CreatePoudingRecipe();
            //_recipes[2] = CreateGaufreRecipe();
        }

        public IEnumerable<QuickRecipe> All
        {
            get
            {
                return _recipes.Values;
            }
        }

        public QuickRecipe FindQuickRecipe(long id)
        {
            return _recipes[id];
        }
        
        //private QuickRecipe CreateGaufreRecipe()
        //{
        //    return new QuickRecipe
        //    {
        //        Id = 2, 
        //        Title = "Gaufres",
        //        OriginalServings = 8,
        //        OriginalUrl = "http://www.ricardocuisine.com/recettes/3892-gaufres",
        //        Summary = string.Empty,
        //        Durations = new[]
        //        {
        //            new Duration { Title = "Préparation", Time = "PT00H10M" }, 
        //            new Duration { Title = "Cuisson", Time = "PT00H20M" }, 
        //        },
        //        Ingredients = new[]
        //        {
        //            new Ingredient
        //            {
        //                Id = 1, 
        //                Name = "Lait de beurre", 
        //                Quantity = new Quantity { Value = 250, OriginalMeasureUnit = MeasureUnit.Millilitre }, 
        //                Replacement = 
        //                    new Ingredient
        //                    {
        //                        Name = "Lait", 
        //                        Quantity = new Quantity { Value = 250, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //                    }
        //            },
        //            new Ingredient
        //            {
        //                Id = 2, 
        //                Name = "Farine tout usage non blanchie",
        //                Quantity = new Quantity { Value = 250, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            }, 
        //            new Ingredient
        //            {
        //                Id = 3, 
        //                Name = "Fécule de maïs", 
        //                Quantity = new Quantity { Value = 60, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            }, 
        //            new Ingredient
        //            {
        //                Id = 4, 
        //                Name = "Huile de canola", 
        //                Quantity = new Quantity { Value = 60, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            }, 
        //            new Ingredient
        //            {
        //                Id = 5, 
        //                Name = "Cassonade", 
        //                Quantity = new Quantity { Value = 45, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            }, 
        //            new Ingredient
        //            {
        //                Id = 6, 
        //                Name = "Poudre à pâte", 
        //                Quantity = new Quantity { Value = 2.5, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            }, 
        //            new Ingredient
        //            {
        //                Id = 7, 
        //                Name = "Bicarbonate de soude", 
        //                Quantity = new Quantity { Value = 1, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            }, 
        //            new Ingredient
        //            {
        //                Id = 8, 
        //                Name = "Sel", 
        //                Quantity = new Quantity { Value = 1, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            }, 
        //            new Ingredient
        //            {
        //                Id = 9, 
        //                Name = "Oeuf", 
        //                Quantity = new Quantity { Value = 2, OriginalMeasureUnit = MeasureUnit.Unit }
        //            }
        //        }, 
        //        Steps = new[]
        //        {
        //            new Step
        //            {
        //                Description = "Dans un bol, {action:'Mélanger'} {ingredientId:2}, {ingredientId:3}, {ingredientId:6}, {ingredientId:7} et {ingredientId:8}. {action:'Réserver'}."
        //            },
        //            new Step
        //            {
        //                Description = "Dans un autre bol, {action:'Fouetter'} {ingredientId:9} et {ingredientId:5} environ {timer:'PT0H05M'} jusqu'à ce qu'ils blanchissent, forment un ruban et triplent de volume.",
        //                PostStep = 
        //                    new Step
        //                    {
        //                        Description = "{action:'Ajouter'} {ingredientId:4} graduellement en fouettant. À l'aide dune spatule, {action:'Incorporer'} les ingrédients secs en alternant avec {ingredientId:1} jusqu'à ce que le mélange soit humecté (il restera quelques grumeaux de farine). {action:'Laisser reposer'} {timer:'PT0H10M'}."
        //                    }
        //            },
        //            new Step
        //            {
        //                Description = "{action:'Préchauffer'} le gaufrier. {action:'Verser'} environ 250 ml (1 tasse) de pâte à la fois (pour deux gaufres) et {action:'Refermer'} l'appareil (ou selon les recommandations du fabricant). {action:'Cuire'} environ {timer:'PT0H05M'} ou jusqu'à ce qu'elles soient dorées.",
        //                PostStep = 
        //                    new Step
        //                    {
        //                        Description = "{action:'Réserver'} au chaud. {action:'Répéter'} l'opération avec le reste de la pâte. {action:'Servir'} avec le coulis de fraises en trempette."
        //                    } 
        //            }
        //        }
        //    };
        //}
        
        //private QuickRecipe CreatePoudingRecipe()
        //{
        //    return new QuickRecipe
        //    {
        //        Id = 1, 
        //        Title = "Pouding au chocolat",
        //        OriginalServings = 10,
        //        OriginalUrl = "http://www.ricardocuisine.com/recettes/5409-pouding-au-chocolat",
        //        Summary = "Sommaire de la recette, un bon pouding au chocolat mi-amer avec ben des calories.",
        //        Durations = new[]
        //        {
        //            new Duration { Title = "Préparation", Time = "PT00H30M" }, 
        //            new Duration { Title = "Cuisson", Time = "PT10H00M" }, 
        //        },
        //        SubRecipes = new[]
        //        {
        //            new SubRecipe { Id = 1, Title = "Sauce" },
        //            new SubRecipe { Id = 2, Title = "Gâteau" }
        //        }
        //        Ingredients = new[]
        //        {
        //            new Ingredient
        //            {
        //                Id = 1, 
        //                SubRecipeId = 1, 
        //                Name = "Cassonade", 
        //                Quantity = new Quantity { Value = 3, OriginalMeasureUnit = MeasureUnit.Cup }
        //            },
        //            new Ingredient
        //            {
        //                Id = 2, 
        //                SubRecipeId = 1, 
        //                Name = "Eau", 
        //                Quantity = new Quantity { Value = 625, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            },
        //            new Ingredient
        //            {
        //                Id = 3, 
        //                SubRecipeId = 1, 
        //                Name = "Cacao", 
        //                Quantity = new Quantity { Value = 180, OriginalMeasureUnit = MeasureUnit.Millilitre },
        //                Requirements = new[] { "Tamisé" }
        //            },
        //            new Ingredient
        //            {
        //                Id = 4, 
        //                SubRecipeId = 1, 
        //                Name = "Crème 35%", 
        //                Quantity = new Quantity { Value = 125, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            },
        //            new Ingredient
        //            {
        //                Id = 5, 
        //                SubRecipeId = 1, 
        //                Name = "Fécule de maïs", 
        //                Quantity = new Quantity { Value = 10, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            },
        //            new Ingredient
        //            {
        //                Id = 6, 
        //                SubRecipeId = 1, 
        //                Name = "Extrait de vanille", 
        //                Quantity = new Quantity { Value = 2.5, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            },
        //            new Ingredient
        //            {
        //                Id = 7, 
        //                SubRecipeId = 2, 
        //                Name = "Farine tout usage non blanchie", 
        //                Quantity = new Quantity { Value = 375, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            },
        //            new Ingredient
        //            {
        //                Id = 8, 
        //                SubRecipeId = 2, 
        //                Name = "Sucre", 
        //                Quantity = new Quantity { Value = 375, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            },
        //            new Ingredient
        //            {
        //                Id = 9, 
        //                SubRecipeId = 2, 
        //                Name = "Lait", 
        //                Quantity = new Quantity { Value = 1, OriginalMeasureUnit = MeasureUnit.Cup }
        //            },
        //            new Ingredient
        //            {
        //                Id = 10, 
        //                SubRecipeId = 2, 
        //                Name = "Cacao", 
        //                Quantity = new Quantity { Value = 125, OriginalMeasureUnit = MeasureUnit.Millilitre },
        //                Requirements = new[] { "Tamisé" }
        //            },
        //            new Ingredient
        //            {
        //                Id = 11, 
        //                SubRecipeId = 2, 
        //                Name = "Beurre non salé", 
        //                Quantity = new Quantity { Value = 125, OriginalMeasureUnit = MeasureUnit.Millilitre },
        //                Requirements = new[] { "Ramolli" }
        //            },
        //            new Ingredient
        //            {
        //                Id = 12, 
        //                SubRecipeId = 2, 
        //                Name = "Bicarbonate de soude", 
        //                Quantity = new Quantity { Value = 5, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            },
        //            new Ingredient
        //            {
        //                Id = 13, 
        //                SubRecipeId = 2, 
        //                Name = "Sel", 
        //                Quantity = new Quantity { Value = 1, OriginalMeasureUnit = MeasureUnit.Pinch }
        //            },
        //            new Ingredient
        //            {
        //                Id = 14, 
        //                SubRecipeId = 2, 
        //                Name = "Oeuf", 
        //                Quantity = new Quantity { Value = 2, OriginalMeasureUnit = MeasureUnit.Millilitre }
        //            },
        //        }, 
        //        Steps = new[]
        //        {
        //            new Step
        //            {
        //                SubRecipeId = 1, 
        //                Description = "Dans une casserole, {action:'Mélanger'} {ingredientId:1} et {ingredientId:3}. {action:'Ajouter'} {ingredientId:5}. {action:'Ajouter'} {ingredientId:2} et {ingredientId:4}. {action:'Porter à ébullition'} en remuant à l'aide d'un fouet. {action:'Incorporer'} {ingredientId:6}. {action:'Réserver'}"
        //            },
        //            new Step
        //            {
        //                SubRecipeId = 2, 
        //                Description = "Dans une petite casserole, {action:'Porter à ébullition'} {ingredientId:9} et {ingredientId:10} en remuant à l’aide d’un fouet. {action:'Laisser tiédir'}. {action:'Gosser'} {timer:'PT0H02M'}."
        //            },
        //            new Step
        //            {
        //                SubRecipeId = 2,
        //                Description = "Dans un bol, {action:'Mélanger'} {ingredientId:7}, {ingredientId:12} et {ingredientId:13}. {action:'Réserver'}."
        //            }, 
        //            new Step
        //            {
        //                SubRecipeId = 2, 
        //                Description = "Dans un autre bol, {action:'Mélanger'} {ingredientId:11} et {ingredientId:8} au batteur électrique jusqu’à ce que le mélange prenne une texture granuleuse. {action:'Ajouter'} les oeufs, un à la fois, et {action:'Battre'} jusqu’à ce que la préparation soit homogène. À basse vitesse, {action:'Incorporer'} les ingrédients secs en alternant avec le mélange de cacao. {action:'Répartir'} la pâte dans le plat."
        //            },
        //            new Step
        //            {
        //                SubRecipeId = 2, 
        //                Description = "{action:'Verser'} la sauce chaude délicatement sur la pâte. {action:'Cuire'} au four environ {timer:'PT0H45M'} ou jusqu’à ce qu’un cure-dent inséré au centre du gâteau en ressorte propre.",
        //                PostStep = 
        //                    new Step
        //                    {
        //                        Description = "{action:'Servir'} chaud ou tempéré."
        //                    }
        //            }
        //        }
        //    };
        //}
    }
}