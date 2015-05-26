using System;
using System.Collections.Generic;

using CookItNow.Api.Models;

namespace CookItNow.Api
{
    public class QuickRecipeRepository : IQuickRecipeRepository
    {
        private static readonly IDictionary<long, QuickRecipe> _recipes = new Dictionary<long, QuickRecipe>();

        public QuickRecipeRepository()
        {
            _recipes[1] = 
                new QuickRecipe
                {
                    Id = 1, 
                    Title = "Gaufres",
                    OriginalServings = 8,
                    OriginalUrl = "http://www.ricardocuisine.com/recettes/3892-gaufres",
                    Summary = string.Empty,
                    Durations = new[]
                    {
                        new Duration { Title = "Préparation", Time = "PT00H10M" }, 
                        new Duration { Title = "Cuisson", Time = "PT00H20M" }, 
                    },
                    Ingredients = new[]
                    {
                        new Ingredient
                        {
                            Id = 1, 
                            Name = "Lait de beurre", 
                            Quantity = new Quantity { Value = 250, OriginalMeasureUnit = MeasureUnit.Millilitre }, 
                            Replacement = 
                                new Ingredient
                                {
                                    Name = "Lait", 
                                    Quantity = new Quantity { Value = 250, OriginalMeasureUnit = MeasureUnit.Millilitre }
                                }
                        },
                        new Ingredient
                        {
                            Id = 2, 
                            Name = "Farine tout usage non blanchie",
                            Quantity = new Quantity { Value = 250, OriginalMeasureUnit = MeasureUnit.Millilitre }
                        }
                    }
                };
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
    }
}